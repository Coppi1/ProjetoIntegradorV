import React, { useState, useEffect } from "react";
import styles from "../styles/styles.module.css";
import { Chart } from "primereact/chart";
import { Button } from "primereact/button";
import axios from "axios";
import { Calendar } from "primereact/calendar";
import { addLocale } from 'primereact/api';

export const Grafico = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [receitas, setReceitas] = useState([]);
  const [dataDe, setDataDe] = useState(new Date());
  const [dataAte, setDataAte] = useState(new Date());

  const atualizarParaDatasAtuais = () => {
    let dataAtual = new Date();
    let dataMenos15Dias = new Date(dataAtual.getTime() - (15 * 24 * 60 * 60 * 1000));
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
    atualizarParaDatasAtuais();
  }, []);

  useEffect(() => {
    buscarReceitas();
  }, [dataDe, dataAte]);

  useEffect(() => {
    if (receitas.length > 0) {
      const resultado = calcularValorTotalPorNatureza(receitas, dataDe, dataAte);
      const labels = resultado.map((item) => item.Natureza);
      const valores = resultado.map((item) => item["Valor Total"]);
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
  }, [receitas]);

  const buscarReceitas = async () => {
    try {
      const resposta = await axios.get(`http://localhost:4000/receitas`);
      setReceitas(resposta.data);
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
    }
  };


  const calcularValorTotalPorNatureza = (receitas, dataDe, dataAte) => {
    const filteredReceitas = receitas.filter(receita => {
      const receitaData = new Date(receita.dtVencimento);
      return receitaData >= dataDe && receitaData <= dataAte;
    });

    const valorTotalPorNatureza = filteredReceitas.reduce((acc, receita) => {
      const { naturezaReceita, valor } = receita;
      const { id, descricao } = naturezaReceita;
      acc[id] = {
        ...acc[id],
        descricao: descricao,
        valorTotal: (acc[id]?.valorTotal || 0) + parseFloat(valor),
      };
      return acc;
    }, {});

    const resultado = Object.values(valorTotalPorNatureza).map(({ descricao, valorTotal }) => ({
      Natureza: descricao || "Natureza Desconhecida",
      "Valor Total": valorTotal,
    }));

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
