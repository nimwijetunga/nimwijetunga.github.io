var config = {
    type: 'bar',
    data: {
        labels: ["Web Development", "Backend Development", "Frontend Development", "Algorithm Design", "Android Development"],
        datasets: [
            {
                backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
                data: [60, 90, 30, 80, 50]
            }
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    display: false
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: '#f5f5f5',
                    fontSize: 16
                },
            }]
        },
        tooltips: {
            titleFontSize: 14,
            bodyFontSize: 14,
            callbacks: {
                title: function (tooltipItem, data) {
                    return data['labels'][tooltipItem[0]['index']];
                },
                label: function (tooltipItem, data) {}
            }
        },
        legend: { display: false },
        title: {
            display: true,
            text: 'Technology Interests',
            fontColor: '#f5f5f5',
            fontSize: 18
        }
    }
};

bar_chart = new DrawChart('intrest_chart', config);
