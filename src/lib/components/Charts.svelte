<script >
  import { onMount } from 'svelte';

  let ApexCharts;
  let loaded = false;

  // Grade Over first chart left side
  let gradeOverview = {
    chart: {
      height: 250,
      type: "line",
      sparkline: {
        enabled: true
      },
    },
    colors: ['#2563EB', '#FACC15'],
    fill: {
      type: ['solid'],
      colors: ['#EBEAFC'],
    },
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    },
    series: [
      {
        name: "Average Grade %",
        // TODO Load from database data.
        data: [30, 40, 35, 50, 49],
      },
    ],
    xaxis: {
      categories: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
    stroke: {
      curve: 'smooth'
    },
  };

  const chart = (node, options) => {

    if (!loaded)
      return

    let myChart = new ApexCharts(node, options)
    myChart.render()

    return {
      update(options) {
        myChart.updateOptions(options)
      },
      destroy() {
        myChart.destroy()
      }
    }
  }

  onMount(async () => {
    const module = await import('apexcharts');
    ApexCharts = module.default;
    window.ApexCharts = ApexCharts
    loaded = true
  });

</script>

{#if loaded}
  <div use:chart={gradeOverview}></div>
{/if}