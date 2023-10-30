import express from "express";
import fetch from "node-fetch";
import { parseString } from "xml2js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
const app = express();

app.get("/", (req, res) => {
	res.send("Bienvenue sur votre backend avec Express!");
});

app.get("/api", async (req, res) => {
	try {
		console.log("Début de la requête");

		const apiUrl =
			"https://www.spider-vo.net/api/42446d400a51005224542150225b07590b56104a3072172e3d3a042b090a05760158135e0b";

		console.log("Avant la requête Fetch côté serveur");

		if (apiUrl) {
			const response = await fetch(apiUrl);

			console.log("Après la requête Fetch côté serveur");

			if (response.ok) {
				const xmlData = await response.text();
				parseString(xmlData, (err, result) => {
					if (err) {
						console.error("Erreur lors de la conversion XML vers JSON:", err);
						res.status(500).send("Erreur lors de la conversion XML vers JSON");
					} else {
						console.log("Données récupérées:", result);
						res.json(result);
					}
				});
			} else {
				console.error(
					"Erreur de réponse:",
					response.status,
					response.statusText
				);
				res
					.status(response.status)
					.send("Erreur lors de la requête Fetch côté serveur");
			}
		} else {
			console.error("apiUrl n'est pas défini");
			res.status(500).send("apiUrl n'est pas défini");
		}
	} catch (error) {
		console.error("Erreur lors de la requête Fetch côté serveur:", error);

		res.status(500).send("Erreur serveur");
	}
});

dotenv.config();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Le serveur écoute sur le port ${PORT}`);
});

// // Utilisez le middleware body-parser
// app.use(bodyParser.json());
