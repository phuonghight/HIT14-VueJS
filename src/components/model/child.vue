<script setup>
import { defineModel } from 'vue';

const model = defineModel();
// const model2 = defineModel({
//   type: Number,
//   required: false,
//   default: 100,
// });
const model3 = defineModel('model3');
const model4 = defineModel('model4', {
  type: Number,
  required: false,
  default: 100,
});

function change() {
  model.value++;
}
</script>

<template>
  <h2>Child</h2>
  <p>Count: {{ model }}</p>
  <button @click="model++">Click to increase1</button>

  <p>Model 3: {{ model3 }}</p>
</template>

<style lang="scss" scoped></style>
