# Lession 07: State management - 🍍 Pinia

Mục lục:

- [Lession 07: State management - 🍍 Pinia](#lession-07-state-management----pinia)
  - [I. Quản lý state và thư viện Pinia](#i-quản-lý-state-và-thư-viện-pinia)
    - [1. Quản lý state là gì?](#1-quản-lý-state-là-gì)
    - [2. 🍍 Pinia](#2--pinia)
  - [II. Các khái niệm chính](#ii-các-khái-niệm-chính)
    - [1. Định nghĩa 1 store](#1-định-nghĩa-1-store)
      - [Option](#option)
      - [Setup](#setup)
      - [Sử dụng store](#sử-dụng-store)
    - [2. State](#2-state)
      - [Reset `state`](#reset-state)
      - [Thay đổi `state`](#thay-đổi-state)
      - [Subscribing to the `state`](#subscribing-to-the-state)
    - [3. Getters](#3-getters)
      - [Truy cập vào `getters` khác](#truy-cập-vào-getters-khác)
      - [Truyền đối số cho `getters`](#truyền-đối-số-cho-getters)
      - [Truy cập vào `store` khác](#truy-cập-vào-store-khác)
    - [4. Actions](#4-actions)
  - [Câu hỏi:](#câu-hỏi)

## I. Quản lý state và thư viện Pinia

#### 1. Quản lý state là gì?

- Về mặt kỹ thuật, mỗi SFC quản lý state reactive riêng của nó. Nó là 1 vòng khép kín như sau:
  ![one-way data flow](https://vuejs.org/assets/state-flow.Cd6No79V.png)

- Tuy nhiên, chúng ta có thể có những component dùng chung 1 state:

  - Case 1: Nhiều `view` có thể phụ thuộc vào cùng 1 `state`.
  - Case 2: Các `action` từ các `view` khác nhau có thể cần làm thay đổi cùng 1 `state`.

_Giải pháp là gì?_

#### 2. 🍍 Pinia

- `Pinia` là 1 thư viện quản lý trạng thái, có thể gọi là thư viện để lưu trữ. Giống như `Vue Router`, `Pinia` là thư viện chính thức, thuộc ecosystem của Vue.
- Cài đặt:

```bash
npm i pinia
# or
yarn add pinia
```

## II. Các khái niệm chính

### 1. Định nghĩa 1 store

_Cú pháp định nghĩa 1 `store` bằng `Pinia` có 2 cách viết, hay còn gọi là: `Option Store` và `Setup Store`._

- Sử dụng `defineStore` của `Pinia` để định nghĩa 1 store.
- `defineStore` cần truyền vào 2 đối số:
  - Thứ nhất là `id` (có thể hiểu là name) của store, kiểu `string`.
  - Thứ 2 là một `Object` hoặc một `Callback` (tùy vào cách viết)

#### Option

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
```

Có thể hiểu:

- `state` chính là các `ref` hoặc `reactive`.
- `getters` chính là các hàm `computed`.
- `actions` chính là các `function`.

#### Setup

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment };
});
```

Với Setup store:

- Các `ref()` hoặc `reactive()` trở thành các thuộc tính của `state`.
- `computed()` trở thành `getters`.
- `function()` trở thành `actions`.

#### Sử dụng store

```js
import { useCounterStore } from '@/stores/counter';
// access the `store`variable anywhere in the component ✨
const counterStore = useCounterStore();
```

_Lưu ý: không nên sử dụng `Destructuring` để truy cập các state. Nó sẽ không bao giờ được update._

```js
import { useCounterStore } from '@/stores/counter';

// ❌
const { count, doubleCount } = useCounterStore();

// ✅
const counterStore = useCounterStore();
counterStore.count;
counterStore.doubleCount;
```

### 2. State

- Là trái tim của 1 store, nơi lưu trữ dữ liệu.
  Trong `Option Store`, `state` được định nghĩa là 1 hàm trả về giá trị khởi tạo.
- Truy cập vào `state`

```js
import { useCounterStore } from '@/stores/counter';
const counterStore = useCounterStore();
console.log(counterStore.count);
```

#### Reset `state`

_Chỉ hoạt động với `Option Store`_

```js
counterStore.$reset();
```

#### Thay đổi `state`

- Có 3 cách thay đổi giá trị cho `state` của 1 `store`
  a) Thay đổi trực tiếp
  b) `$patch()` method
  c) Sử dụng `actions`

#### Subscribing to the `state`

Theo dõi sự thay đổi của `state` của 1 `store`

```js
counterStore.$subscribe((mutation, state) => {
  console.log(mutation);
  console.log(state.count);
});
```

### 3. Getters

#### Truy cập vào `getters` khác

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
    doubleCountPlusOne() {
      return this.doubleCount + 1;
    },
  },
});
```

#### Truyền đối số cho `getters`

```js
export const useStore = defineStore('main', {
  getters: {
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId);
    },
  },
});
```

Sử dụng ở component:

```html
<script setup>
  import { storeToRefs } from 'pinia';
  import { useUserListStore } from './store';

  const userList = useUserListStore();
  const { getUserById } = storeToRefs(userList);
  // note you will have to use `getUserById.value` to access
  // the function within the <script setup>
</script>

<template>
  <p>User 2: {{ getUserById(2) }}</p>
</template>
```

#### Truy cập vào `store` khác

### 4. Actions

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  actions: {
    // since we rely on `this`, we cannot use an arrow function
    increment() {
      this.count++;
    },
    randomizeCounter() {
      this.count = Math.round(100 * Math.random());
    },
  },
});
```

## Câu hỏi:

1. Muốn reset `state` với `Setup Store` thì làm như nào?

2. Ngoài cách sử dụng phương thức `$subscribe()` để theo dõi sự thay đổi của `state` của 1 `store` thì còn những các nào khác không?
