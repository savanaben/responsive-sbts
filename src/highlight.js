export function pulseHighlight(node, duration = 1000) {
    // Create a new style element
    const style = document.createElement('style');

    // Define the pulse animation
    style.innerHTML = `
        @keyframes pulse {
            0%, 100% { background-color: white; }
            50% { background-color:#f6d4ff;; }
        }
    `;

    // Append the style element to the head of the document
    document.head.appendChild(style);

    // Scroll to the node smoothly
    node.scrollIntoView({ behavior: 'smooth' });

    // Wait for 1300ms (estimated 1000ms for scrolling + 300ms pause) before starting the animation
    setTimeout(() => {
        node.style.animation = `pulse ${duration}ms ease-in-out 0s 2`;
    }, 1000);

    // Set the background color to lightpink when the animation ends
    node.addEventListener('animationend', () => {
        node.style.backgroundColor = '#f6d4ff;';
        document.head.removeChild(style);
    });
}