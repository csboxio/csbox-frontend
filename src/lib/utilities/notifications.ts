import { writable } from 'svelte/store';

export const notifications = writable([]);

export function addNotification(notification, supabase, user) {
  notifications.update((currentNotifications) => [...currentNotifications, notification]);
  appendDataToNotifications(notification, supabase, user);
}

async function appendDataToNotifications(newNotification, supabase, user) {
  console.log(user)
  //  Retrieve the existing new column JSONB

  const { data, error } = await supabase
      .from("notifications")
      .select("new")
      .eq('id', user.id)
      .single();

  if (error) {
    console.error("Error retrieving existing JSONB value:", error);
    return;
  }

  const existingValue = data.new;

  const existingData = JSON.parse(existingValue);

  //const existingData = JSON.parse(existingValue);

  const newData = {
    ...existingData,
    newNotification,
    timestamp: new Date().toISOString(),
  };

  const updatedValue = JSON.stringify(newData);

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