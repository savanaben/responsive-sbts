<script>
    import LeftPanelContentButton from './leftPanelContentButton.svelte';
    import OrganizerWithBackground from './OrganizerWithBackground.svelte';
    import asset1 from './Asset-1.svg'; 

    let backgroundImage = `url(${asset1})`;


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