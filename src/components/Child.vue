<script setup>
import { useCounterOptionStore } from '../stores/counter.otiopn';

const counterOptionStore = useCounterOptionStore();
</script>

<template>
  <h2>In Child: {{ counterOptionStore.count }}</h2>
  <h2>Tripple Count: {{ counterOptionStore.trippleCount }}</h2>
  <h2>Tripple Plus 2 Count: {{ counterOptionStore.trippleCountPlusTwo }}</h2>
  <button @click="counterOptionStore.increament()">Thay doi o child</button>
</template>

<style lang="scss" scoped></style>
