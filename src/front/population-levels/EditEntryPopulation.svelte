<script>

    export let params = {};
    import {pop} from "svelte-spa-router";
    import { onMount } from 'svelte';
    import Button from 'sveltestrap/src/Button.svelte';
    import Table from 'sveltestrap/src/Table.svelte';

    let entry = {};

    let updatedCountry;
    let updatedYear;
    let updatedDeathRate;
    let updatedLifeExp;
    let updatedBirthRate;

    onMount(getEntries);

    async function getEntries(){
        console.log("Fetching entries....");
        const res = await fetch("/api/v1/population-levels/"+params.country+"/"+params.year); 
        if(res.ok){
            const data = await res.json();
            entry = data;
            updatedCountry = entry.country;
            updatedYear = entry.year;
            updatedDeathRate = entry.death_rate;
            updatedLifeExp = entry.life_expectancy_birth;
            updatedBirthRate = entry.birth_rate;
        }else{
            Errores(res.status,params.country+"/"+params.year);
            pop();
        }
    }

    async function EditEntry(){
        console.log("Updating entry...."+updatedCountry);
        const res = await fetch("/api/v1/population-levels/"+params.country+"/"+params.year,
			{
				method: "PUT",
				body: JSON.stringify({
                    country: updatedCountry,
                    year: updatedYear,
                    death_rate: updatedDeathRate,
                    life_expectancy_birth: updatedLifeExp,
                    birth_rate: updatedBirthRate
                }),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function(){
                pop();
            }); 
    }

    async function Errores(code,entrada){
        
        let msg;
        if(code == 404){
            msg = "La entrada "+entrada+" no existe"
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
                    <th>Tasa de mortalidad</th>
                    <th>Esperanza de vida</th>
                    <th>Tasa de natalidad</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{updatedCountry}</td>
                    <td>{updatedYear}</td>
                    <td><input bind:value="{updatedDeathRate}"></td>
                    <td><input bind:value="{updatedLifeExp}"></td>
                    <td><input bind:value="{updatedBirthRate}"></td>
                    <td><Button outline color="success" on:click="{EditEntry}">
                        Editar
                        </Button>
                    </td>
                </tr>
            </tbody>
        </Table>
    {/await}
    
    <Button outline color="secondary" on:click="{pop}">Volver</Button>

    </main>