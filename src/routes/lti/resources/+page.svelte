<script lang="ts">
    import {page} from '$app/stores';
    import {onMount} from "svelte";
    import {TabItem, Tabs} from "flowbite-svelte";
    import {faExternalLink} from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa/src/fa.svelte';
    import {goto} from "$app/navigation";

    export let data

    let {supabase, claim, launch} = data
    $: ({supabase, claim, launch} = data)

    let resources = [{
        id: 'bcc927da-89a2-4fc2-9161-9557637e4143',
        title: 'template title1'
    }, {id: 'bcc927da-89a2-4fc2-9161-9557637e414', title: 'template title2'}, {
        id: 'bcc927da-89a2-4fc2-9161-9557637e41',
        title: 'template title3'
    }];

    let activeTab = 'Your Resources';
    let searchTerm = '';
    let sortBy = 'recentlyCreated'; // Default sort option

    let filteredResources = resources;

    function searchFilter(resource) {
        return resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || resource.id.toString().toLowerCase().includes(searchTerm.toLowerCase());
    }

    function sortResources() {
        if (sortBy === 'recentlyCreated') {
            filteredResources = [...filteredResources].sort((a, b) => (a.id > b.id ? 1 : -1));
        } else if (sortBy === 'recentlyUpdated') {
            filteredResources = [...filteredResources].sort((a, b) => (a.title > b.title ? 1 : -1));
        } else if (sortBy === 'recentlyUpdatedDesc') {
            filteredResources = [...filteredResources].sort((a, b) => (a.title < b.title ? 1 : -1));
        }
    }

    onMount(async () => {
        sortResources();

        try {
            const {user, session, error} = await supabase.auth.signInWithIdToken({
                provider: 'user_id',
                data: {user_id: launch.userInfo.id},
            });

            if (error) {
                throw error;
            }

            // Handle the successful sign-in
            console.log('User signed in:', user);
        } catch (error) {
            // Handle any errors during the sign-in process
            console.error('Error signing in:', error.message);
        }
    });

    console.log(launch)
</script>

<body class="dark:bg-gray-700  h-screen bg-gray-100 antialiased bg-body text-body font-body">
<div class=" text-white p-2">
    <div class="flex items-center justify-between p-4">
        <div class="flex items-center">
            <img alt="Logo" class="h-8 w-auto" src="/favicon.png">
            <span class="text-white text-lg font-bold ml-2 text-xl">Resources</span>
        </div>
        <div class="border-l-4 border-gray-600 pl-4"></div>
    </div>
    <div class="p-4">
        <div class="flex mb-4">
            <button class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    type="button" onclick="window.open('/d/workspaces/templates', '_blank')">
                Create
                <span class="inline-block align-middle ml-2">
                    <div>
                        <Fa icon={faExternalLink}/>
                    </div>
                </span>
            </button>

        </div>
        <Tabs {activeTab} let:activeTab>
            <TabItem open title="Your Resources">
                <input bind:value={searchTerm} class="border border-gray-400 p-2 mr-2 bg-gray-600 rounded-md"
                       placeholder="Search resources..." type="text">
                <select bind:value={sortBy} class="border border-gray-400 rounded-md p-2 bg-gray-600">
                    <option value="recentlyCreated">Recently Created</option>
                    <option value="recentlyUpdated">Recently Updated (Ascending)</option>
                    <option value="recentlyUpdatedDesc">Recently Updated (Descending)</option>
                </select>

                <ul class="list-disc list-inside pt-2">
                    {#each filteredResources as resource (resource.id)}
                        <li class="text-white text-lg py-1 ">
                            <span>{resource.title}</span>
                        </li>
                    {/each}
                </ul>
            </TabItem>
            <TabItem title="Explore">
                Explore
            </TabItem>
        </Tabs>
    </div>
</div>
</body>
