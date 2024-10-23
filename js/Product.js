document.addEventListener('DOMContentLoaded', function () {
    // Fetch and display existing products if any
    fetchProducts();

    // Handle form submission for adding a product
    document.getElementById('productForm').addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form values
        const title = document.getElementById('title').value;
        const price = parseFloat(document.getElementById('price').value);
        const description = document.getElementById('description').value;
        const image = document.getElementById('image').value;
        const category = document.getElementById('category').value;

        // Retrieve existing products from local storage
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        const newId = storedProducts.length + 1; // Generate new ID

        const newProduct = {
            id: newId,
            title: title,
            price: price,
            description: description,
            image: image,
            category: category
        };

        // Add new product to local storage
        storedProducts.push(newProduct);
        localStorage.setItem('products', JSON.stringify(storedProducts));

        // Add product to the table
        addProductToTable(newProduct);

        // Reset form
        document.getElementById('productForm').reset();
    });
});

// Function to fetch products and update the product table
function fetchProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productTableBody = document.getElementById('productTableBody');
    productTableBody.innerHTML = ''; // Clear previous entries

    products.forEach(product => {
        addProductToTable(product);
    });
}

// Function to add product to the table
function addProductToTable(product) {
    const productTableBody = document.getElementById('productTableBody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.title}</td>
        <td>$${product.price}</td>
        <td>${product.description}</td>
        <td><img src="${product.image}" alt="${product.title}" width="50"></td>
        <td>${product.category}</td>
    `;
    productTableBody.appendChild(row);
}
