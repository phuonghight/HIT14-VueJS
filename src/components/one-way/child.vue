<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  count: {
    type: Number, // kiểu hoặc mảng chứa kiểu của prop
    required: false, // true or false
    default: 10, // giá trị mặc định khi không truyền prop
  },
});

const emits = defineEmits(['increament']);
function buttonClick() {
  emits('increament', props.count + 2);
}
</script>

<template>
  <h2>Child</h2>
  <p>Count: {{ count }}</p>
  <button @click="buttonClick">Click to increase 2</button>
</template>

<style lang="scss" scoped></style>
