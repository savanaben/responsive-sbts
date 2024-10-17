<script>
    import { currentSceneIndex, currentScenes, allScenes, currentGroupIndex } from './stores.js';
    import Toolbar from './toolbar.svelte';
    import { onDestroy } from 'svelte';

    $: currentScene = $currentScenes[$currentSceneIndex].component;

    console.log('Current Scene Index:', $currentSceneIndex);
    console.log('Current Group Index:', $currentGroupIndex);
</script>

<main>
    <div class="app-container">
        <Toolbar />
        <svelte:component this={currentScene} />
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