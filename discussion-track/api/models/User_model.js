const constants = require("../constants");
const mongoose = require("mongoose");
const ATLAS_URI = constants.ATLAS_URI;

const userSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	username: String,
	password: String,
});

async function setup() {
	await mongoose.connect(ATLAS_URI);
	const User = mongoose.model("User", userSchema);

	return User;
}

async function add_user(user_model, user) {
	const new_user = new user_model({
		first_name: user.first_name,
		last_name: user.last_name,
		username: user.username,
		password: user.password,
	});
	await new_user.save();
	return new_user;
}

exports.add_user = add_user;
exports.setup = setup;
