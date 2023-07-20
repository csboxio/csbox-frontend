

<script lang="ts">
const admin = true
</script>



{#if admin}
<body class="bg-gray-600 antialiased bg-body text-body font-body">
<div class="from-gray-500 to-gray-500 bg-gradient-to-br antialiased bg-body text-body font-body">
    <section class="py-3">
        <div class="container px-6 mx-auto">
            <div class="min-h-screen gap-4 flex justify-center items-center">
                <div class="flex justify-around i items-center w-full">
                    <div class="p-9 bg-gray-600 rounded-xl w-full">
                        <div
                                class="flex flex-wrap items-center justify-between -mx-4 mb-8 pb-6 border-b border-gray-400 border-opacity-20">
                            <div class="w-full sm:w-auto px-4 mb-6 sm:mb-0">
                                <h4 class="text-2xl font-bold tracking-wide text-white mb-1">Admin Dashboard</h4>

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
