<template>
    <div>
      <navbar></navbar>
      <router-view></router-view>
    </div>
</template>

<script>
import navbar from './components/Navbar'

export default {
  name: "app",
  components: {
    navbar
  },
  beforeMount() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      if (!this.token && !window.localStorage.getItem('token')) this.$router.push("/login");
      else {
        this.$root.token = localStorage.getItem('token');
      }
    }
  }
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Open+Sans|Poppins|Roboto');
  body {
    font-family: 'Roboto',  sans-serif;
    padding: 0;
    margin: 0;
  }
</style>
