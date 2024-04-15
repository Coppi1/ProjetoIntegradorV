import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import styles from "../styles/styles.module.css";
import axios from "axios";
import EditarReceita from './EditarReceita'; // Importar o componente EditarReceita

export default function ReceitasTable() {
  const [receitas, setReceitas] = useState([]);
  const [naturezas, setNaturezas] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [receitaEditada, setReceitaEditada] = useState(null);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [confirmAction, setConfirmAction] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:4000/receitas")
      .then((response) => {
        setReceitas(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar receitas:", error);
      });

    // Adicione um array vazio de dependências para garantir que o efeito seja executado apenas uma vez após a montagem inicial
    // Isso evita o ciclo infinito e o aviso de profundidade máxima de atualização excedida
    buscarNaturezas();
  }, [receitas]);

  const buscarNaturezas = async () => {
    try {
      const resposta = await axios.get("http://localhost:4000/naturezas");
      setNaturezas(resposta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderEditButton = (rowData) => {
    return (
      <div>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => editReceita(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-mr-2"
          onClick={() => deleteReceita(rowData)}
        />
      </div>
    );
  };

  const editReceita = (receita) => {
    setReceitaEditada({ ...receita }); // Cria uma cópia do objeto para edição
    setDialogVisible(true);
  };

  const deleteReceita = (receita) => {
    setReceitaEditada(receita);
    setConfirmAction('delete');
    setConfirmDialogVisible(true);
  };

  return (
    <div id="DataTable" className={styles.tableConteiner}>
      <div className="p-d-flex p-jc-between p-mb-2">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Pesquisar por nome"
          />
        </span>
      </div>
      <DataTable
        className="custom-data-table"
        value={receitas}
        globalFilter={globalFilter}
        globalFilterMode="contains"
        paginator
        rows={10}
        emptyMessage="Nenhuma receita encontrada"
      >
        <Column field="id" header="Número Único" />
        <Column field="descricao" header="Descrição da Receita" />
        <Column field="naturezaReceita.descricao" header="Natureza da Receita" />
        <Column field="dtVencimento" header="Data de Vencimento" />
        <Column field="valor" header="Valor" />
        <Column body={renderEditButton} header="Ações" />
      </DataTable>
      <EditarReceita
        receitas={receitas}
        setReceitas={setReceitas}
        receitaEditada={receitaEditada}
        setReceitaEditada={setReceitaEditada}
        dialogVisible={dialogVisible}
        setDialogVisible={setDialogVisible}
        confirmDialogVisible={confirmDialogVisible}
        setConfirmDialogVisible={setConfirmDialogVisible}
        confirmAction={confirmAction}
        setConfirmAction={setConfirmAction}
        naturezas={naturezas}
      />
    </div>
  );
}
