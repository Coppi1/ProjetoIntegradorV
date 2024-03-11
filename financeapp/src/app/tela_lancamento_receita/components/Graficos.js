import React from "react";
import styles from "./styles.module.css";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

export const Graficos = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const data = {
      labels: ["Q1", "Q2", "Q3", "Q4"],
      datasets: [
        {
          label: "Sales",
          data: [540, 325, 702, 620],
          backgroundColor: [
            "rgba(255, 159, 64, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgb(255, 159, 64)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
          ],
          borderWidth: 1,
        },
      ],
    };
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div id="GraficoConteiner" className={styles.graficoConteiner}>
      <div className={styles.titulo}>
        <h4>Visualização por Natureza</h4>
      </div>

      <div className={styles.graficoFilter}>
        <label>Selecione a data: </label>
        <Dropdown></Dropdown>

        <div className={styles.button}>
          <Button>Aplicar</Button>
        </div>
      </div>

      <Chart
        type="pie"
        data={chartData}
        options={chartOptions}
        className={styles.grafico}
      />
    </div>
  );
};
