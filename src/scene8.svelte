<script>
    import TwoPanelLayout from './TwoPanelLayout.svelte';
    import LeftPanelContentButton from './leftPanelContentButton.svelte';
    import WaterOrganizer from './WaterOrganizer.svelte';
    import asset1 from './Asset-1.svg'; 
    import { getBackgroundStyle, layoutMode, activeTab, highlightTarget, tabSwitchAndHighlight } from './stores.js';

    let backgroundImage = asset1;
    let cardStates = ['visible', 'visible', 'highlighted', 'hidden']; // States for each card

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

<TwoPanelLayout split="40/60" mode="stack" rightBackgroundImage={backgroundImage}>
    <div slot="left">
        <LeftPanelContentButton />
    </div>
    <div slot="right">
        <WaterOrganizer {cardStates} />
    </div>
</TwoPanelLayout>