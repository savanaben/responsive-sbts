<script>
    import LeftPanelContentButton from './leftPanelContentButton.svelte';
    import OrganizerWithBackground from './OrganizerWithBackground.svelte';
    import asset1 from './Asset-1.svg'; 
    import { getBackgroundStyle, layoutMode, activeTab, highlightTarget, tabSwitchAndHighlight } from './stores.js';

    let backgroundImage = `url(${asset1})`;

    // Listen to tabSwitchAndHighlight store
    $: tabSwitchAndHighlight.subscribe(value => {
        if (value === 'Organizer') {
            activeTab.set('Organizer');
            setTimeout(() => {
                const node = document.getElementById('highlight-target');
                if (node) {
                    node.scrollIntoView({ behavior: 'smooth' });

                    setTimeout(() => {
                        // Define keyframes and animation properties directly
                        const keyframes = `
                            @keyframes pulse {
                                0% { background-color: #F3D5FF; outline: 1px solid #A12ECF; }
                                25% { background-color: transparent; outline: 1px solid white; }
                                50% { background-color: #F3D5FF; outline: 1px solid #A12ECF; }
                                75% { background-color: transparent; outline: 1px solid white; }
                                100% { background-color: #F3D5FF; outline: 1px solid #A12ECF; }
                            }
                        `;

                        // Create a style element and append it to the node
                        const style = document.createElement('style');
                        style.innerHTML = keyframes;
                        node.appendChild(style);

                        // Apply the animation to the node
                        node.style.animation = `pulse 1200ms infinite`;

                        setTimeout(() => {
                            node.style.animation = '';
                            node.removeChild(style); // Clean up the style element
                            tabSwitchAndHighlight.set(null); // Reset the store
                        }, 1000); // Duration of the pulse effect
                    }, 700); // Delay before starting the pulse effect
                }
            }, 400); // Ensure the tab switch happens first
        }
    });
</script>

<div class="layout">
    <div class="panel">
        <LeftPanelContentButton />
    </div>
    <div  class="panel background" style="background-image: {backgroundImage};">
        <OrganizerWithBackground />
    </div>
</div>


<style>
    .layout {
        display: flex;
        flex-wrap: wrap;
        overflow-y: auto; /* New: Enable vertical scrolling */
        height: -webkit-fill-available;
        align-content: flex-start;

    }
    .panel {
        flex: 1 0 100%;
        border-right: none;
    }

    .panel:first-child {
        border-right: 1px solid #c7c7c7;
        }

    .background {
        background-size: cover; /* Make the image cover the entire area */
        background-position: bottom; /* Anchor the image to the bottom */
        background-repeat: no-repeat; /* Prevent the image from repeating */
    }


    
    @media (min-width: 800px) {
        .panel {
            flex: 1; 
        }
    }


    @media (max-width: 800px) {
    .panel {
        height: auto; /* New: Set the height of the panels to auto */
    }
    .panel:first-child {
            padding-bottom: 0; /* Remove bottom padding from the first panel */
        }

   }
</style>