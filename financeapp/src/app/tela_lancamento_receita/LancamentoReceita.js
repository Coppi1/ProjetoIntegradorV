import React from "react";
import Header from "../../components/Header/Header";
import { FormularioReceita } from "./components/FormularioReceita";
import { Grafico } from "./components/Grafico";
import styles from "./styles/styles.module.css";
import ReceitasTable from "./components/ReceitasTable";
import global from "../../styles/global.module.css";

export const LancamentoReceita = () => {
  return (<>
    <div id="Header" className={global.header}>
      <Header></Header>
    </div>
    <div className={styles.body}>
      <FormularioReceita></FormularioReceita>
      <Grafico></Grafico>
    </div>
    <ReceitasTable></ReceitasTable>
  </>
  );
};
