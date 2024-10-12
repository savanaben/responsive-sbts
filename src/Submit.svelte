<script>
    // No props or additional logic needed for this simple component
</script>

<div class="submit-container">
    <span class="submit-text">Select <strong>Submit</strong> when you are finished.</span>
    <button class="submit-button">Submit</button>
</div>

<style>
    .submit-container {
        display: flex;
        align-items: center;
        gap: 10px; /* Space between text and button */
        padding-top: 1rem;
        justify-content: flex-end;
    }

    .submit-text {

    }

    .submit-button {
        padding: 8px 24px;
        font-size: 24px;
        color: white;
        background-color: #007bff; /* Blue background color */
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .submit-button:hover {
        background-color: #0056b3; /* Darker blue on hover */
    }
</style>