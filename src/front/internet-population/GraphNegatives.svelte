<script>
    import {onMount} from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    import {pop} from "svelte-spa-router";

    const delay = ms => new Promise(res => setTimeout(res, ms));

    let populationData = [];
    let internetData = [];
    let urbanData = [];

    async function getData(){

        let res;
        res = await fetch(`/api/v2/internet-population`);
        if (res.ok) {
            const json = await res.json();
            for(let i = 0; i<json.length; i++){

                populationData.push({ y: json[i].population_growth, label: json[i].country+" "+json[i].year });

                internetData.push({ y: json[i].internet_users, label: json[i].country+" "+json[i].year });

                urbanData.push({ y: json[i].urban_population, label: json[i].country+" "+json[i].year });
            }
            await delay(1000);
            loadGraph();
        }else{
            window.alert('no hay registros');
            populationData = [];
            internetData = [];
            urbanData = [];
            await delay(1000);
            loadGraph();
        }
}

async function loadGraph(){
    var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	title:{
		text: "Relación entre usuarios de internet y población urbana"
	},
    axisX: {
		title: "country + year",
		includeZero: true
	},
	axisY: {
		title: "porcentage",
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
		type: "bar",
		showInLegend: true,
		name: "internet users",
		color: "red",
		dataPoints: internetData
	
	},
	{
		type: "bar",
		showInLegend: true,
		name: "urban population",
		color: "blue",
		dataPoints: 
			urbanData
	},{
		type: "bar",
		showInLegend: true,
		name: "population growth",
		color: "green",
		dataPoints: 
			populationData
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
        <h1 align="center">Gráficas de todos los datos de internet population</h1>
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