const products = [
    { id: 1, name: "Product 1", price: 19.99, description: "Description of Product 1", image: "product1.jpg" },
    { id: 2, name: "Product 2", price: 29.99, description: "Description of Product 2", image: "product2.jpg" },
    { id: 3, name: "Product 3", price: 39.99, description: "Description of Product 3", image: "product3.jpg" },
];

const productList = document.getElementById('product-list');

products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product-item';
    productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
        <button onclick="viewDetails(${product.id})">View Details</button>
    `;
    productList.appendChild(productDiv);
});

// Function to navigate to product details
function viewDetails(productId) {
    window.location.href = `product-details.html?id=${productId}`;
}
// Function to display product details
function displayProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    const product = products.find(p => p.id === productId);
    const productDetails = document.getElementById('product-details');

    if (product) {
        productDetails.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}">
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
    } else {
        productDetails.innerHTML = `<p>Product not found.</p>`;
    }
}

// Call displayProductDetails if on the product-details page
if (document.getElementById('product-details')) {
    displayProductDetails();
}
let cart = [];

// Function to add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        alert(`${product.name} has been added to your cart.`);
    }
}

// Function to display cart items
function displayCartItems() {
    const cartItemsDiv = document.getElementById('cart-items');
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `<p>Your cart is empty.</p>`;
        return;
    }
    
    cart.forEach(product => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });
}

// Call displayCartItems if on the cart page
if (document.getElementById('cart-items')) {
    displayCartItems();
}

const searchBar = document.getElementById('search-bar');

searchBar.addEventListener('input', function(event) {
    const searchText = event.target.value.toLowerCase();
    productList.innerHTML = ''; // Clear existing products

    products
        .filter(product => product.name.toLowerCase().includes(searchText))
        .forEach(filteredProduct => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product-item';
            productDiv.innerHTML = `
                <img src="${filteredProduct.image}" alt="${filteredProduct.name}">
                <h3>${filteredProduct.name}</h3>
                <p>Price: $${filteredProduct.price}</p>
                <button onclick="viewDetails(${filteredProduct.id})">View Details</button>
            `;
            productList.appendChild(productDiv);
        });
});

