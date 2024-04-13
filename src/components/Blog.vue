<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps(['title', 'content', 'func']);
const emits = defineEmits(['colored-title', 'abc']);
const titleRef = ref(null);

function changeColor() {
    // titleRef.value.style.color = 'pink';
    emits('colored-title', 'Phuong');
}
</script>

<template>
    <div class="blog-component">
        <h1 ref="titleRef" @click="emits('abc')">{{ props.title }}</h1>

        <button @click="title = 'Khang'">Change tilte in Child</button>
        <p>{{ content }}</p>
        <button @click="changeColor">Change color of title</button>
        <slot></slot>
        <hr>
    </div>
</template>

<style scoped>
.blog-component h1 {
    color: rgb(0, 255, 0);
}
</style>
