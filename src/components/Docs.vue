<script setup>
import { onBeforeMount, ref } from 'vue';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  }
});
const result = ref('');

onBeforeMount(async () => {
  try {
    const res = await fetch('../README.md');
    const data = await res.text();

    result.value = md.render(data);
  } catch (error) {}
});
</script>

<template>
  <div v-html="result"></div>
</template>

<style lang="scss" scoped></style>
