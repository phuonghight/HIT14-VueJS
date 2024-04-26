<script setup>
import { defineEmits, reactive, watch } from "vue";
const emits = defineEmits(["change-password-handler"]);

const password = reactive({
  currentPassword: "",
  newPassword: "",
});

function changePassword() {
  emits("change-password-handler", password);
}
</script>
<template>
  <form action="">
    <div class="form-wrap">
      <label for="password">Password</label> <br />
      <input type="password" id="password" v-model="password.currentPassword" />
      <br />
      <label for="new-password">New password </label> <br />
      <input type="password" id="new-password" v-model="password.newPassword" />
      <br />
      <ul class="password-required">
        Password required:
        <li>At least 8 characters</li>
        <li>At least 1 letter character (uppercase or lowercase)</li>
        <li>At least 1 numeric character.</li>
      </ul>
      <input type="button" value="CHANGE" @click.prevent="changePassword" />
    </div>
  </form>
</template>
