import express from "express";
import fetch from "node-fetch";
import { parseString } from "xml2js";
import dotenv from "dotenv";
const app = express();

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-Requested-With,content-type"
	);
	res.setHeader("Access-Control-Allow-Credentials", "true"); // Fix: pass string "true" instead of boolean true
	next();
});

app.get("/", (req, res) => {
	res.send("Bienvenue sur votre backend avec Express! 🚀");
});

app.get("/api", async (req, res) => {
	try {
		const apiUrl = process.env.SPIDERVO_API_URL;

		if (apiUrl) {
			const response = await fetch(apiUrl);

			if (response.ok) {
				const xmlData = await response.text();
				parseString(xmlData, (err, result) => {
					if (err) {
						console.error("Error converting XML to JSON:", err);
						res.status(500).send("Error converting XML to JSON:");
					} else {
						res.json(result);
					}
				});
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

dotenv.config();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`The server listens on port ${PORT}`);
});

// // Utilisez le middleware body-parser
// app.use(bodyParser.json());
