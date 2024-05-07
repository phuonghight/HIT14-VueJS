<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const abc = ref(1);
</script>

<template>
    <h1>Username: {{ route.params.username }}</h1>
    <router-link :to="{ name: 'PostUser', params: { postName: 'Post 1' }}">Post 1</router-link>
    <router-link :to="{ name: 'PostUser', params: { postName: 'Post 2' }}">Post 2</router-link>
    <router-link :to="{ name: 'PostUser', params: { postName: 'Post 3' }}">Post 3</router-link>
    <router-view />
</template>
