<script setup>
import { $api } from './api'
import { onBeforeMount, reactive } from 'vue';

const account = reactive({
  email: 'tiendungk18a1@gmail.com',
  password: 'ntd120204'
});
const user = reactive({});
onBeforeMount(async () => {
  try {
    const res = await $api.get('user/me');
    Object.assign(user, res.data.data);
  } catch (error) { }
})

async function loginHandler() {
  try {
    const res = await $api.post('auth/login', account);
    console.log(res.data);
    localStorage.setItem('hit14-vuejs:access-token', res.data.data.accessToken)

    const userRes = await $api.get('user/me');
    Object.assign(user, userRes.data.data);
  } catch (error) {

  }
}
</script>

<template>
  <form action="" @submit.prevent="loginHandler">
    <input type="text" placeholder="Email" v-model="account.email">
    <input type="text" placeholder="Password" v-model="account.password">
    <button>Login</button>
  </form>
  <div>
    <img :src="user.avatar" alt="" width="200px">
    <h1>Full name: {{ user?.fullName }}</h1>
    <p>Email: {{ user?.email }}</p>
  </div>
</template>

<style scoped></style>
