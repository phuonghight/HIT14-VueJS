<template>
  <div style="margin: 20px 0">
    <button class="fancy-btn">
      <!-- slot outlet -->
      <slot>
        <!-- Fallback content -->
        Click me
      </slot>
    </button>
  </div>
</template>
