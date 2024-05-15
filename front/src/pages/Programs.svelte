<script lang="ts">
import axios from 'axios';
import {onMount} from 'svelte';
import Icon from '@iconify/svelte';
import type {TrainingProgram} from '../models/TrainingProgram';

let programsList: Array<TrainingProgram>;

function requestPrograms() {
    axios.get("/programs").then((res) => {
        programsList = res.data;
    }).catch((err) => {
        console.log(err);
    });
}

    onMount(() => {
    requestPrograms();
    });
</script>
    
<div>
    {#if programsList}
        <ul class="program-list">
            {#each programsList as program}
            <li>
                {program.name}
                <a href="/programmes/{program.id_program}"><Icon icon="ph:eye" height="{25}"/></a>
            </li>
            {/each}
        </ul>
    {/if}
</div>

<style lang="css">
    .program-list {
        list-style: none;
        & li {
            display: flex;
            gap: 1rem;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid #ccc;
            & a {
                display: flex;
                align-items: center;
            }
        }
    }
</style>