<script setup>
import { ref, defineProps } from 'vue';
import Child from './Child.vue';

// const { count, count2 } = defineProps(['count', 'count2']);

const props = defineProps({
  count: {
    type: Number, // kiểu hoặc mảng chứa kiểu của prop
    required: false, // true or false
    default: 10, // giá trị mặc định khi không truyền prop
  },
  count2: {
    type: Number, // kiểu hoặc mảng chứa kiểu của prop
    required: false, // true or false
    default: 100, // giá trị mặc định khi không truyền prop
  },
});
console.log(props.count);
</script>

<template>
  <h2>Parent</h2>
  <p>{{ count }}</p>
  <p>{{ count2 }}</p>
  <child />
</template>

<style lang="scss" scoped></style>
