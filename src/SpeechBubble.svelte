<script>
    export let title = "Diana";
    export let paragraphs = [
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem."
    ];
    export let listItems = ["THings", "THings", "THings", "THings", "THings"];
    export let tailPosition = "left"; // New prop to control the tail position
</script>

<div class="speech-bubble" data-arrow={tailPosition + "-start"}>
    <div class="speech-bubble-layout">
        <div class="speech-bubble-title">{title}</div>
        <div class="speech-bubble-content">
            {#each paragraphs as paragraph}
                <p>{paragraph}</p>
            {/each}
            {#if listItems.length > 0}
                <ul class="list">
                    {#each listItems as item}
                        <li class="list-item">{item}</li>
                    {/each}
                </ul>
            {/if}
        </div>
    </div>
    <div class="speech-bubble-audio-player">
        <button class="audio-button" aria-label="Toggle audio" aria-pressed="false"></button>
    </div>
</div>

<style>
    .box {
        /* Add any necessary styles for the Box component */
    }

    .speech-bubble {
        box-sizing: border-box;
        max-width: calc(60ch + 3.7em);
        min-width: calc(20ch + 3.7em);
        display: flex;
        position: relative;
        border: 1px solid rgb(144, 144, 144);
        box-shadow: 0 calc(2px * var(--zoom)) calc(3px * var(--zoom)) rgba(0, 0, 0, .25);
        background-color: rgb(255, 255, 255);
        --size: 1.75em;
        margin: 0.5rem 1.25rem 0.5rem 1.25rem;
        border-radius: 0.5em;
    }

    .speech-bubble::before {
        position: absolute;
        content: "";
        display: block;
        transform: rotate(-45deg);
        height: var(--size);
        width: var(--size);
        top: calc(50% - calc(var(--size) / 2));
        border: 1px solid rgb(144, 144, 144);
        background: inherit;
    }

    .speech-bubble[data-arrow$="-start"]::before {
        top: calc(var(--size) * 1);
        bottom: auto;
    }

    .speech-bubble[data-arrow^="left"]::before {
        border-right-color: transparent;
        border-bottom-color: transparent;
        left: calc(var(--size) * -0.5);
    }

    .speech-bubble[data-arrow^="right"]::before {
        border-left-color: transparent;
        border-top-color: transparent;
        right: calc(var(--size) * -0.5);
    }

    .speech-bubble-layout {
        box-sizing: border-box;
        margin: 0px;
        min-width: 0px;
        padding-top: 32px;
        padding-bottom: 32px;
        padding-left: 48px;
        padding-right: 8px;
        flex: 1 1 0%;
    }

    .speech-bubble-title {
        font-weight: 700;
        border-bottom: solid 1px black;
    }

    .speech-bubble-content p:last-child {
        margin-bottom: 0; /* Remove bottom margin for the last paragraph */
    }

    .speech-bubble-content {
        /* Add any necessary styles for the SpeechBubbleContent component */
    }

    .list {
        /* Add any necessary styles for the List component */
    }

    .list-item {
        /* Add any necessary styles for the ListItem component */
    }

    .speech-bubble-audio-player {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        margin: 12px 12px 0px 0px;
    }

    .audio-button {
        width: 44px;
        height: 44px;
        background-color: white;
        border: 2px solid rgb(0, 88, 188);
        border-radius: 50%;
        cursor: pointer;
    }
</style>