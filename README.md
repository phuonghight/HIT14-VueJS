# Lession 06: Vue Router

Mục Lục:

- [Lession 06: Vue Router](#lession-06-vue-router)
  - [I. Routeing và Vue Router](#i-routeing-và-vue-router)
    - [1. Routing](#1-routing)
    - [2. Vue Router](#2-vue-router)
  - [II. Getting started: Bắt đầu với Vue Router](#ii-getting-started-bắt-đầu-với-vue-router)
    - [1. Config: Dùng mỗi SFC làm instance cho mỗi page](#1-config-dùng-mỗi-sfc-làm-instance-cho-mỗi-page)
    - [2. Cách điều hướng](#2-cách-điều-hướng)
    - [3. Nơi hiển thị sau khi điều hướng](#3-nơi-hiển-thị-sau-khi-điều-hướng)
  - [III. Các yếu tố quan trọng](#iii-các-yếu-tố-quan-trọng)
    - [1. Dynamic route matching: tạo bộ định tuyến động](#1-dynamic-route-matching-tạo-bộ-định-tuyến-động)
    - [2. Named Routes: Đặt tên cho các route](#2-named-routes-đặt-tên-cho-các-route)
    - [3. Nested Routes: page in page](#3-nested-routes-page-in-page)
    - [4. Route Meta Fields](#4-route-meta-fields)
    - [5. Navigation Guards: Bảo vệ điều hướng?](#5-navigation-guards-bảo-vệ-điều-hướng)
    - [6. Programmatic Navigation: điều hướng theo hướng lập trình.](#6-programmatic-navigation-điều-hướng-theo-hướng-lập-trình)
    - [7. Active links](#7-active-links)
    - [8. Scroll Behavior: hành vi cuộn trang.](#8-scroll-behavior-hành-vi-cuộn-trang)
    - [9. Transitions (cooming soon)](#9-transitions-cooming-soon)
  - [Câu hỏi:](#câu-hỏi)

## I. Routeing và Vue Router

### 1. Routing

`Routing` là định tuyến trang web đến một trang web khác. Trình duyệt sẽ gửi request đến server dựa trên URL khi người dùng truy cập.

- Với các trang web truyền thống, khi click vào đường link, trình duyệt sẽ nhận được HTML response từ server và tải lại toàn bộ trang web.
- Với SPA, JavaScript có thể ngăn chặn việc điều hướng, tự động fetch data và update trang hiện tại mà không cần tải lại toàn bộ trang.

### 2. Vue Router

- Là thư viện định tuyến chính thức của VueJS.
- Cài đặt:

```bash
npm install vue-router@4
#or
yarn add vue-router@4
```

## II. Getting started: Bắt đầu với Vue Router

### 1. Config: Dùng mỗi SFC làm instance cho mỗi page

- Tạo một file router.js

```js
import { createRouter, createWebHistory } from 'vue-router';

import About from '@components/About.vue';
import User from '@components/User.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home'
      component: () => import('@pages/index.vue'),
    },
    {
      path: '/about',
      name: 'about'
      component: About,
    },
    {
      path: '/user',
      name: 'user'
      component: User,
    },
  ],
});
```

_Lưu ý: để sử dụng SFC làm page thì phải thêm plugin cho app._

- Ở file main.js:

```js
import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router.js'; // inport file config cho router

const app = createApp(App);
app.use(router); // thêm plugin
app.mount('#app');
```

### 2. Cách điều hướng

`Vue Router` cung cấp 2 cách điều hướng chính:

a) Sử dụng component: `RouterLink`

- Khi sử dụng `RouterLink`, Vue sẽ render thành thẻ `<a><a/>` và tạo ra một liên kết trên trang web.
- Props bắt buộc phải có của `RouterLink` là `to`, có kiểu `string` là path tới page hoặc 1 `object`.

```html
<nav>
  <router-link to="/">Go to Home</router-link>
  <router-link to="/about">Go to About</router-link>
</nav>
```

_Lưu ý: khi sử dụng `to` cho `RouterLink`, path truyền cần phải match với SFC đã được định nghĩa_

b) Sử dụng code js (Programmatic: có lập trình)

`Vue Router` cung cấp composabe để giúp điều hướng thông qua JavaScript

```js
import { useRouter } from 'vue-router';

const router = useRouter();
router.push('/');
router.push('/about');
router.push({ path: '/user' });
```

Đối số truyền vào của phương thức `push` cũng giống như prop `to` của `RouterLink` component.

### 3. Nơi hiển thị sau khi điều hướng

- `RouterView` chính là nơi để hứng component tương ứng khi người dùng điều hướng qua `RouterLink` hoặc `push()`.

- Thường sẽ config ngay ở `App.vue`:

```html
<header />
<div class="container">
  <router-view />
</div>
<footer />
```

_Sau khi điều hướng, các component tương ứng sẽ thay thế vị trí của `router-view`_

## III. Các yếu tố quan trọng

### 1. Dynamic route matching: tạo bộ định tuyến động

Điều này cho phép chỉ cần 1 SFC có thể làm instance cho nhiều page. Các page như thế thường có đặc điểm chung về giao diện và khác nhau về dữ liệu. `Vue Router` sử dụng 1 cái bộ phận động trong `path`, gọi là `param`:

```js
const routes = [{ path: '/users/:id', component: User }];
```

Khi truy cập vào các URL như `/users/1`, `/users/2`,... thì tất cả đều match tới `User` component và page sẽ có `param` `id` sẽ tương ứng là `1`, `2`,...

_Làm sao để điều hướng đến một dynamic route?_

a) Sử dụng component `RouterLink`

- Cách cùi bắp:

```html
<router-link to="/users/1">User 1</router-link>
<router-link to="/users/2">User 2</router-link>
```

- Cách hay sử dụng:

```js
const userId = '1';
```

```html
<router-link :to="{ path: '/users', params: { id: userId } }">
  User {{ userId }}
</router-link>
```

b) Sử dụng JS:

```js
const userId = '1';
// cách cùi bắp 1
router.push(`/users/${userId}`);
// cách cùi bắp 2
router.push({ path: '/users', params: { id: userId } });
```

Có thể có _multiple params_, ví dụ

```js
const routes = [
  { path: '/users/:username', component: User },
  { path: '/users/:username/post/:postId', component: UserPost },
];
```

Ở component, muốn lấy ra các params, sử dụng composable `useRoute()`

```js
import { watch } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
consle.log(route.params);
```

Catch all / 404 Not found Route

```js
const routes = [
  // will match everything and put it under `route.params.pathMatch`
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  // will match anything starting with `/user-` and put it under `route.params.afterUser`
  { path: '/user-:afterUser(.*)', component: UserGeneric },
];
```

### 2. Named Routes: Đặt tên cho các route

```js
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/user/:id',
    name: 'profile',
    component: User,
  },
];
```

Khi config route, nếu thêm thuộc tính `name` cho route, khi điều hướng thay vì dùng `path`, chúng ta có thể dùng `name`.

```html
<router-link :to="{ name: 'login' }"> Login </router-link>
<router-link :to="{ name: 'profile', params: { id: 1 } }">
  User profile
</router-link>
```

### 3. Nested Routes: page in page

```
/user/1/profile                   /user/1/posts
┌──────────────────┐                  ┌──────────────────┐
│ User             │                  │ User             │
│ ┌──────────────┐ │                  │ ┌──────────────┐ │
│ │ Profile      │ │  ●────────────▶  │ │ Posts        │ │
│ │              │ │                  │ │              │ │
│ └──────────────┘ │                  │ └──────────────┘ │
└──────────────────┘                  └──────────────────┘
```

Tạo nested route bằng cách thêm cách thêm 1 mảng route vào thuộc tính `children` cho root route khi config.

```js
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: 'profile',
        name: 'user-profile',
        component: UserProfile,
      },
      {
        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        path: 'posts',
        name: 'user-posts',
        component: UserPosts,
      },
    ],
  },
];
```

Và ở `User` component không thể thiếu `router-view` - nơi mà các child route như `UserProfile` hay `UserPosts` sẽ được render.

```html
<!-- User.vue -->
<template>
  <div class="user">
    <h2>User {{ userId }}</h2>
    <router-view />
  </div>
</template>
```

### 4. Route Meta Fields

Có thể thêm vào thuộc tính `meta` 1 object bất kỳ khi config route.

```js
const routes = [
  {
    path: '/login',
    component: Login,
    meta: {
      layout: 'auth-layout',
      title: 'Login',
    },
  },
];
```

Bằng cách sử dụng composable ở SFC, ta có thể sử dụng `meta` field mà ta đã config ban đầu.

```js
const route = useRoute();
consle.log(route.meta.layout);
document.title = route.meta.title;
```

### 5. Navigation Guards: Bảo vệ điều hướng?

`Vue Router` cung cấp `guards` để bảo vệ route bằng cách `redirect` hoặc `cancel` khi điều hướng.
Một số cách tham gia vào quá trình điều hướng

a) Globally Guards

- Tham gia trước khi vào 1 route nào đó được điều hướng.

```js
const router = createRouter({ ... });
router.beforeEach((to, from, next) => {
  // ...
  if (!loggedIn && to.name !== 'Login') {
    next({ name: 'Login' });
  }
  if (loggedIn && to.name === 'Login') {
    next({ path: '/' });
  }
  next();
  // explicitly return false to cancel the navigation
});
```

- Tham gia vào sau khi 1 route nào đó đã điều hướng xong.

```js
router.afterEach((to, from, failure) => {
  const appName = 'Vue Router Awesome';
  if (to.path !== '/' && to.name) {
    document.title = `${to.name} | ${appName}`;
  } else {
    document.title = appName;
  }
});
```

b) Per-route Guards

Có thể định nghĩa `beforeEnter` cụ thể cho từng route để tham gia vào trước khi điều hướng đến route đó.

```js
const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: (to, from) => {
      // reject the navigation
      return false;
    },
  },
];
```

`beforeEnter` có thể là 1 hàm `guards` hoặc là 1 mảng chứa các hàm `guards`.

c) In-component Guards

Với Composition API, có thể sử dụng hooks được cung cấp bởi `Vue Router`: `onBeforeRouteUpdate` vaf `onBeforeRouteLeave` ở trong component.

### 6. Programmatic Navigation: điều hướng theo hướng lập trình.

Khi sử dụng composable `useRouter`, ngoài phương thức `push` để điều hướng thì còn có `replace`, `go`, `back`, `forward`,...

### 7. Active links

`RouterLink` component sẽ thêm 2 CSS class khi được active: `router-link-active` và `router-link-exact-active`

_Link được active khi nào?_

1. Khi ...
2. Khi ...

### 8. Scroll Behavior: hành vi cuộn trang.

`Vue Router` cho phép điều cuộn trang đến vị trí nào đó khi điều hướng hoặc giữ nguyên vị trí khi các route được điều hướng, hơn nữa hoàn toàn có thể tùy chỉnh vi khi cuộn.

```js
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return desired position
    if (savedPosition) {
      // giữ nguyên vị trí khi chuyển trang, giống với nút back và forward page của trình duyệt.
      return savedPosition;
    } else {
      // luôn cuộn lên trên thẻ có id là main 1 khoảng cách top 10px
      return { el: '#main', top: 10, behavior: 'smooth'};
    }
  }
});
```

### 9. Transitions (cooming soon)

## Câu hỏi:

1. Tại sao không cần import mà vẫn có thể sử dụng 2 component `RouterLink` và `RouterView`?
2. Hiểu thế nào là `route`, thế nào là `router`?
3. Có bao nhiêu cách điều hướng? Đó là?
4. Chuyện gì xảy ra nếu điều hướng đến 1 route chưa được config? Cách xử lý?
