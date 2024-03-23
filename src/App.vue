<script setup>
import { computed, ref } from "vue";

const awesome = ref(false);
const amzing = ref(true);

const items = ref([{ message: "Foo" }, { message: "Bar" }]);

const student = {
  name: "Phuong",
  age: 20,
};

const arr = ref([9, 2, 3, 4, 6, 2, 10, 3]);
const arrSorted = computed(() => [...arr.value].sort((a, b) => a - b));

const message = ref();
const checked = ref("Yes");
const checkedNames = ref([]);
const gender = ref("female");
const selected = ref([]);

const aJson = JSON.stringify(student);
console.log(aJson);
console.log(JSON.parse(aJson));

fetch("http://localhost:3000/~")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
</script>

<template>
  <h1 v-if="awesome">Vue is awesome! (v-if)</h1>
  <h1 v-else-if="amzing">Vue is amzing!</h1>
  <h1 v-else>Oh no 😢</h1>

  <!-- List Rendering -->
  <!-- <ul>
    <li v-for="(item, index) in items" :key="index">
      <p>Item {{ index }}</p>
      <div>
        <p>{{ item.message }}</p>
      </div>
    </li>
  </ul>

  <div class="student" v-for="(value, key, index) in student" :key="key">
    {{ index }} - {{ key }}: {{ value }}
  </div> -->
  <!-- <span v-for="(number, index) in arr" :key="index"> {{ number }}, </span>
  <br />
  <span v-for="(number, index) in arrSorted" :key="index">{{ number }}, </span>
  <br />
  <button @click="arr.push(~~(Math.random() * 10))">push</button> -->

  <form
    @submit.prevent="
      () => {
        console.log(message);
      }
    "
  >
    <p>Message is: {{ message }}</p>
    <input v-model.lazy.trim="message" placeholder="edit me" />
    <button>show</button>
  </form>

  <!-- <input
    type="checkbox"
    id="checkbox"
    true-value="Yes"
    false-value="No"
    v-model="checked"
  />
  <label for="checkbox">{{ checked }}</label> -->

  <!-- <div>Checked names: {{ checkedNames }}</div>

  <input type="checkbox" id="thao" value="thao" v-model="checkedNames" />
  <label for="thao">Thao</label>

  <input type="checkbox" id="canh" value="canh" v-model="checkedNames" />
  <label for="canh">Canh</label>

  <input type="checkbox" id="khang" value="khang" v-model="checkedNames" />
  <label for="khang">Khang</label>

  <input type="checkbox" id="dung" value="dung" v-model="checkedNames" />
  <label for="dung">Dung</label> -->

  <!-- <div>Gender: {{ gender }}</div>

  <input type="radio" id="female" value="female" v-model="gender" />
  <label for="female">Female</label>

  <input type="radio" id="male" value="women☕" v-model="gender" />
  <label for="male">Male</label> -->

  <div>Selected: {{ selected }}</div>

  <select v-model="selected">
    <option disabled value="">Please select one</option>
    <option value="A">England</option>
    <option value="B">USA</option>
    <option value="C">China</option>
  </select>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
