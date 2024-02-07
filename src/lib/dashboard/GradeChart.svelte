<script>
    import Chart from "$lib/components/Charts.svelte";
</script>

<div class="mb-6 ">
    <div class="flex flex-wrap -mx-3">
        <div class="w-full lg:w-2/3 px-3 mb-6 lg:mb-0">
            <div class="p-6 bg-gray-500 rounded-xl drop-shadow-xl">
                <div class="flex flex-wrap -mx-4 -mb-4 justify-between items-center">
                    <div class="w-auto px-4 mb-4">
                        <h4 class="text-gray-100 font-bold tracking-wide">Grade Overview</h4>
                    </div>
                    <div class="w-auto px-4 mb-4">
                        <div class="flex items-center">
                            <div class="mr-4">
                                <span class="inline-block w-2 h-2 mr-1 bg-blue-500 rounded-full"></span>
                                <span class="text-xs text-gray-300">Bottom 25%</span>
                            </div>
                            <div class="mr-6">
                                <span class="inline-block w-2 h-2 mr-1 bg-purple-500 rounded-full"></span>
                                <span class="text-xs text-gray-300">Top 25%</span>
                            </div>
                            <div class="relative inline-block bg-gray-600 rounded-xl">
                                <select
                                        class="relative py-3 pl-2 pr-6 cursor-pointer bg-transparent text-xs text-gray-300 font-semibold appearance-none outline-none"
                                        id=""
                                        name=""
                                        style="z-index: 1;"
                                >
                                    <option value="">Last 7 days</option>
                                    <option value="">Last Month</option>
                                </select>
                                <span class="absolute top-1/2 right-0 mr-2 transform -translate-y-1/2" style="z-index: 0;"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                        class="chart mt-8 mb-3 overflow-x-hidden overflow-y-hidden block"
                        data-type="columns-thin"
                        data-variant="two"
                        style="min-height: 200px;"
                >
                    <Chart />
                </div>
            </div>
        </div>
        <div class="w-full lg:w-1/3 px-3">
            <div class="p-6 bg-gray-500 rounded-xl drop-shadow-xl">
                <h4 class="text-gray-100 font-bold tracking-wide mb-8">
                    Average grade by category
                </h4>
                <div class="chart mb-10" data-type="donut" style="min-height: 180px;"></div>
                <div class="flex flex-wrap px-4 items-center justify-between">
                    <div class="text-center">
                        <span class="inline-block w-2 h-2 mb-2 bg-blue-500 rounded-full"></span>
                        <h6 class="text-xs text-gray-300 font-semibold">Assignments</h6>
                        <h5 class="text-2xl text-gray-100 font-semibold">65%</h5>
                    </div>
                    <div class="text-center">
                        <span class="inline-block w-2 h-2 mb-2 bg-purple-500 rounded-full"></span>
                        <h6 class="text-xs text-gray-300 font-semibold">Assessments</h6>
                        <h5 class="text-2xl text-gray-100 font-semibold">20%</h5>
                    </div>
                    <div class="text-center">
                        <span class="inline-block w-2 h-2 mb-2 bg-yellow-500 rounded-full"></span>
                        <h6 class="text-xs text-gray-300 font-semibold">Quizzes</h6>
                        <h5 class="text-2xl text-gray-100 font-semibold">15%</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>