import { supabaseClient } from "$lib/utilities/supabaseClient";
import type { User } from "@supabase/supabase-js";
import { resizeFile } from "$lib/utilities/image";
import { browser } from "$app/environment";
import {deleteImage, updateCourse} from "./imageStorage";

let loading;

export const downloadCourseDocument = async (filePath: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { data } = await supabaseClient.storage.from('/public/courses').download(filePath)
    // Check if null
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const text = await new Response(data).text();

    return text
}

export const deleteCourseDocument = async (filePath: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { data } = await supabaseClient.storage.from('courses').remove(filePath)
    // Check if null
    if (data == null) {
        return
    }
}

export const uploadCourseDocument = async (files: FileList, courseId: bigint) => {
        loading = true;
        if (!files || files.length === 0) {
            throw new Error('You must select an image to upload.')
        }
        // Delete old html from block storage
        const filePath = `${courseId + "/" + "document/" + "home"}.HTML`
        //await deleteCourseDocument(filePath)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { error } = await supabaseClient.storage.from('courses').update(filePath, files,
            {
                cacheControl: '60',
                // Overwrite file if it exists
                upsert: true
            })
    console.log(error)
        if (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const { errors } = await supabaseClient.storage.from('courses').remove(filePath)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
            const { error } = await supabaseClient.storage.from('courses').upload(filePath, files)
        }
        const { data } = supabaseClient.storage.from('courses').getPublicUrl(filePath)
        loading = false;
}