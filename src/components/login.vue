<script setup>
import { reactive, ref, defineEmits } from "vue";
import { $api } from "../api/index.js";
import { useRouter } from "vue-router";
import { useProfileStore } from "../stores/user.js";

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

const profileStore = useProfileStore();
const router = useRouter();
const userInfor = reactive({});
async function loginHandler() {
  try {
    const res = await $api.post("auth/login", account);
    console.log(res.data);
    localStorage.setItem("hit14-vuejs:access-token", res.data.data.accessToken);

    const userRes = await $api.get("user/me");
    Object.assign(userInfor, userRes.data.data);
    console.log(userInfor);

    profileStore.infor = userInfor;
    profileStore.isLoggedIn = true;
    localStorage.setItem("is-logged-in", profileStore.isLoggedIn);

    router.push({ name: "Profile", params: { user: userInfor.fullName } });
  } catch (error) {
    console.log(error);
  }
}

const successValid = ref(false);
const text = ref("Hello");
const emits = defineEmits("login-success");
function loginSuccess() {
  emits("login-success");
}

const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
function loginValidationHandler() {
  if (account.email === "") errorLogin.email.errorMsg = "Đừng để tớ bị trống!";
  else if (!regex.test(account.email))
    errorLogin.email.errorMsg = "Sai định dạng email rồi cậu ơi!";
  else {
    errorLogin.email.errorMsg = "";
    successValid.value = true;
  }

  if (account.password === "")
    errorLogin.password.errorMsg = "Đừng để tớ bị trống!";
  else {
    errorLogin.password.errorMsg = "";
    successValid.value = true;
  }

  if (successValid.value) {
    loginHandler();
    loginSuccess();
  }
}
</script>
<template>
  <div class="form-wrap">
    <form action="">
      <h1>Log in</h1>
      <label for="account">Account</label> <br />
      <input type="text" id="account" v-model="account.email" required />
      <br />
      <p class="form-error">{{ errorLogin.email.errorMsg }}</p>
      <label for="password">Password</label> <br />
      <input
        type="password"
        id="password"
        v-model="account.password"
        required
      />
      <br />
      <p class="form-error">{{ errorLogin.password.errorMsg }}</p>
      <!-- <p v-if="error" class="form-error">
        Tài khoản hoặc mật khẩu bị sai mất rồi
      </p> -->
      <p class="form-feature">
        <router-link to="Register">Don't have an account?</router-link>
      </p>
      <br />
      <button @click.prevent="loginValidationHandler()">LOG IN</button>
    </form>
  </div>
</template>
<style lang="scss"></style>
