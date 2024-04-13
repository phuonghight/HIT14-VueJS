# Lession 05

## I. Watchers

### 1. `watch()`

Params:

- Source: a reactive state or a getter function.
- Callback: any function.
- Options?: a object (deep, immediate, once)

The `callback` function will be executed when `source` be changes.

```js
const count = ref(0);
watch(count, () => {
  console.log('Count is change: ', count.value);
});
```

### 2. `watchEffect()`

Params:

- Callback: any function.

The `callback` function will be executed immediate and whenever a reactive state inside it changes.

```js
const count = ref(0);
watchEffect(() => {
  console.log('Count is change: ', count.value);
});
```

## II. Template Refs

When need direct access to the DOM elements, can use the special ref attribute.
It allows us to obtain a direct reference to a specific DOM element or child component instance after it's mounted.

### 1. Accessing the Refs

```vue
<script setup>
import { ref, onMounted } from 'vue';

const h1Ref = ref(null);
onMounted(() => {
  console.log(h1Ref.value.textContent);
});
</script>

<template>
  <h1 ref="h1Ref">This is text content of h1 tag</h1>
</template>
```

### 2. Refs in `v-for`

```vue
<script setup>
import { ref, onMounted } from 'vue';
const list = ref([]);
const itemRefs = ref([]);
onMounted(() => console.log(itemRefs.value));
</script>

<template>
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
</template>
```

## III. Component Basics

![](https://vuejs.org/assets/components.B1JZbf0_.png)

### 1. Defining a Component

A component is usually a single `.vue` file (SFC).
Use `PascalCase` to name for file.

### 2. Using a Component

```js
import ButtonCounter from './ButtonCounter.vue';
```

```html
<!-- use PascalCase -->
<ButtonCounter></ButtonCounter>

<!-- use kebab-case -->
<button-counter></button-counter>
```

### 3. Props

Example of `Blog.vue`:

```vue
<script setup>
import { defineProps } from 'vue';
defineProps(['title', 'content']);
</script>

<template>
  <h1>{{ title }}</h1>
  <p>{{ content }}</p>
</template>
```

Whenever need to use Blog component:

```html
<Blog
  title="Why Vue is so fun"
  content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque sit eligendi laboriosam quasi enim commodi voluptatem optio iusto ducimus esse."
/>
```

### 4. Events

We can pass a event from parent into component through `defineEmits()`

```vue
<script setup>
import { defineProps } from 'vue';
defineProps(['title', 'content', 'titleColor']);
const emits = defineEmits(['colored-title']);
</script>

<template>
  <h1 :style="{ color: titleColor }">{{ title }}</h1>
  <p>{{ content }}</p>
  <button @click="emits('colored-title')">Change color of title</button>
</template>
```

In parent, declare a funtion which can be excuted in child component:

```vue
<script setup>
import Blog from './Blog.vue';
const titleColor = 'black';
</script>

<template>
  <Blog
    title="Why Vue is so fun"
    content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque sit eligendi laboriosam quasi enim commodi voluptatem optio iusto ducimus esse."
    :title-color="titleColor"
    @colored-title="titleColor = 'red'"
  />
</template>
```

### 5. Slot

![](https://vuejs.org/assets/slots.CKcE8XYd.png)

```html
<FancyButton>
  <!-- slot content -->
  Click me!
</FancyButton>
```

```html
<button class="fancy-btn">
  <!-- slot outlet -->
  <slot></slot>
</button>
```
