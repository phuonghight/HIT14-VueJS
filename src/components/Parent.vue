<script setup>
import { ref } from 'vue';
import Child from './Child.vue';
import { useCounterOptionStore } from '../stores/counter.otiopn';
import { useCounterSetupStore } from '../stores/counter.setup';

// const store = useCounterOptionStore();
const store = useCounterSetupStore();
store.$subscribe(
  (mutation, state) => {
    console.log(mutation);
  },
  { detached: true, immediate: true }
);
</script>

<template>
  <h2>In Parent: {{ store.count }}, name: {{ store.name }}</h2>
  <h2>Quara Count: {{ store.quaraCount }}</h2>
  <button @click="store.increament()">thay doi o Parent</button>
  <button @click="store.$patch({ name: 'aasdas' })">
    thay doi su dung $patch
  </button>
  <button @click="store.$reset()">reset</button>
  <child />
</template>

<style lang="scss" scoped></style>
