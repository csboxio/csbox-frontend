import type { User } from "@supabase/supabase-js";
let loading;

export const downloadCourseDocument = async (filePath: string, supabase) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { data, error } = await supabase.storage.from("/public/courses").download(filePath);
  // Check if null
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
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

export const uploadCourseDocument = async (files: FileList, courseId: bigint, user: any, supabase) => {
  loading = true;
  if (!files || files.length === 0) {
    throw new Error("You must select an image to upload.");
  }
  // Delete old html from block storage
  const filePath = `${courseId + "/" + "document/" + "home"}.HTML`;
  //await deleteCourseDocument(filePath)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { error } = await supabase.storage.from("courses").update(filePath, files);
  if (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { errors } = await supabase.storage.from("courses").remove(filePath);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { error } = await supabase.storage.from("courses").upload(filePath, files);
  }
  const { data } = supabase.storage.from("courses").getPublicUrl(filePath);

  await updateCourseInsert(courseId, user, supabase)

  loading = false;
};

export const createPlaceHolderCourseDocument = async (courseId: bigint, user: any, supabase) => {
  const file = new File(["<p>Welcome to this course's Home Page!</p> <b>Click edit</b> to start!"], 'home.HTML');
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  console.log("HERE", file, courseId, user)
  // Delete old html from block storage
  const filePath = `${courseId + "/" + "document/" + "home"}.HTML`;
  //await deleteCourseDocument(filePath)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { error } = await supabase.storage.from("courses").update(filePath, file);
  console.log(error)
  if (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { errors } = await supabase.storage.from("courses").remove(filePath);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { error } = await supabase.storage.from("courses").upload(filePath, file);
  }
  const { data } = supabase.storage.from("courses").getPublicUrl(filePath);

  await updateCourseInsert(courseId, user)

  loading = false;
};

async function updateCourseInsert(courseId: bigint, user: User, supabase) {
  try {
    const updates = {
      id: courseId,
      inserted_at: new Date(),
      created_by: user
    }
    const { error } = await supabase.from('courses')
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