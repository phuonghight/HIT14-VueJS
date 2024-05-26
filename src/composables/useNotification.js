import { useNotificationStore } from '../stores/notification';

export function useNotification() {
  const notificationStore = useNotificationStore();

  function create({ type, header, content }) {
    const id = notificationStore.list.length + 1;
    notificationStore.addNotification({
      id,
      type,
      header,
      content,
    });
  }

  function success({ header, content }) {
    create({ type: 'success', header, content });
  }

  function error({ header, content }) {
    create({ type: 'error', header, content });
  }

  function warning(
    { header, content } = { header: 'Header', content: 'Content' }
  ) {
    create({ type: 'warning', header, content });
  }

  return { success, error, warning };
}
