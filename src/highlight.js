export function pulseHighlight(node, duration = 700) {
    // Create a new style element if it doesn't already exist
    let style = document.head.querySelector('#pulse-style');
    if (!style) {
        style = document.createElement('style');
        style.id = 'pulse-style';
        style.innerHTML = `
            @keyframes pulse {
                0%, 100% { 
                    background-color: #f6d4ff; 
                    outline-color: #A12ECF;
                }
                50% { 
                    background-color: white; 
                    outline-color: white;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Function to start the animation
    function startAnimation() {
        node.style.animation = 'none'; // Reset animation
        setTimeout(() => {
            node.style.animation = `pulse ${duration}ms ease-in-out 0s 2`;
        }, 10); // Short delay to reapply the animation
    }

    // Scroll to the node smoothly
    node.scrollIntoView({ behavior: 'smooth' });

    // Delay the start of the animation until scrolling is likely complete
    setTimeout(startAnimation, 700); // Adjust this timeout based on typical scroll duration

    // Set the background color to lightpink when the animation ends
    node.addEventListener('animationend', () => {
        node.style.backgroundColor = '#f6d4ff';
    });
}