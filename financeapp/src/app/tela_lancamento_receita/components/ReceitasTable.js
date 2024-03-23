import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import axios from "axios";
import { Dialog } from "primereact/dialog";

export default function ReceitasTable() {
  const [receitas, setReceitas] = useState([]);
  const [naturezas, setNaturezas] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [receitaEditada, setReceitaEditada] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/receitas")
      .then((response) => {
        setReceitas(response.data);
        setNaturezas(response.data)
      })
      .catch((error) => {
        console.error("Erro ao buscar receitas:", error);
      });
  }, []);

  const renderEditButton = (rowData) => {
    return (
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-success p-mr-2"
        onClick={() => editReceita(rowData)}
      />
    );
  };

  const editReceita = (receita) => {
    setReceitaEditada(receita);
    setDialogVisible(true);
  };

  return (
    <div id="DataTable" className="DataTable">
      <div className="p-d-flex p-jc-between p-mb-2">
        <div className="p-d-flex p-ai-center">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Pesquisar por nome"
            />
          </span>
        </div>
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
    </div>
  );
}
