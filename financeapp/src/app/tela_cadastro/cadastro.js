import React, { useState, useRef } from "react";
import { Button } from 'primereact/button';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import './cadastro.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Messages } from 'primereact/messages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faHome } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from 'primereact/floatlabel';

function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatpassword, setRepeatPassword] = useState("");
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const msgs = useRef(null);
    const location = useLocation();
    const p_email = location.state?.email;

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

    const handleInicioButtonClick = () => {
        navigate('/');
    }

    return (
        <div className="container">
            <Splitter className="splitter">
                <SplitterPanel size={50} className="splitter-panel1">
                    <div className="card-translucido">
                        <h1 className="titulo3">Bem-Vindo!</h1>
                        <div>
                            <p className="frase">Para se manter conectado conosco, faça login com suas informações pessoais</p>
                        </div>
                        <div>
                            <Button className="button" onClick={handleLoginButtonClick}>Fazer login</Button>
                            <Button className="top-button" onClick={handleInicioButtonClick}>
                                <FontAwesomeIcon icon={faHome} className="icon-spacing" />Início</Button>
                        </div>
                    </div>
                </SplitterPanel>

                <SplitterPanel size={75} className="splitter-panel">
                    <h1 className="titulo">Crie uma conta</h1>
                    <div>
                        <button className="logobutton" onClick={() => handleButtonClick('com Facebook')}>
                            <FontAwesomeIcon icon={faFacebook} style={{ color: '#1877F2', fontSize: '50px' }} />
                        </button>
                        <button className="logobutton" onClick={() => handleButtonClick('com conta Google')}>
                            <FontAwesomeIcon icon={faGoogle} style={{ color: '#EA4335', fontSize: '50px' }} />
                        </button>
                    </div>
                    {message && <p className="titulo2">{message}</p>}
                    <div>
                        <p className="titulo2">Ou entre com seu email</p>
                    </div>
                    <br></br>
                    <div className="formulario">
                        <div>
                            <FloatLabel className="floatlabel-center">
                                <label htmlFor="nome" className="label">
                                    <FontAwesomeIcon icon={faUser} className="icon-spacing" /> Nome completo:</label>
                                <InputText
                                    type="text"
                                    id="nome"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    className="input"
                                />
                            </FloatLabel>
                        </div>
                        <div>
                            <FloatLabel className="floatlabel-center">
                                <label htmlFor="email" className="label">
                                    <FontAwesomeIcon icon={faEnvelope} className="icon-spacing" /> Email:</label>
                                <InputText
                                    type="email"
                                    id="email"
                                    value={p_email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input"
                                />
                            </FloatLabel>
                        </div>
                        <div>
                            <FloatLabel className="floatlabel-center">
                                <label htmlFor="password" className="label">
                                    <FontAwesomeIcon icon={faLock} className="icon-spacing" /> Senha:</label>
                                <InputText
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input"
                                />
                            </FloatLabel>
                        </div>
                        <div>
                            <FloatLabel className="floatlabel-center">
                                <label htmlFor="repeatpassword" className="label">
                                    <FontAwesomeIcon icon={faLock} className="icon-spacing" /> Repita a senha:</label>
                                <InputText
                                    type="password"
                                    id="repeatpassword"
                                    value={repeatpassword}
                                    onChange={(e) => setRepeatPassword(e.target.value)}
                                    className="input"
                                />
                            </FloatLabel>
                        </div>
                    </div>
                    <br></br>
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

