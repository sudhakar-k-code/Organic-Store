// Function to handle zooming when the product is in the middle of the screen
function handleZoomOnScroll() {
    const productImages = document.querySelectorAll('.product-image');

    productImages.forEach(image => {
        const rect = image.getBoundingClientRect(); // Get the position of the image relative to the viewport
        const windowHeight = window.innerHeight; // Height of the viewport
        const imageCenter = rect.top + rect.height / 2; // Calculate the image's vertical center
        const screenCenter = windowHeight / 2; // Calculate the screen's vertical center

        // Check if the image's center is near the screen's center
        if (Math.abs(imageCenter - screenCenter) < rect.height / 2) {
            // Zoom the image as it gets closer to the center of the screen
            image.style.transform = `scale(1.2)`;
        } else {
            image.style.transform = 'scale(1)'; // Reset zoom if out of the center
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', handleZoomOnScroll);
