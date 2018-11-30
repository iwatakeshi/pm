<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" :to="{ path: '/'}">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
      </router-link>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        <!-- <a class="navbar-item">Home</a> -->
        <router-link class="navbar-item" to="/projects">Projects</router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary" v-if="!this.$root.isLoggedIn()">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light" v-else @click="logout()">Log out</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script scoped>
export default {
  name: "navbar",
  methods: {
    logout() {
      window.localStorage.removeItem("token");
      this.$root.token = null;
      window.location.reload(true);
    }
  }
};
</script>

<style>
/* nav {

    display: flex;
    background-color: rgb(17, 88, 116);
    justify-content:  flex-end;
}

ul {
    display: flex;
    margin-right: 30px;
}

a {
    color: white;
    text-decoration: none;
} */
</style>