// script.js

// Function to handle zooming on scroll
function handleZoomOnScroll() {
    const productImages = document.querySelectorAll('.product-image');

    productImages.forEach(image => {
        // Calculate scroll position and apply zoom effect
        const scrollY = window.scrollY || window.pageYOffset; // Get scroll position
        const offset = image.offsetTop; // Image top offset

        // Check if the image is in the viewport
        if (scrollY + window.innerHeight > offset && scrollY < offset + image.clientHeight) {
            const zoomLevel = Math.min(1.2, 1 + (scrollY - offset + window.innerHeight) / 1000); // Zoom calculation
            image.style.transform = `scale(${zoomLevel})`; // Apply zoom
        } else {
            image.style.transform = 'scale(1)'; // Reset scale if out of viewport
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', handleZoomOnScroll);
