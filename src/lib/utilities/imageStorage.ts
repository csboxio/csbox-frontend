import type { User } from "@supabase/supabase-js";
import { resizeFile } from "$lib/utilities/image";
import { browser } from "$app/environment";
import {v4 as uuidv4} from 'uuid';

import { page } from "$app/stores";

export let loading = false;
export let course_image_loading = false;

export const getPath = async (user: User, supabase) => {
  try {
    const { data, error, status } = await supabase
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

export const deleteImage = async (filePath: string, supabase) => {
  // Delete image from storage
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { data, error } = await supabase.storage.from('avatars').remove(filePath)
  // Check if null
  console.log(`deleteImage - Error: ${error}`)
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

export const uploadAvatar = async (files: FileList, uploading: boolean, url: string, session, supabase) => {
  try {
    if (!files || files.length === 0) {
      throw new Error('You must select an image to upload.')
    }
    console.log(`uploadAvatar - Log: ${JSON.stringify(session.user.id)}`)
      console.log(session.user.id)
    // Delete old image from database
    const filePath = `${session.user.id + "/" + session.user.id + "_profileImage"}.WEBP`
    await deleteImage(filePath, supabase)

    const rfile = await resizedFile(files)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { error } = await supabase.storage.from('avatars').upload(filePath, rfile)
    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
    await updateProfile(data.publicUrl, session.user.id, supabase)


    // Error
  } catch (error) {
    if (error instanceof Error) {
      //alert(error.message)
    }
  }

}

export const uploadCourseImage = async (files: FileList, courseId: bigint, user, supabase) => {
  course_image_loading = true;
  loading = true

  console.log(courseId)
  try {
    if (!files || files.length === 0) {
      throw new Error('You must select an image to upload.')
    }

    console.log(courseId)

    // Delete old image from database
    const filePath = `${courseId + "/" + "icon" + "_courseImage"}.WEBP`
    await deleteImage(filePath, supabase)

    const rfile = await resizedFile(files)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { error } = await supabase.storage.from('courses').upload(filePath, rfile, {

    })
    console.log(error)
    if (error) {
      console.log('Error uploading file')
    }
    const { data } = supabase.storage.from('courses').getPublicUrl(filePath)

    console.log(courseId)
    await updateCourse(data.publicUrl, courseId, user, supabase)
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  }
}

export const uploadCourseDocumentImage = async (files: FileList, uploading: boolean, url: string, courseId: bigint, user, supabase) => {
  try {
    loading = true;
    if (!files || files.length === 0) {
      throw new Error('You must select an image to upload.')
    }
    // Delete old image from database
    const filePath = `${courseId + "/document/" + "images/" + uuidv4 + "_courseDocumentImage"}.JPEG`
    await deleteImage(filePath, supabase)

    //const rfile = await resizedFile(files)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { error } = await supabase.storage.from('courses').upload(filePath, files)
    const { data } = supabase.storage.from('courses').getPublicUrl(filePath)
    loading = false;

    return data.publicUrl
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  }
}

export async function updateProfile(avatarUrl: string, user_id, supabase) {
    loading = true
    const updates = {
      id: user_id,
      avatar_url: avatarUrl,
      updated_at: new Date()
    }

    console.log(`updateProfile - Log: ${updates}`)

    const headers = new Headers()
    headers.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(updates)
    }

    const response = await fetch('/api/users/update', requestOptions)

    console.log(`Response - updateProfile: ${JSON.stringify(await response.json())}`)
    loading = false
}

export async function updateCourse(courseUrl: string, courseId: bigint, user, supabase) {
  try {
    const updates = {
      updated_at: new Date(),
      course_image_url: courseUrl,
      user_id: user.id,
    }

    const { error } = await supabase.from('courses')
        .update(updates)
        .eq('id', courseId)
        .eq('user_id', user.id)

    console.log(error)

    if (error) throw error
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    course_image_loading = false
    loading = false
  }
}