<script setup>
import { computed, defineProps, onBeforeUnmount, onMounted, ref } from 'vue';

import successIcon from '../assets/icons/success.svg';
import errorIcon from '../assets/icons/error.svg';
import warningIcon from '../assets/icons/warning.svg';

const props = defineProps({
  notification: { type: Object, required: true },
});

const notificationRef = ref(null);

const iconSrc = computed(() => {
  if (props.notification.type === 'success') {
    return successIcon;
  } else if (props.notification.type === 'error') {
    return errorIcon;
  } else {
    return warningIcon;
  }
});

function pauseTimeout() {
  props.notification.pauseTimeout();
}

function resumeTimeout() {
  props.notification.resumeTimeout();
}

onMounted(() => {
  if (props.notification.keepAliveOnHover) {
    notificationRef.value.addEventListener('mouseover', pauseTimeout);
    notificationRef.value.addEventListener('mouseout', resumeTimeout);
  }
});

onBeforeUnmount(() => {
  if (props.notification.keepAliveOnHover) {
    notificationRef.value.removeEventListener('mouseover', pauseTimeout);
    notificationRef.value.removeEventListener('mouseout', resumeTimeout);
  }
});
</script>

<template>
  <div
    class="notification"
    ref="notificationRef"
  >
    <div class="icon">
      <img
        :src="iconSrc"
        alt=""
      />
    </div>
    <div class="body">
      <div class="header">{{ notification.header }}</div>
      <div class="content">{{ notification.content }}</div>
    </div>
    <button
      class="action"
      @click="notification.destroy(notification.id)"
    >
      X
    </button>
  </div>
</template>

<style lang="scss" scoped>
.notification {
  background-color: #fff;
  display: flex;
  align-items: start;
  padding: 20px 30px;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  .icon {
    margin-right: 20px;
    img {
      width: 30px;
      height: 30px;
    }
  }
  .body {
    width: 200px;
    .content {
      white-space: pre-wrap;
    }
  }
  .action {
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
