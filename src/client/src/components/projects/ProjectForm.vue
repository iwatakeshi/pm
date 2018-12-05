<template>
  <form @submit.prevent="createProject">
    <input type="text" v-model="project.title">
    <input type="submit">
  </form>
</template>

<script scoped>
import axios from "axios";
export default {
  name: "project-form",
  data: () => ({
    project: {
      title: null
    }
  }),
  methods: {
    createProject: function() {
      axios
        .post("api/v1/projects", this.project) 
        .then(response => {
          this.$parent.$emit('NewProjectSaved', response.data);
          this.project.title = '';
        });
      // window.location.reload(true);
    }
  }
};
</script>
