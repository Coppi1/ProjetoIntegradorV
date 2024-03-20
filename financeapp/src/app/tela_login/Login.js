import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import './login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (email === "" || password === "") {
            setError("Por favor, preencha todos os campos");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:4000/cadastro?email=${email}&password=${password}`);
            if (response.data.length === 0) {
                setError("Usuário ou senha inválidos");
            } else {
                alert("Login realizado com sucesso!");
            }
        } catch (error) {
            console.error('Erro ao verificar email cadastrado:', error);
            alert("Erro ao verificar email cadastrado. Por favor, tente novamente mais tarde.");
        }
    }

    const handleButtonClick = (serviceName) => {
        setMessage(`Login efetuado com sucesso ${serviceName}!`);
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

    return (
        <div className="container">
            <Card className="card">
                <div className="buttoncontainer">
                    <Button className="logobutton" onClick={handleCadastroClick}>
                        <img className="logo" src="https://cdn.pixabay.com/photo/2016/12/14/10/39/button-1905961_1280.png" alt=""></img>
                    </Button>
                </div>
                <h1 className="titulo">Faça o login</h1>
                <div className="logocontainer">
                    <button className="logobutton" onClick={() => handleButtonClick('com Facebook')}>
                        <img className="logo" src="https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-3-1.png" alt=""></img>
                    </button>
                    <button className="logobutton" onClick={() => handleButtonClick('com conta Google')}>
                        <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Google_Plus_logo_%282015-2019%29.svg/1200px-Google_Plus_logo_%282015-2019%29.svg.png" alt=""></img>
                    </button>
                </div>
                {message && <p className="titulo2">{message}</p>}
                <div>
                    <p className="titulo2">Ou acesse com seu email</p>
                </div>
                <div>
                    <label className="label" htmlFor="email">Email:</label>
                    <input
                        className="input"
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label className="label" htmlFor="password">Senha:</label>
                    <input
                        className="input"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="buttoncontainer">
                    <Button className="button2" onClick={handleForgotPassword}>Esqueceu a senha?</Button>
                </div>
                <br></br>
                <div className="buttoncontainer">
                    <Button className="button" onClick={handleLogin}>Login</Button>
                </div>
                {error && <p className="error">{error}</p>}
            </Card>
        </div>
    );
}

export default Login;

