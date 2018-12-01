<template>
  <div>
    <h1>Projects</h1>
    <project-form></project-form>
    <ul>
      <li v-for="(project, key) in projects" :key="key">{{ project.title }}</li>
    </ul>
  </div>
</template>

<script scoped>
import ProjectForm from "../components/projects/ProjectForm";
import axios from "axios";

export default {
  name: "projects",
  components: { ProjectForm },
  data: () => ({
    projects: null
  }),
  beforeMount() {
    if (!this.$root.auth().isAuthenticated()) {
      console.log('here')
      this.$router.push({ path: '/' })
    }
  },
  async mounted() {
    this.$root.auth().authenticate();
    console.log(`Projets - Authenticated: ${this.$root.auth().isAuthenticated()}`)
    const { data } = await axios.get("api/v1/projects/");
    this.projects = data;
  }
};
</script>