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
  const [naturezas, setNaturezas] = useState([])
  const [MapaNaturezas, setMapaNaturezas] = useState([])

  useEffect(() => {
    buscarReceitas();
    buscarNaturezas()

  }, []);


  useEffect(() => {

    const valorTotalPorNatureza = calcularValorTotalPorNatureza(receitas);
    console.log(valorTotalPorNatureza)

    const labels = valorTotalPorNatureza.map(item => item.Natureza);
    const valores = valorTotalPorNatureza.map(item => item["valor total"]);

    const data = {
      labels: labels,
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

  }, [receitas]); // [receitas] Atualiza o gráfico sempre que receitas mudar

  const buscarReceitas = async () => {
    try {
      const resposta = await axios.get("http://localhost:4000/receitas");
      setReceitas(resposta.data);
      console.log("Dados: " + resposta.data[0].descricao);
      //console.log(receitas)
    } catch (error) {
      console.log(error);
    }
  };

  const buscarNaturezas = async () => {
    try {
      const resposta = await axios.get("http://localhost:4000/naturezas");
      //console.log("Dados: " + resposta.data[0].descricao);
      setNaturezas(resposta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const calcularValorTotalPorNatureza = (receita) => {

    //calculando o valor total por natureza
    const valorTotalPorNatureza = receitas.reduce((acc, receita) => {
      const { id_natureza, valor } = receita;
      acc[id_natureza] = (acc[id_natureza] || 0) + valor;
      return acc;
    }, {});

    // Mapeando o objeto resultante para array de objetos
    const resultado = Object.entries(valorTotalPorNatureza).map(([id_natureza, valorTotal]) => {
      const descricaoNatureza = naturezas.find(natureza => natureza.id === parseInt(id_natureza));
      return {
        Natureza: descricaoNatureza ? descricaoNatureza.descricao : "Natureza Desconhecida",
        "valor total": valorTotal
      };
    });

    return resultado;
  };

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
