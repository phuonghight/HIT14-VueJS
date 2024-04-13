<script setup>
import { computed, onMounted, reactive, ref, watch, watchEffect } from 'vue';
import Blog from './components/Blog.vue';
import BlogForm from './components/BlogForm.vue';
import MyBlog from './components/MyBlog.vue';

// const inputRef = ref();
// onMounted(() => {
//   console.log(inputRef);
//   inputRef.value.focus();
//   inputRef.value.value = 'Toi chua dien nhung da co';
// })

const blogTitle1 = ref("Blog 1");

function changeColorTitle(name) {
  console.log('Name: ', name);
}

const count = ref(0);
const name = ref('');
// watch(count, (newValue, oldValue) => {
//   // console.log('Old: ', oldValue);
//   // console.log('New: ', newValue);
//   console.log(count.value);
//   // console.log('Your name:', name.value);
// }, { immediate: true });

const grandParent = reactive({
  parent: {
    child: {
      name: 'Name of child'
    },
    name: 'Name of parent',
  },
  name: 'Name of grand parent'
});
watch(grandParent, () => {
  console.log('Is change?');
}, { deep: false, once: true });

// const doubleCount = computed(() => count.value * 2);
// watch(doubleCount, () => {
//   console.log(doubleCount.value);
//   count.value = 0;
// })

watchEffect(() => {
  console.log('change: ' + grandParent.parent.child.name);
  console.log('change: ' + grandParent.parent.name);
  console.log('Count: ' + count.value);
});
</script>

<template>
  <!-- <input type="text" ref="inputRef"> -->
  <!-- <blog class="abc" :title="blogTitle1" content="Lorem Blog 1" @colored-title="changeColorTitle">
    <p>abc</p>
    <h2>h2</h2>
  </blog>
  <blog title="Blog 2" content="Lorem Blog 2" @colored-title="changeColorTitle" />
  <blog title="Blog 3" content="Lorem Blog 3" @abc="() => { console.log('abc') }" />
  <blog-form @my-submit="(content) => { console.log(content) }" /> -->
  <h1>{{ count }}</h1>
  <button @click="count++">Increase count</button>
  <input type="text" placeholder="your name" v-model="name">
  <button @click="grandParent.parent.name = 'Canh'">Change parent name</button>
  <button @click="grandParent.parent.child.name = 'Canh'">Change child name</button>
</template>

<style scoped>
input:focus {
  outline-color: red;
}
</style>
