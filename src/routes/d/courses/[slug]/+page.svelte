<script lang="ts">
    let model;
    export let data;
    let course_data = data.courseData
</script>
<div class="flex flex-row">
    <section class="p-1">
        <div class="container mx-12 my-5">
            <h4 class="text-xl font-bold text-white -mx-10 my-5">Home</h4>

            <div class="flex flex-wrap -mx-10 -mb-6 text-white font-semibold">

                {course_data.course_title}
                {course_data.course_number}
                {course_data.course_prefix}
                {course_data.course_term}
            </div>
        </div>
    </section>
</div>
