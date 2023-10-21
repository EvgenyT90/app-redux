import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
} from "chart.js";
import { Container } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
//import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

interface IChartData {
    date: any;
    pm10: any;
    pm10Avg: any;
    pm2_5: any;
    pm2_5Avg: any;
    countRow: any;
}

export const ChartMy = ({ props }: { props: IChartData[] }) => {
    let content: JSX.Element;
    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            title: {
                display: true,
                text: "Средние значения по дня для частиц",
            },
        },
    };

    const data = {
        labels: props.map((data: any) => data.date.toLocaleDateString("ru-RU")),
        datasets: [
            {
                label: "Среднее количество частиц pm10",
                data: props.map((data: any) => data.pm10Avg),
                borderWidth: 1,
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "Среднее количество частиц pm2_5",
                data: props.map((data: any) => data.pm2_5Avg),
                borderWidth: 1,
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    };

    content = <Bar options={options} data={data} />;
    return (
        <Container className="shadow p-3 mb-5 bg-white rounded">
            {content}
        </Container>
    );
};
