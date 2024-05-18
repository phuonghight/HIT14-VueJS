# Lession 08: Component In-depth

- [Lession 08: Component In-depth](#lession-08-component-in-depth)
  - [I. Props](#i-props)
    - [1. Khai báo Props](#1-khai-báo-props)
    - [2. Cách sử dụng Prop](#2-cách-sử-dụng-prop)
    - [3. One-Way Data Flow](#3-one-way-data-flow)
  - [II. Events](#ii-events)
    - [1. Emit và lắng nghe sự kiện](#1-emit-và-lắng-nghe-sự-kiện)
    - [2. Đối số của sự kiện](#2-đối-số-của-sự-kiện)
    - [3. Kết hợp `Props, Emiting và Listening Event` để tạo Two-way Data Flow](#3-kết-hợp-props-emiting-và-listening-event-để-tạo-two-way-data-flow)
  - [III. Model](#iii-model)
    - [1. Cơ bản](#1-cơ-bản)
    - [2. Multiple model](#2-multiple-model)
  - [IV. Slots](#iv-slots)
    - [1. Basic](#1-basic)
    - [2. Fallback Content](#2-fallback-content)
    - [3. Đặt tên cho Slots (Sử dụng nhiều Slots)](#3-đặt-tên-cho-slots-sử-dụng-nhiều-slots)
    - [4. Scoped Slots](#4-scoped-slots)
  - [V. Provide/Inject](#v-provideinject)
    - [1. Provide](#1-provide)
    - [2. Inject](#2-inject)

## I. Props

### 1. Khai báo Props

```js
const props = defineProps({
  count: {
    type: Number, // kiểu hoặc mảng chứa kiểu của prop
    required: false, // true or false
    default: 10, // giá trị mặc định khi không truyền prop
  },
});
```

### 2. Cách sử dụng Prop

a)
Khi định nghĩa thì đặt tên theo quy tắc `camelCase`

```js
defineProps({
  greetingMessage: String,
});
```

Khi truyền prop thì gọi theo quy tắc `kebab-case`

```html
<MyComponent greeting-message="hello" />
```

b)
Với kiểu string thì có thể binding tĩnh

```html
<BlogPost title="My journey with Vue" />
```

Các kiểu còn lại truyền vào prop phải dùng `v-bind` hoặc `:`

```html
<!-- kiểu number -->
<BlogPost :likes="42" />

<!-- kiểu boolean -->
<BlogPost is-published />
<BlogPost :is-published="false" />
```

### 3. One-Way Data Flow

## II. Events

### 1. Emit và lắng nghe sự kiện

- B1: Định nghĩa và emit sự kiện ở `MyComponent.vue`:

```js
const emits = defineEmits(['inFocus', 'submit']);
function buttonClick() {
  emit('submit');
}
```

```html
<button @click="buttonClick">Click me to submit</button>
```

- B2: Ở component cha có thể lắng nghe sự kiên mà `MyComponent` emit lên

```html
<MyComponent
  @in-focus="callbackFocus"
  @submit="callbackSubmit"
/>
```

### 2. Đối số của sự kiện

Khi emit sự kiện ở component con, ngoài đối số đầu tiên là tên sự kiện, nếu ta tryền vào 1 hay nhiều đối số nữa thì ở component cha có thể lấy được đối số đó bằng cách sử dụng tham số ở callback lắng nghe

- Ở `MyButton.vue`:

```html
<button @click="emits('eventame', 1, 2, 3)">
  Kích để truyền 1, 2, 3 lên component cha
</button>
```

- Khi sử dụng `MyButton` component:

```html
<MyButton
  @event-name="(p1, p2, p3) => {
  console.log(p1, p2, p3);
}"
/>
```

### 3. Kết hợp `Props, Emiting và Listening Event` để tạo Two-way Data Flow

## III. Model

Từ Vue 3.4 trở đi, các component hoàn toàn có thể nhanh chóng tạo cho nó 1 hoặc nhiều props Two-way Data Flow, gọi là `model`

### 1. Cơ bản

- Ở `MyComponent.vue`:

```js
const model = defineModel({
  type: Number,
  required: false,
  default: 100,
});
function update() {
  model.value++;
}
```

- Sử dụng:

```js
const count = ref(0);
```

```html
<MyComponent v-model="count" />
```

### 2. Multiple model

- Khai báo sẽ đặt tên cho model

```js
const usernameModel = defineModel('username', {
  type: String,
  required: false,
  default: '',
});
```

- Khi sử dụng sẽ dụng `directives` `v-model:[modelName]`

```html
<MyComponent v-model:username="username" />
```

## IV. Slots

### 1. Basic

- Template của `FancyButton.vue`

```html
<button class="fancy-btn">
  <!-- slot outlet -->
  <slot></slot>
</button>
```

- Khi sử dụng, những content ở giữa sẽ được thay thế và đặt vào vị trí `slot`

```html
<FancyButton>
  <!-- slot content -->
  Click me!
</FancyButton>
```

![Vue slot flow](https://vuejs.org/assets/slots.CKcE8XYd.png)

### 2. Fallback Content

Chúng ta có thể hiển thị 1 giao diện dự phòng khi có `slot outlet` nhưng không có `slot content`

```html
<button class="fancy-btn">
  <!-- slot outlet -->
  <slot>
    <!-- fallback content -->
    Fancy button
  </slot>
</button>
```

### 3. Đặt tên cho Slots (Sử dụng nhiều Slots)

Nếu có trên 2 slot thì chúng ta phải đặt tên cho các slot

- Ở `BaseLayout.vue`

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

- Khi sử dụng:

```html
<BaseLayout>
  <template #header>
    <!-- content for the header slot -->
  </template>
  <!-- content for the default slot -->
  <div>Main content</div>
  <template #footer>
    <!-- content for the header slot -->
  </template>
</BaseLayout>
```

![](https://vuejs.org/assets/named-slots.CCIb9Mo_.png)

Những `slot content` không đặt trong `template` hoặc được đặt trong `<teamplate #default></teamplate>` thì sẽ replace vào `slot` không có name.

### 4. Scoped Slots

Sử dụng `Scoped Slots` để có thể truyền dữ liệu từ `Slot outlet` lên `Slot content`

```html
<!-- <MyComponent> template -->
<div>
  <!-- scoped slot outlet -->
  <slot
    :text="greetingMessage"
    :count="1"
  ></slot>
</div>
```

```html
<MyComponent>
  <!-- scoped slot content -->
  <template #default="{ text, count }">
    <div>
      <p>{{ text }}</p>
      <span>{{ count }}</span>
    </div>
  </template>
</MyComponent>
```

## V. Provide/Inject

Giải quyết được vấn đề truyền props qua nhiều tầng, mà các tầng trung gian không cần thiết
![](https://vuejs.org/assets/prop-drilling.XJXa8UE-.png)

### 1. Provide

Chúng ta dùng `provide` để cung cấp 1 `value` thông qua `key` cho tất cả các component thuộc component mà sử dụng `provide`

```js
import { provide, ref } from 'vue';
provide(/* key */ 'message', /* value */ 'hello!');
const count = ref(0);
provide('count', count);
```

### 2. Inject

Chúng ta sử dụng `inject` để lấy `value` thông qua `key` mà những component chứa component mà sử dụng `inject` đã `provide`

```js
import { inject } from 'vue';
const message = inject('message');
```
