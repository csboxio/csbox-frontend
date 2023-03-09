<script>
    let model;
    export let data;
    let course_data = data.courseData

    import { quill } from "svelte-quill";

    const options = {
        modules: {
            toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                ["link", "code-block"]
            ]
        },
        placeholder: "Type something...",
        theme: "snow"
    }

    let content;


</script>
<div class="flex flex-row">
    <section class="p-1">
        <h4 class="text-xl font-bold text-white -mx-auto my-5">Home</h4>

        <div class="container mx-1 my-8 ">
            <div class="bg-white">


                <div class="editor bg-white"
                     use:quill={options}
                     on:text-change={e => content = e.detail}>
                </div>
            </div>
        </div>
    </section>
</div>
