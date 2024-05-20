<script>
    import { createEventDispatcher } from 'svelte';
    import { sidebarOpen } from './stores.js';
    import { slide } from 'svelte/transition';

    const dispatch = createEventDispatcher();

    function closeSidebar() {
        sidebarOpen.set(false);
        dispatch('close');
    }

    // Close sidebar when clicking outside
    function handleClickOutside(event) {
        if (event.target === event.currentTarget) {
            closeSidebar();
        }
    }

    // Close sidebar with Escape key
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeSidebar();
        }
    });
</script>

<div class:dimmed={$sidebarOpen} on:click={handleClickOutside}>
    {#if $sidebarOpen}
        <div class="sidebar" on:click|stopPropagation transition:slide={{duration: 300, axis: 'x'}}>
            <button class="close-button" on:click={closeSidebar}>×</button>
            <slot></slot>
        </div>
    {/if}
</div>

<style>
    .dimmed {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 100;
    }

    .sidebar {
        width: 85%;
        background: white;
        margin-top: 60px;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 101;
        
        box-sizing: border-box;
    }
    .close-button {
        position: absolute;
          right: 5px;
         top: -10px;
        border: none;
        background: none;
        font-size: 36px;
        cursor: pointer;
    }
</style>