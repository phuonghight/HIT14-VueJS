<script setup>

// import HelloWorld from './components/HelloWorld.vue'
import {reactive, ref, computed} from 'vue';

const count = ref(0);
const increase = () => {
  count.value += 1;
}

const isDarkMode = ref(false);

const user = reactive({
  name: "Khang",
  age: '19'
}) 
Object.assign(user, {height: 1.5});

const increaseAge = () => {
  user.age++;
}

const msg = "Hello VueJS";
const h1Class = "h1";
const url = "youtube.com";
const classOrId = "class";
function onSubmit() {
  alert('Hello VueJS');
}

const isEven = computed(() => {
  isDarkMode.value = false;
  return count.value % 2 === 0;
})

let arr = ref([1,2,3]);

const total = computed(() => {
  return arr.value.reduce((pre, cur) => pre + cur, 0);
});

const addArr = () => {
  let num = ~~(Math.random()*10);
  arr.value.push(num);
  console.log(arr);
}

const removeArr = () => {
  let num = Math.random() * 10;
  num = Math.round(num)
  arr.value.slice(arr.value.length, 1);
  console.log(arr);
}

// Class and Style Binding
const active = ref(false);
// const objClass = reactive({'is-active': active});

</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <h1 class="heading" :class="{'is-active': active}">{{ msg }}</h1>
  <!-- <h1 
    class="heading" 
    :class="[active ? 'is-active' : 'no-active']"
    :style="{'background-color': 'red', border: '5px solid #000'}"
  >
      {{ msg }}
  </h1> -->
  <button @click="active = !active">Active</button>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
  <p class="msg" :class="h1Class">Message: {{ msg }}</p>
  <!-- Có thể bỏ v-bind và bind id-->
  <a :href="url">{{ url }}</a>
  <h1>{{ msg.split('').reverse().join('') }}</h1>
  <input type="text" :value="`xinchao-{}`">
  <h2 :[classOrId] = "classOrId">{{ true }}</h2>
  <form @submit.prevent = "onSubmit">
    <input type="number" v-model.number="msg">
    <input type="submit">
  </form>
  <!-- v-bind cho attribute - : viết tắt -->
  <!-- v-on: bind cho sự kiện event - @ viết tắt 
  v-model là -->


  <button @click="increase">Increase</button>
  <p>Count is Even: {{ isEven }}</p>
  <h2>Count: {{ count }}</h2>

  <p>Dark Mode: {{ isDarkMode }}</p>
  <button @click="isDarkMode = !isDarkMode">{{ isDarkMode ? "Dark" : "Light" }}</button>

  <h2>{{ user.name }}</h2>
  <h3>{{ user.age }}</h3>
  <button @click="increaseAge">Increase age</button>
  <h1>{{ arr }}</h1>
  <h1>Sum: {{ total }}</h1>
    <button @click="addArr">Add arr</button>
    <button @click="removeArr">Remove arr</button>

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

h1 {
  transition: all .3s;
}

h1.is-active {
    font-size: 64px;
    transform: translateX(50px);
}
</style>
