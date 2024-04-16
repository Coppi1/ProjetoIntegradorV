import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import styles from "../styles/styles.module.css";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import axios, { Axios } from "axios";
import { addLocale } from 'primereact/api';
import { AutoComplete } from "primereact/autocomplete";

export const FormularioReceita = () => {
  const [numeroUnico, setNumeroUnico] = useState("");
  const [naturezaReceita, setNaturezaReceita] = useState("");
  const [parceiro, setParceiro] = useState("");
  const [formaPgto, setformaPgto] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dtVencimento, setDtvencimento] = useState("");
  const [valor, setValor] = useState();
  const [parceiros, setParceiros] = useState([]);
  const [naturezas, setNaturezas] = useState([]);
  const [formasPgto, setFormasPgto] = useState([]);
  const [filteredParceiros, setFilteredParceiros] = useState(null);

  const [erros, setErros] = useState({
    naturezaReceita: "",
    parceiro: "",
    dtVencimento: "",
    valor: "",
    formaPgto: "",
  });

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

  const validarFormulario = () => {
    let errosLocais = {};

    if (!naturezaReceita) {
      errosLocais.naturezaReceita = "A natureza da receita é obrigatória.";
    }

    if (!parceiro) {
      errosLocais.parceiro = "O parceiro é obrigatório.";
    } else {
      // Verifica se o parceiro selecionado existe na lista de parceiros
      const parceiroExiste = parceiros.some(p => p.razao_social === parceiro.razao_social);
      if (!parceiroExiste) {
        errosLocais.parceiro = "O parceiro selecionado não existe.";
      }
    }

    if (!dtVencimento) {
      errosLocais.dtVencimento = "A data de vencimento é obrigatória.";
    }

    if (!valor) {
      errosLocais.valor = "O valor é obrigatório.";
    }

    if (!formaPgto) {
      errosLocais.formaPgto = "A forma de pagamento é obrigatória.";
    }

    setErros(errosLocais);

    return Object.keys(errosLocais).length === 0;
  };

  const searchAutoCompleteParceiros = (event) => {
    let query = event.query;
    let filteredParceiros = [];

    if (parceiros) {
      filteredParceiros = parceiros.filter((parceiro) => {
        const razaoSocial = parceiro.razao_social.toLowerCase();
        return razaoSocial.includes(query.toLowerCase());
      });
    }

    setFilteredParceiros(filteredParceiros);
  };

  const itemTemplate = (parceiro) => {
    return <div>{parceiro.razao_social}</div>;
  };

  const buscarNaturezas = async () => {
    try {
      const resposta = await axios.get("http://localhost:4000/naturezas");
      setNaturezas(resposta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const buscarParceiros = async () => {
    try {
      const resposta = await axios.get("http://localhost:4000/parceiro");
      setParceiros(resposta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const buscarFormasPgto = async () => {
    try {
      const resposta = await axios.get("http://localhost:4000/formaPgto");
      setFormasPgto(resposta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const limparFormulario = async () => {
    setNumeroUnico("");
    setNaturezaReceita("");
    setformaPgto("");
    setDescricao("");
    setDtvencimento("");
    setValor("");
    setParceiro(null);
    setErros({});
  }

  const salvarReceita = async () => {
    try {
      const isValid = validarFormulario();

      if (!isValid) {
        return;
      }

      const novaReceita = {
        numeroUnico,
        parceiro,
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

      limparFormulario()

    } catch (error) {
      console.error("Erro ao salvar a receita:", error);
    }
  };

  useEffect(() => {
    buscarFormasPgto();
    buscarNaturezas();
    buscarParceiros();
  }, []);

  return (
    <div id="FormularioReceita">
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

        <div id="Parceiro" className={styles.formGroup}>
          <label>Parceiro: </label>
          <AutoComplete
            value={parceiro}
            suggestions={filteredParceiros}
            completeMethod={searchAutoCompleteParceiros}
            field="razao_social"
            itemTemplate={itemTemplate}
            onChange={(e) => setParceiro(e.value)}
            placeholder="Digite para buscar um parceiro"
            className="p-fluid"
          />
          <span className={styles.errorText}>{erros.parceiro}</span>
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
          <span className="text-red-500">{erros.naturezaReceita}</span>
          <br></br>
        </div>

        <div id="dtVencimento" className={styles.formGroup}>
          <label>Data de Vencimento:</label>
          <Calendar
            value={dtVencimento}
            onChange={(e) => setDtvencimento(e.value)}
            dateFormat="dd/mm/yy"
            locale="br"
            showButtonBar
          />
          <span className="text-red-500">{erros.dtVencimento}</span>
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
          <span className="text-red-500">{erros.valor}</span>
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
          <span className="text-red-500">{erros.formaPgto}</span>
          <br></br>
        </div>

        <div className={styles.button}>
          <Button label="Lançar" onClick={salvarReceita} />
          <Button label="Limpar Campos" onClick={limparFormulario} />
        </div>
      </div>
    </div>
  );
};
