const user_db = require("./models/User_model");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
const PORT = 4000;

app.post("/user", (req, res) => {
	console.log(req.body);
	res.send(req.body);
});

app.get("/user", (req, res) => {});

app.listen(PORT, () => {
	user_db.setup().then((user_model) => {
		console.log(user_model);
	});
	console.log(`Listening on port: ${PORT}`);
});
