<script>
    export let imageUrl = '';
    export let name = '';
</script>

<div class="image-container">
    <img src={imageUrl} alt={name} />
    <p class="nameplate">{name}</p>
</div>

<style>
    .image-container {
        text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
    }

    img {
        width: 110px;
        height: 110px;
        border-radius: 50%;
        object-fit: cover;
        object-position: top;
        border: 2px solid #a9a9a9;
        background-color: white;
    }

    .nameplate {
        font-size: 0.8em;
        margin: 0;
        font-weight: bold;
        background-color: white;
        padding: 0 4px;
        border-radius: 4px;
    }
</style>