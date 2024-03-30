import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import styles from "../styles/styles.module.css";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import axios, { Axios } from "axios";

export const FormularioReceita = () => {
  const [numeroUnico, setNumeroUnico] = useState("");
  const [naturezaReceita, setNaturezaReceita] = useState("null");
  const [formaPgto, setformaPgto] = useState("null");
  const [descricao, setDescricao] = useState("");
  const [dtVencimento, setDtvencimento] = useState("");
  const [valor, setValor] = useState();
  const [naturezas, setNaturezas] = useState([]);
  const [formasPgto, setFormasPgto] = useState([]);

  const buscarNaturezas = async () => {
    try {
      const resposta = await axios.get("http://localhost:4000/naturezas");
      setNaturezas(resposta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const buscarFormasPgto = async () => {
    try {
      const resposta = await axios.get("http://localhost:4000/formaPgto");
      //console.log("Dados: " + resposta.data[0].descricao);
      setFormasPgto(resposta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const salvarReceita = async () => {
    try {
      const novaReceita = {
        numeroUnico,
        naturezaReceita,
        formaPgto,
        descricao,
        dtVencimento,
        valor,
      };

      const response = await axios.post(
        "http://localhost:4000/receitas",
        novaReceita,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);

      // Limpar o formulário
      setNumeroUnico("");
      setNaturezaReceita("");
      setFormasPgto("");
      setDescricao("");
      setDtvencimento("");
      setValor("");
    } catch (error) {
      console.error("Erro ao salvar a receita:", error);
    }
  };

  useEffect(() => {
    buscarFormasPgto();
    buscarNaturezas();
  }, []);

  return (
    <div id="Formulario">
      <div className={styles.formConteiner}>
        <div className={styles.titulo}>
          <h4>Lançamento de Receitas</h4>
        </div>
        <div id="numeroUnico" className={styles.formGroup}>
          <label>Número único: </label>
          <InputText
            value={numeroUnico}
            onChange={(e) => setNumeroUnico(e.target.value)}
            readOnly="true"
          />
          <br></br>
        </div>

        <div id="Desc" className={styles.formGroup}>
          <label>Descrição da Receita: </label>
          <InputTextarea
            autoResize
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <br></br>
        </div>

        <div id="Natureza" className={styles.formGroup}>
          <label>Natureza da Receita: </label>
          <Dropdown
            value={naturezaReceita}
            onChange={(e) => setNaturezaReceita(e.value)}
            options={naturezas}
            optionLabel="descricao"
            placeholder="Selecione a natureza"
          />
          <br></br>
        </div>

        <div id="DataVenc" className={styles.formGroup}>
          <label>Data de Vencimento:</label>
          <Calendar
            value={dtVencimento}
            onChange={(e) => setDtvencimento(e.value)}
          />
          <br></br>
        </div>

        <div id="Valor" className={styles.formGroup}>
          <label htmlFor="currency-us" className="font-bold block mb-2">
            {""}
            Valor:
          </label>
          <InputNumber
            inputId="currency-us"
            value={valor}
            onValueChange={(e) => setValor(e.value)}
            mode="currency"
            currency="BRL"
            locale="pt-BR"
          />
          <br></br>
        </div>

        <div id="FormaPgto" className={styles.formGroup}>
          <label>Forma de Pagamento:</label>
          <Dropdown
            value={formaPgto}
            onChange={(e) => setformaPgto(e.value)}
            options={formasPgto}
            optionLabel="descricao"
            placeholder="Selecione a forma de pagamento"
            className="w-full md:w-14rem"
          />
        </div>

        <div className={styles.button}>
          <Button label="Lançar" onClick={salvarReceita} />
          <Button label="Limpar Campos" />
        </div>
      </div>
    </div>
  );
};
