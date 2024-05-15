<script lang="ts">
import axios from 'axios';
import type { Exercise } from '../models/Exercise';
import {onMount} from 'svelte';
import Icon from '@iconify/svelte';

let exercisesList: Array<Exercise>;

function requestExercises() {
    axios.get("/exercises").then((res) => {
        console.log(res.data)
      exercisesList = res.data;
    }).catch((err) => {
      console.log(err);
    });
}

  onMount(() => {
    requestExercises();
  });
</script>

<div>
    {#if exercisesList}
        <ul class="exercise-list">
            {#each exercisesList as exercise}
            <li>
                {exercise.wording}
                <a href="/exercises/{exercise.code_exercise}"><Icon icon="ph:eye" height="{25}"/></a>
            </li>
            {/each}
        </ul>
    {/if}
</div>

<style lang="css">
    .exercise-list {
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