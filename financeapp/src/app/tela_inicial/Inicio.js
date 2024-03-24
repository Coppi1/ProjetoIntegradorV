import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import styles from "./styles/styles.module.css";
import { Header } from "./components/Header";
import  Footer  from "./components/Footer";


export const Inicio = () => {

  const [email, setEmail] = useState("");



  return (
    <div >
      <Header />
      <div className={styles.conteiner}>
        <div className={styles.body}>

          <div className={styles.content}>
            <h3 id="titulo-h3">
              Venha para Elevate Finance e tenha o melhor controle para o seu
              dinheiro!
            </h3>
            <h5>Conheça o APP de forma gratuita, inicie seu cadastro:</h5>
            <form onSubmit={() => { }}>
              <InputText className={styles.inputText}
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" label="Inscreva-se" />
            </form>
          </div>

        </div>
        <Footer />
      </div>
    </div>
  );
};
