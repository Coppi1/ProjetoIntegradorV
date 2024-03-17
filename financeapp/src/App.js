import React from "react";
import GlobalStyle from "./styles/global";
import { Header } from "./components/Header";
import { DataTable } from "primereact/datatable";
import ReceitasTable from "./app/tela_lancamento_receita/components/ReceitasTable";

const App = () => {

    return (
        <div className="App">
            <Header />
            <GlobalStyle />
            <ReceitasTable></ReceitasTable>
        </div>
    )
}

export default App;