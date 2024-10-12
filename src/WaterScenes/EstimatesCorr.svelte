<script>
    import TwoPanelLayout from '../TwoPanelLayout.svelte';
    import WaterOrganizer from '../WaterOrganizer.svelte';
    import Avatar from '../Avatar.svelte';
    import BannerImage from '../BannerImage.svelte'; // Import the BannerImage component
    import { getBackgroundStyle, layoutMode, activeTab, highlightTarget, tabSwitchAndHighlight } from '../stores.js';
    import ContainerComponent from '../ContainerComponent.svelte'; // Import the ContainerComponent


    const bannerImagePath = '/border_waterdrop-full.png'; 

    let cardStates = ['highlighted', 'hidden', 'hidden', 'hidden']; // States for each card


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
        text='<p style="margin-top:0;">I did the calculation too. I found that a person uses about 1,600 gallons of water in a year.</p><p>I put that <button class="highlight-button">information</button> on my poster.</p><p>Let’s see how much water we can save if we leave the water on for only some of the time while we brush our teeth.</p>'
        />
      <p><i>Select the <strong>Next</strong> button to continue.</i></p>

      <ContainerComponent
      borderColor="#FEC30D"
      backgroundColor="#fff2cc"
      title="Information"
      body="<ul style='margin-bottom:0;'>
              <li>Average number of times per day a person brushes teeth: 2</li>
              <li>Average amount of time a person uses to brush teeth: 56 seconds</li>
              <li>Typical water flow from faucet while a person brushes teeth: 0.04 gallon per second</li>
            </ul>"
      />

    </div>
    <div slot="right">
        <WaterOrganizer {cardStates} />
    </div>
</TwoPanelLayout>