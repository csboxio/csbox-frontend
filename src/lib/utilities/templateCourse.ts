import {updateCourseInsert} from "./quill.js";
import {v4 as uuidv4} from 'uuid';

export const createPlaceHolderCourseDocument = async (courseId: bigint, user: any, supabase) => {
    const file = new File(["<h2>Welcome to this course's Home Page!</h2> <br> <b>Click edit</b> to change this!"], 'home.HTML');

    const dataTransfer = new DataTransfer();

    dataTransfer.items.add(file);

    // Delete old html from block storage
    const filePath = `${courseId + "/" + "document/" + "home"}.HTML`;
    const { error } = await supabase.storage.from("courses").upload(filePath, file);
    const { data } = supabase.storage.from("courses").getPublicUrl(filePath);

    console.log(error, courseId, user, supabase)
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

    return _assignment_id
};


export const createPlaceHolderGroup = async (courseId: bigint, user: any, supabase) => {
    
    const g_id = uuidv4()
    if (user != null) {
        const updates = {
            id: g_id,
            user_id: user,
            course_id: courseId,
            group_title: "Sample Group"
        }
        const {error} = await supabase.from('groups').upsert(updates)
        console.log(error)
    }
    return g_id;
}

export const addPlaceHolderAssignmentToPlaceHolderGroup  = async (courseId: bigint, user: any, supabase, assignment_id, group_id) => {
    if (user != null) {
        const updates = {
            in_group: group_id
        }
        const {error} = await supabase.from('assignments').update(updates)
            .eq('user_id', user)
            .eq('course_id', courseId)
            .eq('assignment_id', assignment_id)

        console.log(error)
    }
}

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
    await createPlaceHolderCourseDocument(courseId, user_id, supabase);
    const a_id = await createPlaceHolderAssignment(courseId, user_id, supabase);
    const g_id = await createPlaceHolderGroup(courseId, user_id, supabase);
    await addPlaceHolderAssignmentToPlaceHolderGroup(courseId, user_id, supabase, a_id, g_id);

}