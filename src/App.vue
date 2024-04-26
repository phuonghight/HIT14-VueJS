<script setup>
import "../src/App.scss";
import { $api } from "./api";
import { ref, reactive, onBeforeMount } from "vue";
import loginForm from "./components/loginForm/login.vue";
import registerForm from "./components/registerForm/register.vue";
import profileForm from "./components/profileForm/profile.vue";
import changPasswordForm from "./components/changePasswordForm/changPassword.vue";

const user = reactive({});

const isLogin = ref(true);
const isLogout = ref(false);
const loginSuccess = ref(false);

onBeforeMount(async () => {
  try {
    const res = await $api.get("user/me");
    Object.assign(user, res.data.data);
    loginSuccess.value = true;
  } catch {}
});

async function loginHandler(account, errorLogin) {
  try {
    const res = await $api.post("auth/login", account);
    console.log(res.data);
    if (res.data.status === "SUCCESS") {
      loginSuccess.value = true;
    }
    localStorage.setItem("hit14-vuejs:access-token", res.data.data.accessToken);

    const userRes = await $api.get("user/me");
    Object.assign(user, userRes.data.data);
    console.log(user);
  } catch (error) {
    console.log(error);

    if (!error.response.data.message.email) {
      errorLogin.errorMessage.error = true;
      errorLogin.errorMessage.errorMsg = error.response.data.message;

      errorLogin.email.error = false;
      errorLogin.password.error = false;
    } else {
      errorLogin.email.error = true;
      errorLogin.email.errorMsg = error.response.data.message.email;

      errorLogin.password.error = true;
      errorLogin.password.errorMsg = error.response.data.message.password;
    }
  }
}

async function registerHandler(newAccount, errorRegister, registerSuccessful) {
  try {
    const res = await $api.post("auth/register", newAccount);
    console.log(res);
    errorRegister.fullName.error = false;
    errorRegister.email.error = false;
    errorRegister.password.error = false;
    registerSuccessful.value = true;
    console.log(registerSuccessful.value);
  } catch (error) {
    console.log(error);
    errorRegister.fullName.error = true;
    errorRegister.fullName.errorMsg = error.response.data.message.fullName;

    errorRegister.email.error = true;
    if (
      error.response.data.message ===
      `User with ${newAccount.email} is already exist`
    ) {
      errorRegister.email.errorMsg = error.response.data.message;
    } else errorRegister.email.errorMsg = error.response.data.message.email;

    errorRegister.password.error = true;
    errorRegister.password.errorMsg = error.response.data.message.password;
  }
}

async function changePassword(password) {
  try {
    const res = await $api.post("/user/change-password", password);
    console.log(res);
    console.log(password);
  } catch (error) {
    console.log(error);
  }
}

function logOut() {
  localStorage.removeItem("hit14-vuejs:access-token");
  loginSuccess.value = !loginSuccess.value;
  changePasswordForm.value = false;
  isLogout.value = !isLogout.value;
}

function switchLogin() {
  isLogin.value = true;
}

function switchRegister() {
  isLogin.value = false;
}

const changePasswordForm = ref(false);
</script>

<template>
  <div>
    <!-- Nav bar -->
    <div class="nav">
      <div v-if="!loginSuccess" class="before-login">
        <button @click="isLogin = true" class="btn--login">LOGIN</button>
        <button @click="isLogin = false" class="btn--register">REGISTER</button>
      </div>
      <div v-if="loginSuccess" class="after-login">
        <div @click="isLogout = !isLogout" class="avatar">
          <img :src="user.avatar" alt="" />
        </div>
        <div v-if="isLogout" class="after-login-wrap">
          <div @click="changePasswordForm = false" class="after-login-features">
            Profile
          </div>
          <div @click="changePasswordForm = true" class="after-login-features">
            Change password
          </div>
          <div @click="logOut" class="after-login-features">Log out</div>
        </div>
      </div>
    </div>
    <div class="content">
      <loginForm
        v-if="isLogin && !loginSuccess"
        @login-handler="loginHandler"
        @switch-register="switchRegister"
        class="login-form"
      >
      </loginForm>
      <registerForm
        v-if="!isLogin && !loginSuccess"
        @register-handler="registerHandler"
        @switch-login="switchLogin"
        class="register-form"
      />
      <profileForm
        v-if="loginSuccess && !changePasswordForm"
        :fullName="user.fullName"
        :email="user.email"
        :avatar="user.avatar"
        :createdDate="user.createdDate"
      />
      <changPasswordForm
        v-if="changePasswordForm"
        @change-password-handler="changePassword"
      />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
