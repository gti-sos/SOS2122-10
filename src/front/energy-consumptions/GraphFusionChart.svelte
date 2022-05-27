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

                //Dato del año
                categorias.push({ label: json[i].country.toString()+ " " +json[i].year.toString()});

                //Dato de acceso a la electricidad
                total.push({value: json[i].percentages_access_elecetricity});

                //Dato de energia no renovable consumida
                nrenewable.push({value: json[i].non_renewable_energy_consumptions});
                
                //Dato de energia renovable consumida
                renewable.push({value: json[i].renewable_energy_consumptions});
            }
            await delay(1000);
            dataSource = {
                chart: {
                    caption: "Consumo de Energía Renovable y no Renovable",
                    numbersuffix: " %",
                    showsum: "1",
                    plottooltext:
                        "$label <b>$dataValue</b> $seriesName",
                    theme: "fusion",
                    drawcrossline: "1",
                },
                categories: [
                    {
                        category: categorias,
                    },
                ],
                dataset: [
                    {
                        seriesname: "Acceso a la electricidad",
                        data: total,
                    },
                    {
                        seriesname: "Energía No Renovable Consumida",
                        data: nrenewable,
                    },
                    {
                        seriesname: "Energía Renovable Consumida",
                        data: renewable,
                    },
                ]
            };
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
        chartConfigs = {
            type: "stackedcolumn2d",
            width: 1000,
            height: 600,
            dataFormat: "json",
            dataSource,
        };
    }
    onMount(getData);
</script>

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
    <SvelteFC {...chartConfigs} />
</div>
       
