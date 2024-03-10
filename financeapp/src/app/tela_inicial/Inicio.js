import React, { useState } from 'react'
import Header from '../../components/Header'
import logo from "./logo.png"
import guy from "./guy-elevateFinance.png"
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { useNavigate } from 'react-router-dom';

export const Inicio = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('');

    const start = (
        <img
            alt="Logo"
            src={logo}
            onError={(e) => (e.target.src = 'fallback/icon.png')}
            style={{ width: '150px', height: '60px' }}

        />
    );



    return (
        <div>
            <div id='menubar'>
                <Menubar
                    start={start}
                    end={
                        <div>
                            <Button label='Iniciar Sessão'
                                icon="pi pi-sign-in"
                                className="p-button-text"
                                onClick={() =>
                                    navigate('/Login')
                                } />
                        </div>

                    }
                />
            </div>

            <div style={{

                width: '100%',
                height: '100%',
                backgroundImage: `url(${guy})`,
                backgroundPosition: 'initial',
                backgroundSize: 'cover',

                backgroundRepeat: 'no-repeat',
                display: 'inline-block',

            }}>
                <div style={{

                    textAlign: "initial",
                    width: "50%",

                    paddingTop: '40px',
                    paddingBottom: '50px'

                }}>
                    <p style={{
                        paddingBottom: '100px'
                    }}>
                        <h1>
                            Venha para Elevate Finance e tenha o melhor controle para o seu dinheiro!
                        </h1>
                    </p>

                    <p>
                        <h3>
                            Conheça o APP de forma gratuita, inicie seu cadastro:
                        </h3>
                    </p>
                    <form onSubmit={() => { }}>
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



            {/* <h1>Tela de Inicio //  TESTES</h1>
            <Header></Header> */}
        </div >

    )
}
