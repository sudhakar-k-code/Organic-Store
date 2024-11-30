// script.js

// Function to handle zooming on scroll
function handleZoomOnScroll() {
    const productImages = document.querySelectorAll('.product-image');

    productImages.forEach(image => {
        const rect = image.getBoundingClientRect(); // Get image position relative to the viewport
        const windowHeight = window.innerHeight; // Height of the visible part of the window

        // Check if the image is entering the viewport
        if (rect.top >= 0 && rect.bottom <= windowHeight) {
            const progress = (windowHeight - rect.top) / windowHeight; // Calculate scroll progress
            const zoomLevel = 1 + progress * 0.2; // Scale between 1 to 1.2 based on progress
            image.style.transform = `scale(${zoomLevel})`;
        } else {
            image.style.transform = 'scale(1)'; // Reset zoom when out of viewport
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', handleZoomOnScroll);
