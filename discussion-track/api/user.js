const user_db = require("./models/user_db");
const express = require("express");
const app = express();
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 4000;
user_model = {};

app.post("/user", (req, res) => {
	console.log(req.body);

	newUser = req.body;
	user_db.add_user(user_model, newUser).then((added_user) => {
		res.send(added_user);
	});
});

app.get("/user", (req, res) => {});

app.listen(PORT, () => {
	user_db.setup().then((model) => {
		console.log(model);
		user_model = model;
	});
	console.log(`Listening on port: ${PORT}`);
});
