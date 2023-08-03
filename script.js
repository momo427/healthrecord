let allHealthData = []; // To store data from all users

document.getElementById('healthForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const condition = document.getElementById('condition').value;

    // Store the new user's data
    const userData = { name, weight, height, condition };
    allHealthData.push(userData);

    // Update charts with all accumulated data
    updateCharts(allHealthData);

    // Clear input values
    document.getElementById('name').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('height').value = '';
    document.getElementById('condition').value = '';
});

// ...

let pieChart;
let barChart;

function updateCharts(data) {
    const conditions = {};
    const heights = {};

    data.forEach(person => {
        conditions[person.condition] = (conditions[person.condition] || 0) + 1;
        heights[person.height] = (heights[person.height] || 0) + 1;
    });

    const pieLabels = Object.keys(conditions);
    const pieData = Object.values(conditions);

    const barLabels = Object.keys(heights);
    const barData = barLabels.map(height => heights[height]);

    // Check if chart instances already exist, then destroy them
    if (pieChart) {
        pieChart.destroy();
    }
    if (barChart) {
        barChart.destroy();
    }

    // Create new chart instances
    pieChart = new Chart(document.getElementById('pieChart'), {
        type: 'pie',
        data: {
            labels: pieLabels,
            datasets: [{
                data: pieData,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Medical Conditions'
                }
            }
        }
    });

    barChart = new Chart(document.getElementById('barChart'), {
        type: 'bar',
        data: {
            labels: barLabels,
            datasets: [{
                label: 'Number of People',
                data: barData,
                backgroundColor: '#36A2EB'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Distribution of Heights'
                }
            }
        }
    });
}

// ...
