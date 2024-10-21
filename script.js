let productList = [];

// Event listeners for button clicks and search input
document.getElementById('fetchButton').addEventListener('click', fetchProductDetails);
document.getElementById('searchBar').addEventListener('input', filterProducts);

// Function to fetch product details (simulated)
function fetchProductDetails() {
    const productLink = document.getElementById('productLink').value;

    // Simulated data fetching (replace with actual fetch logic)
    const simulatedProductData = {
        title: "Sample Product",
        description: "This is a sample product description.",
        currentPrice: Math.floor(Math.random() * 1000),
        reviews: "4.5/5",
        totalPurchases: Math.floor(Math.random() * 100),
        priceHistory: []
    };

    // Update price history and product list
    simulatedProductData.priceHistory.push(simulatedProductData.currentPrice);
    productList.push(simulatedProductData);
    
    // Display product details and update the product list
    displayProductDetails(simulatedProductData);
    displayProductList();
}

// Function to display product details
function displayProductDetails(product) {
    const productDetailsDiv = document.getElementById('productDetails');
    productDetailsDiv.innerHTML = `
        <div class="product">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p>Current Price: ₹${product.currentPrice}</p>
            <p>Reviews: ${product.reviews}</p>
            <p>Total Purchases: ${product.totalPurchases}</p>
            <button onclick="recheckPrice(${productList.length - 1})">Recheck Price</button>
            <div class="price-history">
                <h4>Price History:</h4>
                <ul>${product.priceHistory.map(price => `<li>₹${price}</li>`).join('')}</ul>
            </div>
        </div>
    `;
}

// Function to recheck the price of a product
function recheckPrice(index) {
    const newPrice = Math.floor(Math.random() * 1000); // Simulated new price
    productList[index].priceHistory.push(newPrice);
    productList[index].currentPrice = newPrice;
    
    displayProductDetails(productList[index]);
}

// Function to display the list of products
function displayProductList() {
    const productListDiv = document.getElementById('productList');
    productListDiv.innerHTML = productList.map((product, index) => `
        <div class="product">
            <h3>${product.title}</h3>
            <p>Current Price: ₹${product.currentPrice}</p>
            <button onclick="displayProductDetails(productList[${index}])">View Details</button>
        </div>
    `).join('');
}

// Function to filter products by title
function filterProducts() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const filteredProducts = productList.filter(product => 
        product.title.toLowerCase().includes(searchTerm)
    );
    displayFilteredProducts(filteredProducts);
}

// Function to display filtered products
function displayFilteredProducts(filteredProducts) {
    const productListDiv = document.getElementById('productList');
    productListDiv.innerHTML = filteredProducts.map((product, index) => `
        <div class="product">
            <h3>${product.title}</h3>
            <p>Current Price: ₹${product.currentPrice}</p>
            <button onclick="displayProductDetails(productList[${index}])">View Details</button>
        </div>
    `).join('');
}

