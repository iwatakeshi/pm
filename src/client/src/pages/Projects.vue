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
import ProjectForm from '../components/ProjectForm';
import axios from 'axios';


export default {
    name: 'projects',
    components: { ProjectForm },
    data: () => ({
        projects: null
    }),
    mounted () {
        axios.get('http://localhost:3333/api/v1/projects/').then((res) => {
            this.projects = res.data;
        })
    }
}
</script>