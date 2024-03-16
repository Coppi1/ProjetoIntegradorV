import React from "react";
import styles from "./styles.module.css";
import { Chart } from "primereact/chart";
import { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import axios from "axios";
// import buscarNaturezas from "./FormularioReceita"

export const Graficos = () => {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})
  const [receitas, setReceitas] = useState([])

  useEffect(() => {
    buscarReceitas();

    // const Naturezas = buscarNaturezas()

    // const receitasPorNatureza = receitas.reduce((acc, receita) => {
    //   const index = acc.findIndex(item => item.id_natureza === receita.id_natureza);
    //   if (index !== -1) {
    //     acc[index].total += receita.valor;
    //   } else {
    //     acc.push({ id_natureza: receita.id_natureza, total: receita.valor });
    //   }
    //   return acc;
    // }, []);

  }, []);

  useEffect(() => {

    // const receitasPorNatureza = receitas.reduce((acc, receita) => {
    //   const index = acc.findIndex(item => item.id_natureza === receita.id_natureza);
    //   if (index !== -1) {
    //     acc[index].total += receita.valor;
    //   } else {
    //     acc.push({ id_natureza: receita.id_natureza, total: receita.valor });
    //   }
    //   return acc;
    // }, []);

    // const descricaoNaturezas = receitasPorNatureza.map(receita => {
    //   // Aqui você precisa obter a descrição da natureza com base no id_natureza
    //   // Suponha que você tenha uma função para obter a descrição da natureza
    //   // Vou chamar essa função de obterDescricaoNatureza
    //   return obterDescricaoNatureza(receita.id_natureza);
    // });

    // const totalReceitas = receitasPorNatureza.map(receita => receita.total);

    const data = {

      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [540, 325, 702],
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

  }, [receitas]); // [receitas] Atualiza o gráfico sempre que receitas mudar

  const buscarReceitas = async () => {
    try {
      const resposta = await axios.get("http://localhost:4000/receitas");
      setReceitas(resposta.data);
      console.log(receitas)
    } catch (error) {
      console.log(error);
    }
  };

  const receitasPorNatureza = receitas.reduce((acc, receita) => {
    const index = acc.findIndex(item => item.id_natureza === receita.id_natureza);
    if (index !== -1) {
      acc[index].total += receita.valor;
    } else {
      acc.push({ id_natureza: receita.id_natureza, total: receita.valor });
    }
    return acc;
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
