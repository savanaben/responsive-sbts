<script>
    import { currentSceneIndex, currentScenes } from './stores.js';
    import Toolbar from './toolbar.svelte';
    import { onDestroy } from 'svelte';

    let scenes = [];
    const unsubscribe = currentScenes.subscribe(value => {
        scenes = value;
        console.log('Current Scenes:', scenes);
    });

    $: console.log('Current Scene Index:', $currentSceneIndex);

    onDestroy(() => {
        unsubscribe();
    });
</script>

<main>
    <div class="app-container">
        <Toolbar></Toolbar>
        <svelte:component this={scenes[$currentSceneIndex]} />
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