import { defineStore, acceptHMRUpdate } from 'pinia';

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    list: [],
  }),
  getters: {},
  actions: {
    addNotification(notification) {
      this.list.unshift(notification);
      this.list[0].destroy = this.removeById;
    },
    removeById(id) {
      this.list = this.list.filter((noti) => noti.id !== id);
    },
    clearAll() {
      this.list = [];
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useNotificationStore, import.meta.hot)
  );
}
