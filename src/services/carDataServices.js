import fetch from "node-fetch";
import { parseString } from "xml2js";

const carDataServices = {
	getCarData: async () => {
		try {
			const apiUrl = process.env.SPIDERVO_API_URL;

			if (apiUrl) {
				const response = await fetch(apiUrl);

				if (response) {
					// Vérifie si la réponse est définie
					if (response.ok) {
						const xmlData = await response.text();

						return new Promise((resolve, reject) => {
							parseString(
								xmlData,
								{ trim: true, explicitArray: false },
								(err, result) => {
									if (err) {
										console.error("Error converting XML to JSON:", err);
										reject("Error converting XML to JSON");
									} else {
										const cars = result.vehicules.vehicule;
										console.log(result.vehicules.vehicule);
										resolve(cars);
									}
								}
							);
						});
					} else {
						console.error(
							"Wrong response:",
							response.status,
							response.statusText
						);
						throw new Error("Server-side Fetch request error");
					}
				} else {
					console.error("No response received from the server");
					throw new Error("No response received from the server");
				}
			} else {
				console.error("apiUrl is not defined");
				throw new Error("apiUrl is not defined");
			}
		} catch (error) {
			console.error("Server-side Fetch request error", error);
			throw new Error("Server-side Fetch request error");
		}
	},
};

export default carDataServices;
