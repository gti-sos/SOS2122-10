<script>
    import {onMount} from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    import {pop} from "svelte-spa-router";

    const delay = ms => new Promise(res => setTimeout(res, ms));

    let fechas = [];
    let populationData = [];
    let internetData = [];
    let urbanData = [];
    let ages_zero_fiftyData = [];
    let ages_fifty_seventyData = [];
    let ages_seventyData = [];

    async function getData(){

        let cargar1 = await fetch(`/api/v2/internet-population/loadInitialData`);
        let cargar2 = await fetch(`https://sos2122-24.herokuapp.com/api/v2/cancerdeaths-stats/loadInitialData`);

        await delay(1000);

        let res;
        let res2;
        res = await fetch(`/api/v2/internet-population`);
        res2 = await fetch(`https://sos2122-24.herokuapp.com/api/v2/cancerdeaths-stats`);
        
        if (res.ok && res2.ok) {
            const json = await res.json();
            const json2 = await res2.json();
            console.log(json);
            console.log(json2);
            let rangoMax = 9;
            const country_years = [];
            for(let i = 0; i<json2.length; i++){
                country_years.push(json2[i].country+"/"+json2[i].year);
            }
            for (let i = 0; i<rangoMax; i++){
                let fecha = json[i].country+"/"+json[i].year;
                fechas.push(fecha);
                let index = country_years.indexOf(fecha);
                if ( country_years.includes(fecha)){
                    ages_zero_fiftyData.push({ y: json2[index].ages_zero_fifty, label: fecha });
                    ages_fifty_seventyData.push({ y: json2[index].ages_fifty_seventy, label: fecha });
                    ages_seventyData.push({ y: json2[index].ages_seventy, label: fecha });
                }else{
                    ages_zero_fiftyData.push({ y: 0 });
                    ages_fifty_seventyData.push({ y: 0} );
                    ages_seventyData.push({ y: 0 });
                }

                populationData.push({ y: json[i].population_growth, label: fecha });
                internetData.push({ y: json[i].internet_users, label: fecha });
                urbanData.push({ y: json[i].urban_population, label: fecha });
            }
            for(let i = 0; i<rangoMax; i++){
                let fecha2 = json2[i].country+"/"+json2[i].year;
                fechas.push(fecha2);
                ages_zero_fiftyData.push({ y: json2[i].ages_zero_fifty, label: fecha2 });
                ages_fifty_seventyData.push({ y: json2[i].ages_fifty_seventy, label: fecha2 });
                ages_seventyData.push({ y: json2[i].ages_seventy, label: fecha2 });
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
            text: "Relación entre usuarios de internet y población urbana y estadísticas de muertes por cáncer"
        },
        axisY: {
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
            type: "splineArea",
            showInLegend: true,
            name: "internet users (%)",
            color: "red",
            dataPoints: internetData
        
        },
        {
            type: "splineArea",
            showInLegend: true,
            name: "urban population (%)",
            color: "blue",
            dataPoints: 
                urbanData
        },
        {
            type: "splineArea",
            showInLegend: true,
            name: "population growth (%)",
            color: "yellow",
            dataPoints: 
                populationData
        },
        {
            type: "splineArea",
            showInLegend: true,
            name: "cancer deaths 0-50 years",
            color: "gray",
            dataPoints: ages_zero_fiftyData
        
        },
        {
            type: "splineArea",
            showInLegend: true,
            name: "cancer deaths 50-70 years",
            color: "violet",
            dataPoints: 
            ages_fifty_seventyData
        },
        {
            type: "splineArea",
            showInLegend: true,
            name: "cancer deaths +70 years",
            color: "green",
            dataPoints: 
            ages_seventyData
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
        <h1 align="center">Gráficas con compañero 1 (cancerdeaths-stats)</h1>
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