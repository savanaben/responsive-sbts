<script>
    import { onMount } from 'svelte';
    import SpeechBubble from './SpeechBubble.svelte';
    import Avatar from './Avatar.svelte'; // Import the Avatar component
    import msNassar from '../public/msNassar.svg';
    import Tara_Left from '../public/Tara_Left_Standing.svg';
    export let backgroundImageUrl = "DSC9369-Edit-Edit-sharpened.jpg.webp";

    let speechBubblesContainer;
    let flexContainer;
    let isHeightExceeded = false; // New state to track if height is exceeded

    function checkHeight() {
        const containerHeight = speechBubblesContainer.scrollHeight;
        const flexContainerHeight = flexContainer.clientHeight;

        if (containerHeight > flexContainerHeight) {
            speechBubblesContainer.classList.add('hidden');
            isHeightExceeded = true; // Set the state to true
        } else {
            speechBubblesContainer.classList.remove('hidden');
            isHeightExceeded = false; // Set the state to false
        }
    }

    onMount(() => {
        checkHeight();
        window.addEventListener('resize', checkHeight);
        return () => {
            window.removeEventListener('resize', checkHeight);
        };
    });
</script>

<div class="outer-container">
    <div class="background-image" style="background-image: url({backgroundImageUrl})"></div>
    <div bind:this={flexContainer} class="flex-container">
        {#if !isHeightExceeded}
            <img src={msNassar} alt="Dr. Nassar" class="character-left">
        {/if}
        <div bind:this={speechBubblesContainer} class="speech-bubbles-container">
            <div class="speech-bubble-wrapper top">
                <SpeechBubble 
                    title="Dr. Nassar" 
                    paragraphs={[
                        "What a beautiful forest! Probably too much undergrowth for archeology...",
                        "lorem ipsum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
                    ]}
                    listItems={[]}
                />
            </div>
            <div class="speech-bubble-wrapper bottom">
                <SpeechBubble 
                    title="Tara" 
                    paragraphs={[
                        "Another speech bubble for testing. Tara has two paragraphs, this will surely ruin our spacing!",
                        "It should be positioned below the first one."
                    ]}
                    listItems={[]}
                    tailPosition="right"
                />
            </div>
        </div>
        {#if !isHeightExceeded}
            <img src={Tara_Left} alt="Tara" class="character-right">
        {/if}
        {#if isHeightExceeded}
            <div class="avatars-container">
                <Avatar 
                    imageUrl="msNassar.svg" 
                    name="Dr. Nassar" 
                    text='<p>What a beautiful forest! Probably too much undergrowth for archeology...</p>
                    <p>Lorem ipsum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</p>'
                    textStyle="bubble"
                />
                <Avatar 
                    imageUrl="Tara_Left_Standing.svg" 
                    name="Tara" 
                    text='<p>Another speech bubble for testing. Tara has two paragraphs, this will surely ruin our spacing!</p>
                    <p>It should be positioned below the first one.</p>'
                    textStyle="bubble"
                />
            </div>
        {/if}
    </div>
</div>

<style>
    body {
        margin: 0;
        padding: 0;
        overflow-x: hidden;
        height: 100vh; /* Ensure the body takes the full viewport height */
    }

    .outer-container {
        width: 100vw; /* Full width of the viewport */
        height: 100%; /* Full height of the viewport */
        overflow-y: auto; /* Enable vertical scrolling */
        background-color: rgb(255, 255, 255);
        box-sizing: border-box;
        position: relative; /* Ensure positioned children are relative to this container */
    }

    .background-image {
        height: 100%;
        background-size: cover;
        background-position: center;
        margin: 0 auto;
        position: absolute;
        width: 100%;
    }

    .flex-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-end; /* Anchor characters to the bottom */
        height: 100%;
        position: relative;
    }

    .character-left {
        max-height: 85%;
    }

    .character-right {
        max-height: 60%;
    }

    .speech-bubbles-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 100%; /* Set width to 60% */
        justify-content: center; /* Space the speech bubbles */
        top: 0;
        left: 0;
        visibility: visible; /* Ensure it's visible by default */
    }


    .speech-bubble-wrapper {
        display: flex;
        width: 100%;
    }

    .speech-bubble-wrapper.top {
        justify-content: flex-start; /* Align the first bubble to the top */
    }

    .speech-bubble-wrapper.bottom {
        justify-content: flex-end; /* Align the second bubble to the bottom */
    }

    .avatars-container {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 1rem;
        /* height: calc(100% - 60px); Set height to 100% minus the toolbar height */
        height: -webkit-fill-available;
        flex-direction: column;
        gap: 1rem;
        justify-content: flex-start;
        overflow: auto;
    }

    .inner-container {
        max-width: 828px;
        width: 100%;
        text-align: left;
        background-color: rgba(255, 255, 255, 0.8); /* Slightly transparent background */
        padding: 48px 0px 48px 0px;
        margin: 0 auto; /* Center the inner container */
    }

    .content-block {
        padding: 0px 64px 0px 64px;
    }

    /* Media query for screens smaller than 828px */
    @media (max-width: 828px) {
        .content-block {
            padding: 0px 5% 0px 5%;
        }
    }

    h1 {
        color: green;
    }

    h2 {
        color: green;
    }

    h3 {
        color: green;
    }
</style>