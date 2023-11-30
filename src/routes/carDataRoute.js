import express from "express";
import fetch from "node-fetch";
import { parseString } from "xml2js";
import carDataController from "../controllers/carDataController.js";

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const cars = await carDataController.getCarData();
		res.status(200).json(cars);
	} catch (error) {
		console.error("carDataRoute:", error);
		res.status(500).send("Server-side error");
	}
});

export default router;
