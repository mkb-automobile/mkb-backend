import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
	console.log(req.body);
	res.send("POST request to the homepage");
});

export default router;
