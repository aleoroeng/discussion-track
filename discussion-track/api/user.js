const user_db = require("./models/user_db");
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 4000;
const SALT_ROUNDS = 10;
user_model = {};

app.post("/user", (req, res) => {
	newUser = req.body;
	bcrypt.hash(newUser.password, SALT_ROUNDS).then((hash) => {
		newUser.password = hash;
		user_db.add_user(user_model, newUser).then((added_user) => {
			res.send(added_user);
		});
	});
});

app.get("/users", (req, res) => {
	user_db.find_all_users(user_model).then((users) => {
		console.log(users);
		res.send(users);
	});
});

app.post("/login", (req, res) => {
	username = req.body.username;
	console.log(req.body);
	user_db.find_user_by_username(user_model, username).then((user_fetched) => {
		console.log(user_fetched);
		bcrypt
			.compare(req.body.password, user_fetched[0].password)
			.then((result) => {
				if (result) {
					res.send("Good login");
				} else {
					res.send("Bad login");
				}
			});
	});
});
app.listen(PORT, () => {
	user_db.setup().then((model) => {
		console.log(model);
		user_model = model;
	});
	console.log(`Listening on port: ${PORT}`);
});
