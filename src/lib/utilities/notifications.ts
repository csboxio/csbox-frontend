import { writable } from 'svelte/store';

export const notifications = writable([]);

export function addNotification(notification, supabase, user) {
  notifications.update((currentNotifications) => [...currentNotifications, notification]);
  appendDataToNotifications(notification, supabase, user);
}

async function appendDataToNotifications(newNotification, supabase, user) {

  //  Retrieve the existing all_notifications column JSONB

  const { data, error } = await supabase
      .from("notifications")
      .select("all_notifications")
      .eq('user_id', user.id)
      .single();

  console.log(data, error)

  if (error) {
    console.error("Error retrieving existing JSONB value:", error);
    return;
  }

  let existingData = data.all_notifications;

  if (!existingData || !Array.isArray(existingData.notifications)) {
    existingData = {
      notifications: [],
    };
  }

  //const existingData = JSON.parse(existingValue);

  const newData = {
    ...existingData,
    notifications: [...existingData.notifications, newNotification],
  };

  const updatedValue = newData;

  const { error: updateError } = await supabase
      .from("notifications")
      .upsert({user_id: user.id, all_notifications: updatedValue })
      .select();

  if (updateError) {
    console.error("Error updating 'all_notifications' column:", updateError);
    return;
  }

  console.log("Data appended successfully.");
}