<script lang="ts">
    import axios from "axios";

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
    <button on:click={test}>
        Click me
    </button>
</div>

<style lang="css">

</style>