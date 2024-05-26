<script setup>
import { provide, ref, defineProps, watchEffect } from 'vue';
import Notification from './Notification.vue';

const props = defineProps({ max: { type: Number } });

const notifications = ref([]);

watchEffect(() => {
  if (notifications.value.length > props.max) {
    notifications.value.shift();
  }
});

provide('Notifications', notifications);
</script>

<template>
  <div class="notification-provider">
    <div class="notification-list">
      <transition-group name="notify-transition">
        <Notification
          v-for="n in notifications"
          :key="n.id"
          :notification="n"
        />
      </transition-group>
    </div>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.notification-provider {
  .notification-list {
    z-index: 99;
    position: absolute;
    right: 10px;
    top: 20px;
  }
}

.notify-transition-move,
.notify-transition-enter-active,
.notify-transition-leave-active {
  transition: all 0.5s ease;
}

.notify-transition-enter-from,
.notify-transition-leave-to {
  transform: translateX(50%);
}
.notify-transition-leave-to {
  opacity: 0;
}
.notify-transition-leave-active {
  position: absolute;
}
</style>
