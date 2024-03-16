import React from "react";
import Header from "../../components/Header";
import { FormularioReceita } from "./components/FormularioReceita";
import Grafico, { Graficos } from "./components/Graficos";
import { Table } from "./components/Table";
import styles from "./components/styles.module.css";

export const LancamentoReceita = () => {
  return (
    <div id="body">
      <Header></Header>
      <div className={styles.body}>
        <FormularioReceita></FormularioReceita>
        <Graficos></Graficos>
        <Table></Table>
      </div>
    </div>
  );
};
