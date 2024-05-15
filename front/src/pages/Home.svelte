<script lang="ts">
    import axios from "axios";
    import "../hey.scss";
    import Button from '@smui/button';

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