<script setup>
import { $api } from "./api/index";
import { useProfileStore } from "./stores/user";
import { onBeforeMount, reactive } from "vue";

const profileStore = useProfileStore();
const user = reactive({});
onBeforeMount(async () => {
  try {
    const res = await $api.get("user/me");
    Object.assign(user, res.data.data);
    profileStore.infor = user;
    profileStore.isLoggedIn = true;
    console.log(user);
  } catch (error) {
    console.log(error);
  }
});
</script>
<template>
  <router-view />
</template>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

$primary-color: #496989;
$second-color: #58a399;
$third-color: #a8cd9f;
$fourth-color: #e2f4c5;
$font-text: "Kanit", sans-serif;

* {
  font-family: $font-text;
}

.register-form {
  position: relative;
}

.form-wrap {
  background-color: $primary-color;
  width: 500px;
  border-radius: 30px;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    width: 85%;

    label {
      color: $third-color;
    }
    input {
      width: 92%;
      padding: 8px 16px;
      margin-bottom: 12px;
    }
    button {
      width: 100%;
    }

    .form-error {
      color: rgb(255, 91, 91);
      margin: 0 0px 12px 0;
    }
    .form-feature {
      cursor: pointer;
      display: inline-block;
      margin: 0 0 10px 0;
      a {
        color: #000;
        text-decoration: none;
        &:hover {
          color: $fourth-color;
        }
      }
    }
  }
}
</style>
