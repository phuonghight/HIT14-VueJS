<script setup>
import { ref, reactive, computed } from "vue";

const msg = "Hellow World!";
const h1Class = "h111111111111111";
const url = "https://fb.com";
function abc() {
  return 1;
}
const classOrId = "id";

const onSubmit = () => {
  alert("Submit form");
};

const count = ref(0);
const increase = () => {
  count.value += 1;
  console.log(count);
  console.log(count.value);
};

const isDarkMode = ref(false);

const userReative = reactive({
  name: "",
  age: 0,
});
Object.assign(userReative, { name: "Phuong", height: 1.73 });

// const userRef = ref({
//   name: "Phuong",
//   age: 21,
// });

// userRef.value = {};

const isEven = computed(() => {
  console.log("Recomputed");
  return count.value % 2 === 0;
});

const arr = ref([1, 2, 3, 4, 5, 6]);
const pushARandomNumber = () => {
  arr.value.push(~~(Math.random() * 10));
};
const total = computed(() => {
  return arr.value.reduce((pre, cur) => pre + cur, 0);
});

total.value = 26;
console.log(total.value);

// Class and Style Binding
const active = ref(false);
const color = ref("red");
const objClass = reactive({ "is-active": active, isisisActive: active });
const styleObj = reactive({ "font-size": "12px", color: "orange" });
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <h1
      class="h1"
      :class="{ 'is-active': active, isisisActive: active }"
      :style="{ 'font-size': total + 'px', color: 'orange' }"
    >
      {{ msg }}
    </h1>
    <!-- <h1 class="h1" :class="[active ? 'is-active' : 'no-active']">
      {{ msg }}
    </h1> -->
    <button @click="active = !active">Active</button>
    <!-- <a :href="url" target="_blank">{{ url }}</a>
    <h2 :[classOrId]="classOrId">{{ true }}</h2> -->

    <!-- <form @submit.prevent="onSubmit">
      <input type="number" />
      <button>Submit</button>
    </form> -->

    <!-- <h2>Count: {{ count }}</h2>
    <p>Count is Even: {{ isEven }}</p>
    <button @click="increase">increase</button>

    <p>Dark Mode: {{ isDarkMode }}</p>
    <button @click="isDarkMode = !isDarkMode">
      {{ isDarkMode ? "Light" : "Dark" }}
    </button> -->

    <!-- <h1>Name: {{ userReative }}</h1> -->
    <!-- <h1>Name: {{ user.name }}</h1>
    <h2>Age: {{ user.age }}</h2> -->

    <h2>{{ arr }}</h2>
    <p>Total of array: {{ total }}</p>
    <button @click="pushARandomNumber">Push a random number</button>
  </div>
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

.h1.is-active {
  color: pink;
}
</style>
