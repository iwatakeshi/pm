<template>
  <div v-if="project">
    <h1>{{ project.title }}</h1>
    <form @submit.prevent="saveNewTask">
      <input type="text" v-model="newTask.description">
      <input type="submit" class="btn">
    </form>
    <ul>
      <li v-for="(task, index) in tasks" :key="task.id">
        <input
          type="checkbox"
          v-model="tasks[index].completed"
          :checked="task.completed"
          @click="toggleCompleted(task.id, index)"
        >
        {{ task.description }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "project",
  data: () => ({
    project: null,
    tasks: null,
    newTask: {
      description: ""
    }
  }),
  async beforeMount() {
    const project = await axios.get(`api/v1/projects/${this.$route.params.id}`);
    const tasks = await axios.get(
      `api/v1/projects/${this.$route.params.id}/tasks/`
    );
    console.log(project, tasks);
    this.project = project.data;
    this.tasks = tasks.data;
  },
  methods: {
    saveNewTask() {
      axios
        .post(`/api/v1/projects/${this.$route.params.id}/tasks`, this.newTask)
        .then(res => {
          this.tasks.push(res.data);
          this.newTask.description = "";
        });
    },
    toggleCompleted(id, index) {
      axios.patch(`/api/v1/task/${id}`, {
        completed: (this.tasks[index].completed = !this.tasks[index].completed)
      });
    }
  }
};
</script>