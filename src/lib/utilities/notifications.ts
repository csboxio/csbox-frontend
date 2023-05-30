import { writable } from 'svelte/store';

export const notifications = writable([]);

export function addNotification(notification) {
  notifications.update((currentNotifications) => [...currentNotifications, notification]);
}