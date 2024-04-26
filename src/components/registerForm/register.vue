<script setup>
import "../registerForm/register.scss";
import { reactive, ref, defineEmits, watch } from "vue";

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

const emits = defineEmits(["register-handler", "switch-login"]);

function registerHandler() {
  emits("register-handler", newAccount, errorRegister, registerSuccessful);
}

function switchLogin() {
  emits("switch-login");
}

const passwordRequired = reactive({
  "least-8-chars": false,
  "least-1-letter": false,
  "least-1-numberic": false,
});

watch(newAccount, () => {
  const regexLetter = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
  const regexNumber = /^(?=.*\d).+$/;

  if (newAccount.password.length >= 8) passwordRequired["least-8-chars"] = true;
  else passwordRequired["least-8-chars"] = false;

  if (regexLetter.test(newAccount.password))
    passwordRequired["least-1-letter"] = true;
  else passwordRequired["least-1-letter"] = false;

  if (regexNumber.test(newAccount.password))
    passwordRequired["least-1-numberic"] = true;
  else passwordRequired["least-1-numberic"] = false;
});
</script>
<template>
  <form action="">
    <div class="form-wrap">
      <label for="name">Full name</label> <br />
      <input
        id="name"
        placeholder="Enter your full name"
        v-model="newAccount.fullName"
        required
        @blur="registerErrorHandler"
      />
      <br />
      <p v-if="errorRegister.fullName.error" class="form-error">
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
      <p v-if="errorRegister.email.error" class="form-error">
        {{ errorRegister.email.errorMsg }}
      </p>
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
      <p class="form-feature" @click="switchLogin">Have an account?</p>
      <input type="button" value="REGISTER" @click.prevent="registerHandler" />
    </div>
  </form>
</template>
<style></style>
