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
	const apiInfo = `
    <h1>Bienvenue sur l'API MKB-Automobile! 🚗</h1>

    <p>Endpoints disponibles :</p>
    <ul>
      <li>/api : Affiche les informations sur l'API.</li>
      <li>/api/users : Affiche la liste des utilisateurs (à venir).</li>
      <li>/api/users/:id : Affiche les informations d'un utilisateur (à venir).</li>
      <!-- Ajoute d'autres endpoints et descriptions ici... -->
    </ul>

    <p>Comment utiliser l'API :</p>
    <ul>
      <li>GET /api : Affiche les informations sur l'API.</li>
      <li>POST /api/users : Crée un utilisateur (à venir).</li>
      <li>PUT /api/users/:id : Modifie un utilisateur (à venir).</li>
      <li>DELETE /api/users/:id : Supprime un utilisateur (à venir).</li>
      <!-- Ajoute d'autres exemples ici... -->
    </ul>

    <p>Pour plus d'informations, rendez-vous sur le repo GitHub :</p>
    <a href="https://github.com/mkb-automobile/mkb-backend" target="_blank">GitHub Repo</a>
  `;

	res.send(apiInfo);
});

app.get("/api", async (req, res) => {
	res.setHeader("Cache-control", "public, max-age=86400");
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
