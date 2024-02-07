<script lang="ts">
    import Fa from 'svelte-fa/src/fa.svelte';
    import {
        faAngleDown, faAngleUp, faBell,
        faBook, faFileCircleExclamation, faFileCircleXmark,
        faPeopleGroup, faUserGraduate
    } from "@fortawesome/free-solid-svg-icons";

    let notifications
    $: notifications;

    import {onMount} from "svelte";

    onMount(async () => {
        const storedNotifications = localStorage.getItem('storedNotifications');

        if(storedNotifications != 'undefined') {
            notifications = JSON.parse(storedNotifications);
        }
    });

</script>

<div class="flex flex-wrap -mx-3">
    <div class="w-full lg:w-1/3 px-3 mb-6 lg:mb-0">
        <div class="h-full py-6 px-4 sm:px-6 bg-gray-500 rounded-xl drop-shadow-xl">
            <h4 class="text-lg text-gray-100 font-semibold mb-6">Notifications</h4>

            {#if notifications}
                {#each notifications.data.all_notifications.notifications as notification, id}
                    <a class="flex p-4 items-center justify-between hover:bg-gray-600 rounded-xl transition duration-150" href={'#'}>
                        <div class="flex items-center pr-2">
                            <div class="flex w-10 h-10 mr-3 items-center justify-center bg-gray-400 bg-opacity-20 text-gray-200 rounded-xl">
                                <Fa icon={faBell} />
                            </div>
                            <div>
                                <h5 class="text-sm text-gray-100 leading-5 font-medium mb-1">{notification.title}</h5>
                                <p class="text-xs text-gray-300 font-semibold">{notification.message}</p>
                            </div>
                        </div>
                        <svg fill="none" height="18" viewbox="0 0 4 18" width="4" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 4C2.39556 4 2.78224 3.8827 3.11114 3.66294C3.44004 3.44318 3.69639 3.13082 3.84776 2.76537C3.99914 2.39992 4.03874 1.99778 3.96157 1.60982C3.8844 1.22186 3.69392 0.865492 3.41421 0.585787C3.13451 0.306082 2.77814 0.115601 2.39018 0.0384303C2.00222 -0.0387401 1.60009 0.000866562 1.23463 0.152242C0.869182 0.303617 0.556825 0.559962 0.337062 0.88886C0.117299 1.21776 1.07779e-06 1.60444 1.07779e-06 2C1.07779e-06 2.53043 0.210715 3.03914 0.585788 3.41421C0.960861 3.78929 1.46957 4 2 4ZM2 14C1.60444 14 1.21776 14.1173 0.888861 14.3371C0.559963 14.5568 0.303617 14.8692 0.152242 15.2346C0.000866562 15.6001 -0.0387401 16.0022 0.0384303 16.3902C0.115601 16.7781 0.306083 17.1345 0.585788 17.4142C0.865493 17.6939 1.22186 17.8844 1.60982 17.9616C1.99778 18.0387 2.39992 17.9991 2.76537 17.8478C3.13082 17.6964 3.44318 17.44 3.66294 17.1111C3.8827 16.7822 4 16.3956 4 16C4 15.4696 3.78929 14.9609 3.41421 14.5858C3.03914 14.2107 2.53043 14 2 14ZM2 7C1.60444 7 1.21776 7.1173 0.888861 7.33706C0.559963 7.55682 0.303617 7.86918 0.152242 8.23463C0.000866562 8.60009 -0.0387401 9.00222 0.0384303 9.39018C0.115601 9.77814 0.306083 10.1345 0.585788 10.4142C0.865493 10.6939 1.22186 10.8844 1.60982 10.9616C1.99778 11.0387 2.39992 10.9991 2.76537 10.8478C3.13082 10.6964 3.44318 10.44 3.66294 10.1111C3.8827 9.78224 4 9.39556 4 9C4 8.46957 3.78929 7.96086 3.41421 7.58579C3.03914 7.21071 2.53043 7 2 7Z" fill="#3D485B"/>
                        </svg>
                    </a>
                {/each}
            {/if}


        </div>
    </div>
    <div class="w-full lg:w-2/3 px-3">
        <div class="h-full p-6 bg-gray-500 rounded-xl">
            <h4 class="text-lg text-gray-100 font-semibold mb-6">Latest Submissions</h4>
            <div class="w-full mt-6 pb-4 overflow-x-auto">
                <table class="w-full min-w-max">
                    <thead>
                    <tr class="text-left">
                        <th class="p-0">
                            <div class="py-3 px-6 rounded-l-xl bg-gray-600">
                                <span class="text-xs text-gray-300 font-semibold">CLASS</span>
                            </div>
                        </th>
                        <th class="p-0">
                            <div class="py-3 px-6 bg-gray-600">
                                <span class="text-xs text-gray-300 font-semibold">STUDENT</span>
                            </div>
                        </th>
                        <th class="p-0">
                            <div class="py-3 px-6 bg-gray-600">
                                <button
                                        class="inline-flex items-center text-xs text-gray-300 font-semibold"
                                >
                                    <span class="mr-2">DATE</span>
                                    <svg
                                            fill="none"
                                            height="14"
                                            viewbox="0 0 10 14"
                                            width="10"
                                            xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                                d="M7.8598 8.52669L4.9998 11.3934L2.1398 8.52669C2.01426 8.40115 1.844 8.33063 1.66646 8.33063C1.48893 8.33063 1.31867 8.40115 1.19313 8.52669C1.0676 8.65222 0.99707 8.82249 0.99707 9.00002C0.99707 9.17756 1.0676 9.34782 1.19313 9.47335L4.52646 12.8067C4.58844 12.8692 4.66217 12.9188 4.74341 12.9526C4.82465 12.9865 4.91179 13.0039 4.9998 13.0039C5.08781 13.0039 5.17494 12.9865 5.25618 12.9526C5.33742 12.9188 5.41116 12.8692 5.47313 12.8067L8.80646 9.47335C8.86862 9.41119 8.91793 9.3374 8.95157 9.25619C8.98521 9.17497 9.00252 9.08793 9.00252 9.00002C9.00252 8.91211 8.98521 8.82507 8.95157 8.74385C8.91793 8.66264 8.86862 8.58885 8.80646 8.52669C8.7443 8.46453 8.67051 8.41522 8.5893 8.38158C8.50808 8.34794 8.42104 8.33063 8.33313 8.33063C8.24522 8.33063 8.15818 8.34794 8.07696 8.38158C7.99575 8.41522 7.92196 8.46453 7.8598 8.52669ZM2.1398 5.47335L4.9998 2.60669L7.8598 5.47335C7.92177 5.53584 7.99551 5.58544 8.07675 5.61928C8.15799 5.65313 8.24512 5.67055 8.33313 5.67055C8.42114 5.67055 8.50828 5.65313 8.58952 5.61928C8.67075 5.58544 8.74449 5.53584 8.80646 5.47335C8.86895 5.41138 8.91855 5.33764 8.95239 5.2564C8.98624 5.17517 9.00366 5.08803 9.00366 5.00002C9.00366 4.91201 8.98624 4.82488 8.95239 4.74364C8.91855 4.6624 8.86895 4.58866 8.80646 4.52669L5.47313 1.19335C5.41116 1.13087 5.33742 1.08127 5.25618 1.04743C5.17494 1.01358 5.08781 0.996155 4.9998 0.996155C4.91179 0.996155 4.82465 1.01358 4.74341 1.04743C4.66217 1.08127 4.58844 1.13087 4.52646 1.19335L1.19313 4.52669C1.0676 4.65222 0.99707 4.82249 0.99707 5.00002C0.99707 5.17756 1.0676 5.34782 1.19313 5.47335C1.31867 5.59889 1.48893 5.66941 1.66646 5.66941C1.844 5.66941 2.01426 5.59889 2.1398 5.47335Z"
                                                fill="currentColor"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </th>
                        <th class="p-0">
                            <div class="py-3 px-5 rounded-r-xl bg-gray-600">
                                <span class="text-xs text-gray-300 font-semibold">STATUS</span>
                            </div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {#if false}
                        <tr>
                            <td class="p-0">
                                <div class="h-16 p-6">
                                    <h5 class="text-sm font-medium text-gray-100">X</h5>
                                </div>
                            </td>
                            <td class="p-0">
                                <div class="h-16 p-6">
                                    <div class="flex h-full items-center">
                                        <img alt="" class="w-8 h-8 mr-3 rounded-full object-cover" src="" />
                                        <span class="text-sm font-medium text-gray-100">X</span>
                                    </div>
                                </div>
                            </td>
                            <td class="p-0">
                                <div class="h-16 p-6">
                                    <span class="text-sm text-gray-100 font-medium">X</span>
                                </div>
                            </td>
                            <td class="p-0">
                                <div class="h-16 p-6">
                                    <div class="flex h-full items-center">
                                        <span class="inline-block w-2 h-2 mr-1 bg-yellow-500 rounded-full" />
                                        <span class="text-sm font-medium text-gray-100">X</span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        {:else}
                        <div class="px-4 py-2 text-white font-semibold">Nothing here yet...</div>
                    {/if}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>