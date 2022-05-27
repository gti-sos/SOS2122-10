<script>
    import { onMount } from "svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    import UncontrolledAlert from "sveltestrap/src/UncontrolledAlert.svelte";

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    let categorias = [];
    let total = [];
    let nrenewable = [];
    let renewable = [];
    let co2_tot = [];
    let co2_kg = [];
    let co2_tpc = [];
    let errorC = null;

    async function getData() {
        let resE;
        let resC;

        resE =  await fetch(`/api/v2/energy-consumptions`);
        await fetch(`/remoteApiCo2/loadInitialData`);
        resC = await fetch(`/remoteApiCo2`);

        if (resE.ok && resC.ok) {
            const jsonE = await resE.json();
            const jsonC = await resC.json();
            for (let i = 0; i < jsonE.length; i++) {
                categorias.push(jsonE[i].year.toString() + `-` + jsonE[i].country);
                total.push(jsonE[i].percentages_access_elecetricity);
                nrenewable.push(jsonE[i].non_renewable_energy_consumptions);
                renewable.push(jsonE[i].renewable_energy_consumptions);
                co2_tot.push(0);
                co2_kg.push(0);
                co2_tpc.push(0);
            }

            for (let i = 0; i < jsonC.length; i++) {
                categorias.push(jsonC[i].year.toString() + `-` + jsonC[i].country);
                total.push(0);
                nrenewable.push(0);
                renewable.push(0);
                co2_tot.push(jsonC[i].co2_tot);
                co2_kg.push(jsonC[i].co2_kg);
                co2_tpc.push(jsonC[i].co2_tpc);
            }

            await delay(1000);
            loadGraph();
        }else{
            errorC = 404;
            await delay(1000);
            loadGraph();
        }
    }

    async function loadGraph() {

        
        var options = {
            series: [
                {
                    name: "Acceso a la electricidad",
                    data: total,
                },
                {
                    name: "Energía No Renovable Consumida",
                    data: nrenewable,
                },
                {
                    name: "Energía Renovable Consumida",
                    data: renewable,
                },

                {
                    name: "Co2 por tpc",
                    data: co2_tpc,
                },

                {
                    name: "Co2 por kg",
                    data: co2_kg,
                },

                {
                    name: "Total Co2",
                    data: co2_tot,
                },
            ],
          chart: {
          height: 350,
          type: 'area'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'string',
          categories: categorias
        },
        tooltip: {
          x: {
            format: 'Porcentage y total'
          },
        },
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();

    }

    onMount(getData);
</script>

<svelte:head>
<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.js"></script>
</svelte:head>

<main>
    {#if errorC === 404}
        <UncontrolledAlert color="danger">
            Algunos datos no se obtuvieron correctamente.
        </UncontrolledAlert>
    {/if}
    <br />
    <div align="left">
        <Button outline color="success" on:click="{()=>{
            pop();
        }}">
        Volver
        </Button>
    </div>
    <br />
    <h3 style="text-align:center">Gráfica integrando datos CO2</h3>
    <div id="chart" />
</main>
