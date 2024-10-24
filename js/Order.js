function populateLatestOrders(orders, products) {
    const orderTableBody = document.getElementById('orderTableBody');
    orderTableBody.innerHTML = ''; // Clear any existing content

    // Display the most recent 5 orders (if available)
    const latestOrders = orders.slice(-5); // Get the last 5 orders

    latestOrders.forEach(order => {
        const row = document.createElement('tr');
        const productDetails = order.products.map(item => {
            const product = products.find(p => p.id === item.productId);
            return `${product.title} (x${item.quantity})`;
        }).join(', ');

        row.innerHTML = `
                    <td>${order.id}</td>
                    <td>${productDetails}</td>
                    <td>${order.completed ? 'Completed' : 'Pending'}</td>
                    <td>$${order.products.reduce((acc, item) => {
            const product = products.find(p => p.id === item.productId);
            return acc + (product.price * item.quantity);
        }, 0).toFixed(2)}</td>
                    <td>${new Date(order.date).toLocaleDateString()}</td>
                `;
        orderTableBody.appendChild(row);
    });
}