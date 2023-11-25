import express from "express";
import fetch from "node-fetch";
import nodemailer from "nodemailer";
import { parseString } from "xml2js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
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

app.use(bodyParser.json());

app.post("/api/sendcontactform", async (req, res) => {
	console.log(req.body);
	if (req.method === "POST") {
		const { name, firstName, email, phone, marque, modele, refCar, message } =
			req.body;
		console.log(req.body);

		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: "a.cazimira@gmail.com",
				pass: "qwh8w66c",
			},
		});

		const mailData = {
			from: "a.cazimira@gmail.com",
			to: "contact.mkb04@gmail.com",
			subject: `Nouveau message de ${name} ${firstName}`,
			text: `Nom: ${name} \n Prénom: ${firstName} \n Email: ${email} \n Téléphone: ${phone} \n Marque: ${marque} \n Modèle: ${modele} \n Référence: ${refCar} \n Message: ${message}`,
			html: `<div>
	            <p>Nom: ${name}</p>
	            <p>Prénom: ${firstName}</p>
	            <p>Email: ${email}</p>
	            <p>Téléphone: ${phone}</p>
	            <p>Marque: ${marque}</p>
	            <p>Modèle: ${modele}</p>
	            <p>Référence: ${refCar}</p>
	            <p>Message: ${message}</p>
	          </div>`,
		};

		try {
			const info = await transporter.sendMail(mailData);
			console.log("Email sent successfully", info);
		} catch (error) {
			console.log(error);
			res.status(500).json({ status: "Erreur lors de l'envoi de l'e-mail" });
			return;
		}

		res.status(200).json({ status: "Ok" });
	} else {
		res.status(405).json({ status: "Méthode non autorisée" });
	}
});

dotenv.config();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`The server listens on port ${PORT}`);
});

// // Utilisez le middleware body-parser
// app.use(bodyParser.json());
