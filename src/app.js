import express from "express";
import { apiInfo } from "./constant/index.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.send(apiInfo);
});

app.use((req, res) => {
	res.status(404).send("404 Not Found");
});

export default app;
