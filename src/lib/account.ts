import { supabaseClient } from "$lib/supabaseClient";
import type { User } from "@supabase/supabase-js";
import { createEventDispatcher } from 'svelte'
import { json } from '@sveltejs/kit';

let loading = false
let avatarUrl: string | null = null



export const getPath = async (user: User) => {
  try {
    const { data, error, status } = await supabaseClient
      .from('profiles')
      .select(`avatar_url`)
      .eq('id', user.id)
      .single()
    if (error) {
      throw error
    }
    if (data != null) {
      // Return avatar url
      return data.avatar_url
    }
  }

  catch (error) {
    if (error instanceof Error) {
      console.log('Error downloading image: ', error.message)
    }
  }

}

export const downloadImage = async (user: User) => {
  // Get path url from database
  let url = await getPath(user);
  // Retrieve image blob from database
  // @ts-ignore
  const { data } = await supabaseClient.storage.from('avatars').download(url)
  // Check if null
  if (data == null) {
    return
  }
  // Get object URL
  avatarUrl = URL.createObjectURL(data)
  // Return url to be displayed
  return avatarUrl
}

export const uploadAvatar = async (files: FileList, uploading: boolean, url: string, user: User) => {
  try {
    uploading = true

    if (!files || files.length === 0) {
      throw new Error('You must select an image to upload.')
    }

    const file = files[0]
    const fileExt = file.name.split('.').pop()
    const filePath = `${Math.random()}.${fileExt}`

    let { error } = await supabaseClient.storage.from('avatars').upload(filePath, file)
    await updateProfile(filePath, user)
    if (error) {
      throw error
    }
    url = filePath

  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    uploading = false
  }

}

export async function updateProfile(avatarUrl: string, user: User) {
  try {

    loading = true

    const updates = {
      id: user.id,
      avatar_url: avatarUrl,
      updated_at: new Date()
    }

    // @ts-ignore
    let { error } = await supabaseClient.from('profiles').upsert(updates)

    if (error) throw error
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading = false
  }
}
