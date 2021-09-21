<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
		<button @click="get_users">Get all Users</button>

		<ul v-if="users">
			<li v-for="user in users" v-bind:key="user.name">{{ user.name }}</li>
		</ul>
	</div>
</template>

<script>
const axios = require("axios");
const constants = require("../../api/constants");

export default {
	name: "HelloWorld",
	props: {
		msg: String,
	},
	data() {
		return {
			users: [],
		};
	},
	methods: {
		get_users: function() {
			axios
				.get(constants["constants"]["user_controller"])
				.then((res) => {
					console.log(res.data);
					this.users = res.data;
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
