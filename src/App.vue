<script setup>
import NotificationProvider from './components/NotificationProvider.vue';
</script>

<template>
  <NotificationProvider :max="2">
    <router-view />
  </NotificationProvider>
</template>

<style scoped></style>
