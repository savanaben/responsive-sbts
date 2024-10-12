<script>
    export let options = []; // Array of objects with text for each option
    export let inputType = 'radio'; // Prop to toggle between 'radio' and 'checkbox'

    // Function to clear the selected answer
    function clearAnswer() {
        const inputs = document.querySelectorAll('.choice-input');
        inputs.forEach(input => input.checked = false);
    }
</script>

<div class="multiple-choice">
    {#each options as { text }, index}
        <div class="choice-box">
            <div class="input-container">
                <input type={inputType} name="choice" id={`choice-${index}`} class="choice-input" />
            </div>
            <div class="text-container">
                <label for={`choice-${index}`} class="choice-text">{text}</label>
            </div>
            <div class="circle-container">
                <span class="choice-circle"></span>
            </div>
        </div>
    {/each}
    <button class="clear-button" on:click={clearAnswer}>Clear Answer</button>
</div>

<style>
    .multiple-choice {
        display: flex;
        flex-direction: column;
        gap: 12px; /* Space between boxes */
        width: fit-content;
    }

    .choice-box {
        display: flex;
        align-items: center;
        padding: 10px;
        border: 2px solid #a4a4a4; /* Dark gray border */
        border-radius: 5px;
        background-color: #fff; /* White background */
    }

    .input-container {
        width: 65px; /* Set width for the input container */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .choice-input {
        width: 20px;
        height: 20px;
        margin: 0;
    }

    .text-container {
        flex: 1; /* Allow text to take up remaining space */
        margin-left: 10px;
    }

    .choice-text {
        display: block;
    }

    .circle-container {
        width: 45px; /* Set width for the circle container */
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .choice-circle {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #d3d3d3; /* Light gray color */
    }

    .clear-button {
        align-self: flex-start;
    padding: 8px 16px;
    font-size: 24px;
    color: #006edd;
    background-color: #ffffff;
    border: 1px solid gray;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;
    }

    .clear-button:hover {
        background-color: #e5e5e5; /* Darker blue on hover */
    }
</style>