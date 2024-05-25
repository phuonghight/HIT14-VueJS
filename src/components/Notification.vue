<script setup>
import { ref, defineModel, watch, toRefs } from "vue";

const msgList = defineModel("messageList", {
  type: Array,
  required: false,
});
</script>
<template>
  <ul>
    <TransitionGroup name="zoom" tag="ul">
      <li v-for="item in msgList" :key="item" class="list-item">
        <span v-if="item.icon === 'error'" class="error-icon">
          <i class="fa-solid fa-circle-exclamation"></i>
        </span>
        <span v-if="item.icon === 'warning'" class="warning-icon">
          <i class="fa-solid fa-triangle-exclamation"></i>
        </span>
        <span v-if="item.icon === 'success'" class="success-icon">
          <i class="fa-solid fa-circle-exclamation"></i>
        </span>
        {{ item.msg }}
      </li>
    </TransitionGroup>
  </ul>
</template>
<style scoped lang="scss">
ul {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  li {
    background-color: #fff;
    height: 30px;
    width: max-content;
    padding: 8px 16px;
    margin: 12px 0;
    display: flex;
    flex-direction: row;
    -webkit-box-shadow: 0px 0px 20px -1px rgba(0, 0, 0, 0.31);
    -moz-box-shadow: 0px 0px 20px -1px rgba(0, 0, 0, 0.31);
    box-shadow: 0px 0px 20px -1px rgba(0, 0, 0, 0.31);
    position: relative;
    span > i {
      margin: 0 10px;
    }
    .error-icon > i {
      color: rgb(233, 81, 81);
      margin: 0 5px;
    }

    .warning-icon > i {
      color: orange;
    }

    .success-icon > i {
      color: rgb(95, 247, 0);
    }
  }
}

.zoom-enter-active,
.zoom-leave-active {
  transition: all 0.5s ease-in-out;
}
.zoom-enter-from,
.zoom-leave-to {
  transform: scale(0);
  opacity: 0;
}
.zoom-enter-to,
.zoom-leave-from {
  transform: scale(1);
  opacity: 1;
}
</style>
