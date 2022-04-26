<script>
	import Router from "svelte-spa-router";
	import Info from "./Home.svelte";

	import ListPopulationLevels from "./population-levels/ListPopulationLevels.svelte";
	import EditPopulationEntry from "./population-levels/EditEntryPopulation.svelte";

	import ListInternetPopulation from "./internet-population/ListInternetPopulation.svelte";
	import EditInternetPopulationEntry from "./internet-population/EditEntryInternetPopulation.svelte";

	import ListEnergyConsumptions from "./energy-consumptions/ListEnergyConsumptions.svelte";
	import EditEntryEnergyConsumptions from "./energy-consumptions/EditEntryEnergyConsumptions.svelte";


	const routes = {

		"/info": Info,

		"/population-levels" : ListPopulationLevels,
		"/population-levels/:country/:year" : EditPopulationEntry,

		"/internet-population" : ListInternetPopulation,
		"/internet-population/:country/:year" : EditInternetPopulationEntry,

		"/energy-consumptions" : ListEnergyConsumptions,
		"/energy-consumptions/:codAct/:country/:year" : ListEnergyConsumptions,
		"/energy-consumptions/:country/:year" : EditEntryEnergyConsumptions

	};

</script>

<main>
	<Router {routes} />
</main>
