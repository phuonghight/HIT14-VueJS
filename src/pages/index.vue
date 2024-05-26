<script setup>
import { useNotification } from '../composables/useNotification';

const notification = useNotification();
function createSuccess() {
  notification.success({
    header: 'What is say?',
    content: 'I dont know',
    duration: 2000,
    keepAliveOnHover: true,
  });
}
</script>

<template>
  <button @click="createSuccess">Create a success notification</button>
  <button
    @click="
      notification.error({
        header: 'What is say?',
        content: 'I dont know, i dont know\nAbc\nDef',
        duration: 3000,
      })
    "
  >
    Create a error notification</button
  ><button
    @click="
      notification.warning({
        header: 'What is say?',
        content: 'I dont know, i dont know\nAbc',
      })
    "
  >
    Create a warning notification
  </button>
</template>

<style scoped></style>
