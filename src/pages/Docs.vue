<script setup>
import { onBeforeMount, ref } from 'vue';
import { useCounterOptionStore } from '../stores/counter.otiopn';

const counterOptionStore = useCounterOptionStore();

const html = ref('');
onBeforeMount(async () => {
  try {
    const htmlRes = await fetch('/README.html');
    const htmlData = await htmlRes.text();
    html.value = htmlData;
  } catch (error) {}
});
</script>

<template>
  <h2>In Child: {{ counterOptionStore.count }}</h2>
  <button @click="counterOptionStore.count = counterOptionStore.count * 2">Thay doi o Docs</button>

  <div
    class="docs"
    v-html="html"
  ></div>
</template>

<style lang="scss" scoped>
.docs {
  width: 60%;
  margin: 0 auto;
}

@media screen and (max-width: 680px) {
  .docs {
    width: 90%;
    font-size: 80%;
  }
}
</style>
