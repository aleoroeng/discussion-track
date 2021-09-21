const express = require("express");
const app = express();
const constants = require("./constants");
const cors = require("cors");

app.use(cors());
const PORT = 4000;
const mongoose = require("mongoose");

const ATLAS_URI = constants["constants"]["atlas_uri"];

async function setup() {
	console.log(ATLAS_URI);
	await mongoose.connect(ATLAS_URI);

	const userSchema = new mongoose.Schema({
		name: String,
	});

	const User = mongoose.model("User", userSchema);
	const newUser = new User({ name: "Johnny" });
	await newUser.save();

	const allusers = await User.find();
	console.log(allusers);
	return allusers;
}

app.get("/", (req, res) => {
	setup().then((data) => {
		res.send(data);
	});
});

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
