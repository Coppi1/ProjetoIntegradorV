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
import { Badge } from "primereact/badge";

export const Header = () => {
  const navigate = useNavigate();

  const itemRenderer = (item) => (
    <a className="flex align-items-center p-menuitem-link">
      <span className={item.icon} />
      <span className="mx-2">{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
      {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
    </a>
  );

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
      // style={{ width: "150px", height: "60px" }}
      width="150"
      height="60"
    />
  );

  const end = (
    <div className={styles.RightComponents}>
      <Button
        label="Configurações"
        icon="pi pi-cog"
        className={styles.TransparentButton}
        onClick={() => null} // quando pronta, colocar metodo navigate p/('/configuracoes')
      />
      <Button className={styles.ButtonLogout}>Logout</Button>
    </div>

  )

  return (
    <div id="card">
      <Menubar
        start={start}
        model={items}
        end={end}
      />
    </div>
  );
}
export default Header;
