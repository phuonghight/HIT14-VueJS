import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useCounterSetupStore = defineStore('counter.setup', () => {
  const count = ref(0);
  const name = ref('');

  const quaraCount = computed(() => count.value * 4);

  function $reset() {
    count.value = 0;
    name.value = '';
  }
  function increament() {
    count.value++;
  }

  return { count, name, quaraCount, $reset, increament };
});
