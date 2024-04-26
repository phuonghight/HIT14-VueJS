<script setup>
import "../loginForm/login.scss";
import { defineEmits, defineProps, reactive } from "vue";
const emits = defineEmits(["login-handler", "switch-register"]);

const account = reactive({
  email: "",
  password: "",
});

const errorLogin = reactive({
  email: {
    error: false,
    errorMsg: "",
  },
  password: {
    error: false,
    errorMsg: "",
  },
  errorMessage: {
    error: false,
    errorMeg: "",
  },
});

function loginHandler() {
  emits("login-handler", account, errorLogin);
}

function switchRegister() {
  emits("switch-register");
}
</script>
<template>
  <form action="">
    <div class="form-wrap">
      <label for="account">Account</label> <br />
      <input type="text" id="account" v-model="account.email" /> <br />
      <p v-if="errorLogin.email.error" class="form-error">
        {{ errorLogin.email.errorMsg }}
      </p>
      <label for="password">Password</label> <br />
      <input type="password" id="password" v-model="account.password" /> <br />
      <p v-if="errorLogin.password.error" class="form-error">
        {{ errorLogin.password.errorMsg }}
      </p>
      <p v-if="errorLogin.errorMessage.error" class="form-error">
        {{ errorLogin.errorMessage.errorMsg }}
      </p>
      <p class="form-feature" @click="switchRegister">Don't have an account?</p>
      <input type="button" @click="loginHandler" value="Log in" />
    </div>
  </form>
</template>
<style></style>
