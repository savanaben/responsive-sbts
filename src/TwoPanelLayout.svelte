<script>
    export let leftBackgroundImage = '';
    export let rightBackgroundImage = '';
    export let split = '50/50'; // Options: '50/50', '40/60', '60/40'
    export let mode = 'stack'; // Options: 'stack', 'tabs'
    export let leftBackgroundColor = 'white'; // Default background color for the left panel
    export let rightBackgroundColor = 'white'; // Default background color for the right panel
    export let stackedLeftBackgroundColor = 'white'; // Background color for the left panel when stacked
    export let stackedRightBackgroundColor = 'white'; // Background color for the right panel when stacked


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
        }
    }
</script>

<div class="layout" class:stack={mode === 'stack'} style="--left-bg-color: {leftBackgroundColor}; --right-bg-color: {rightBackgroundColor}; --stacked-left-bg-color: {stackedLeftBackgroundColor}; --stacked-right-bg-color: {stackedRightBackgroundColor};">
    <div class="panel left" style="flex: {leftFlex}; background-image: url('{leftBackgroundImage}');">
        <slot name="left"></slot>
    </div>
    <div class="panel right" style="flex: {rightFlex}; background-image: url('{rightBackgroundImage}');">
        <slot name="right"></slot>
    </div>
</div>

<style>
    .layout {
        display: flex;
        flex-wrap: wrap;
        overflow-y: auto;
        height: calc(100vh - 110px);
        align-content: flex-start;
    }

    .panel {
        border-right: none;
        background-size: cover;
        background-position: bottom;
        background-repeat: no-repeat;
        height: calc(100vh - 110px);
    }

    .left {
        border-right: 1px solid #c7c7c7;
        background-color: var(--left-bg-color);
    }

    .right {
        background-color: var(--right-bg-color);
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
    }

    @media (max-width: 1000px) {
        .layout.stack .panel {
            flex: 1 0 100% !important;
            height: auto;
        }
        .layout.stack .panel.left {
            background-color: var(--stacked-left-bg-color);
            padding-bottom: 0; /* Remove top padding for the right panel when stacked */

        }
        .layout.stack .panel.right {
            background-color: var(--stacked-right-bg-color);
        }
    }
</style>