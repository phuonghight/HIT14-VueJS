<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  count: {
    type: Number,
    required: false,
    default: 99,
  },
});

const emits = defineEmits(['update:count']);
</script>

<template>
  <h2>Child</h2>
  <p>Count: {{ count }}</p>
  <button @click="emits('update:count', count + 1)">Click to increase 1</button>
</template>

<style lang="scss" scoped></style>
