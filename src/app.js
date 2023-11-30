import express from "express";
import apiInfo from "./constant/index.js";
import carDataRoute from "./routes/carDataRoute.js";
import homeRoute from "./routes/homeRoute.js";

const app = express();

app.use(express.json());

app.use("/api", carDataRoute);

app.use("/", homeRoute);

app.use((req, res) => {
	res.status(404).send("404 Not Found");
});

export default app;
