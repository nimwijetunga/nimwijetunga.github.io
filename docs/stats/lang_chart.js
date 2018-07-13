var config = {
    type: 'doughnut',
    data: {
        labels: ["JavaScript", "Java", "C++/C", "PHP", "SQL/NoSQL"],
        datasets: [
            {
                backgroundColor: ["#3cba9f", "#8e5ea2", "#FF4500", "#c45850", "#D3D3D3"],
                data: [0.25, 0.25, 0.20, 0.20, 0.10]
            }
        ]
    },
    options: {
        title: {
            display: true,
            text: 'Proficient Languages (Experience Using)',
            fontColor: '#f5f5f5',
            fontSize: 18

        },
        legend: {
            labels: {
                fontColor: '#f5f5f5',
                fontSize: 16
            }
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
        }
    }
}

pie_chart = new DrawChart('lang_chart',config);
