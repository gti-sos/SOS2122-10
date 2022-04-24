<script>

    export let params = {};
    import {pop} from "svelte-spa-router";
    import { onMount } from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    import Table from 'sveltestrap/src/Table.svelte';

    let entry = {};

    let updatedCountry;
    let updatedYear;
    let updatedPopulationGrowth;
    let updatedInternetUsers;
    let updatedUrbanPopulation;

    onMount(getEntries);

    async function getEntries(){
        console.log("Fetching entries....");
        const res = await fetch("/api/v1/internet-population/"+params.country+"/"+params.year); 
        if(res.ok){
            const data = await res.json();
            entry = data;
            updatedCountry = entry.country;
            updatedYear = entry.year;
            updatedPopulationGrowth = entry.population_growth;
            updatedInternetUsers = entry.internet_users;
            updatedUrbanPopulation = entry.urban_population;
        }else{
            Errores(res.status);
            pop();
        }
    }

    async function EditEntry(){
        console.log("Updating entry...."+updatedCountry);
        const res = await fetch("/api/v1/internet-population/"+params.country+"/"+params.year,
			{
				method: "PUT",
				body: JSON.stringify({
                    country: updatedCountry,
                    year: updatedYear,
                    population_growth: updatedPopulationGrowth,
                    internet_users: updatedInternetUsers,
                    urban_population: updatedUrbanPopulation
                }),
				headers: {
					"Content-Type": "application/json"
				}
			}); 
    }

    async function Errores(code, entrada){
        
        let msg;
        if(code == 404){
            msg = "La entrada" +entrada+ "no existe"
        }
        if(code == 400){
            msg = "La petición no está correctamente formulada"
        }
        if(code == 409){
            msg = "El dato introducido ya existe"
        }
        if(code == 401){
            msg = "No autorizado"
        }
        if(code == 405){
            msg = "Método no permitido"
        }
        window.alert(msg)
            return;
    }

</script>

<main>
    <h1>Editar entrada "{params.country}"/"{params.year}"</h1>
    {#await entry}
    loading
        {:then entry}
        
    
        <Table bordered>
            <thead>
                <tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Crecimeinto de población</th>
                    <th>Usuarios de Internet</th>
                    <th>Población urbana</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{updatedCountry}</td>
                    <td>{updatedYear}</td>
                    <td><input bind:value="{updatedPopulationGrowth}"></td>
                    <td><input bind:value="{updatedInternetUsers}"></td>
                    <td><input bind:value="{updatedUrbanPopulation}"></td>
                    <td><Button outline color="primary" on:click="{EditEntry}">
                        Editar
                        </Button>
                    </td>
                </tr>
            </tbody>
        </Table>
    {/await}
    
    <Button outline color="secondary" on:click="{pop}">Volver</Button>

    </main>