<!-- ActivityPanel.svelte -->
<script>
    import { onMount } from 'svelte';
    import { quintOut } from 'svelte/easing';
    import { fade } from 'svelte/transition';

    export let isOpen = false;
    export let size = 'default'; // Can be 'default', 'medium', or 'large'
    export let onClose;

    let panelHeight;
    let width;

    $: {
        switch(size) {
            case 'medium':
                width = '983px';
                break;
            case 'large':
                width = '1292px';
                break;
            default:
                width = '675px';
        }
    }

    function handleOutsideClick(event) {
        // Check if the click is outside the activity-panel
        if (!event.target.closest('.activity-panel')) {
            onClose();
        }
    }

    function scaleFade(node, { duration }) {
        return {
            duration,
            css: t => {
                const eased = quintOut(t);
                return `
                    transform: scale(${0.95 + 0.05 * eased});
                    opacity: ${eased};
                `;
            }
        };
    }

    function calculatePanelHeight() {
        const toolbar = document.querySelector('.toolbar');
        const tabsButtons = document.querySelector('.tabs-buttons');
        const bannerImage = document.querySelector('.banner-image-wrapper');

        let totalOffset = 16; // Account for margins
        if (toolbar) totalOffset += toolbar.offsetHeight;
        if (tabsButtons) totalOffset += tabsButtons.offsetHeight;
        if (bannerImage) totalOffset += bannerImage.offsetHeight;

        panelHeight = `calc(100vh - ${totalOffset}px)`;
    }

    onMount(() => {
        calculatePanelHeight();
        window.addEventListener('resize', calculatePanelHeight);

        return () => {
            window.removeEventListener('resize', calculatePanelHeight);
        };
    });
</script>

{#if isOpen}
    <div class="overlay" 
         on:click={handleOutsideClick}
         transition:fade={{duration: 200}}>
        <div class="panel-container">
            <div 
                class="activity-panel"
                style="width: {width}; height: {panelHeight};"
                transition:scaleFade={{duration: 200}}
            >
                <slot></slot>
            </div>
        </div>
    </div>
{/if}

<style>
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: flex-end;
        z-index: 200;
    }

    .panel-container {
        width: 100%;
        max-width: 1366px;
        display: flex;
        justify-content: flex-end;
    }

    .activity-panel {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
        overflow-y: auto;
        margin: 8px;
    }
</style>