document.getElementById('healthForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const condition = document.getElementById('condition').value;

    // Dummy data for 5 people
    const dummyData = [
        { name: 'Person 1', weight: 70, height: 170, condition: 'Condition 1' },
        { name: 'Person 2', weight: 65, height: 165, condition: 'Condition 2' },
        { name: 'Person 3', weight: 80, height: 180, condition: 'Condition 1' },
        { name: 'Person 4', weight: 75, height: 175, condition: 'Condition 3' },
        { name: 'Person 5', weight: 90, height: 190, condition: 'Condition 2' },
    ];

    dummyData.push({ name, weight, height, condition });

    // Update charts
    updateCharts(dummyData);

    // Clear input values
    document.getElementById('name').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('height').value = '';
    document.getElementById('condition').value = '';
});


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

    const pieChart = new Chart(document.getElementById('pieChart'), {
        type: 'pie',
        data: {
            labels: pieLabels,
            datasets: [{
                data: pieData,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Medical Conditions'
            }
        }
    });

    const barChart = new Chart(document.getElementById('barChart'), {
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
            title: {
                display: true,
                text: 'Distribution of Heights'
            }
        }
    });
}
