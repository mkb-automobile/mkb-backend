import express from "express";
import apiInfo from "../constant/index.js";

const router = express.Router();

router.get("/", (req, res) => {
	res.setHeader("Cache-control", "public, max-age=86400");
	res.send(apiInfo);
});

export default router;
