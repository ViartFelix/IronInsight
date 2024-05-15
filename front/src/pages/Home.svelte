<script lang="ts">
    import axios from "axios";
    import {Button} from "svelte-materialify";
    import "../hey.scss";

    function test()
    {
        axios.get("/test").then((r)=>{
            console.log(r);
        }).catch((e)=>{
            console.log(e);
        })
    }
</script>

<div>
    <Button on:click={test}>
        Click me
    </Button>
</div>

<style lang="scss">
</style>