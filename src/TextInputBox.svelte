<script>
    export let leadingText = '';
    export let followingText = '';
    export let value = '';

</script>

<div class="input-container">
    {#if leadingText}
        <span class="leading-text">{leadingText}</span>
    {/if}
    <input 
        type="text" 
        bind:value 
        class="text-input"
    />
    {#if followingText}
        <span class="following-text">{followingText}</span>
    {/if}
</div>

<style>
    .input-container {
        display: flex;
        align-items: center;
        white-space: nowrap;
    }

    .text-input {
        width: 111px;
        height: 74px;
        padding: 5px;
        box-sizing: border-box;
        margin: 0;
        border: 1px solid #181818;
        border-radius: 0px;
        box-shadow: inset 0 0px 6px rgba(0, 0, 0, 0.15);
    }

    .leading-text, .following-text {
        padding: 0 5px;
    }
</style>