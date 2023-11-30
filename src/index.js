import express from "express";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`The server listens on port ${PORT}`);
});
