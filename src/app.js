import express from "express";
import apiInfo from "./constant/index.js";
import carDataRoute from "./routes/carDataRoute.js";
import homeRoute from "./routes/homeRoute.js";
import formRoute from "./routes/formRoute.js";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
});

app.use("/", homeRoute);

app.use("/api", carDataRoute);

app.use("/api/form", formRoute);

app.use((req, res) => {
	res.status(404).send("404 Not Found");
});

export default app;
