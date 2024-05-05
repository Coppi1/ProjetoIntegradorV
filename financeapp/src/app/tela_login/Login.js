import React, { useState, useRef, useEffect } from "react";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import './login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Messages } from 'primereact/messages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from 'primereact/floatlabel';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const msgs = useRef(null);
    const [lembrarMe, setLembrarMe] = useState(false);

    const handleLogin = async () => {
        if (email === "" || password === "") {
            msgs.current.show({ sticky: true, severity: 'error', summary: '', detail: 'Por favor, preencha todos os campos', closable: true });
            return;
        }

        try {
            const response = await axios.get(`http://localhost:4000/cadastro?email=${email}&password=${password}`);
            if (response.data.length === 0) {
                msgs.current.show({ sticky: true, severity: 'error', summary: '', detail: 'Usuário ou senha inválidos', closable: true });
            } else {
                navigate('/LancamentoReceita');
            }
        } catch (error) {
            console.error('Erro ao verificar email cadastrado:', error);
            alert("Erro ao verificar email cadastrado. Por favor, tente novamente mais tarde.");
        }
    }

    const handleButtonClick = (serviceName) => {
        alert(`Login efetuado com sucesso ${serviceName}!`);
    }

    const handleCadastroClick = () => {
        navigate('/cadastro');
    }

    const handleForgotPassword = async () => {
        const email = prompt("Digite seu email para recuperação de senha:");

        if (!email) {
            alert("Por favor, insira um email válido para recuperação de senha.");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:4000/cadastro?email=${email}`);
            if (response.data.length === 0) {
                alert("Email não cadastrado. Por favor, insira um email válido para recuperação de senha.");
            } else {
                alert(`Um email foi enviado para ${email} com as instruções para redefinição da senha.`);
            }
        } catch (error) {
            console.error('Erro ao verificar email cadastrado:', error);
            alert("Erro ao verificar email cadastrado. Por favor, tente novamente mais tarde.");
        }
    }

    const toggleRememberMe = () => {
        setLembrarMe(!lembrarMe);
    };

    return (
        <div className="container">
            <Card className="card">
                <div className="buttoncontainer">
                    <Button className="logobutton" onClick={handleCadastroClick}>
                        <FontAwesomeIcon icon={faArrowLeft} style={{ color: 'blue', fontSize: '35px' }} /></Button>
                </div>
                <h1 className="titulo">Faça o login</h1>
                <div className="logocontainer">
                    <button className="logobutton" onClick={() => handleButtonClick('com Facebook')}>
                        <FontAwesomeIcon icon={faFacebook} style={{ color: '#1877F2', fontSize: '50px' }} />
                    </button>
                    <button className="logobutton" onClick={() => handleButtonClick('com conta Google')}>
                        <FontAwesomeIcon icon={faGoogle} style={{ color: '#EA4335', fontSize: '50px' }} />
                    </button>
                </div>
                {message && <p className="titulo2">{message}</p>}
                <div>
                    <p className="titulo2">Ou acesse com seu email</p>
                </div>
                <br></br>
                <div className="formulario">
                    <div>
                        <FloatLabel className="floatlabel-center">
                            <label className="label" htmlFor="email">
                                <FontAwesomeIcon icon={faEnvelope} className="icon-spacing" /> Email:</label>
                            <InputText
                                className="input"
                                type="text"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FloatLabel>
                    </div>
                    <div>
                        <FloatLabel className="floatlabel-center">
                            <label className="label" htmlFor="password">
                                <FontAwesomeIcon icon={faLock} className="icon-spacing" />Senha:</label>
                            <InputText
                                className="input"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FloatLabel>
                    </div>
                </div>
                <div>
                    <label htmlFor="rememberMe">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={lembrarMe}
                            onChange={toggleRememberMe}
                        />
                        Lembrar-me
                    </label>
                </div>
                <div className="buttoncontainer">
                    <Button className="button2" onClick={handleForgotPassword}>Esqueceu a senha?</Button>
                </div>
                <br></br>
                <div className="buttoncontainer">
                    <Button className="button" onClick={handleLogin}>Login</Button>
                </div>
                <Messages ref={msgs} />
            </Card>
        </div>
    );
}

export default Login;

