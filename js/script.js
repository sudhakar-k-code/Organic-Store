const products = [
    {
        "id": 1,
        "name": "Organic Vegetables",
        "description": "Freshly picked organic vegetables, grown without pesticides.",
        "mrp": "₹ 100/kg",
        "price": "₹ 70/kg",
        "product_unit": "kg",
        "image": "images/product1.jpg",
        "quantities": [
            { "value": 0, "label": "Select" },
            { "value": 0.25, "label": "250 g" },
            { "value": 0.5, "label": "500 g" },
            { "value": 1, "label": "1 kg" },
            { "value": 2, "label": "2 kg" },
            { "value": 3, "label": "3 kg" }
        ]
    },
    {
        "id": 2,
        "name": "Natural Honey",
        "description": "Pure and natural honey straight from the hive.",
        "mrp": "₹ 1300/jar",
        "price": "₹ 999/jar",
        "product_unit": "jar",
        "image": "images/product2.jpg",
        "quantities": [
            { "value": 0, "label": "Select" },
            { "value": 1, "label": "1 jar" },
            { "value": 2, "label": "2 jars" },
            { "value": 3, "label": "3 jars" }
        ]
    },
    {
        "id": 3,
        "name": "Fresh Fruits",
        "description": "Seasonal fruits packed with nutrition and flavor.",
        "mrp": "₹ 230/kg",
        "price": "₹ 190/kg",
        "product_unit": "kg",
        "image": "images/product3.jpg",
        "quantities": [
            { "value": 0, "label": "Select" },
            { "value": 0.25, "label": "250 g" },
            { "value": 0.5, "label": "500 g" },
            { "value": 1, "label": "1 kg" },
            { "value": 2, "label": "2 kg" },
            { "value": 3, "label": "3 kg" }
        ]
    }
];

// Function to load products from the JavaScript object
function loadProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const quantityOptions = product.quantities.map(quantity => `
            <option value="${quantity.value}">${quantity.label}</option>
        `).join('');
        
        const productCard = `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card">
                <img src="${product.image}" class="card-img-top product-image" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="mrp"><s>${product.mrp}</s></p>
                    <p class="price"><strong>${product.price}</strong></p>
                    <label for="quantity-${product.id}" class="form-label">Select Quantity: (${product.product_unit})</label>
                    <select id="quantity-${product.id}" class="form-select quantity" data-product-name="${product.name}">
                        ${quantityOptions}
                    </select>
                </div>
            </div>
        </div>
        `;
        productList.insertAdjacentHTML('beforeend', productCard);
    });
}

// Call the loadProducts function on page load
window.onload = loadProducts;


// Function to handle the review and order process
function handleOrderReview() {
    const quantities = document.querySelectorAll('.quantity');
    let orderSummary = '';
    let totalPrice = 0;

    quantities.forEach(select => {
        const productName = select.getAttribute('data-product-name');
		console.log(productName);
        const quantity = parseFloat(select.value);
		console.log(quantity);
        if (quantity > 0) {
            let priceText = select.parentElement.querySelector('.price').innerText;
			console.log(priceText);
            let price = parseFloat(priceText.replace('₹ ', '').replace('/kg', '').replace('/jar', ''));
			console.log(price);
            totalPrice += price * quantity;
			console.log(totalPrice);
            orderSummary += `<p>${quantity} x ${productName} at ${priceText}</p>`;
        }
    });

    document.getElementById('order-summary').innerHTML = orderSummary || '<p>No products selected.</p>';
    document.getElementById('total-amount').innerText = `₹ ${totalPrice.toFixed(2)}`;
    const orderReviewModal = new bootstrap.Modal(document.getElementById('orderReviewModal'));
    orderReviewModal.show();
}


// Event Listeners
document.getElementById('review-order').addEventListener('click', handleOrderReview);


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

// Function to generate WhatsApp link
function generateWhatsAppLink() {
    const quantities = document.querySelectorAll('.quantity');
    let message = "Hi, I would like to order:\n";
    let totalPrice = 0;

    quantities.forEach(select => {
        const productName = select.getAttribute('data-product-name');
        const quantity = parseFloat(select.value);
        if (quantity > 0) {
            let priceText = select.parentElement.querySelector('.price').innerText;
            let price = parseFloat(priceText.replace('₹ ', '').replace('/kg', '').replace('/jar', ''));
            totalPrice += price * quantity;
            message += `${quantity} x ${productName} at ${priceText}\n`;
        }
    });

    message += `Total: ₹ ${totalPrice.toFixed(2)}`;
    const whatsappNumber = '9047812407'; // Replace with your WhatsApp number
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Open the WhatsApp link
    window.open(whatsappLink, '_blank');
}


document.getElementById('generate-whatsapp-link').addEventListener('click', generateWhatsAppLink);
