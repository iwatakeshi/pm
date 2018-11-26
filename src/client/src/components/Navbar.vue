<template>
    <nav>
        <ul id="nav-links">
            <ul><a href="/">Home</a></ul>
            <ul v-if="this.$root.token"><a href="/projects">Projects</a></ul>
            <ul v-if="this.$root.token"><a href="#" @click="logout()">Log out</a></ul>
        </ul>
    </nav>
</template>

<script scoped>
module.exports = {
    name: "navbar",
    methods: {
        logout() {
            window.localStorage.removeItem('token');
            this.$root.token = null;
            window.location.reload(true);
        }
    }
}
</script>

<style>

nav {

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
}
</style>