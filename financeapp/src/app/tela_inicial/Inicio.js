import React, { useState } from "react";
import logo from "./logo.png";
import guy from "./guy-elevateFinance.png";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import styles from "./styles/styles.module.css";

export const Inicio = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const start = (
    <img
      alt="Logo"
      src={logo}
      onError={(e) => (e.target.src = "fallback/icon.png")}
      style={{ width: "150px", height: "60px" }}
    />
  );

  return (
    <div>
      <div id="menubar">
        <Menubar
          start={start}
          end={
            <div>
              <Button
                label="Iniciar Sessão"
                icon="pi pi-sign-in"
                className="p-button-text"
                onClick={() => navigate("/Login")}
              />
            </div>
          }
        />
      </div>

      <div className={styles.conteiner}>
        <div
          style={{
            textAlign: "center",
            maxWidth: "80%",
            padding: "30px",
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Adicione um fundo branco semi-transparente para melhor legibilidade do texto
          }}
        >
          <h1>
            Venha para Elevate Finance e tenha o melhor controle para o seu
            dinheiro!
          </h1>
          <h3>Conheça o APP de forma gratuita, inicie seu cadastro:</h3>
          <form onSubmit={() => {}}>
            <InputText
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" label="Cadastrar" />
          </form>
        </div>
      </div>
    </div>
  );
};
