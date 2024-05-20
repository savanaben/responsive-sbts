<script>
    import { currentSceneIndex, scenes } from './stores.js';
    import Toolbar from './toolbar.svelte';

    let currentScenes;
    scenes.subscribe(value => {
        currentScenes = value;
    });


</script>

<main>
    <div class="app-container">
        <Toolbar></Toolbar>
		<svelte:component this={currentScenes[$currentSceneIndex]} />        
    </div>
</main>

<style>
    .app-container {
        position: relative;
        padding-top: 60px;
        height: 100vh;
        width: 100%;
        box-sizing: border-box;
		overflow: hidden;
		background-color: rgb(246, 246, 246);
    }



</style>