import React from 'react';
import { Line } from 'react-chartjs-2';

export default ({ data }) => {
    const options = {
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                },
            },
        }
    };

    return (
        <Line data={data} options={options} />
    );
}