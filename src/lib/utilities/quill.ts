import type { User } from "@supabase/supabase-js";
import {invalidateAll} from "$app/navigation";
import {browser} from "$app/environment";
let loading;

export const downloadQuillDocument = async (filePath: string, supabase, bucket: string) => {
  const { data, error } = await supabase.storage.from(`/public/${bucket}`).download(filePath);
  const text = await new Response(data).text();
  return text;
};

export const deleteCourseDocument = async (filePath: string, supabase) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { data } = await supabase.storage.from("courses").remove(filePath);
  // Check if null
  if (data == null) {
    return;
  }
};

export const uploadQuillDocument = async (files: FileList, courseId: bigint, user: any, supabase, filePath: string, bucket: string) => {
  loading = true;
  if (!files || files.length === 0) {
    throw new Error("You must select an image to upload.");
  }
  const { error } = await supabase.storage.from(bucket).update(filePath, files);
  if (error) {
    const { errors } = await supabase.storage.from(bucket).remove(filePath);

    const { error } = await supabase.storage.from(bucket).upload(filePath, files);
    console.log(error)
  }
  const { data } = await supabase.storage.from(bucket).getPublicUrl(filePath);
  loading = false;
};


export const updateCourseInsert = async(courseId: bigint, user: User, supabase) => {
  try {
    const updates = {
      updated_at: new Date(),
    }

    console.log(user)

    const { error, data } = await supabase
        .from('courses')
        .update(updates)
        .eq('id', courseId)
        .eq('user_id', user)

    console.log(error, data)

    if (error) throw error
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading = false
    if (browser)
      await invalidateAll()
  }
}

export const updateAssignmentInsert = async(assignmentId: bigint, supabase) => {
  try {
    const updates = {
      updated_at: new Date(),
    }

    const { error } = await supabase.from('assignments_info')
        .update(updates)
        .eq('assignment', assignmentId)

    console.log(error)

    if (error) throw error
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading = false
  }
}