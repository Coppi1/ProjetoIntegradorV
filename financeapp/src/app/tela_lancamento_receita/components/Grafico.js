import React from "react";
import styles from "../styles/styles.module.css";
import { Chart } from "primereact/chart";
import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import axios from "axios";
import { Calendar } from "primereact/calendar";
import { addLocale } from 'primereact/api';

export const Grafico = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [receitas, setReceitas] = useState([]);
  const [naturezas, setNaturezas] = useState([]);
  let [dataDe, setDataDe] = useState([]);
  let [dataAte, setDataAte] = useState([]);

  const atualizarParaDatasAtuais = () => {
    // Data atual
    let dataAtual = new Date();

    // Data de 15 dias atrás
    let dataMenos15Dias = new Date(dataAtual.getTime() - (15 * 24 * 60 * 60 * 1000));

    // Atualizando o estado com as novas datas
    setDataDe(dataMenos15Dias);
    setDataAte(dataAtual);
  };

  addLocale('br', {
    showMonthAfterYear: true,
    dayNames: ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'],
    dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
    dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    monthNames: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
    monthNamesShort: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
    today: 'Hoje',
    clear: 'Limpar'
  });

  useEffect(() => {
    // buscarReceitas();
    buscarNaturezas();
  }, []);

  useEffect(() => {
    atualizarParaDatasAtuais();
  }, []);

  useEffect(() => {
    buscarReceitas();
  }, [dataDe, dataAte]);

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
      // Manually construct the query string
      const queryString = `dtVencimento[gte]=${encodeURIComponent(dataDe)}&dtVencimento[lte]=${encodeURIComponent(dataAte)}`;

      // Realizando a requisição GET com os parâmetros de consulta
      const resposta = await axios.get(`http://localhost:4000/receitas?${queryString}`);
      setReceitas(resposta.data);
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
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

    const valorTotalPorNatureza = receitas.reduce((acc, receita) => {
      const { naturezaReceita, valor } = receita;
      const { id } = naturezaReceita;
      acc[id] = (acc[id] || 0) + valor;
      return acc;
    }, {});

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

    console.log(resultado);

    return resultado;
  };

  return (
    <div id="GraficoConteiner" className={styles.graficoConteiner}>
      <div className={styles.titulo}>
        <h4>Visualização por Natureza</h4>
      </div>

      <div className={styles.graficoFilter}>

        <div className={styles.formGroup}>
          <label>Periodo de: </label>
          <Calendar
            value={dataDe}
            dateFormat="dd/mm/yy"
            locale="br"
            onChange={(e) => setDataDe(e.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Periodo até: </label>
          <Calendar
            value={dataAte}
            dateFormat="dd/mm/yy"
            locale="br"
            onChange={(e) => setDataAte(e.value)}
          />
        </div>

      </div>
      <div className={styles.buttonGraphic}>
        <Button onClick={buscarReceitas}>Aplicar</Button>
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
