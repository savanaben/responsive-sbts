<script>
    export let borderColor = '#000'; // Default border color
    export let backgroundColor = '#fff'; // Default background fill color
    export let title = 'Title'; // Default title text
    export let body = ''; // Default body text (can be any HTML)
</script>

<div class="container" style="border-color: {borderColor}; background-color: {backgroundColor};">
    <p class="title">{title}</p>
    <div class="body">
        {@html body}
    </div>
</div>

<style>
    .container {
        border: 2px solid;
        border-radius: 8px; /* Rounded corners */
        padding: 1rem;
    }

    .title {
     margin: 0 0 8px 0;
     font-weight: bold;
    display: flex;
    justify-content: center;
    }

    .body {
        font-size: 1em;
    }

</style>