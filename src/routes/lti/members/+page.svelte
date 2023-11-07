<script lang="ts">
	import { page } from '$app/stores';
    import {onMount} from "svelte";
	export let data

	let { supabase, claim, members } = data
	$: ({ supabase, claim, members } = data)

    console.log(members)

</script>

<body class="dark:bg-gray-600  bg-gray-100 antialiased bg-body text-body font-body">

    <div class="container mx-auto p-6">
        <div class="p-4">
            <h2 class="text-xl font-bold mb-4">Course Information:</h2>
            <p><span class="font-semibold">Course ID:</span> {members.data.id}</p>
            <p><span class="font-semibold">Context ID:</span> {members.data.context.id}</p>
            <p><span class="font-semibold">Context Label:</span> {members.data.context.label}</p>
            <p><span class="font-semibold">Course Title:</span> {members.data.context.title}</p>

            <h2 class="text-xl font-bold mt-6 mb-4">Members:</h2>
            {#each members.data.members as member}
                <div class="border p-4 my-2 rounded-lg bg-white">
                    <p><span class="font-semibold">Name: </span>{member.name}</p>
                    <p><span class="font-semibold">Email: </span>{member.email}</p>
                    <p><span class="font-semibold">Status: </span>{member.status}</p>
                    <img class="h-10 w-10 rounded-full my-2" src={member.picture} alt="User Avatar" />
                    <p><span class="font-semibold">Roles: </span>{member.roles.join(", ")}</p>
                </div>
            {/each}
        </div>
    </div>


</body>
