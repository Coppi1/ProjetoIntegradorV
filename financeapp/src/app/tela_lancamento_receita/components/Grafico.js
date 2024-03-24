import React from "react";
import styles from "../styles/styles.module.css";
import { Chart } from "primereact/chart";
import { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import axios from "axios";

export const Grafico = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [receitas, setReceitas] = useState([]);
  const [naturezas, setNaturezas] = useState([]);

  useEffect(() => {
    buscarReceitas();
    buscarNaturezas();
  }, []);

  useEffect(() => {
    // Chama calcularValorTotalPorNatureza somente quando receitas e naturezas forem atualizados
    if (receitas.length > 0 && naturezas.length > 0) {
      const valorTotalPorNatureza = calcularValorTotalPorNatureza(receitas, naturezas);
      const labels = valorTotalPorNatureza.map((item) => item.Natureza);
      const valores = valorTotalPorNatureza.map((item) => item["Valor Total"]);
      console.log(labels);
      const data = {
        labels: labels,
        datasets: [
          {
            label: "Valor:",
            data: valores,
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
    }
  }, [receitas, naturezas]);


  const buscarReceitas = async () => {
    try {
      const resposta = await axios.get("http://localhost:4000/receitas");
      setReceitas(resposta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const buscarNaturezas = async () => {
    try {
      const resposta = await axios.get("http://localhost:4000/naturezas");
      setNaturezas(resposta.data);
    } catch (error) {
      console.log(error)
    }
  }

  const calcularValorTotalPorNatureza = (receitas, naturezas) => {
    // Calculando o valor total por natureza
    const valorTotalPorNatureza = receitas.reduce((acc, receita) => {
      const { naturezaReceita, valor } = receita;
      const { id } = naturezaReceita;
      acc[id] = (acc[id] || 0) + valor;
      return acc;
    }, {});

    // Mapeando o objeto resultante para array de objetos
    const resultado = Object.entries(valorTotalPorNatureza).map(
      ([id_natureza, valorTotal]) => {
        const descricaoNatureza = naturezas.find(
          (natureza) => natureza.id === id_natureza
        );
        return {
          Natureza: descricaoNatureza ? descricaoNatureza.descricao : "Natureza Desconhecida",
          "Valor Total": valorTotal,
        };
      }
    );

    return resultado;
  };

  return (
    <div id="GraficoConteiner" className={styles.graficoConteiner}>
      <div className={styles.titulo}>
        <h4>Visualização por Natureza</h4>
      </div>

      <div className={styles.graficoFilter}>
        <label>Periodo: </label>
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
