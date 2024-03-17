# Lession 02

## I. Template Syntax

1. Text Interpolation

```html
<span>Message: {{ msg }}</span>
```

2. Attribute Bindings: use a `v-bind` directive

```html
<div v-bind:id="dynamicId"></div>
<!-- Shorthand -->
<div :id="dynamicId"></div>
```

3. Using JavaScript Expressions (not statement)

```html
<div>{{ number + 1 }}</div>
<div>{{ ok ? 'YES' : 'NO' }}</div>

<!-- Calling Functions -->
<div>{{ message.split('').reverse().join('') }}</div>

<div :id="`list-${id}`"></div>
```

4. Directives

- Directives are special attributes with the `v-` prefix.
- Directive attribute values are expected to be single JavaScript expressions (with the exception of v-for, v-on and v-slot)
- A directive's job is to reactively apply updates to the DOM when the value of its expression changes.

1. Arguments and Dynamic Arguments

```html
<a v-bind:href="url"> ... </a>
<!-- shorthand -->
<a :href="url"> ... </a>

<a v-bind:[attributeName]="url"> ... </a>
<!-- shorthand -->
<a :[attributeName]="url"> ... </a>
```

2. Modifiers

![](https://vuejs.org/assets/directive.7WSr6AKH.png)

```html
<form @submit.prevent="onSubmit">...</form>
```

## II. Reactivity (State)

1. ref()

```js
import { ref } from "vue";
const count = ref(0);
```

![](https://dmitripavlutin.com/5b662e804f0dada82fd6a9b2ff799139/ref-2.svg)

2. reactive()

```js
import { reactive } from "vue";
const state = reactive({ count: 0 });
```

## III. Computed Property

- Computed Caching vs. Methods

## IV. Class and Style Bindings

1. Binding HTML Classes
2. Binding Inline Styles
