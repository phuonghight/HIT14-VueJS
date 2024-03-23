# Lession 03

**References**

[I. Conditional Rendering](#i-conditional-rendering)

- [1. `v-if`](#1-v-if)
- [2. `v-else`](#2-v-else)
- [3. `v-else-if`](#3-v-else-if)
- [4. `v-show`](#4-v-show)
- [5. `v-if` vs `v-show`](#5-v-if-vs-v-show)

[II. List Rendering](#ii-list-rendering)

- [1. `v-for`](#1-v-for)
- [2. `v-for` with `v-if`](#2-v-for-with-v-if)

[III. Form Input Bindings](#iii-form-input-bindings)

- [1. Text](#1-text)
- [2. Checkbox](#2-checkbox)
- [3. Radio](#3-radio)
- [4. Select](#4-select)
- [5. Modifiers: `.lazy`, `.number` and `.trim`](#5-modifiers-lazy-number-and-trim)

## I. Conditional Rendering

### 1. `v-if`

```html
<h1 v-if="awesome">Vue is awesome!</h1>
```

### 2. `v-else`

```html
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

### 3. `v-else-if`

```html
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else-if="amzing">Vue is amzing!</h1>
<h1 v-else>Oh no 😢</h1>
```

### 4. `v-show`

```html
<h1 v-show="awesome">Vue is awesome!</h1>
```

### 5. `v-if` vs `v-show`

## II. List Rendering

### 1. `v-for`

```js
const items = ref([{ message: "Foo" }, { message: "Bar" }]);
```

```html
<li v-for="item in items">{{ item.message }}</li>
```

### 2. `v-for` with `v-if`

```html
<!--
This will throw an error because property "todo" is not defined on instance.
-->
<li v-for="todo in todos" v-if="!todo.isComplete">{{ todo.name }}</li>
```

## III. Form Input Bindings

### 1. Text

```js
const message = ref();
```

```html
<p>Message is: {{ message }}</p>
<input v-model="message" placeholder="edit me" />
```

### 2. Checkbox

- Single

```js
const checked = ref(false);
```

```html
<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>
```

- Multiple

```js
const checkedNames = ref([]);
```

```html
<div>Checked names: {{ checkedNames }}</div>

<input type="checkbox" id="thao" value="thao" v-model="checkedNames" />
<label for="thao">Thao</label>

<input type="checkbox" id="canh" value="canh" v-model="checkedNames" />
<label for="canh">Canh</label>

<input type="checkbox" id="khang" value="khang" v-model="checkedNames" />
<label for="khang">Khang</label>

<input type="checkbox" id="dung" value="dung" v-model="checkedNames" />
<label for="dung">Dung</label>
```

### 3. Radio

```js
const gender = ref();
```

```html
<div>Gender: {{ gender }}</div>

<input type="radio" id="female" value="female" v-model="gender" />
<label for="female">Female</label>

<input type="radio" id="male" value="male" v-model="gender" />
<label for="male">Male</label>
```

### 4. Select

```js
const selected = ref("");
```

```html
<div>Selected: {{ selected }}</div>

<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option value="A">A</option>
  <option value="B">B</option>
  <option value="C">C</option>
</select>
```

### 5. Modifiers: `.lazy`, `.number` and `.trim`
