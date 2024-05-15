<script lang="ts">
    import { Router, Link, Route } from "svelte-routing";
    
    import Home from "./pages/Home.svelte";
    import Contact from "./pages/Contact.svelte";
  
    export let url: string = "";
</script>

<Router {url}>
    <nav>
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
    </nav>

    <div class="routeur-view">
        <Route path="/contact" component={Contact} />
        <Route path="/"><Home /></Route>
    </div>
</Router>