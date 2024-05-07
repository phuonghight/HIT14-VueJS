<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
</script>

<template>
  <nav>
    <router-link to="/?dz=true&xg=false#123">Go to Home</router-link>
    <router-link to="/about">Go to About</router-link>
    <router-link to="/docs">Go to docs</router-link>
    <router-link :to="{ name: 'Profile', params: { username: 'phuong' } }">Go to profile of phuong</router-link>
    <router-link :to="{ name: 'Profile', params: { username: 'khang' } }">Go to profile of khang</router-link>
    <router-link :to="{ name: 'Profile', params: { username: 'dung' } }">Go to profile of dung</router-link>
  </nav>
  <RouterView />
</template>

<style lang="scss" scoped>
nav {
  > * {
    display: inline-block;
    margin-right: 10px;
  }
}
</style>
