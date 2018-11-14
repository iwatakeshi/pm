<template>
    <div class="row">
        <p>Hello</p>
        <ul v-if="projects">
            <li v-for="project in projects">{{ project.title }}</li>                        
        </ul>
    </div>
</template>

<script>
export default {
    name: "home",
    data: () => {
        projects: null      
    },
    beforeMount() {
        this.getProjects();   
    },
    methods: {
        getProjects() {
            this.projects = []
        }
    }
}
</script>

<style></style>