<script>
    import { onMount } from 'svelte';

    export let imageUrl = "";
    export let mode = "fill"; // "fill" or "fixed"
    export let fixedWidth = 0; // Pixel value for fixed width mode
    export let mathMLContent = ''; // MathML content as a string
    export let contentType = 'image'; // "image" or "mathml"

    let imageElement;
    let mathMLElement;
    let imageWrapper;
    let floatingScrollbar;
    let floatingScrollbarContent;
    let outerContainer;
    let maxContainerWidth = 0;

    function updateContentWidth() {
        const containerWidth = imageWrapper.clientWidth;
        const windowWidth = window.innerWidth;
        const contentWidth = contentType === 'image' ? imageElement.clientWidth : mathMLElement.clientWidth;

        console.log(`Container Width: ${containerWidth}px`);
        console.log(`Window Width: ${windowWidth}px`);
        console.log(`Initial Content Width: ${contentWidth}px`);
        console.log(`Max Container Width: ${maxContainerWidth}px`);

        if (mode === "fill") {
            if (containerWidth < maxContainerWidth) {
                // Container is shrinking, set content width to max container width
                if (contentType === 'image') {
                    imageElement.style.width = `${maxContainerWidth}px`;
                } else {
                    mathMLElement.style.width = `${maxContainerWidth}px`;
                }
                console.log(`Content Width set to Max Container Width: ${maxContainerWidth}px`);
            } else {
                // Container can still expand, set content width to 100%
                if (contentType === 'image') {
                    imageElement.style.width = '100%';
                } else {
                    mathMLElement.style.width = '100%';
                }
                console.log('Content Width set to 100%');
                maxContainerWidth = containerWidth;
            }
        } else if (mode === "fixed" && fixedWidth > 0) {
            if (contentType === 'image') {
                imageElement.style.width = `${fixedWidth}px`;
            } else {
                mathMLElement.style.width = `${fixedWidth}px`;
            }
            console.log(`Content Width set to Fixed Width: ${fixedWidth}px`);
        }

        updateScrollbarContentWidth();
        console.log(`Updated Content Width: ${contentType === 'image' ? imageElement.clientWidth : mathMLElement.clientWidth}px`);
    }

    function updateScrollbarContentWidth() {
        floatingScrollbarContent.style.width = `${contentType === 'image' ? imageElement.clientWidth : mathMLElement.clientWidth}px`;
        console.log(`Scrollbar Content Width: ${floatingScrollbarContent.style.width}`);
    }

    function updateScrollbarPosition() {
        console.log('Checking scrollbar position...');
        const rect = imageWrapper.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const isContentPartiallyVisible = rect.top < viewportHeight && rect.bottom > 0;
        const isContentBottomInView = rect.bottom <= viewportHeight;
        const hasHorizontalScrollbar = imageWrapper.scrollWidth > imageWrapper.clientWidth;

        console.log('isContentPartiallyVisible:', isContentPartiallyVisible);
        console.log('isContentBottomInView:', isContentBottomInView);
        console.log('hasHorizontalScrollbar:', hasHorizontalScrollbar);

        if (isContentPartiallyVisible && !isContentBottomInView && hasHorizontalScrollbar) {
            floatingScrollbar.style.visibility = 'visible';
            floatingScrollbar.style.opacity = '1';
        } else {
            floatingScrollbar.style.visibility = 'hidden';
            floatingScrollbar.style.opacity = '0';
        }

        floatingScrollbar.style.left = `${rect.left}px`;
        floatingScrollbar.style.width = `${rect.width}px`;
    }

    function syncScroll() {
        floatingScrollbar.scrollLeft = imageWrapper.scrollLeft;
    }

    function syncImageScroll() {
        imageWrapper.scrollLeft = floatingScrollbar.scrollLeft;
    }

    onMount(() => {
        updateContentWidth();
        updateScrollbarPosition();
        window.addEventListener('resize', () => {
            updateContentWidth();
            updateScrollbarPosition();
        });
        outerContainer = document.querySelector('.outer-container');
        if (outerContainer) {
            outerContainer.addEventListener('scroll', updateScrollbarPosition);
        }
        imageWrapper.addEventListener('scroll', () => {
            syncScroll();
            updateScrollbarPosition();
        });
        floatingScrollbar.addEventListener('scroll', syncImageScroll);
        return () => {
            window.removeEventListener('resize', () => {
                updateContentWidth();
                updateScrollbarPosition();
            });
            if (outerContainer) {
                outerContainer.removeEventListener('scroll', updateScrollbarPosition);
            }
            imageWrapper.removeEventListener('scroll', () => {
                syncScroll();
                updateScrollbarPosition();
            });
            floatingScrollbar.removeEventListener('scroll', syncImageScroll);
        };
    });

    // Set the CSS variable for fixed width
    if (mode === "fixed" && fixedWidth > 0) {
        document.documentElement.style.setProperty('--fixed-width', `${fixedWidth}px`);
    }
</script>

<div class="outer-wrapper">
    <div bind:this={imageWrapper} class="image-wrapper">
        {#if contentType === 'image'}
            <img bind:this={imageElement} src={imageUrl} alt="Image" class={mode}>
        {:else if contentType === 'mathml'}
            <div bind:this={mathMLElement} class={`mathml-content ${mode}`}>
                {@html mathMLContent}
            </div>
        {/if}
    </div>
    <div bind:this={floatingScrollbar} id="floating-scrollbar" style="position: fixed; bottom: 0px; height: 30px; overflow: auto hidden; visibility: hidden; opacity: 0;">
        <div bind:this={floatingScrollbarContent} style="border: 1px solid rgb(255, 255, 255); opacity: 0.01;">
            <div></div>
        </div>
    </div>
</div>

<style>
    .outer-wrapper {
        overflow-x: hidden; /* Prevent horizontal scrolling on the outer wrapper */
        position: relative;
    }

    .image-wrapper {
        overflow-x: auto; /* Enable horizontal scrolling */
        line-height: 0;
        position: relative;
        overflow-y: hidden;
    }

    .image-wrapper img,
    .mathml-content {
        height: auto;
        line-height: 0;
    }

    .image-wrapper img.fill,
    .mathml-content.fill {
        width: 100%; /* Default width for fill mode */
    }

    .mathml-content.fixed {
        padding: 0.2rem; /* Use CSS variable for fixed width */
    }

    .image-wrapper img.fixed,
    .mathml-content.fixed {
        width: var(--fixed-width); /* Use CSS variable for fixed width */
    }

    .custom-scrollbar {
        overflow-x: auto;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 20px; /* Height of the custom scrollbar */
        background: white; /* Optional: Add background to scrollbar area */
        z-index: 10; /* Ensure it stays above other content */
    }

    .sticky-scrollbar {
        position: fixed;
        bottom: 0;
    }

    /* Media query for screens smaller than 828px */
    @media (max-width: 828px) {
        .outer-wrapper {
            padding: 0 5%; /* Adjust padding for smaller screens */
        }
    }
</style>