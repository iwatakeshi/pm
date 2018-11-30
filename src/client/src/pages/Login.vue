<template>
  <div class="container center">
    <div class="card">
      <div class="tabs">
        <button class="tab-button" @click="mode = 0" :class="mode === 0 ? 'active' : null">Login</button>
        <button class="tab-button" @click="mode = 1" :class="mode === 1 ? 'active' : null">Register</button>
      </div>

      <hr>
      <form class="container column center" @submit.prevent="register" v-if="mode === 1">
        <div class="container label-group">
          <label for="email">Email</label>
          <input id="email" v-model="form.email">
        </div>

        <div class="container label-group">
          <label for="username">Username</label>
          <input id="username" v-model="form.username">
        </div>

        <div class="container label-group">
          <label for="password">Password</label>
          <input id="password" type="password" v-model="form.password">
        </div>

        <hr>

        <button class="button-style" type="submit">Register</button>
      </form>

      <form class="container column center" @submit.prevent="login" v-if="mode === 0">
        <div class="container label-group">
          <label for="email">Email</label>
          <input id="email" v-model="form.email">
        </div>

        <div class="container label-group">
          <label for="password">Password</label>
          <input id="password" type="password" v-model="form.password">
        </div>

        <button class="button-style" type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data: () => ({
    mode: 0,
    form: {
      email: null,
      username: null,
      password: null
    }
  }),
  mounted() {
    console.log(this.$root, this.$root.token);
  },
  methods: {
    goHome(token) {
      console.log(token);
      this.$root.token = token;
      localStorage.setItem("token", token);
      window.location = "/"
    },
    login() {
      axios
        .post("http://localhost:3333/auth/signin", this.form)
        .then(res => {
          this.goHome(res.data.token);
        })
        .catch(err => {
          console.error(err);
        });
    },
    register() {
      axios
        .post("http://localhost:3333/auth/signup", this.form)
        .then(res => {
          this.goHome(res.data.token);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style scoped>
/* .container {
    display: flex;                    
}

.column {
    flex-direction: column;
}

.center {
    justify-content: center;
    align-items: center;
}

.label-group {
    margin: 10px 0;
}

.label-group > label {
    margin-right: 1em;
    display: inline-block;
    width: 100px;
    text-align: right;
}

form input {
    width: 50%;
}

.card {
    box-shadow: 0 10px 15px rgba(0,0,0,0.1);
    padding: 0 0 1em 0;
    border-radius: 20px;
    overflow: hidden;
}

.tab-button {
    width: 50%;
    background: white;
    border: none;
    padding: 1em;
    margin: 0;
}

.tab-button.active {
    background: #eee;
} */

/* .button-style {
    background-color: rgb(17, 88, 116);
	outline: none;
	color: #fff;
	font-size: 14px;
	height: 45px;
	font-weight: normal;
	padding: 14px 0;
	border-color: rgb(17, 88, 120);
    width: 150px
}

form {
    padding: 1em;
    width: 400px;
}

hr {
    margin-top: 10px;
	margin-bottom: 0px;
	clear: both;
	border: 0;
	height: 1px;
	background-image: -webkit-linear-gradient(left,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.15),rgba(0, 0, 0, 0));
	background-image: -moz-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
	background-image: -ms-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
	background-image: -o-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,0.15),rgba(0,0,0,0));
} */
</style>
