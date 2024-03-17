import React from "react";
import Header from "../../components/Header";
import { FormularioReceita } from "./components/FormularioReceita";
import { Graficos } from "./components/Graficos";
import styles from "./components/styles.module.css";
import ReceitasTable from "./components/ReceitasTable";




export const LancamentoReceita = () => {
  return (
    <div id="body">
      <Header></Header>
      <div className={styles.body}>
        <FormularioReceita></FormularioReceita>
        <Graficos></Graficos>
      </div>
      <ReceitasTable></ReceitasTable>
    </div>
  );
};
