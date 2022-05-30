<script>
    import FusionCharts from "fusioncharts";
    import Charts from "fusioncharts/fusioncharts.charts";
    import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
    import SvelteFC, { fcRoot } from "svelte-fusioncharts";
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    import {onMount} from 'svelte';
    import UncontrolledAlert from "sveltestrap/src/UncontrolledAlert.svelte";

    // Always set FusionCharts as the first parameter
    fcRoot(FusionCharts, Charts, FusionTheme);
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    var chartConfigs = {};
    var dataSource = {};
    let categorias = [];
    let total = [];
    let nrenewable = [];
    let renewable = [];

    let errorC = null;

    async function getData() {
        let res = await fetch(`/api/v2/energy-consumptions`);
        
        if (res.ok) {
            const json = await res.json();
            for (let i = 0; i < json.length; i++) {

                //Dato de acceso a la electricidad
                total.push({name: json[i].country.toString()+ " " +json[i].year.toString(), value: json[i].percentages_access_elecetricity});

                //Dato de energia no renovable consumida
                nrenewable.push({name: json[i].country.toString()+ " " +json[i].year.toString(), value: json[i].non_renewable_energy_consumptions});
                
                //Dato de energia renovable consumida
                renewable.push({name: json[i].country.toString()+ " " +json[i].year.toString(), value: json[i].renewable_energy_consumptions});
            }
            await delay(1000);
            
            loadGraph();
        } else {
            errorC = 404;
            total = [];
            nrenewable = [];
            renewable = [];
            await delay(1000);
            loadGraph();
        }
    }

    async function loadGraph() {
        Highcharts.chart('container', {
    chart: {
        type: 'packedbubble',
        height: '100%'
    },
    title: {
        text: 'Consumo de energia'
    },
    tooltip: {
        useHTML: true,
        pointFormat: '<b>{point.name}:</b> {point.value}%'
    },
    plotOptions: {
        packedbubble: {
            minSize: '30%',
            maxSize: '120%',
            zMin: 0,
            zMax: 1000,
            layoutAlgorithm: {
                splitSeries: false,
                gravitationalConstant: 0.02
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}',
                filter: {
                    property: 'y',
                    operator: '>',
                    value: 250
                },
                style: {
                    color: 'black',
                    textOutline: 'none',
                    fontWeight: 'normal'
                }
            }
        }
    },
    series: [{
        name: 'Total',
        data: total
    }, {
        name: 'No renovable',
        data: nrenewable
    }, {
        name: 'Renovable',
        data: renewable
    }]
});
    }
    onMount(getData);
</script>


<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>
{#if errorC === 404}
<UncontrolledAlert  color="danger" >
    Error al cargar los datos.
</UncontrolledAlert>
{/if}
<br />
<div align="left">
    <Button
        outline
        color="success"
        on:click={() => {
            pop();
        }}
    >
        Volver
    </Button>
    <figure class="highcharts-figure">
        <div id="container"></div>
    </figure>
    
</div>
       
