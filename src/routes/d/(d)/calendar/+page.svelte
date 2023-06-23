<script lang="ts">
    import Settings from "$lib/components/Settings.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import {navStore} from "../../../../lib/stores/stores.js";
    import {onMount} from "svelte";

    import Calendar from '@event-calendar/core';
    import TimeGrid from '@event-calendar/time-grid';
    import Interaction from '@event-calendar/interaction'
    import DayGrid from '@event-calendar/day-grid';


    let plugins = [TimeGrid, Interaction, DayGrid];
    let options = {
        view: 'timeGridWeek',
        events: [
            // your list of events
        ]
    };

    onMount(() => {
        // Set the selected item when the page is mounted
        navStore.set('calendar');
    });
</script>

<body class="bg-gray-600 antialiased bg-body text-body font-body">
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
        <Calendar {plugins} {options} />
    </section>
</div>

</body>