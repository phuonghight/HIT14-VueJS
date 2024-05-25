<script setup>
import { onMounted, onUnmounted, defineModel } from "vue";

const model = defineModel({
  type: Boolean,
  required: true,
});
const closeOnEscHandler = (event) => {
  if (event.key == "Escape") {
    model.value = false;
  }
};
onMounted(() => {
  window.addEventListener("keydown", closeOnEscHandler);
});
onUnmounted(() => {
  window.removeEventListener("keydown", closeOnEscHandler);
});
</script>
<template>
  <Transition name="fade">
    <div class="model" v-if="model" @click.self="model = false">
      <div class="model--body">
        <div class="cancel-icon" @click="model = false">X</div>
        <slot />
        <div class="button">
          <button class="cancel" @click="model = false">Cancel</button>
          <button class="submit" @click="model = false">Submit</button>
        </div>
      </div>
    </div>
  </Transition>
</template>
<style lang="scss" scoped>
.model {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  .model--body {
    width: 500px;
    height: 200px;
    background-color: #fff;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .button {
      margin-top: 15px;
      text-align: right;
      button {
        margin: 0 5px;
        border-radius: 8px;
        font-size: 1em;
        border: 1px solid;
        padding: 4px 8px;
        font-weight: 500;
        font-family: inherit;
        cursor: pointer;
        transition: all 0.25s;
      }
      button.cancel:hover {
        border: 1px solid rgb(56, 240, 0);
        color: rgb(56, 240, 0);
      }
      button.submit {
        background-color: rgb(56, 240, 0);
        color: #fff;
        border: 3px solid rgb(56, 240, 0);
        &:hover {
          opacity: 0.7;
        }
      }
    }
    .cancel-icon {
      position: absolute;
      top: 5px;
      right: 13px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        color: red;
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to .model--body,
.fade-leave-from .model--body {
  opacity: 1;
}
</style>
