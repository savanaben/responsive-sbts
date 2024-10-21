<script>
    import { onMount } from 'svelte';
    import SpeechBubble from './SpeechBubble.svelte';
    import Avatar from './Avatar.svelte';

    // Props
    export let backgroundImageUrl;
    export let leftAvatarImage;
    export let rightAvatarImage;
    export let leftSpeechBubbleTitle;
    export let leftSpeechBubbleParagraphs = [];
    export let rightSpeechBubbleTitle;
    export let rightSpeechBubbleParagraphs = [];
    export let showLeftAvatar = true;
    export let showRightAvatar = true;
    export let showLeftSpeechBubble = true;
    export let showRightSpeechBubble = true;
    export let showRightImage = false;
    export let rightImage = '';


    let speechBubblesContainer;
    let isHeightExceeded = false;

    function checkHeight() {
        const children = speechBubblesContainer.children;
        let combinedHeight = 0;
        for (let i = 0; i < children.length; i++) {
            combinedHeight += children[i].scrollHeight;
        }

        const appContainer = document.querySelector('.app-container');
        const appContainerHeight = appContainer.clientHeight - 60;

        console.log('combinedHeight:', combinedHeight);
        console.log('appContainerHeight:', appContainerHeight);

        const flexContainer = document.querySelector('.flex-container.full-characters');
        const viewportWidth = window.innerWidth;
        const flexContainerWidth = flexContainer.clientWidth;

        console.log('flexContainerWidth:', flexContainerWidth);
        console.log('viewportWidth:', viewportWidth);

        const marginOfError = 1;

        if (combinedHeight > appContainerHeight || flexContainerWidth > (viewportWidth + marginOfError)) {
            isHeightExceeded = true;
        } else {
            isHeightExceeded = false;
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
    <div class="flex-container full-characters" class:is-hidden={isHeightExceeded}>
        {#if showLeftAvatar && leftAvatarImage}
            <img src={leftAvatarImage} alt="Left Character" class="character-left">
        {/if}
        <div bind:this={speechBubblesContainer} class="speech-bubbles-container">
            {#if showLeftSpeechBubble && leftSpeechBubbleTitle}
                <div class="speech-bubble-wrapper top">
                    <SpeechBubble 
                        title={leftSpeechBubbleTitle} 
                        paragraphs={leftSpeechBubbleParagraphs}
                        listItems={[]}
                    />
                </div>
            {/if}
            {#if showRightSpeechBubble && rightSpeechBubbleTitle}
                <div class="speech-bubble-wrapper bottom">
                    <SpeechBubble 
                        title={rightSpeechBubbleTitle} 
                        paragraphs={rightSpeechBubbleParagraphs}
                        listItems={[]}
                        tailPosition="right"
                    />
                </div>
            {/if}
        </div>
        {#if showRightAvatar && rightAvatarImage}
            <img src={rightAvatarImage} alt="Right Character" class="character-right">
        {:else if showRightImage && rightImage}
            <img src={rightImage} alt="Right Image" class="right-image">
        {/if}
    </div>
    <div class="flex-container avatars-only" class:is-hidden={!isHeightExceeded}>
        <div class="avatars-container">
            {#if showLeftAvatar && leftAvatarImage}
                <Avatar 
                    imageUrl={leftAvatarImage} 
                    name={leftSpeechBubbleTitle} 
                    text={showLeftSpeechBubble ? leftSpeechBubbleParagraphs.map(p => `<p>${p}</p>`).join('') : ''}
                    textStyle={showLeftSpeechBubble ? "bubble" : "none"}
                />
            {/if}
            {#if showRightAvatar && rightAvatarImage}
                <Avatar 
                    imageUrl={rightAvatarImage} 
                    name={rightSpeechBubbleTitle} 
                    text={showRightSpeechBubble ? rightSpeechBubbleParagraphs.map(p => `<p>${p}</p>`).join('') : ''}
                    textStyle={showRightSpeechBubble ? "bubble" : "none"}
                />
            {:else if showRightImage && rightImage}
                <img src={rightImage} alt="Right Image" class="right-image-stacked">
            {/if}
        </div>
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
        overflow:hidden;
        display: flex;
        justify-content: center;

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
        position: absolute;
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
    }


    .speech-bubble-wrapper {
        display: flex;
        width: 100%;
    }

    .speech-bubble-wrapper.top {
        justify-content: flex-start; /* Align the first bubble to the top */
        margin-right: 1rem;
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
        gap: 0rem;
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

    .is-hidden {
        visibility: hidden;
        position: fixed;
    }

    .right-image {
    max-height: 85%;
    max-width: 580px;
    object-fit: contain;
    margin: auto;
    padding: 1rem 1rem 1rem 0rem;
}

.right-image-stacked {
    max-width: 100%;
    width: 650px;
    object-fit: contain;
    margin: 0rem auto;
    display: block;
}
</style>