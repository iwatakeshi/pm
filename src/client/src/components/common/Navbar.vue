<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <a>
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
        </a>
      </router-link>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start" v-if="this.$root.auth().isAuthenticated()">
        <router-link class="navbar-item" to="/projects">
          <a>Projects</a>
        </router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <template v-if="!this.$root.auth().isAuthenticated()">
              <template v-if="this.$root.path === '/signin'">
                <router-link class="button is-primary" to="/signup">
                  <strong>Sign up</strong>
                </router-link>
              </template>

              <router-link v-else class="button is-primary" to="/signin">
                <strong>Sign In</strong>
              </router-link>
            </template>
            <a class="button is-light" v-else @click="signOut">Sign out</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script scoped>
export default {
  name: "navbar",
  computed: {
    isSignInView() {
      return this.$root.path === "/signin";
    }
  },
  methods: {
    signOut() {
      this.$root.auth().deauthenticate();
      console.log(`Navbar - Authenticated: ${this.$root.auth().isAuthenticated()}`)
      window.location.replace('/')
    }
  }
};
</script>

<style>
</style>