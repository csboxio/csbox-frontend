import { supabaseClient } from "$lib/utilities/supabaseClient";
import type { User } from "@supabase/supabase-js";
import { resizeFile } from "$lib/utilities/image.js.js";
import { browser } from "$app/environment";

let loading = false
let avatarUrl: string | null = null

export const getPath = async (user: User) => {
  try {
    const { data, error, status } = await supabaseClient
      .from('users')
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

export const deleteImage = async (filePath: String) => {
  // Delete image from storage
  // @ts-ignore
  const { data } = await supabaseClient.storage.from('avatars').remove(filePath)
  // Check if null
  if (data == null) {
    return
  }
}

async function resizedFile(files: FileList) {
  if (browser) {
    const file = files[0]
    return await resizeFile(file)
  }
}

export const uploadAvatar = async (files: FileList, uploading: boolean, url: string, user: User) => {
  try {
    if (!files || files.length === 0) {
      throw new Error('You must select an image to upload.')
    }
    // Delete old image from database
    const filePath = `${user.id + "/" + user.id + "_profileImage"}.JPEG`
    await deleteImage(filePath)

    const rfile = await resizedFile(files)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { error } = await supabaseClient.storage.from('avatars').upload(filePath, rfile)
    const { data } = supabaseClient.storage.from('avatars').getPublicUrl(filePath)
    await updateProfile(data.publicUrl, user)
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  }
}

export const uploadCourseImage = async (files: FileList, uploading: boolean, url: string, courseId: bigint) => {
  try {
    if (!files || files.length === 0) {
      throw new Error('You must select an image to upload.')
    }
    // Delete old image from database
    const filePath = `${courseId + "/" + "icon" + "_courseImage"}.JPEG`
    await deleteImage(filePath)

    const rfile = await resizedFile(files)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { error } = await supabaseClient.storage.from('courses').upload(filePath, rfile)
    const { data } = supabaseClient.storage.from('courses').getPublicUrl(filePath)
    await updateCourse(data.publicUrl, courseId)
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
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
    let { error } = await supabaseClient.from('users').upsert(updates)

    if (error) throw error
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading = false
  }
}

export async function updateCourse(courseUrl: string, courseId: bigint) {
  try {

    loading = true

    const updates = {
      id: courseId,
      course_image_url: courseUrl,
      updated_at: new Date()
    }

    // @ts-ignore
    let { error } = await supabaseClient.from('courses').upsert(updates)

    if (error) throw error
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading = false
  }
}