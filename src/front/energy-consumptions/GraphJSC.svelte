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
    let errorC = null;

    async function getData() {
        let  res = await fetch(`/api/v2/energy-consumptions`);

        if (res.ok) {
            const json = await res.json();
            for (let i = 0; i < json.length; i++) {
                categorias.push(json[i].country.toString() + " " +json[i].year.toString());
                total.push(json[i].percentages_access_elecetricity);
                nrenewable.push(json[i].non_renewable_energy_consumptions);
                renewable.push(json[i].renewable_energy_consumptions);
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
        JSC.chart("chartDiv", {
            debug: true,
            defaultSeries_type: "column",
            title_label_text: "Gráfica sobre el consumo de la electricidad",
            yAxis: { label_text: "Porcentage" },
            xAxis: {
                label_text: "Pais-Año",
                categories: categorias,
            },
            series: [
                {
                    name: "% Total",
                    points: total,
                },
                {
                    name: "% Renovable",
                    points: renewable,
                },
                {
                    name: "% No Renovable",
                    points: nrenewable,
                },
            ],
        });
    }

    onMount(getData);
</script>

<svelte:head>
    <script src="https://code.jscharting.com/latest/jscharting.js" on:load={loadGraph}></script>
</svelte:head>

<main>
    {#if errorC === 404}
        <UncontrolledAlert color="danger">
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
    <div
        id="chartDiv"
        style="max-width: 740px;height: 400px;margin: 0px auto;"
    />
</main>
