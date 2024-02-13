<!-- ProfileSetup.svelte -->
<script>
    import {applyAction, deserialize} from "$app/forms";
    import {goto, invalidate, invalidateAll} from "$app/navigation";
    import {StepIndicator} from "flowbite-svelte";
    import {loading} from "$lib/utilities/imageStorage";
    import {browser} from "$app/environment";
    import OrganizationRole from "$lib/onboarding/OrganizationRole.svelte";
    import ProfileImage from "$lib/onboarding/ProfileImage.svelte";
    import UserInfo from "$lib/onboarding/UserInfo.svelte";


    export let data
    let {supabase, session, org} = data
    $: ({supabase, session, org} = data)
    let uploading;


    let step = 1;

    let user = {
        first_name: '',
        last_name: '',
        email: '',
        country: '',
        website: '',
        bio: ''
    };

    async function handleSubmit(event) {
        const data = new FormData(this);
        const response = await fetch(this.action, {
            method: 'POST',
            body: data,
            headers: {
                'x-sveltekit-action': 'true',
            }
        });
        const result = deserialize(await response.text());
        await applyAction(result);
        await invalidateAll();
        if (result.type === 'redirect') {
            // re-run all `load` functions, following the successful update
            await goto('/d')
        }
        await goto('/d')
    }

    let steps = ['Step 1', 'Step 2'];
    let currentStep = 1;
    $: currentStep;

    let uploadedAvatarUrl;
    $: uploadedAvatarUrl;

    let files = [];
    let container;
    let image;
    let placeholder;
    let showImage = false;

    let selectedRole;

    function onChangePreview() {
        if (files.length > 0) {
            const file = files[0];
            console.log(file)
            showImage = true;

            const reader = new FileReader();

            reader.addEventListener("load", function () {
                image.setAttribute("src", reader.result);
            });
            reader.readAsDataURL(file);

            return;
        }
        showImage = false;
    }

    if (browser) {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code')
        if (code) {
            supabase.auth.exchangeCodeForSession(code);
            invalidate('supabase:auth');
        }
    }
</script>

<body class="bg-gray-800">
<div class="">
    <section class="">
        <div class="container px-6 mx-auto 2xl:w-[27%] xl:w-2/5 lg:w-2/3 md:w-2/3 sm:w-full">
            <div class="min-h-screen gap-4 flex justify-center items-center">
                <div class="flex justify-around i items-center w-full">
                    <div class="p-6 bg-gray-600 rounded-xl w-full">
                        <!--Header-->
                        <div class="flex flex-wrap items-center justify-between -mx-4 mb-8 pb-6 border-b border-gray-400 border-opacity-20">
                            <div class="w-full sm:w-auto px-4 mb-6 sm:mb-0">
                                <h4 class="text-2xl font-bold tracking-wide text-white mb-1">Onboarding</h4>
                            </div>
                        </div>

                        <div class="mb-8">
                            <StepIndicator color="blue" {currentStep} hideLabel {steps}/>
                        </div>

                        <form action="?/updateProfile" method="POST" on:submit|preventDefault={handleSubmit}>
                            {#if currentStep === 1}
                                <OrganizationRole bind:org={org} bind:selectedRole={selectedRole} bind:currentStep={currentStep} loading={loading}/>
                            {/if}
                            {#if currentStep === 2}
								<!--<ProfileImage bind:data={data} bind:currentStep={currentStep} loading={loading}/>-->
								<UserInfo bind:user={user}/>
                            {/if}
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
</body>

