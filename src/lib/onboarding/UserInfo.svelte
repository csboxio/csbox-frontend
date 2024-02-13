<script>
    import {Input, Label} from "flowbite-svelte";

    export let user;

</script>

<div class="w-full px-3">
    <div class="relative  mx-4">
        <div class="">
            <div class="relative group">
                <div class="justify-center py-8 rounded-lg px-8 items-center">
                    <div class="flex flex-wrap -mx-10 -mb-6 text-white font-semibold">
                        <div class="grid grid-cols-1 gap-2 w-full text-white mb-6">
                            <div class="mb-6">
                                <Label for="first" class="block mb-2 text-white">First Name:</Label>
                                <Input id="first" name="first" class="w-full" required bind:value={user.first_name} />
                            </div>
                            <div class="mb-6">
                                <Label for="last_name" class="block mb-2 text-white">Last Name:</Label>
                                <Input id="last_name" name="last_name" class="w-full" required bind:value={user.last_name} />
                            </div>
                            <div class="mb-10">
                                <Label for="country" class="block mb-2 text-white">Country:</Label>
                                <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white" required>
                                    <option selected>Choose a country</option>
                                    <option value="US"> United States </option>
                                </select>
                            </div>
                            <div class="flex items-center mb-1 -pb-2">
                                <input id="age" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" required>
                                <label for="age" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I confirm that I am over the age of 13</label>
                            </div>

                            <div class="flex items-center mb-1">
                                <input id="aup" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" required>
                                <label for="aup" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I read and agree with the </label>
                                <a href="/legal/aup" class="text-sm hover:underline px-2"> Acceptable Use Policy</a>
                            </div>

                            <div class="flex items-center mb-1">
                                <input id="privacy" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" required>
                                <label for="privacy" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I read and agree with the </label>
                                <a href="/legal/privacy" class="text-sm hover:underline px-2"> Privacy Policy</a>
                            </div>

                            <div class="flex items-center mb-4">
                                <input id="terms" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" required>
                                <label for="terms" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I read and agree with the </label>
                                <a href="/legal/terms" class="text-sm hover:underline px-2"> Terms and Conditions</a>
                            </div>
                        </div>
                        <div class="w-full mb-2 items-center text-center">
                            <button class="py-2 px-4 text-md font-semibold leading-normal text-white bg-blue-500 hover:bg-blue-700 rounded-lg transition duration-200">
                                Complete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>