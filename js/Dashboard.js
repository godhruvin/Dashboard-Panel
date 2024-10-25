document.addEventListener('DOMContentLoaded', function () {
    fetchDashboardData();

    // Show products section when the products link is clicked
    document.getElementById('productsLink').addEventListener('click', function () {
        document.getElementById('productSection').style.display = 'block';
        document.getElementById('productTableSection').style.display = 'block';

        fetchProducts();
    });

    // Handle form submission for adding a product
    document.getElementById('productForm').addEventListener('submit', async function (event) {
        event.preventDefault();

        // Get form values
        const title = document.getElementById('title').value;
        const price = parseFloat(document.getElementById('price').value);
        const description = document.getElementById('description').value;
        const image = document.getElementById('image').value;
        const category = document.getElementById('category').value;
        const products = document.getElementById('productTableBody').rows.length;
        console.log(products);
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        const newId = products + 1;

        const newProduct = {
            id: newId,
            title: title,
            price: price,
            description: description,
            image: image,
            category: category
        };
        storedProducts.push(newProduct);
        localStorage.setItem('products', JSON.stringify(storedProducts));

        addProductToTable(newProduct);

        updateTotalProductsCount();

        document.getElementById('productForm').reset();
    });
});

// Fetch total orders, total sales, and total customers from the API
async function fetchDashboardData() {
    try {
        // Fetch orders (carts)
        const ordersResponse = await fetch('https://fakestoreapi.com/carts');
        const orders = await ordersResponse.json();
        document.getElementById('totalOrders').textContent = orders.length;

        // Fetch products
        const productsResponse = await fetch('https://fakestoreapi.com/products');
        const products = await productsResponse.json();
        const totalProducts = products.length;
        const totalSales = orders.reduce((acc, order) => {
            const orderTotal = order.products.reduce((total, item) => {
                const product = products.find(p => p.id === item.productId);
                return total + (product.price * item.quantity);
            }, 0);
            return acc + orderTotal;
        }, 0).toFixed(2);

        // Update dashboard metrics for products and sales
        document.getElementById('totalProducts').textContent = totalProducts;
        document.getElementById('totalSales').textContent = `$${totalSales}`;

        // Fetch customers
        const customersResponse = await fetch('https://fakestoreapi.com/users');
        const customers = await customersResponse.json();
        document.getElementById('totalCustomers').textContent = customers.length;

        // Populate latest orders
        populateLatestOrders(orders, products);

    } catch (error) {
        console.error('Error fetching dashboard data:', error);
    }
}

// Populate the Latest Orders table
// function populateLatestOrders(orders, products) {
//     const orderTableBody = document.getElementById('orderTableBody');
//     orderTableBody.innerHTML = ''; // Clear any existing content

//     // Display the most recent 5 orders (if available)
//     const latestOrders = orders.slice(-5); // Get the last 5 orders

//     latestOrders.forEach(order => {
//         const row = document.createElement('tr');
//         const productDetails = order.products.map(item => {
//             const product = products.find(p => p.id === item.productId);
//             return `${product.title} (x${item.quantity})`;
//         }).join(', ');

//         row.innerHTML = `
//             <td>${order.id}</td>
//             <td>${productDetails}</td>
//             <td>${order.completed ? 'Completed' : 'Pending'}</td>
//             <td>$${order.products.reduce((acc, item) => {
//             const product = products.find(p => p.id === item.productId);
//             return acc + (product.price * item.quantity);
//         }, 0).toFixed(2)}</td>
//             <td>${new Date(order.date).toLocaleDateString()}</td>
//         `;
//         orderTableBody.appendChild(row);
//     });
// }

// Function to fetch products and update the product table
async function fetchProducts() {
    try {
        const productsResponse = await fetch('https://fakestoreapi.com/products');
        const products = await productsResponse.json();
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];

        const allProducts = [...products, ...storedProducts];
        const productTableBody = document.getElementById('productTableBody');
        productTableBody.innerHTML = ''; // Clear previous entries

        allProducts.forEach(product => {
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
        });

        // Update total products count
        document.getElementById('totalProducts').innerText = allProducts.length;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
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

// Function to update the total products count
function updateTotalProductsCount() {
    const productTableBody = document.getElementById('productTableBody');
    const totalCount = productTableBody.rows.length;
    document.getElementById('totalProducts').innerText = totalCount;
}

// Mock function to simulate adding a product
async function addProduct(product) {
    console.log('Product added:', product);
   
}

// Initialize the dashboard by fetching data
fetchDashboardData();

// Sales chart using Chart.js (static data for now)
const ctx = document.getElementById('salesChart').getContext('2d');
const salesChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Sales ($)',
            data: [500, 1000, 750, 1250, 1750, 1500, 2000], 
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            fill: true,
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Notification alert
function showNotification() {
    alert('You Don\'t Have Any Notifications!');
}

// Log out functionality with modal to confirm log out .
function logOut() {

    const modal = new bootstrap.Modal(document.getElementById('exampleModalCenter'));
    modal.show();

    const confirmButton = document.getElementById('btn');

    confirmButton.addEventListener('click', () => {
        modal.hide();
        window.location.href = 'Login-Register.html';
    });
}

// function to open the side bar and collapse the sidebar
// Function to toggle sidebar
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    const isCollapsed = sidebar.classList.toggle('collapsed'); // Toggle class and get the new state

    // Adjust the content margin based on the sidebar's width
    if (isCollapsed) {
        content.style.marginLeft = '0'; // No margin when sidebar is collapsed
    } else {
        content.style.marginLeft = '250px'; // Adjust margin for expanded sidebar
    }
}

// Event listener for the toggle button
document.querySelector('#toggleSideBar').addEventListener('click', toggleSidebar);
