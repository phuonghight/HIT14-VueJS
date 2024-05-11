<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
</script>

<template>
  <nav>
    <router-link to="/"> Home</router-link>
    <router-link to="/docs">Docs</router-link>
  </nav>
  <RouterView />
</template>

<style lang="scss" scoped>
nav {
  > * {
    display: inline-block;
    margin-right: 10px;
    color: #08c;
    text-decoration: none;
  }
}
</style>
