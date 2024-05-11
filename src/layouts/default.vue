<script setup>
import { onBeforeMount, ref } from "vue";
import Header from "../components/Header.vue";
import { useProfileStore } from "../stores/user";

const profileStore = useProfileStore();
const isLoggedIn = ref(false);
onBeforeMount(() => {
  isLoggedIn.value = localStorage.getItem("is-logged-in");
  console.log(isLoggedIn.value);
});
</script>
<template>
  <div>
    <Header />
    <div class="container">
      <div class="wrapper">
        <router-view @login-success="isLoggedIn = true" />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  max-width: 1220px;
  height: 100vh;
  margin: 0 auto;
  .wrapper {
    margin: 0 20px;
  }
}
</style>
