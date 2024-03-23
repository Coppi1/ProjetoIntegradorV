import React from 'react'
import { Menubar } from "primereact/menubar";
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import logo from "./logo.png"
import styles from "../styles/styles.module.css";
import Footer from './Footer';


export const Header = () => {

    const navigate = useNavigate();

    const start = (
        <img
            alt="Logo"
            src={logo}
            // onError={(e) => (e.target.src = "fallback/icon.png")}
            style={{ width: "150px", height: "60px" }}
        />
    );

    return (
        <div>
            <Menubar className={styles.header}
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
    )
}
