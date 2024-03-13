<script lang="ts">
    import Settings from "$lib/components/Settings.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import {navStore} from "../../../../lib/stores/stores.js";
    import {onMount} from "svelte";
    import '$lib/styles/calendar.css'

    import Calendar from '@event-calendar/core';

    import TimeGrid from '@event-calendar/time-grid';
    import Interaction from '@event-calendar/interaction'
    import DayGrid from '@event-calendar/day-grid';
    import {page} from "$app/stores";
    export let data

    let { supabase, session, claim } = data
    $: ({ supabase, session, claim } = data)


    let user;
    $: user = $page.data.user;

    let plugins = [TimeGrid, Interaction, DayGrid];

    function createEvents() {
        let days = [];
        for (let i = 0; i < 7; ++i) {
            let day = new Date();
            let diff = i - day.getDay();
            day.setDate(day.getDate() + diff);
            days[i] = day.getFullYear() + "-" + _pad(day.getMonth()+1) + "-" + _pad(day.getDate());
        }

        return [
            {start: days[0] + " 00:00", end: days[0] + " 09:00", resourceId: 1, display: "background"},
            {start: days[1] + " 12:00", end: days[1] + " 14:00", resourceId: 2, display: "background"},
            {start: days[2] + " 17:00", end: days[2] + " 24:00", resourceId: 1, display: "background"},
            {start: days[0] + " 10:00", end: days[0] + " 14:00", resourceId: 1, title: "The calendar can display background and regular events", color: "#FE6B64"},
            {start: days[1] + " 16:00", end: days[2] + " 08:00", resourceId: 2, title: "An event may span to another day", color: "#B29DD9"},
            {start: days[2] + " 09:00", end: days[2] + " 13:00", resourceId: 2, title: "Events can be assigned to resources and the calendar has the resources view built-in", color: "#779ECB"},
            {start: days[3] + " 14:00", end: days[3] + " 20:00", resourceId: 1, title: "", color: "#FE6B64"},
            {start: days[3] + " 15:00", end: days[3] + " 18:00", resourceId: 1, title: "Overlapping events are positioned properly", color: "#779ECB"},
            {start: days[5] + " 10:00", end: days[5] + " 16:00", resourceId: 2, titleHTML: "You have complete control over the <i><b>display</b></i> of events…", color: "#779ECB"},
            {start: days[5] + " 14:00", end: days[5] + " 19:00", resourceId: 2, title: "…and you can drag and drop the events!", color: "#FE6B64"},
            {start: days[5] + " 18:00", end: days[5] + " 21:00", resourceId: 2, title: "", color: "#B29DD9"},
            {start: days[1], end: days[3], resourceId: 1, title: "All-day events can be displayed at the top", color: "#B29DD9", allDay: true}
        ];
    }
    function _pad(num) {
        let norm = Math.floor(Math.abs(num));
        return (norm < 10 ? '0' : '') + norm;
    }
    let options = {
        view: 'dayGridMonth',
        height: '800px',
        headerToolbar: {
            start: 'prev,next today',
            center: 'title',
            end: 'dayGridMonth,timeGridWeek,timeGridDay resourceTimeGridWeek'
        },
        buttonText: function (texts) {
            texts.resourceTimeGridWeek = 'resources';
            return texts;
        },
        resources: [
            {id: 1, title: 'Resource A'},
            {id: 2, title: 'Resource B'}
        ],
        scrollTime: '09:00:00',
        events: createEvents(),
        views: {
            timeGridWeek: {pointer: true},
            resourceTimeGridWeek: {pointer: true}
        },
        dayMaxEvents: true,
        nowIndicator: true,
        selectable: true
    };
    onMount(() => {
        // Set the selected item when the page is mounted
        navStore.set('calendar');
    });
</script>

<body class="bg-gray-600 antialiased bg-body text-body font-body">
<Navbar claim={claim}/>

<div class="mx-auto lg:ml-16">
    <section>
        <div class="sm:py-3 py-1 px-8 dark:bg-gray-700 bg-white">
            <div class="flex flex-wrap items-center justify-between -mx-2">
                <div class="lg:w-auto px-2 my-1 sm:my-2  ">
                    <h4 class="text-2xl font-bold dark:text-white  tracking-wide leading-7 mb-1">Calendar</h4>
                </div>
                <div class="lg:w-auto px-2">
                    <Settings bind:supabase={supabase} bind:user={user.data} bind:claim={claim}/>
                </div>
            </div>
        </div>
    </section>
    <section class="flex flex-col p-8 h-screen">
        <Calendar {plugins} {options} />
    </section>
</div>
</body>



