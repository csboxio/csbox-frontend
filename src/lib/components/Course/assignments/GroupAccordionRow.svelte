<script>
    import {goto, invalidateAll} from "$app/navigation";
    import Fa from 'svelte-fa/src/fa.svelte';
    import {
        faAdd, faCheckCircle,
        faCircleCheck, faCircleExclamation, faCircleXmark,
        faGear, faGripVertical,
        faLayerGroup,
        faObjectGroup,
        faPencil, faStop,
        faTable
    } from "@fortawesome/free-solid-svg-icons";
    import {addHours, addMinutes, format, parseISO} from "date-fns";
    import { draw } from 'svelte/transition';


    export let assignment_id
    export let slug
    export let title
    export let due
    export let points
    export let claim
    export let published

    function handleAssignment(id) {
        goto('/d/courses/' + slug + '/assignments/' + id);
    }

    async function publishAssignment(assignment_id) {
        published = !published
        const url = new URL('/api/assignments/publish/', window.location.origin);
        url.searchParams.append('assignment_id', assignment_id);
        const response = await fetch(url);
        const { res, error, status } = await response.json();
        //console.log(published)
        await invalidateAll();
    }

    async function unpublishAssignment(assignment_id) {
        published = !published
        const url = new URL('/api/assignments/unpublish/', window.location.origin);
        url.searchParams.append('assignment_id', assignment_id);
        const response = await fetch(url);
        const { res, error, status } = await response.json();

        await invalidateAll();
    }

    let parsedDate = new Date(due);
    let offsetMinutes = parsedDate.getTimezoneOffset();

    const adjustedDate = addMinutes(parsedDate, offsetMinutes)
    const formattedDate = format(adjustedDate, "MMM dd hh:mm a")

    let in24Hours = new Date(due);
    in24Hours.setHours(in24Hours.getHours() + 24);

</script>

<a>
    <div class="py-2 pl-4 pr-3 flex items-center text-md text-gray-200 hover:text-white hover:bg-gray-500 text-white border-t-2 border-gray-500"
         on:click={() => { handleAssignment(assignment_id) }} >
        {#if claim === 'instructor'}
        <div class="pr-8 cursor-move">
            <Fa class="inline-block text-gray-100" icon={faGripVertical} />
        </div>
        {/if}
        <div class="pr-3">
            <Fa class="inline-block" icon={faPencil} />
        </div>
        <div>
            {title === '' ? 'Assignment Error..' : title}
            <div class="text-gray-200 text- font-normal space-x-1 text-xs/loose">
                <div class="inline-block">
                    <b>Due</b>
                    {formattedDate}
                </div>
                <div class="inline-block">
                    |
                </div>
                <div class="inline-block">{points ? points : "0"} points</div>
            </div>
        </div>
        <div class="ml-auto">
            {#if claim !== 'student'}
                {#key published}
                    <!-- Published button-->
                    <div class="w-8 transform transition text-gray-300"
                         class:text-green-500={published}>
                        {#if !published}
                            <div class="hover:text-white" on:click|stopPropagation={async () => { await publishAssignment(assignment_id); }}>
                                <Fa icon={faCircleXmark}></Fa>
                            </div>
                        {:else}
                            <div class="hover:text-white" on:click|stopPropagation={async () => { await unpublishAssignment(assignment_id); }}>
                                <Fa icon={faCheckCircle}></Fa>
                            </div>
                        {/if}
                    </div>
                    <!-- End of published button -->
                {/key}
            {/if}

            {#if claim === 'student'}

                {#if (adjustedDate < new Date())}
                    <div class="text-red-500 pr-2" title="Past due date.">
                    <Fa icon={faCircleExclamation}></Fa>
                    </div>
                {/if}
            {/if}
        </div>
    </div>
</a>