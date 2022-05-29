<script>
    import {onMount} from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    import {pop} from "svelte-spa-router";

    const delay = ms => new Promise(res => setTimeout(res, ms));

    let casesData = [];
    let deathsData = [];

    async function getData(){

        const options = {
            method: "GET",
            headers: {
                'X-RapidAPI-Host': 'covid-193.p.rapidapi.com',
                'X-RapidAPI-Key': 'dca83059acmsh3cda1ca95eec1c0p1c71abjsn4e3f476633f5'
            }
        }

        let res = await fetch("https://covid-193.p.rapidapi.com/statistics", options);
        await delay(2000);
        if(res.ok){
            let json = await res.json();
            for (let i=0; i<40;i++){
                casesData.push({  y: json.response[i].cases.total, label: json.response[i].country });

                var p =  json.response[i].deaths.total;
                if(p == null){
                    p=0;
                }
                deathsData.push({  y: p, label: json.response[i].country });
                
            }
            loadGraph();
        } else {
            casesData = [];
            deathsData = [];
            loadGraph();
        }
    }

async function loadGraph(){
    var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	title:{
		text: "Casos de covid en distintos paises"
	},
	axisY: {
		title: "casos totales",
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
		type: "column",
		showInLegend: true,
		name: "cases",
		color: "red",
		dataPoints: casesData
	},
    {
		type: "column",
		showInLegend: true,
		name: "deaths",
		color: "blue",
		dataPoints: deathsData
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
        <h1 align="center">Gráfica de covid</h1>
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