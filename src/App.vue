<script setup>
import Model from "./components/Model.vue";
import Notification from "./components/Notification.vue";
import { ref } from "vue";
const showModel = ref(false);
const msgList = ref([]);

function deleteListItem() {
  setTimeout(() => {
    msgList.value.shift();
  }, 3500);
}

function addError() {
  msgList.value.push({
    icon: "error",
    msg: "Once upon a time you dressed so fine",
  });
  deleteListItem();
}

function addWarning() {
  msgList.value.push({
    icon: "warning",
    msg: "How many roads must a man walk down",
  });
  deleteListItem();
}

function addSuccess() {
  msgList.value.push({
    icon: "success",
    msg: "Cause you walked hand in hand With another man in my place",
  });
  deleteListItem();
}
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <div class="button">
    <button @click="showModel = true">Show Model</button>
    <button @click="addError">Error</button>
    <button @click="addWarning">Warning</button>
    <button @click="addSuccess">Success</button>
  </div>
  <Model v-model="showModel"
    >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis ut
    tenetur quidem est animi dolores magni explicabo? Quos, mollitia! Dicta
    tempora laboriosam aperiam vero ab at neque inventore beatae sunt!</Model
  >
  <Notification v-model:messageList="msgList" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
button {
  border-radius: 5px;
  padding: 6px 12px;
  cursor: pointer;
  margin: 0 12px;
}
button:hover {
  opacity: 0.7;
}
</style>
