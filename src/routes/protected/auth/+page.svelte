

<script lang="ts">
    import {Button, Input} from "flowbite-svelte";
    import {Turnstile} from "svelte-turnstile";
    import {browser} from "$app/environment";

const admin = true
let password;

let token;
$: token;

    async function handleLogin() {

        const loginEndpoint = '/api/protected/auth';

        try {
            const formData = new FormData(this);
            const response = await fetch(loginEndpoint, {
                method: 'POST',
                body: formData,
                headers: {
                    'x-sveltekit-action': 'true',
                    'cache-control': 'max-age=1800'
                }

            });

            if (!response.ok) {
                console.log("error")
                return;
            }

            const data = await response.json();
            document.cookie = `protectedAuth=${data.token}; path=/;`;

            window.location.href = '/protected/admin';

        } catch (error) {
            console.error('Login failed:', error);

        }
    }
</script>



{#if admin}
<body class="bg-gray-600 antialiased bg-body text-body font-body">
<div class="from-gray-500 to-gray-500 bg-gradient-to-br antialiased bg-body text-body font-body">
    <section class="py-3">
        <div class="container px-6 mx-auto">
            <div class="min-h-screen gap-4 flex justify-center items-center">
                <div class="flex justify-around i items-center w-full">
                    <div class="p-9 bg-gray-600 rounded-xl w-full">
                        <div class="flex flex-wrap items-center justify-between -mx-4 mb-8 pb-6 border-b border-gray-400 border-opacity-20">
                            <div class="w-full sm:w-auto px-4 mb-6 sm:mb-0">
                                <h4 class="text-2xl font-bold tracking-wide text-white mb-1">Admin Dashboard</h4>
                                <form on:submit|preventDefault="{handleLogin}" class="">
                                    <label class="text-white p-2">
                                        Master Password:
                                        <Input id="password" name="password" type="password" bind:value={password} />
                                    </label>


                                    <Button type="submit" color="blue" class="text-white my-2">Submit</Button>

                                    {#if browser}
                                    <Turnstile siteKey="0x4AAAAAAAFpCF8-h1TYQKHV" on:turnstile-callback={e => {token = e.detail.token}} />
                                    {/if}
                                </form>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
</body>
{/if}
