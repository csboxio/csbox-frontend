import { writable } from 'svelte/store';

export const notifications = writable([]);

export function addNotification(notification, supabase, user) {
  notifications.update((currentNotifications) => [...currentNotifications, notification]);
  appendDataToNotifications(notification, supabase, user);
}

async function appendDataToNotifications(newNotification, supabase, user) {

  //  Retrieve the existing new column JSONB

  const { data, error } = await supabase
      .from("notifications")
      .select("new")
      .eq('id', user.id)
      .single();

  console.log(data, error)

  if (error) {
    console.error("Error retrieving existing JSONB value:", error);
    return;
  }

  let existingData = data.new;

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
      .upsert({id: user.id, new: updatedValue })
      .select();

  if (updateError) {
    console.error("Error updating 'new' column:", updateError);
    return;
  }

  console.log("Data appended successfully.");
}