<script lang="ts">
    import FullCalendar, { type CalendarOptions } from 'svelte-fullcalendar';
    import daygridPlugin from '@fullcalendar/daygrid';

    let options: CalendarOptions = {
        initialView: 'dayGridMonth',
        plugins: [daygridPlugin]
    };
</script>

<FullCalendar {options} />