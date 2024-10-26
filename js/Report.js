// function to generate the chart for sales report

let salesChartInstance = null;
function generateSalesReport() {
    const ctx = document.getElementById('salesChart').getContext('2d');

    if(salesChartInstance) salesChartInstance.destroy();
    const salesData = {
        labels: ['Customers', 'Products', 'Orders', 'Sales'],
        datasets: [{
            label: 'Sales Overview',
            data: [2000, 1200, 40000 , 56660.456],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    };

    

    salesChartInstance = new Chart(ctx, {
        type: 'pie', 
        data: salesData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            maintainAspectRatio:true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Sales Overview Report'
                }
            }
        }
    })
}
// Automatically updates the chart as soon as the user comes.
document.onload(generateSalesReport());

function NavigateToDashboard(){
    window.location.href = `Dashboard.html`;
    
}