// Function to handle zooming on scroll
function handleZoomOnScroll() {
    const productImages = document.querySelectorAll('.product-image');

    productImages.forEach(image => {
        const rect = image.getBoundingClientRect(); // Get the position of the image relative to the viewport
        const windowHeight = window.innerHeight; // Height of the viewport

        // Check if the image is within the viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
            // Calculate the zoom level based on how much of the image is visible
            const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
            const zoomLevel = 1 + (visibleHeight / rect.height) * 0.2; // Scale between 1 to 1.2
            image.style.transform = `scale(${zoomLevel})`;
        } else {
            image.style.transform = 'scale(1)'; // Reset zoom if out of viewport
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', handleZoomOnScroll);
