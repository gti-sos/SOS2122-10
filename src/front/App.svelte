<script>
	import Router from "svelte-spa-router";
	import Info from "./Home.svelte";
	import commonGraph from "./commonGraph.svelte";
	

	import ListPopulationLevels from "./population-levels/ListPopulationLevels.svelte";
	import EditPopulationEntry from "./population-levels/EditEntryPopulation.svelte";
	import GraphPopulationLevels from "./population-levels/myGraph.svelte";
	import GraphPopulationLevelsBillboard from "./population-levels/myGraphBillboard.svelte";

	import ListInternetPopulation from "./internet-population/ListInternetPopulation.svelte";
	import EditInternetPopulationEntry from "./internet-population/EditEntryInternetPopulation.svelte";

	import ListEnergyConsumptions from "./energy-consumptions/ListEnergyConsumptions.svelte";
	import EditEntryEnergyConsumptions from "./energy-consumptions/EditEntryEnergyConsumptions.svelte";
	import GraphData from "./energy-consumptions/GraphData.svelte";


	const routes = {

		"/info": Info,
		"/commonGraph/:country": commonGraph,

		"/population-levels" : ListPopulationLevels,
		"/population-levels/:country/:year" : EditPopulationEntry,
		"/population-levels_graph/:country": GraphPopulationLevels,
		"/population-levels_graph_billboard/:country": GraphPopulationLevelsBillboard,

		"/internet-population" : ListInternetPopulation,
		"/internet-population/:codAct/:country/:year" : ListInternetPopulation,
		"/internet-population/:country/:year" : EditInternetPopulationEntry,

		"/energy-consumptions" : ListEnergyConsumptions,
		"/energy-consumptions/:codAct/:country/:year" : ListEnergyConsumptions,
		"/energy-consumptions/graph/:country" : GraphData,
		"/energy-consumptions/:country/:year" : EditEntryEnergyConsumptions
		

	};

</script>

<main>
	<Router {routes} />
</main>
