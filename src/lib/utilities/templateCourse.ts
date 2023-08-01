import {updateCourseInsert} from "./quill.js";


export const createPlaceHolderCourseDocument = async (courseId: bigint, user: any, supabase) => {
    const file = new File(["<h2>Welcome to this course's Home Page!</h2> <br> <b>Click edit</b> to change this!"], 'home.HTML');

    const dataTransfer = new DataTransfer();

    dataTransfer.items.add(file);

    // Delete old html from block storage
    const filePath = `${courseId + "/" + "document/" + "home"}.HTML`;
    const { error } = await supabase.storage.from("courses").upload(filePath, file);
    const { data } = supabase.storage.from("courses").getPublicUrl(filePath);
    await updateCourseInsert(courseId, user, supabase)

    return 'Okay'
};

export const createPlaceHolderAssignment = async (courseId: bigint, user: any, supabase) => {
    const _assignment_id = Math.floor(Math.random() * 9999999999)
    try {
    const updates = {
        p_assignment_id: _assignment_id,
        p_user_id: user,
        p_course_id: courseId,
        p_points: '0',
        p_display_as: 'Points',
        p_due: new Date(),
        p_title: 'Sample Assignment',
        p_category: '',
        p_description: 'Sample Assignment Description',
        p_submission_type: 'Points',
        p_submission_attempts: null,
        p_in_module: null,
        p_available_start: new Date(),
        p_available_end: new Date()
    }

    const { data, error } = await supabase.rpc('create_assignment', updates)

    } catch (e) {
        console.log(e)
    }
};

export const createPlaceHolderAssignmentDocument = async (courseId: bigint, user: any, supabase) => {
    const file = new File(["<h2>Welcome to this course's Home Page!</h2> <br> <b>Click edit</b> to change this!"], 'home.HTML');

    const dataTransfer = new DataTransfer();

    dataTransfer.items.add(file);

    // Delete old html from block storage
    const filePath = `${courseId + "/" + "document/" + "home"}.HTML`;
    const { error } = await supabase.storage.from("courses").update(filePath, file);
    console.log(error)
    if (error) {
        const { errors } = await supabase.storage.from("courses").remove(filePath);
        const { error } = await supabase.storage.from("courses").upload(filePath, file);
    }
    const { data } = supabase.storage.from("courses").getPublicUrl(filePath);
    await updateCourseInsert(courseId, user, supabase)
};


export async function createTemplateCourseData(courseId, supabase, user_id) {
    console.log(courseId, user_id)
    await createPlaceHolderCourseDocument(courseId, user_id, supabase);
    await createPlaceHolderAssignment(courseId, user_id, supabase);
}