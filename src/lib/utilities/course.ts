import { supabaseClient } from "$lib/utilities/supabaseClient";
import type { User } from "@supabase/supabase-js";
import { resizeFile } from "$lib/utilities/image";
import { browser } from "$app/environment";
import { deleteImage, updateCourse } from "./imageStorage";
import { userStore } from "../stores/stores";

let loading;

export const downloadCourseDocument = async (filePath: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { data, error } = await supabaseClient.storage.from("/public/courses").download(filePath);
  // Check if null
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const text = await new Response(data).text();
  return text;
};

export const deleteCourseDocument = async (filePath: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { data } = await supabaseClient.storage.from("courses").remove(filePath);
  // Check if null
  if (data == null) {
    return;
  }
};

export const uploadCourseDocument = async (files: FileList, courseId: bigint, user: any) => {
  loading = true;
  if (!files || files.length === 0) {
    throw new Error("You must select an image to upload.");
  }
  // Delete old html from block storage
  const filePath = `${courseId + "/" + "document/" + "home"}.HTML`;
  //await deleteCourseDocument(filePath)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { error } = await supabaseClient.storage.from("courses").update(filePath, files);
  if (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { errors } = await supabaseClient.storage.from("courses").remove(filePath);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { error } = await supabaseClient.storage.from("courses").upload(filePath, files);
  }
  const { data } = supabaseClient.storage.from("courses").getPublicUrl(filePath);

  await updateCourseInsert(courseId, user)

  loading = false;
};

export const createPlaceHolderCourseDocument = async (courseId: bigint, user: any) => {
  const file = new File(["<p>Welcome to this course's Home Page!</p> <b>Click edit</b> to start!"], 'home.HTML');
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  console.log("HERE", file, courseId, user)
  // Delete old html from block storage
  const filePath = `${courseId + "/" + "document/" + "home"}.HTML`;
  //await deleteCourseDocument(filePath)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { error } = await supabaseClient.storage.from("courses").update(filePath, file);
  console.log(error)
  if (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { errors } = await supabaseClient.storage.from("courses").remove(filePath);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { error } = await supabaseClient.storage.from("courses").upload(filePath, file);
  }
  const { data } = supabaseClient.storage.from("courses").getPublicUrl(filePath);

  await updateCourseInsert(courseId, user)

  loading = false;
};

async function updateCourseInsert(courseId: bigint, user: User) {
  try {
    const updates = {
      id: courseId,
      inserted_at: new Date(),
      created_by: user
    }
    const { error } = await supabaseClient.from('courses')
      .upsert(updates)
      .eq('created_by', user.id)
      .eq('id', courseId)

    if (error) throw error
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading = false
  }
}