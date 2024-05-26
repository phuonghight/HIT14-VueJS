import { inject, ref } from 'vue';

import { Timer } from '../utils/timer';

export function useNotification() {
  const id = ref(0);
  const notifications = inject('Notifications');

  function create({ type, header, content, duration, keepAliveOnHover }) {
    const newId = id.value++;
    notifications.value.push({
      id: newId,
      type,
      header,
      content,
    });
    notifications.value[notifications.value.length - 1].destroy = removeById;
    if (duration) {
      const timer = new Timer(() => {
        removeById(newId);
      }, duration);
      if (keepAliveOnHover) {
        notifications.value[
          notifications.value.length - 1
        ].keepAliveOnHover = true;
        notifications.value[notifications.value.length - 1].pauseTimeout =
          timer.pause;
        notifications.value[notifications.value.length - 1].resumeTimeout =
          timer.resume;
      }
    }
  }

  function success({ header, content, duration, keepAliveOnHover }) {
    create({ type: 'success', header, content, duration, keepAliveOnHover });
  }

  function error({ header, content, duration, keepAliveOnHover }) {
    create({ type: 'error', header, content, duration, keepAliveOnHover });
  }

  function warning({ header, content, duration, keepAliveOnHover }) {
    create({ type: 'warning', header, content, duration, keepAliveOnHover });
  }

  function removeById(id) {
    notifications.value = notifications.value.filter((n) => n.id !== id);
  }

  return { success, error, warning };
}
