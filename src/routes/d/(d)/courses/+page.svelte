<script lang="ts">
    import Settings from "$lib/components/Settings.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import {page} from "$app/stores";
    import {invalidateAll} from "$app/navigation";
    import {deserialize} from "$app/forms";
    import {Modal} from "flowbite-svelte";
    import Courses from "$lib/blocks/Courses.svelte";
    import {addNotification} from "../../../../lib/utilities/notifications.js";
    import {onMount} from "svelte";
    import {navStore} from "../../../../lib/stores/stores.js";

    let defaultModel = false;

    // this is needed for the outside click div, that needs to be redone
    let model;

    /** @type {import('./$types').PageData} */
    export let data;

    let courses;
    $: courses = data.courses.data;

    let hoverID;
    $: hoverID;
    let open = false;
    export let show_create_box;

    let code_invalid = false;
    $: code_invalid;
    let error_message = "Code Invalid.";

    async function handleSubmit(event) {
        const data = new FormData(this);
        const response = await fetch(this.action, {
            method: 'POST',
            body: data
        });
        const result = deserialize(await response.text());
        invalidateAll();
        if (result?.data.data === "Enrollment successful") {
            invalidateAll();
            defaultModel = false;

            const newNotification =
                {
                    title: "Enrolled! 🥳",
                    message: "Wait for your instructor to accept you."
                };

            addNotification(newNotification)
        }
        if (result?.data.error !== null) {
            if (result?.data.error.message === "Already Enrolled") {
                error_message = "Already Enrolled.";
                code_invalid = true;
            } else if (result?.data.error.message === "Enrollment unsuccessful") {
                error_message = "Code invalid.";
                code_invalid = true;
            }
        }
    }

    onMount(() => {
        // Set the selected item when the page is mounted
        navStore.set('courses');
    });
</script>

<body
        class="bg-gray-600 antialiased bg-body text-body font-body"
        on:click|stopPropagation={() => model.handleToggleMenuTopRight('outside')}
>

<Navbar/>
<div class="mx-auto lg:ml-20">
    <section>
        <div class="pt-5 pb-6 px-8 dark:bg-gray-700 bg-white">
            <div class="flex flex-wrap items-center justify-between -mx-2">
                <div class="w-full lg:w-auto px-2 mb-6 lg:mb-0">
                    <h4 class="text-2xl font-bold dark:text-white  tracking-wide leading-7 mb-1">Courses</h4>
                </div>
                <div class="w-full lg:w-auto px-2">
                    <Settings />
                </div>
            </div>
        </div>
    </section>

    <section class="flex flex-col p-8 h-screen">
        <div>
            <!-- Join course button-->
            <button on:click={() => defaultModel = true}
                    class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm
							font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-500 to-blue-300
							group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white
							focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800">
						<span
                                class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white
							dark:bg-gray-600 rounded-md group-hover:bg-opacity-0">
							Join
						</span>
            </button>

            <!-- Model for join course -->
            <Modal title="Join Course" bind:open={defaultModel} class="">
                <form method="POST" action="?/joinCourse" on:submit|preventDefault={handleSubmit}
                      class="flex flex-col items-center justify-center h-full">
                    <div class="mb-6 p-2">
                        <input
                                type="text"
                                name="code"
                                id="code"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600
								 focus:border-primary-600 block  p-2.5 dark:bg-gray-100 dark:border-gray-500
								  dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Code"
                                required
                        />

                    </div>
                    {#if code_invalid}
                        <div class="flex p-2 mb-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                             role="alert">
                            <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor"
                                 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                      clip-rule="evenodd"></path>
                            </svg>
                            <span class="sr-only">Info</span>
                            <div>
                                <span class="font-medium">Failed!</span> {error_message}
                            </div>
                        </div>
                    {/if}
                    <div class="flex items-center justify-between">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit">
                            Join
                        </button>
                    </div>
                </form>

            </Modal>

            <a href="/d/courses/create">
                <button
                        class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-blue-300 to-blue-500 group-hover:from-blue-300 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-800"
                >
						<span
                                class="relative px-5 py-2.5 transition-all|local ease-in duration-75 bg-white dark:bg-gray-600 rounded-md group-hover:bg-opacity-0"
                        >
							Create
						</span>
                </button>
            </a>
        </div>
        <Courses bind:courses={courses} bind:hoverID={hoverID}/>
    </section>
</div>

</body>