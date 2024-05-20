<script setup>
import { ref } from 'vue';
import child from './child.vue';

const count = ref(0);
</script>

<template>
  <h2>parent</h2>
  <p>Count: {{ count }}</p>
  <button @click="count++">Click</button>

  <child
    :count="count"
    @increament="
      (payload) => {
        count = payload;
      }
    "
  />
</template>

<style lang="scss" scoped></style>
