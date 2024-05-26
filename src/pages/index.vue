<script setup>
import { useNotification } from '../composables/useNotification';

const notification = useNotification();
function createSuccess() {
  notification.success({
    header: 'What is say?',
    content: 'I dont know',
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
      })
    "
  >
    Create a error notification</button
  ><button @click="notification.warning()">
    Create a warning notification
  </button>
</template>

<style scoped></style>
