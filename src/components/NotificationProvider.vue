<script setup>
import { useNotificationStore } from '../stores/notification';
import Notification from './Notification.vue';

const notificationStore = useNotificationStore();
</script>

<template>
  <div class="notification-provider">
    <div class="notification-list">
      <transition-group name="notify-transition">
        <Notification
          v-for="noti in notificationStore.list"
          :key="noti.id"
          :notification="noti"
        />
      </transition-group>
    </div>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.notification-provider {
  // position: relative;
  // height: 100%;
  // width: 100%;
  // overflow: hidden;
  .notification-list {
    z-index: 99;
    position: absolute;
    right: 10px;
    top: 20px;
  }
}

.notify-transition-move, /* apply transition to moving elements */
.notify-transition-enter-active,
.notify-transition-leave-active {
  transition: all 0.5s ease;
}

.notify-transition-enter-from,
.notify-transition-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.notify-transition-leave-active {
  position: absolute;
}
</style>
