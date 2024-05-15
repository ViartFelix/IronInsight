//General CSS
import './app.css'
//Main app
import App from './App.svelte'

//Plugins
import Plugins from "../plugins/index";
new Plugins();

const app = new App({
  target: document.getElementById('app')!,
})

export default app
