// Function to display the orders.

document.addEventListener('DOMContentLoaded', () => {
    populateLatestOrders(orders);
});

function populateLatestOrders(orders) {
    const orderTableBody = document.getElementById('orderTableBody');
    orderTableBody.innerHTML = ''; // Clear any existing content

    // Display the most recent 5 orders
    const latestOrders = orders.slice(); 

    latestOrders.forEach(order => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.completed ? 'Completed' : 'Pending'}</td>
            <td>$${order.total.toFixed(2)}</td>
            <td>${new Date(order.date).toLocaleDateString()}</td>
        `;

        orderTableBody.appendChild(row);
    });
}
