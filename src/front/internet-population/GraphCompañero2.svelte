<script>
    import {onMount} from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    import {pop} from "svelte-spa-router";

    const delay = ms => new Promise(res => setTimeout(res, ms));

    let fechas = [];
    let populationData = [];
    let internetData = [];
    let urbanData = [];
    let spen_mill_eurData = [];
    let public_percentData = [];
    let pib_percentData = [];
    let per_capitaData = [];
    let varData = [];

    async function getData(){

        let cargar1 = await fetch(`/api/v2/internet-population/loadInitialData`);
        let cargar2 = await fetch(`https://sos2122-26.herokuapp.com/api/v2/defense-spent-stats/loadInitialData`);

        await delay(1000);

        let res;
        let res2;
        res = await fetch(`/api/v2/internet-population`);
        res2 = await fetch(`https://sos2122-26.herokuapp.com/api/v2/defense-spent-stats`);
        
        if (res.ok && res2.ok) {
            const json = await res.json();
            const json2 = await res2.json();
            console.log(json);
            console.log(json2);
            let rangoMax = 10;
            const country_years = [];
            for(let i = 0; i<json2.length; i++){
                country_years.push(json2[i].country+"/"+json2[i].year);
            }
            for (let i = 0; i<rangoMax; i++){
                let fecha = json[i].country+"/"+json[i].year;
                fechas.push(fecha);
                let index = country_years.indexOf(fecha);
                if ( country_years.includes(fecha)){
                    spen_mill_eurData.push({ y: json2[index].spen_mill_eur, label: fecha });
                    public_percentData.push({ y: json2[index].public_percent, label: fecha });
                    pib_percentData.push({ y: json2[index].pib_percent, label: fecha });
                    per_capitaData.push({ y: json2[index].per_capita, label: fecha });
                    varData.push({ y: json2[index].var, label: fecha });
                }else{
                    spen_mill_eurData.push({ y: 0 });
                    public_percentData.push({ y: 0 });
                    pib_percentData.push({ y: 0 });
                    per_capitaData.push({ y: 0 });
                    varData.push({ y: 0 });
                }

                populationData.push({ y: json[i].population_growth, label: fecha });
                internetData.push({ y: json[i].internet_users, label: fecha });
                urbanData.push({ y: json[i].urban_population, label: fecha });
            }
            for(let i = 0; i<rangoMax; i++){
                let fecha2 = json2[i].country+"/"+json2[i].year;
                fechas.push(fecha2);
                spen_mill_eurData.push({ y: json2[i].spen_mill_eur, label: fecha2 });
                public_percentData.push({ y: json2[i].public_percent, label: fecha2 });
                pib_percentData.push({ y: json2[i].pib_percent, label: fecha2 });
                per_capitaData.push({ y: json2[i].per_capita, label: fecha2 });
                varData.push({ y: json2[i].var, label: fecha2 });
                populationData.push({ y: 0 });
                internetData.push({ y: 0 });
                urbanData.push({ y: 0 });
            }
        
            await delay(1000);
            loadGraph();
        }
    }

    async function loadGraph(){
        var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title:{
            text: "Relación entre usuarios de internet y población urbana y estadísticas de gasto en defensa"
        },
        axisX: {
            title: "years",
            includeZero: true
        },
        legend: {
            cursor:"pointer",
            itemclick : toggleDataSeries
        },
        toolTip: {
            shared: true,
            content: toolTipFormatter
        },
        data: [{
            type: "line",
            showInLegend: true,
            name: "internet users (%)",
            color: "red",
            dataPoints: internetData
        
        },
        {
            type: "line",
            showInLegend: true,
            name: "urban population (%)",
            color: "blue",
            dataPoints: 
                urbanData
        },
        {
            type: "line",
            showInLegend: true,
            name: "population growth (%)",
            color: "yellow",
            dataPoints: 
                populationData
        },
        {
            type: "line",
            showInLegend: true,
            name: "euros spent in defense (millions)",
            color: "green",
            dataPoints: spen_mill_eurData
        },
        {
            type: "line",
            showInLegend: true,
            name: "public percentage",
            color: "violet",
            dataPoints: public_percentData
        },
        {
            type: "line",
            showInLegend: true,
            name: "pib percentage",
            color: "gray",
            dataPoints: pib_percentData
        },
        {
            type: "line",
            showInLegend: true,
            name: "per capita",
            color: "black",
            dataPoints: per_capitaData
        },
        {
            type: "line",
            showInLegend: true,
            name: "var",
            color: "pink",
            dataPoints: varData
        }]
    });
    chart.render();

    function toolTipFormatter(e) {
        var str = "";
        var total = 0 ;
        var str2 ;
        for (var i = 0; i < e.entries.length; i++){
            var str1 = "<span style= \"color:"+e.entries[i].dataSeries.color + "\">" + e.entries[i].dataSeries.name + "</span>: <strong>"+  e.entries[i].dataPoint.y + "</strong> <br/>" ;
            total = e.entries[i].dataPoint.y + total;
            str = str.concat(str1);
        }
        str2 = "<strong>" + e.entries[0].dataPoint.label + "</strong> <br/>";
        return (str2.concat(str));
    }

    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }

    }

    onMount(getData);

</script>
<svelte:head>
    <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
</svelte:head>

<main>
    <br>
        <h1 align="center">Gráficas con compañero 2 (defense-spent-stats)</h1>
        <br>
        <div id="chartContainer" style="height: 370px; width: 100%;"></div>
        <br><br>

        <br>
        <Button outline color="dark" on:click="{()=>{
            pop();
        }}">
        Volver
        </Button>
        <br><br>
</main>