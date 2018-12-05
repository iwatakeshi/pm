<template>
  <div>
    <h1>Projects</h1>
    <project-form></project-form>
    <ul>
      <li v-for="(project, key) in projects" :key="key">
        <router-link :to="{ path: '/project/' + project.id }">{{ project.title }}</router-link>
      </li>
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
    if (!this.auth.isAuthenticated()) {
      console.log('here')
      this.$router.push({ path: '/' })
    }
  },
  async mounted() {
    // auth.authenticate();
    console.log(this.auth)
    console.log(`Projects - Authenticated: ${this.auth.isAuthenticated()}`)
    const { data } = await axios.get("api/v1/projects/");
    this.projects = data;
    this.$on('NewProjectSaved', (project) => {
      this.projects.push(project);
    });
  }
};
</script>