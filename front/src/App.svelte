<script lang="ts">
  import Router from "./Router.svelte";
  import { MaterialApp } from 'svelte-materialify';

  const theme = "dark"
</script>

<main>
  <MaterialApp theme="{theme}">
    <Router/>
  </MaterialApp>
</main>

<style>
</style>
