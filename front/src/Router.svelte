<script lang="ts">
    import { Router, Link, Route } from "svelte-routing";
    
    import Home from "./pages/Home.svelte";
    import Contact from "./pages/Contact.svelte";
    import Programs from "./pages/Programs.svelte";
    import Exercises from "./pages/Exercises.svelte";
  
    export let url: string = "";
</script>

<Router {url}>
    <nav>
        <Link to="/">Accueil</Link>
        <Link to="/exercices">Exercices</Link>
        <Link to="/programmes">Programmes</Link>
        <Link to="/contact">Contact</Link>
    </nav>

    <div class="routeur-view">
        <Route path="/exercices" component={Exercises} />
        <Route path="/programmes" component={Programs} />
        <Route path="/contact" component={Contact} />
        <Route path="/"><Home /></Route>
    </div>
</Router>