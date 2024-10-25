<script>
    import { onMount, onDestroy } from 'svelte';

    export let leftBackgroundImage = '';
    export let rightBackgroundImage = '';
    export let split = '50/50'; // Options: '50/50', '40/60', '60/40', '100'
    export let mode = 'stack'; // Options: 'stack', 'tabs'
    export let leftBackgroundColor = 'white'; // Default background color for the left panel
    export let rightBackgroundColor = 'white'; // Default background color for the right panel
    export let stackedLeftBackgroundColor = 'white'; // Background color for the left panel when stacked
    export let stackedRightBackgroundColor = 'white'; // Background color for the right panel when stacked

    let layoutHeight;
    let resizeObserver;
    // Determine flex values based on the split prop
    let leftFlex, rightFlex;
    $: {
        if (split === '50/50') {
            leftFlex = rightFlex = 1;
        } else if (split === '40/60') {
            leftFlex = 0.4;
            rightFlex = 0.6;
        } else if (split === '60/40') {
            leftFlex = 0.6;
            rightFlex = 0.4;
        } else if (split === '100') {
            leftFlex = 1;
            rightFlex = 0;
        }
    }

    let layoutElement;

    function calculateLayoutHeight() {
        const activityPanel = layoutElement?.closest('.activity-panel');
        
        if (activityPanel) {
            // If inside an activity panel, use its height
            const panelStyle = window.getComputedStyle(activityPanel);
            layoutHeight = `calc(${panelStyle.height})`; // Subtract 16px for margins
        } else {
            // If not in an activity panel, calculate as before
            const toolbar = document.querySelector('.toolbar');
            const tabsButtons = document.querySelector('.tabs-buttons');
            const bannerImage = document.querySelector('.banner-image-wrapper');

            let totalOffset = 0;
            if (toolbar) totalOffset += toolbar.offsetHeight;
            if (tabsButtons) totalOffset += tabsButtons.offsetHeight;
            if (bannerImage) totalOffset += bannerImage.offsetHeight;

            layoutHeight = `calc(100vh - ${totalOffset}px)`;
        }
    }

    onMount(() => {
        calculateLayoutHeight();
        resizeObserver = new ResizeObserver(calculateLayoutHeight);
        resizeObserver.observe(document.body);
        window.addEventListener('resize', calculateLayoutHeight);
    });

    onDestroy(() => {
        if (resizeObserver) {
            resizeObserver.disconnect();
        }
        window.removeEventListener('resize', calculateLayoutHeight);
    });
</script>

<div class="layout" 
     class:stack={mode === 'stack'} 
     class:single-panel={split === '100'}
     style="--layout-height: {layoutHeight}; --left-bg-color: {leftBackgroundColor}; --right-bg-color: {rightBackgroundColor}; --stacked-left-bg-color: {stackedLeftBackgroundColor}; --stacked-right-bg-color: {stackedRightBackgroundColor};"
     bind:this={layoutElement}>
    <div class="panel left" style="flex: {leftFlex}; background-image: url('{leftBackgroundImage}');">
        <slot name="left"></slot>
    </div>
    {#if split !== '100'}
        <div class="panel right" style="flex: {rightFlex}; background-image: url('{rightBackgroundImage}');">
            <slot name="right"></slot>
        </div>
    {/if}
</div>

<style>
    .layout {
        display: flex;
        flex-wrap: wrap;
        overflow: auto;
        height: var(--layout-height);
        align-content: flex-start;
        width: 100%;
    }

    .layout.single-panel {
        flex-wrap: nowrap;
        max-width: 881px;
        margin: 0 auto;
    }

    .panel {
        border-right: none;
        background-size: cover;
        background-position: bottom;
        background-repeat: no-repeat;
        height: var(--layout-height);
        overflow-y: auto;
        min-width: 0;
    }

    .left {
        border-right: 1px solid #c7c7c7;
        background-color: var(--left-bg-color);
    }

    .right {
        background-color: var(--right-bg-color);
    }

    .layout.single-panel .left {
        border-right: none;
    }

    @media (min-width: 1200px) {
        .layout.stack .panel {
            flex: 1;
        }
    }

    @media (max-width: 1200px) and (min-width: 1000px) {
        .panel {
            flex: 1 !important; /* Force 50/50 layout */
        }
        .layout.single-panel .panel {
            flex: 1 !important;
        }
    }

    @media (max-width: 1000px) {
        .layout.stack {
            display: block;
            overflow-x: auto;
        }
        .layout.stack .panel {
            width: 100%;
            height: auto;
        }
        .layout.stack .panel.left {
            background-color: var(--stacked-left-bg-color);
            padding-bottom: 0;
        }
        .layout.stack .panel.right {
            background-color: var(--stacked-right-bg-color);
        }
        .layout.single-panel {
            display: flex;
        }
        .layout.single-panel .panel {
            width: 100%;
            height: var(--layout-height);
        }
    }
</style>