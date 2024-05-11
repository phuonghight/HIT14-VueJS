<script setup>
import { reactive, ref, watch } from "vue";
import { $api } from "../api/index.js";

const newAccount = reactive({
  fullName: "",
  email: "",
  password: "",
});

const errorRegister = reactive({
  fullName: {
    error: false,
    errorMsg: "",
  },
  email: {
    error: false,
    errorMsg: "",
  },
  password: {
    error: false,
    errorMsg: "",
  },
});

const registerSuccessful = ref(false);
const registerFail = ref(false);

async function registerHandler() {
  try {
    const res = await $api.post("auth/register", newAccount);
    console.log(res);
    registerSuccessful.value = true;
  } catch (error) {
    console.log(error);
  }
}

const passwordRequired = reactive({
  "least-8-chars": false,
  "least-1-letter": false,
  "least-1-numberic": false,
});

const successValid = ref(false);
watch(newAccount, () => {
  const regexLetter = /[A-Za-z]+/;
  const regexNumber = /^(?=.*\d).+$/;

  if (newAccount.password.length >= 8) {
    passwordRequired["least-8-chars"] = true;
    successValid.value = true;
  } else {
    passwordRequired["least-8-chars"] = false;
  }

  if (regexLetter.test(newAccount.password)) {
    passwordRequired["least-1-letter"] = true;
    successValid.value = true;
  } else {
    passwordRequired["least-1-letter"] = false;
  }

  if (regexNumber.test(newAccount.password)) {
    passwordRequired["least-1-numberic"] = true;
    successValid.value = true;
  } else {
    passwordRequired["least-1-numberic"] = false;
  }
});

const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
function registerValidationHandler() {
  registerSuccessful.value = "";
  if (newAccount.fullName === "")
    errorRegister.fullName.errorMsg = "Đừng để tớ bị trống!";
  else {
    errorRegister.fullName.errorMsg = "";
    successValid.value = true;
  }

  if (newAccount.email === "")
    errorRegister.email.errorMsg = "Đừng để tớ bị trống!";
  else if (!regex.test(newAccount.email))
    errorRegister.email.errorMsg = "Sai định dạng email rồi cậu ơi!";
  else {
    errorRegister.email.errorMsg = "";
    successValid.value = true;
  }

  registerHandler();
}
</script>
<template>
  <div class="form-wrap">
    <form action="">
      <h1>Register</h1>
      <label for="name">Full name</label> <br />
      <input
        id="name"
        placeholder="Enter your full name"
        v-model="newAccount.fullName"
        required
        @blur="registerErrorHandler"
      />
      <br />
      <p class="form-error">
        {{ errorRegister.fullName.errorMsg }}
      </p>
      <label for="email">Email</label> <br />
      <input
        id="email"
        placeholder="Enter your email"
        v-model="newAccount.email"
        required
      />
      <br />
      <label for="password">Password</label> <br />
      <input
        type="password"
        placeholder="Enter password"
        v-model="newAccount.password"
        id="password"
        required
      />
      <br />
      <p v-if="errorRegister.password.error" class="form-error">
        {{ errorRegister.password.errorMsg }}
      </p>
      <ul class="password-required">
        Password required:
        <li :class="{ done: passwordRequired['least-8-chars'] }">
          At least 8 characters
        </li>
        <li :class="{ done: passwordRequired['least-1-letter'] }">
          At least 1 letter character (uppercase or lowercase)
        </li>
        <li :class="{ done: passwordRequired['least-1-numberic'] }">
          At least 1 numeric character.
        </li>
      </ul>
      <p v-if="registerSuccessful" class="register-succesful">
        Register Succesful!
      </p>
      <p class="form-feature">
        <router-link to="Login">Have an account?</router-link>
      </p>
      <button @click.prevent="registerValidationHandler()">REGISTER</button>
    </form>
  </div>
</template>
<style scoped lang="scss">
$primary-color: #496989;
$second-color: #58a399;
$third-color: #a8cd9f;
$fourth-color: #e2f4c5;

.form-wrap {
  .done {
    color: $fourth-color;
  }
  .register-succesful {
    color: $third-color;
    text-align: center;
  }
}
</style>
