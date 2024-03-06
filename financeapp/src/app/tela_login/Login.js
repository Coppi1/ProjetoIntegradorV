import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import './login.css';
import Cadastro from './cadastro';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState('');
    const [error, setError] = useState("");
    const [showCadastro, setShowCadastro] = useState(false);

    const handleLogin = () => {
        if (username !== "" && password !== "") {
            alert("Login realizado com sucesso!");
        } else {
            setError("Usuário ou senha inválidos");
        }
    }

    const handleButtonClick = (serviceName) => {
        setMessage(`Login efetuado com sucesso ${serviceName}!`);
    }

    const handleCadastroClick = () => {
        setShowCadastro(true);
    }

    return (
        <div className="container">
            {showCadastro ? <Cadastro /> : (
                <Card className="card">
                    <div className="buttoncontainer">
                        <Button className="logobutton" onClick={handleCadastroClick}>
                            <img className="logo" src="https://cdn.pixabay.com/photo/2016/12/14/10/39/button-1905961_1280.png" alt="Retornar"></img>
                        </Button>
                    </div>
                    <h1 className="titulo">Faça o login</h1>
                    <div className="logocontainer">
                        <button className="logobutton" onClick={() => handleButtonClick('com Facebook')}>
                            <img className="logo" src="https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-3-1.png"></img>
                        </button>
                        <button className="logobutton" onClick={() => handleButtonClick('com conta Google')}>
                            <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Google_Plus_logo_%282015-2019%29.svg/1200px-Google_Plus_logo_%282015-2019%29.svg.png"></img>
                        </button>
                    </div>
                    {message && <p className="titulo2">{message}</p>}
                    <div>
                        <p className="titulo2">Ou acesse com seu email</p>
                    </div>
                    <div>
                        <label className="label" htmlFor="username">Nome ou email:</label>
                        <input
                            className="input"
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                        <Button className="button" onClick={handleLogin}>Login</Button>
                    </div>
                    {error && <p className="error">{error}</p>}
                </Card>
            )}
        </div>
    );
}

export default Login;

