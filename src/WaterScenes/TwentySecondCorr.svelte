<script>
    import TwoPanelLayout from '../TwoPanelLayout.svelte';
    import WaterOrganizer from '../WaterOrganizer.svelte';
    import Avatar from '../Avatar.svelte';
    import BannerImage from '../BannerImage.svelte'; // Import the BannerImage component
    import { getBackgroundStyle, layoutMode, activeTab, highlightTarget, tabSwitchAndHighlight } from '../stores.js';
    import ContainerComponent from '../ContainerComponent.svelte'; // Import the ContainerComponent


    const bannerImagePath = 'border_waterdrop-full.png'; 

    let cardStates = ['visible', 'highlighted', 'visible', 'highlighted']; // States for each card


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
<BannerImage imageUrl={bannerImagePath} /> 
<TwoPanelLayout 
leftBackgroundColor="#e6f5ef"
rightBackgroundColor="#e6f5ef"
stackedLeftBackgroundColor="#e6f5ef"
stackedRightBackgroundColor="#e6f5ef"
split="40/60"
mode="stack"
>
    <div slot="left">
        <Avatar 
        imageUrl="Tabitha_Portrait_Themed.svg" 
        name="Tabitha" 
        text='<p style="margin-top:0;">A person can save about 1,000 gallons of water in a year if the water is left on for only 20 seconds instead of 56 seconds while brushing teeth.</p><p>That’s a lot of water!</p><p>I put that <button class="highlight-button">information</button> on my poster.</p>'
        />
      <p><i>Select the <strong>Next</strong> button to continue.</i></p>

    </div>
    <div slot="right">
        <WaterOrganizer {cardStates} />
    </div>
</TwoPanelLayout>