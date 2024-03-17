import React from "react";
import styles from "./styles.module.css";
import { Chart } from "primereact/chart";
import { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import axios from "axios";



export const Graficos = () => {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})
  const [receitas, setReceitas] = useState([])

  useEffect(() => {
    buscarReceitas();
  }, []);


  useEffect(() => {
    const data = {
      labels: ["Q1", "Q2", "Q3", "Q4"],
      datasets: [
        {
          label: "Sales",
          data: Object.values(receitas), // Usando Object.values para obter os valores do objeto receitasPorNatureza
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

  }, [receitas]); // Atualizar o gráfico sempre que receitas mudar

  const buscarReceitas = async () => {
    try {
      const resposta = await axios.get("http://localhost:4000/receitas");
      setReceitas(resposta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const receitasPorNatureza = receitas.reduce((acc, receita) => {
    if (!acc[receita.natureza]) {
      acc[receita.natureza] = [];
    }
    acc[receita.natureza].push(receita.valor);
    return acc;
  }, {});

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
