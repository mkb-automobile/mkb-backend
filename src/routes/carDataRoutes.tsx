import express from "express";
import {
	getCarData,
	getCarDataById,
	createCarData,
	updateCarData,
	deleteCarData,
} from "../controllers/carDataController.tsx";

const router = express.Router();

router.get("/", getCarData);
router.post("/", createCarData);
router.get("/:id", getCarDataById);
router.put("/:id", updateCarData);
router.delete("/:id", deleteCarData);

export default router;
