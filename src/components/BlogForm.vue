<script setup>
import { ref, defineEmits } from 'vue';

const emits = defineEmits(['mySubmit'])
const content = ref();

function submitBlogHandler() {
    emits('mySubmit', content.value);
}
</script>

<template>
    <form @submit.prevent="submitBlogHandler">
        <input type="text" placeholder="type your blog" v-model="content">
        <button>Post your blog</button>
    </form>
</template>

<style scoped></style>
