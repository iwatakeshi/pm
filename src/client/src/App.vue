<template>
    <div>
      <navbar></navbar>
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
import navbar from './components/common/Navbar'

export default {
  name: "app",
  components: {
    navbar
  },
  beforeMount() {
    
  },
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Open+Sans|Poppins|Roboto');
  @import url('https://use.fontawesome.com/releases/v5.5.0/css/all.css');

  body {
    font-family: 'Roboto',  sans-serif;
  }
</style>
