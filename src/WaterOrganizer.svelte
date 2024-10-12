<script>
    import { onMount } from 'svelte';
    import { pulseHighlight } from './stores.js'; // Import pulseHighlight from stores.js
    export let title = "TURN OFF THE WATER";
    export let subtitle = "By Tabitha";
    export let cards = [
        { content: "A person uses about 1,600 gallons of water in a year if the water is left on while brushing teeth." },
        { content: "Gallons of water used by a person in a year if the water is left on for t seconds while brushing teeth: 2 × t × 0.04 × 365" },
        { content: "A person who leaves the water on for 20 seconds instead of 56 seconds uses about 600 gallons of water instead of 1,600 gallons." },
        { content: "1,600 – 600 = 1,000 A person can save about 1,000 gallons of water in a year." }
    ];
    export let imageSrc = "/Faucet.svg"; // Replace with actual image path
   
    // Array of states for each card, controlling visibility and highlight
    export let cardStates = []; // Example: ['visible', 'highlighted', 'hidden']

    let container;
    let layoutClass = 'large-layout';

    const updateLayout = () => {
        const width = container.clientWidth;
        if (width >= 700) {
            layoutClass = 'large-layout';
        } else if (width >= 450) {
            layoutClass = 'medium-layout';
        } else {
            layoutClass = 'small-layout';
        }
    };

    onMount(() => {
        updateLayout();
        window.addEventListener('resize', updateLayout);
        return () => window.removeEventListener('resize', updateLayout);
    });
</script>

<div bind:this={container} class="container">
    <div class="header">
        <h1>{title}</h1>
        <h5>{subtitle}</h5>
    </div>

      <!-- Large Layout -->
      <div class="content large-layout" class:hidden={layoutClass !== 'large-layout'}>
        {#each cards as card, index}
            <div class="card {cardStates[index]}" id={layoutClass === 'large-layout' && cardStates[index] === 'highlighted' ? 'highlight-target' : undefined}>
                <p>{card.content}</p>
            </div>
            {#if index === 0}
                <div class="image">
                    <p>How much water can you save by turning off the water while you brush your teeth?</p>
                    <img src={imageSrc} alt="Water saving illustration">
                </div>
            {/if}
        {/each}
    </div>

    <!-- Medium Layout -->
    <div class="content medium-layout" class:hidden={layoutClass !== 'medium-layout'}>
        <div class="image">
            <p>How much water can you save by turning off the water while you brush your teeth?</p>
            <img src={imageSrc} alt="Water saving illustration">
        </div>
        {#each cards as card, index}
            <div class="card {cardStates[index]}" id={layoutClass === 'medium-layout' && cardStates[index] === 'highlighted' ? 'highlight-target' : undefined}>
                <p>{card.content}</p>
            </div>
        {/each}
    </div>

    <!-- Small Layout -->
    <div class="content small-layout" class:hidden={layoutClass !== 'small-layout'}>
        <div class="image">
            <p>How much water can you save by turning off the water while you brush your teeth?</p>
            <img src={imageSrc} alt="Water saving illustration">
        </div>
        {#each cards as card, index}
            <div class="card {cardStates[index]}" id={layoutClass === 'small-layout' && cardStates[index] === 'highlighted' ? 'highlight-target' : undefined}>
                <p>{card.content}</p>
            </div>
        {/each}
    </div>
</div>

<style>
    .container {
        background-color: #f0f0f0;
        padding: 20px;
        box-sizing: border-box;
        margin: -0.5rem;
        border: 5px solid #c5c5c5;
    }

    .header {
        text-align: center;
        margin-bottom: 20px;
    }

    .content {
        display: none;
    }

    .content:not(.hidden) {
        display: flex;
        gap: 20px;
    }

    .card {
        background-color: white;
        padding: 10px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
        border: 2px solid rgb(196, 196, 196);
        height: fit-content;
    }

    .card.visible {
        display: block;
    }

    .card.highlighted {
        border: 2px solid #7d00a3;
        background-color: #f4d1ff;
    }

    .card.hidden {
        visibility: hidden;
    }

    .image {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 12px;
    }

    .image img {
        height: auto;
        max-width: 190px;
    }

    /* Large layout */
    .large-layout:not(.hidden) {
        flex-wrap: wrap;
    }
    .large-layout .card, .large-layout .image {
        flex: 1 1 30%;
        gap: 12px;
    }

    /* Medium layout */
    .medium-layout:not(.hidden) {
        flex-wrap: wrap;
    }
    .medium-layout .image {
        flex: 1 1 100%;
        gap: 12px;
    }
    .medium-layout .card {
        flex: 1 1 45%;
    }

    /* Small layout */
    .small-layout:not(.hidden) {
        flex-direction: column;
    }

    h1 {
        font-size: 36px;
        margin-bottom: 0.5rem;
    }
    p {
        margin: 0px;
    }
    h5 {
        margin: 0rem 0 .5rem 0;
    }
</style>