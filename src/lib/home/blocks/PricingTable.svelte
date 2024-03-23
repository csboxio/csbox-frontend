<script lang="ts">
    import { Section, PricingBodyHead, PricingCard, PricingItemWrapper, PricingHead, PricingItem } from "flowbite-svelte-blocks";
    import { Button } from "flowbite-svelte";
</script>

    <div class="max-w-lg mx-auto grid gap-6 sm:grid-cols-1 lg:grid-cols-3 lg:max-w-none">
        <PricingCard>
            <!-- Placeholder Image -->
            <img src="placeholder_image.jpg" alt="Placeholder Image" class="mx-auto h-32 w-auto" />

            <PricingBodyHead pClass="text-gray-200">
                <svelte:fragment slot="h3">Organization</svelte:fragment>
                <svelte:fragment slot="paragraph">Pay per student head, allows entry into organization, includes support and services for organizations.</svelte:fragment>
            </PricingBodyHead>
            <div class="py-8">
            <PricingItemWrapper>
                <PricingItem class="text-gray-200 dark:text-gray-200">
                    <span class="ml-2 text-white">Organization Management Dashboard</span>
                </PricingItem>
                <PricingItem class="text-gray-200 dark:text-gray-200">
                    <span class="ml-2 text-white">Integration with any Learning Management System</span>
                </PricingItem>
                <PricingItem class="text-gray-200 dark:text-gray-200">
                    <span class="ml-2 text-white">Priority Support</span>
                </PricingItem>
                <PricingItem class="text-gray-200 dark:text-gray-200">
                    <span class="ml-2 text-white">Training Sessions</span>
                </PricingItem>
            </PricingItemWrapper>
            </div>
            <svelte:fragment slot="btn">
                <Button color="blue-600">Start trial</Button>
            </svelte:fragment>
        </PricingCard>

        <PricingCard>
            <!-- Placeholder Image -->
            <img src="placeholder_image.jpg" alt="Placeholder Image" class="mx-auto h-32 w-auto" />

            <PricingBodyHead pClass="text-gray-200">
                <svelte:fragment slot="h3">Individual - Plus Plan</svelte:fragment>
                <svelte:fragment slot="paragraph">Pay per student head, allows entry into organization, includes support and services for organizations.</svelte:fragment>
                <svelte:fragment slot="price">
                    <span class="mr-2 text-5xl font-bold text-gray-100">$9.99</span>
                    <span class="text-gray-200 dark:text-gray-200">/month (per seat)</span>
                </svelte:fragment>
            </PricingBodyHead>
            <PricingItemWrapper>
                <PricingItem class="text-gray-200 dark:text-gray-200">
                    <span class="ml-2 text-white">Organization Management Dashboard</span>
                </PricingItem>
                <PricingItem class="text-gray-200 dark:text-gray-200">
                    <span class="ml-2 text-white">Integration with any Learning Management System</span>
                </PricingItem>
                <PricingItem class="text-gray-200 dark:text-gray-200">
                    <span class="ml-2 text-white">Priority Support</span>
                </PricingItem>
                <PricingItem class="text-gray-200 dark:text-gray-200">
                    <span class="ml-2 text-white">Training Sessions</span>
                </PricingItem>
            </PricingItemWrapper>
            <svelte:fragment slot="btn">
                <Button color="blue-600">Start trial</Button>
            </svelte:fragment>
        </PricingCard>

        <PricingCard>
            <!-- Placeholder Image -->
            <img src="placeholder_image.jpg" alt="Placeholder Image" class="mx-auto h-32 w-auto" />

            <PricingBodyHead pClass="text-gray-200">
                <svelte:fragment slot="h3">Organization</svelte:fragment>
                <svelte:fragment slot="paragraph">Pay per student head, allows entry into organization, includes support and services for organizations.</svelte:fragment>
                <svelte:fragment slot="price">
                    <span class="mr-2 text-5xl font-bold text-gray-100">$9.99</span>
                    <span class="text-gray-200 dark:text-gray-200">/month (per seat)</span>
                </svelte:fragment>
            </PricingBodyHead>
            <PricingItemWrapper>
                <PricingItem class="text-gray-200 dark:text-gray-200">
                    <span class="ml-2 text-white">Organization Management Dashboard</span>
                </PricingItem>
                <PricingItem class="text-gray-200 dark:text-gray-200">
                    <span class="ml-2 text-white">Integration with any Learning Management System</span>
                </PricingItem>
                <PricingItem class="text-gray-200 dark:text-gray-200">
                    <span class="ml-2 text-white">Priority Support</span>
                </PricingItem>
                <PricingItem class="text-gray-200 dark:text-gray-200">
                    <span class="ml-2 text-white">Training Sessions</span>
                </PricingItem>
            </PricingItemWrapper>
            <svelte:fragment slot="btn">
                <Button color="blue-600">Start trial</Button>
            </svelte:fragment>
        </PricingCard>

    </div>


