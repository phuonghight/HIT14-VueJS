<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useProfileStore } from "../stores/user";
import { onClickOutside } from "@vueuse/core";

const target = ref(null);
onClickOutside(target, (event) => {
  console.log(event);
  isLogout.value = false;
});

const router = useRouter();
const profileStore = useProfileStore();
const isLogout = ref(false);

function toProfile() {
  isLogout.value = !isLogout.value;
  router.push({
    name: "Profile",
    params: { user: profileStore.infor.fullName },
  });
}
function logOut() {
  isLogout.value = !isLogout.value;
  profileStore.isLoggedIn = false;
  profileStore.isLoggedIn = false;
  localStorage.removeItem("hit14-vuejs:access-token");
  localStorage.removeItem("is-logged-in");
  router.push({ name: "Home" });
}
</script>
<template>
  <div class="nav">
    <div class="home">
      <router-link to="/">Home</router-link>
    </div>
    <div v-if="!profileStore.isLoggedIn" class="before-login">
      <button @click="router.push('Login')" class="btn--login">LOGIN</button>
      <button @click="router.push('Register')" class="btn--register">
        REGISTER
      </button>
    </div>
    <div v-if="profileStore.isLoggedIn" class="after-login" ref="target">
      <div @click="isLogout = !isLogout" class="avatar">
        <img :src="profileStore.infor.avatar" alt="" />
      </div>
      <div v-if="isLogout" class="after-login-wrap">
        <div class="after-login-features" @click="toProfile()">Profile</div>
        <div @click="logOut()" class="after-login-features">Log out</div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
$primary-color: #496989;
$second-color: #58a399;
$third-color: #a8cd9f;
$fourth-color: #e2f4c5;
$font-text: "Kanit", sans-serif;

.nav {
  background-color: #496989;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  position: fixed;
  right: 0;
  left: 0;
  .home {
    font-size: 32px;
    font-weight: bold;
    a {
      text-decoration: none;
      color: $fourth-color;
    }
  }
  button {
    margin: 0 16px;
  }

  .after-login {
    position: relative;
    cursor: pointer;
    .avatar {
      width: 50px;
      height: 50px;
      img {
        width: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    .after-login-wrap {
      position: absolute;
      width: 150px;
      background-color: #58a399;
      color: #e2f4c5;
      bottom: -195%;
      right: 0;
      text-align: center;
    }
    .after-login-features {
      border: 1px solid;
      padding: 8px 0;
    }
  }
}
</style>
