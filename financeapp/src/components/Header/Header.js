import React from "react";
import logo from "./logo.png";
import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import styles from "./styles/styles.module.css";
import global from "../../styles/global.module.css";

export const Header = () => {
  const navigate = useNavigate();

  const items = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      command: () => {
        navigate("/home");
      },
    },
    {
      label: "Despesa",
      icon: "pi pi-fw pi-money-bill",
      items: [
        {
          label: "Lançamento de Despesas",
          command: () => {
            navigate("/LancamentoDespesa");
            console.log("Despesas Option 1 clicked");
          },
        },
        {
          label: "Relatórios",
          command: () => {
            console.log("Despesas Option 2 clicked");
          },
        },
      ],
    },
    {
      label: "Receita",
      icon: "pi pi-fw pi-dollar",
      items: [
        {
          label: "Lançamento de Receitas",
          command: () => {
            navigate("/LancamentoReceita");
            console.log("Despesas Option 1 clicked");
          },
        },
        {
          label: "Relatórios",
          command: () => {
            console.log("Despesas Option 2 clicked");
          },
        },
      ],
    },
    {
      label: "Conciliação Bancária",
      icon: "pi pi-briefcase",
    },
  ];

  const start = (
    <img
      alt="Logo"
      src={logo}
      onError={(e) => (e.target.src = "fallback/icon.png")}
      style={{ width: "150px", height: "60px" }}
    />
  );

  return (
    <div id="menubar" className={global.header}>
      <Menubar
        start={start}
        model={items}
        end={
          <div id="end">
            <Button
              label="Configurações"
              icon="pi pi-cog"
              className={styles.TransparentButton}
              onClick={() => null} // quando pronta, colocar metodo navigate p/('/configuracoes')
            />
            <Button className={styles.ButtonLogout}>Logout</Button>
          </div>
        }
      />
    </div>
  );
};

export default Header;
