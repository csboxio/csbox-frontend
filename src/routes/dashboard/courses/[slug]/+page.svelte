<script lang="ts">
    let model;
    export let data;
    let course_data = data.courseData
</script>
        <div class="flex flex-row">
            <section class="p-1">
            <div class="container m-12">
                <div class="flex flex-wrap -mx-12 -mb-6 text-white font-semibold">
                    {course_data.course_title}
                    {course_data.course_number}
                    {course_data.course_prefix}
                    {course_data.course_term}
                </div>
            </div>
        </section>
        </div>
