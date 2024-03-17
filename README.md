# Lession 01

## I. What is Vue?

1. Javascipt Framework (Typescript support) for building user interfaces

2. There are two core features of Vue:

- **Declarative Rendering**: Vue extends standard HTML with a `template syntax` that allows us to declaratively describe HTML output based on JavaScript state.

- **Reactivity**: Vue automatically tracks JavaScript state changes and efficiently updates the DOM when changes happen.

## II. Single Page Application

1. Only a single HTML page initial in browser.
2. Faster and Smoother experience.

## II. Creating a Vue app

**_Required:_**

- IDE: [Visual Studio Code](https://code.visualstudio.com/download)
- Environment: [NodeJS](https://nodejs.org/en)

1. Use `npm`:

```bash
npm create vue@latest
```

or

```bash
npm create vite
```

2. Use CDN

Script tag: `<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>`

## III. Single-File Components (SFC)

1. SFC (a.k.a. \*.vue files, abbreviated as SFC) is a special file format that allows us to encapsulate the view, logic, and styling of a Vue component in a single file.

```html
<script setup>
  import { ref } from "vue";
  const greeting = ref("Hello World!");
</script>

<template>
  <p class="greeting">{{ greeting }}</p>
</template>

<style>
  .greeting {
    color: red;
    font-weight: bold;
  }
</style>
```

## III. Using Vercel to deploy
