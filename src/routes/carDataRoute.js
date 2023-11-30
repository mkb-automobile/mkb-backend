import express from "express";
import fetch from "node-fetch";
import { parseString } from "xml2js";

const router = express.Router();

router.get("/", async (req, res) => {
	res.setHeader("Cache-control", "public, max-age=86400");
	try {
		const apiUrl = process.env.SPIDERVO_API_URL;

		if (apiUrl) {
			const response = await fetch(apiUrl);

			if (response.ok) {
				const xmlData = await response.text();

				parseString(
					xmlData,
					{ trim: true, explicitArray: false },
					(err, result) => {
						if (err) {
							console.error("Error converting XML to JSON:", err);
							res.status(500).send("Error converting XML to JSON:");
						} else {
							const cars = result.vehicules.vehicule;
							console.log(result.vehicules.vehicule);
							res.json(cars);
						}
					}
				);
			} else {
				console.error("Wrong response:", response.status, response.statusText);
				res.status(response.status).send("Server-side Fetch request error");
			}
		} else {
			console.error("apiUrl is not defined");
			res.status(500).send("apiUrl is not defined");
		}
	} catch (error) {
		console.error("Server-side Fetch request error", error);
		res.status(500).send("Erreur server");
	}
});

export default router;
