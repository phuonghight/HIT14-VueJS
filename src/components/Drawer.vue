<script setup lang="ts">
import { defineModel, defineProps, onMounted, onBeforeUnmount } from 'vue';
const model = defineModel({
  type: Boolean,
  required: true,
});

const props = defineProps({
  placement: {
    type: String,
    required: false,
    default: 'right',
  },
});

const closeOnEscHandler = (event) => {
  if (event.key == 'Escape') {
    model.value = false;
  }
};
onMounted(() => {
  window.addEventListener('keydown', closeOnEscHandler);
});
onBeforeUnmount(() => {
  window.removeEventListener('keydown', closeOnEscHandler);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="drawer-transition">
      <div
        v-if="model"
        class="drawer"
        @click.self="model = false"
      >
        <div
          class="drawer-body"
          :class="`drawer-body-${props.placement}`"
        >
          <slot name="header">
            <div>
              <button @click="model = false">X</button>
            </div>
          </slot>
          <slot></slot>
          <slot name="footer">
            <p>Default footer</p>
          </slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.drawer {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;
}
.drawer-body {
  background-color: white;
  position: absolute;
  transition: all 0.3s ease-in-out;
}
.drawer-body-right {
  top: 0;
  bottom: 0;
  right: 0;
  width: 500px;
}
.drawer-body-top {
  top: 0;
  right: 0;
  left: 0;
  height: 300px;
}
.drawer-body-bottom {
  right: 0;
  left: 0;
  bottom: 0;
  height: 300px;
}
.drawer-body-left {
  top: 0;
  bottom: 0;
  left: 0;
  width: 300px;
}
</style>

<style>
.drawer-transition-enter-from,
.drawer-transition-leave-to {
  opacity: 0;
}
.drawer-transition-enter-to .drawer-body,
.drawer-transition-leave-from .drawer-body {
  transform: translateX(0);
  opacity: 1;
}

.drawer-transition-enter-from .drawer-body-right,
.drawer-transition-leave-to .drawer-body-right {
  transform: translateX(100%);
}
.drawer-transition-enter-from .drawer-body-top,
.drawer-transition-leave-to .drawer-body-top {
  transform: translateY(-100%);
}
.drawer-transition-enter-from .drawer-body-bottom,
.drawer-transition-leave-to .drawer-body-bottom {
  transform: translateY(100%);
}
.drawer-transition-enter-from .drawer-body-left,
.drawer-transition-leave-to .drawer-body-left {
  transform: translateX(-100%);
}
</style>
