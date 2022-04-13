<script>

    export let params = {};
    import {pop} from "svelte-spa-router";
    import { onMount } from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    import Table from 'sveltestrap/src/Table.svelte';

    let entry = {};

    let updatedCountry;
    let updatedYear;
    let updatedElectricity;
    let updateNonRenewable;
    let updateRenewable;

    onMount(getEntries);

    async function getEntries(){
        console.log("Fetching entries....");
        const res = await fetch("/api/v1/energy-consumptions/"+params.country+"/"+params.year); 
        if(res.ok){
            const data = await res.json();
            entry = data;
            updatedCountry = entry.country;
            updatedYear = entry.year;
            updatedElectricity = entry.percentages_access_elecetricity;
            updateNonRenewable = entry.non_renewable_energy_consumptions;
            updateRenewable = entry.renewable_energy_consumptions;
        }else{
            Errores(res.status);
            pop();
        }
    }

    async function EditEntry(){
        console.log("Updating entry...."+updatedCountry);
        const res = await fetch("/api/v1/energy-consumptions/"+params.country+"/"+params.year,
			{
				method: "PUT",
				body: JSON.stringify({
                    country: updatedCountry,
                    year: updatedYear,
                    percentages_access_elecetricity: updatedElectricity,
                    non_renewable_energy_consumptions: updateNonRenewable,
                    renewable_energy_consumptions: updateRenewable
                }),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function (res){
				window.alert("Actualizado con éxito");
                window.location.href = `/#/energy-consumptions`; 
			});
            
            
    }

    async function Errores(code){
        
        let msg;
        if(code == 404){
            msg = "La entrada seleccionada no existe"
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
                    <th>Acceso a la electricidad</th>
                    <th>Energía No Renovable Consumida</th>
                    <th>Energía Renovable Consumida</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{updatedCountry}</td>
                    <td>{updatedYear}</td>
                    <td><input bind:value="{updatedElectricity}"></td>
                    <td><input bind:value="{updateNonRenewable}"></td>
                    <td><input bind:value="{updateRenewable}"></td>
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