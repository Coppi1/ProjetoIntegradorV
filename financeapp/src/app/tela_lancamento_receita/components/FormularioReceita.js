import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import styles from "./styles.module.css";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import axios from "axios";


export const FormularioReceita = () => {
  const [numeroUnico, setNumeroUnico] = useState("");
  const [naturezaReceita, setNaturezaReceita] = useState("null");
  const [pagamentos, setPagamentos] = useState("null");
  const [descricao, setDescricao] = useState("");
  const [dtVencimento, setDtvencimento] = useState("");
  const [valor, setValor] = useState();
  const [naturezas, setNaturezas] = useState([])
  const [formasPgto, setFormasPgto] = useState([])

  const buscarNatureza = async () => {
    try {
      const resposta = await axios.get("http://localhost:4000/naturezas");
      // console.log(resposta.data)
      console.log("Dados: " + resposta.data[0].descricao);
      setNaturezas(resposta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const buscarFormaPgto = async () => {
    try {
      const resposta = await axios.get("http://localhost:4000/formaPagamento");
      // console.log(resposta.data)
      console.log("Dados: " + resposta.data[0].descricao);
      setFormasPgto(resposta.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    buscarFormaPgto();
    buscarNatureza();
  }, []);

  // const naturezas = [
  //   { name: "Serviço Prestados", code: "1" },
  //   { name: "Recebimentos de Clientes", code: "2" },
  //   { name: "Contas Recebidas", code: "LDN" },
  //   { name: "Contas a Receber", code: "IST" },
  // ];

  // const formaPagamento = [
  //   { name: "Pix", code: "1" },
  //   { name: "Transferencia", code: "2" },
  //   { name: "Boleto", code: "LDN" },
  //   { name: "Cartão de Credito", code: "IST" },
  //   { name: "Cartão de Debito", code: "IST" },
  // ];

  return (
    <div id="Formulario">
      <div className={styles.formConteiner}>
        <div className={styles.titulo}>
          <h4>Lançameto de Receitas</h4>
        </div>
        <div id="Numero" className={styles.formGroup}>
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
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <br></br>
        </div>

        <div id="SelecReceita" className={styles.formGroup}>
          <label>Natureza da Receita: </label>
          <Dropdown
            value={naturezaReceita}
            onChange={(e) => setNaturezaReceita(e.value)}
            options={naturezas}
            optionLabel="descricao"
            placeholder="Selecione a natureza"
            className="w-full md:w-14rem"
          />
          <br></br>
        </div>

        <div id="DataVenc" className={styles.formGroup}>
          <label>Data de Vencimento:</label>
          <Calendar value={dtVencimento} onChange={(e) => e.target.value} />
          <br></br>
        </div>

        <div id="Valor" className={styles.formGroup}>
          <label htmlFor="currency-us" className="font-bold block mb-2">
            {" "}
            Valor:
          </label>
          <InputNumber
            inputId="currency-us"
            value={valor}
            onValueChange={(e) => setValor(e.value)}
            mode="currency"
            currency="USD"
            locale="en-US"
          />
          <br></br>
        </div>

        <div id="FormaPgto" className={styles.formGroup}>
          <label>Forma de Pagamento:</label>
          <Dropdown
            value={pagamentos}
            onChange={(e) => setPagamentos(e.value)}
            options={formasPgto}
            optionLabel="descricao"
            placeholder="Selecione a forma de pagamento"
            className="w-full md:w-14rem"
          />
        </div>

        <div className={styles.button}>
          <Button label="Lançar" />
          <Button label="Limpar Campos" />
        </div>
      </div>
    </div>
  );
};
