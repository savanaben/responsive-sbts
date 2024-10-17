<script>
    export let width = 200;
    export let height = 200;
</script>

<div class="placeholder" style="width: {width}px; height: {height}px;">
    <div class="cross"></div>
    <div class="dimensions">{width} x {height}</div>
</div>

<style>
    .placeholder {
        position: relative;
        background-color: #e0e0e0;
        border: 2px solid #b0b0b0;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        margin: 1rem auto;

    }

    .cross::before,
    .cross::after {
        content: '';
        position: absolute;
        background-color: #b0b0b0;
    }

    .cross::before {
        width: 141.4%; /* √2 * 100% to reach corners */
        height: 2px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
    }

    .cross::after {
        width: 2px;
        height: 141.4%; /* √2 * 100% to reach corners */
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
    }

    .dimensions {
        position: relative;
        z-index: 1;
        font-family: Arial, sans-serif;
        font-size: 16px;
        color: #666666;
        background-color: #e0e0e0;
        padding: 5px 10px;
        border-radius: 4px;
    }
</style>