import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";




export default function EditarReceita({
  receitas,
  setReceitas,
  receitaEditada,
  setReceitaEditada,
  dialogVisible,
  setDialogVisible,
  confirmDialogVisible,
  setConfirmDialogVisible,
  confirmAction,
  naturezas,
  addLocale
}) {


  const renderConfirmDialog = () => {



    if (!confirmDialogVisible) return null;

    const confirm = () => {
      if (confirmAction === "delete") {
        axios
          .delete(`http://localhost:4000/receitas/${receitaEditada.id}`)
          .then(() => {
            setReceitas(receitas.filter((r) => r.id !== receitaEditada.id));
            alert("Registro excluído com sucesso");
          })
          .catch((error) => console.error("Erro ao excluir receita:", error));
      }
      setConfirmDialogVisible(false);
    };

    const cancel = () => {
      setConfirmDialogVisible(false);
    };

    return (
      <ConfirmDialog
        visible={confirmDialogVisible}
        onHide={cancel}
        message={`Realmente deseja excluir a receita com ID ${receitaEditada.id}?`}
        header="Confirmação"
        icon="pi pi-exclamation-triangle"
        accept={confirm}
        reject={cancel}
      />
    );
  };

  const renderDialog = () => {
    if (!dialogVisible) return null;

    const save = () => {
      axios
        .put(
          `http://localhost:4000/receitas/${receitaEditada.id}`,
          receitaEditada
        )
        .then(() => {
          const updatedReceitas = receitas.map((r) =>
            r.id === receitaEditada.id ? receitaEditada : r
          );
          setReceitas(updatedReceitas);
          alert("Registro editado com sucesso");
        })
        .catch((error) => console.error("Erro ao editar receita:", error));
      setDialogVisible(false);
    };

    const cancel = () => {
      setDialogVisible(false);
    };

    axios
      .get("http://localhost:4000/receitas")
      .then((response) => {
        setReceitas(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar receitas:", error);
      });

    return (
      <Dialog
        visible={dialogVisible}
        onHide={cancel}
        header="Editar Receita"
        modal
        className="p-fluid"
        footer={
          <div>
            <Button
              label="Cancelar"
              icon="pi pi-times"
              onClick={cancel}
              className="p-button-text"
            />
            <Button
              label="Salvar"
              icon="pi pi-check"
              onClick={save}
              autoFocus
            />
          </div>
        }
      >
        <div className="p-field">
          <label htmlFor="descricao">Descrição da Receita</label>
          <InputText
            id="descricao"
            value={receitaEditada.descricao}
            onChange={(e) =>
              setReceitaEditada({
                ...receitaEditada,
                descricao: e.target.value,
              })
            }
          />
        </div>
        <div className="p-field">
          <label htmlFor="naturezaReceita">Natureza da Receita</label>
          <Dropdown
            id="naturezaReceita"
            value={receitaEditada.naturezaReceita}
            options={naturezas}
            onChange={(e) =>
              setReceitaEditada({
                ...receitaEditada,
                naturezaReceita: e.target.value,
              })
            }
            optionLabel="descricao"
            placeholder="Selecione a natureza"
          />
        </div>
        <div className="p-field">
          <label htmlFor="dtVencimento">Data de Vencimento</label>
          <Calendar
            id="dtVencimento"
            value={new Date(receitaEditada.dtVencimento)}
            onChange={(e) =>
              setReceitaEditada({
                ...receitaEditada,
                dtVencimento: e.value,
              })
            }
            placeholder="Selecione a data"
            dateFormat="dd/mm/yy"
          />
        </div>
        <div className="p-field">
          <label htmlFor="valor">Valor</label>
          <InputText
            id="valor"
            value={receitaEditada.valor}
            onChange={(e) =>
              setReceitaEditada({ ...receitaEditada, valor: e.target.value })
            }
          />
        </div>
      </Dialog>
    );
  };

  return (
    <>
      {renderConfirmDialog()}
      {renderDialog()}
    </>
  );
}
