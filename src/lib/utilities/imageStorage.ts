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
  console.log(error)
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

export const uploadAvatar = async (files: FileList, uploading: boolean, url: string, user, supabase) => {
  try {
    if (!files || files.length === 0) {
      throw new Error('You must select an image to upload.')
    }
    console.log(user)
    // Delete old image from database
    const filePath = `${user.id + "/" + user.id + "_profileImage"}.WEBP`
    await deleteImage(filePath, supabase)

    const rfile = await resizedFile(files)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { error } = await supabase.storage.from('avatars').upload(filePath, rfile)
    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
    await updateProfile(data.publicUrl, user, supabase)
  } catch (error) {
    if (error instanceof Error) {
      //alert(error.message)
    }
  }
}

export const uploadCourseImage = async (files: FileList, courseId: bigint, user, supabase) => {
  course_image_loading = true;
  loading = true

  console.log(user)
  try {
    if (!files || files.length === 0) {
      throw new Error('You must select an image to upload.')
    }

    // Delete old image from database
    const filePath = `${courseId + "/" + "icon" + "_courseImage"}.WEBP`
    await deleteImage(filePath, supabase)

    const rfile = await resizedFile(files)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { error } = await supabase.storage.from('courses').upload(filePath, rfile, {

    })
    if (error) {
      console.log('Error uploading file')
      return
    }
    const { data } = supabase.storage.from('courses').getPublicUrl(filePath)

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

export async function updateProfile(avatarUrl: string, user, supabase) {
    loading = true
    const updates = {
      id: user.id,
      avatar_url: avatarUrl,
      updated_at: new Date()
    }

    console.log(updates)

    const headers = new Headers()
    headers.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(updates)
    }

    fetch('/api/users/update', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data)
        })
        .catch(error => {
          console.log(error)
        })
    loading = false
}

export async function updateCourse(courseUrl: string, courseId: bigint, user, supabase) {
  try {
    const updates = {
      id: courseId,
      inserted_at: new Date(),
      user_id: user.id,
      course_image_url: courseUrl,
    }

    const { error } = await supabase.from('courses')
        .upsert(updates)
        .eq('user_id', user.id)
        .eq('id', courseId)


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