<template>
  <div class="hero-body">
    <div class="container has-text-centered">
      <div class="column is-5 is-offset-4">
        <h3 class="title has-text-grey" v-if="this.$root.path === '/signin'">Sign In</h3>
        <h3 class="title has-text-grey" v-else>Sign up</h3>
        <!-- <p class="subtitle has-text-grey">Please login to proceed.</p> -->
        <div class="box">
          <figure class="avatar">
            <img src="https://placehold.it/128x128">
          </figure>
          <form @submit.prevent="register">

            <div class="field" v-if="this.$root.path === '/signup'">
              <div class="control">
                <input class="input is-large" type="text" placeholder="Username" v-model="form.username">
              </div>
            </div>

            <div class="field">
              <div class="control">
                <input class="input is-large" type="email" placeholder="Your Email" v-model="form.email">
              </div>
            </div>

            <div class="field">
              <div class="control">
                <input class="input is-large" type="password" placeholder="Your Password" v-model="form.password">
              </div>
            </div>
            <div class="field">
              <label class="checkbox">
                <input type="checkbox">
                Remember me
              </label>
            </div>
            <button class="button is-block is-info is-large is-fullwidth">Submit</button>
          </form>
        </div>
        <p class="has-text-grey" v-if="!this.$root.auth().isAuthenticated()">
          <router-link v-if="this.$root.path === '/signin'" to="/signup">
            <a>Sign Up</a>&nbsp;·&nbsp;
          </router-link>

          <router-link v-else to="/signin">
            <a>Sign In</a>&nbsp;·&nbsp;
          </router-link>
          <a href="#">Forgot Password</a> &nbsp;·&nbsp;
          <a href="#">Need Help?</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "auth",
  data: () => ({
    form: {
      username: null,
      email: null,
      password: null
    },
  }),
  methods: {
    async signup() {
      const {
        data: { token }
      } = await axios.post("auth/signup", this.form);

      this.$root.auth().authenticate(token);
    },
    async signin() {
      const {
        data: { token }
      } = await axios.post("auth/signin", this.form);

      this.$root.auth().authenticate(token);
    },
    async register () {
      if (this.$root.path === '/signin') {
        await this.signin();
      } else {
        await this.signup();
      }

      this.$router.push({ path: '/projects'});
    }
  }
};
</script>
