import React, { useState, useRef } from "react";
import { Button } from 'primereact/button';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import './cadastro.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Messages } from 'primereact/messages';

function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatpassword, setRepeatPassword] = useState("");
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const msgs = useRef(null);

    const handleCadastro = async () => {
        if (nome === "" || email === "" || password === "" || repeatpassword === "") {
            msgs.current.show({ sticky: true, severity: 'error', summary: '', detail: 'Por favor, preencha todos os campos', closable: true });
            return;
        }

        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!emailRegex.test(email)) {
            msgs.current.show({ sticky: true, severity: 'error', summary: '', detail: 'Email inválido', closable: true });
            return;
        }

        if (password !== repeatpassword) {
            msgs.current.show({ sticky: true, severity: 'error', summary: '', detail: 'As senhas não coincidem', closable: true });
            return;
        }

        const dadosDoForm = {
            nome: nome,
            email: email,
            password: password
        };

        try {
            const response = await axios.get(`http://localhost:4000/cadastro?email=${email}`);
            if (response.data.length > 0) {
                msgs.current.show({ sticky: true, severity: 'error', summary: '', detail: 'Este e-mail já está cadastrado', closable: true });
                return;
            }

            const incluirDados = async () => {
                try {
                    const response = await axios.post('http://localhost:4000/cadastro', dadosDoForm);
                    console.log('Resposta da API:', response.data);
                    alert("Cadastro realizado com sucesso");
                } catch (error) {
                    console.error('Erro ao enviar dados para a API:', error);
                }
            }

            incluirDados();

        } catch (error) {
            console.error('Erro ao verificar e-mail na API:', error);
        }
    }

    const handleButtonClick = async (serviceName) => {
        alert(`Cadastro efetuado com sucesso ${serviceName}!`);
    }

    const handleLoginButtonClick = () => {
        navigate('/login');
    }

    return (
        <div className="container">
            <Splitter className="splitter">
                <SplitterPanel size={50} className="splitter-panel1">
                    <h1 className="titulo3">Bem-Vindo!</h1>
                    <div>
                        <p className="frase">Para se manter conectado conosco, faça login com suas informações pessoais</p>
                    </div>
                    <div>
                        <Button className="button" onClick={handleLoginButtonClick}>Fazer login</Button>
                    </div>
                </SplitterPanel>

                <SplitterPanel size={75} className="splitter-panel">
                    <h1 className="titulo">Crie uma conta</h1>
                    <div>
                        <button className="logobutton" onClick={() => handleButtonClick('com Facebook')}>
                            <img className="logo" src="https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-3-1.png" alt=""></img>
                        </button>
                        <button className="logobutton" onClick={() => handleButtonClick('com conta Google')}>
                            <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Google_Plus_logo_%282015-2019%29.svg/1200px-Google_Plus_logo_%282015-2019%29.svg.png" alt=""></img>
                        </button>
                    </div>
                    {message && <p className="titulo2">{message}</p>}
                    <div>
                        <p className="titulo2">Ou entre com seu email</p>
                    </div>
                    <div>
                        <label htmlFor="nome" className="label">Nome completo:</label>
                        <input
                            type="text"
                            id="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="input"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="label">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="label">Senha:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input"
                        />
                    </div>
                    <div>
                        <label htmlFor="repeatpassword" className="label">Repita a senha:</label>
                        <input
                            type="password"
                            id="repeatpassword"
                            value={repeatpassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            className="input"
                        />
                    </div>
                    <div className="buttoncontainer">
                        <Button onClick={handleCadastro} className="button">Cadastrar</Button>
                    </div>
                    <Messages ref={msgs} />
                </SplitterPanel>
            </Splitter>
        </div >
    );
}

export default Cadastro;

