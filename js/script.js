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

// Initialize cart and total amount
let cart = [];
let totalAmount = 0;

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

    // Attach change event to quantity selects
    document.querySelectorAll('.quantity').forEach(select => {
        select.addEventListener('change', (e) => {
            const productName = e.target.getAttribute('data-product-name');
            const quantity = parseFloat(e.target.value);
            const priceText = e.target.closest('.card-body').querySelector('.price').innerText;
            const price = parseFloat(priceText.replace('₹ ', '').replace('/kg', '').replace('/jar', ''));

            // If quantity is selected (not 0), add to cart, else remove from cart
            if (quantity > 0) {
                addToCart(productName, quantity, price);
            } else {
                removeFromCartByName(productName); // Remove the item if quantity is set to 0
            }
        });
    });
}

// Call the loadProducts function on page load
window.onload = loadProducts;

// Function to add an item to the cart
function addToCart(productName, quantity, price) {
    const totalPrice = quantity * price;
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity = quantity; // Update to new quantity directly
        existingItem.totalPrice = totalPrice; // Update the total price accordingly
    } else {
        cart.push({ name: productName, quantity, price, totalPrice });
    }

    updateCartBadge();
    updateCartModal();
}

// Function to remove an item from the cart by name
function removeFromCartByName(productName) {
    const index = cart.findIndex(item => item.name === productName);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCartBadge();
        updateCartModal();
    }
}

// Function to update cart badge
function updateCartBadge() {
    document.getElementById('cart-badge').innerText = cart.length;
}

// Function to update cart modal
function updateCartModal() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.innerText = '₹ 0.00';
        return;
    }

    let cartHTML = '';
    totalAmount = 0;
    cart.forEach(item => {
        const { name, quantity, price, totalPrice } = item;
        totalAmount += totalPrice;

        cartHTML += `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <strong>${name}</strong><br>
                    ${quantity} at ₹ ${price} each
                </div>
                <div>
                    <strong>₹ ${totalPrice.toFixed(2)}</strong>
                    <button class="btn btn-sm btn-danger ms-3" onclick="removeFromCartByName('${name}')">Remove</button>
                </div>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = cartHTML;
    cartTotal.innerText = `₹ ${totalAmount.toFixed(2)}`;
}

// Attach click event for cart icon to review the cart
document.getElementById('cart-icon').addEventListener('click', updateCartModal);

// Function to generate WhatsApp link
function generateWhatsAppLink() {
    let message = "Hi, I would like to order:\n";
    let totalPrice = 0;

    cart.forEach(item => {
        message += `${item.quantity} x ${item.name} at ₹ ${item.price} each\n`;
        totalPrice += item.totalPrice;
    });

    message += `Total: ₹ ${totalPrice.toFixed(2)}`;
    const whatsappNumber = '123456789'; // Replace with your WhatsApp number
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Open the WhatsApp link
    window.open(whatsappLink, '_blank');
}

// Event Listener for Place Order button
document.getElementById('place-order').addEventListener('click', generateWhatsAppLink);
