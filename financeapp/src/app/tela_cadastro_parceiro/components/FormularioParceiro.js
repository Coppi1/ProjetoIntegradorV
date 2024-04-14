import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react'

export const FormularioParceiro = () => {

    const [numeroUnico, setNumeroUnico] = useState("");
    const [razao_social, setRazao_social] = useState("");
    const [cpf_cnpj, setCpf_cnpj] = useState("");
    const [endereco, setEndereco] = useState("");
    const [contato, setContato] = useState("");
    const [email, setEmail] = useState("");
    const [dados_bancarios, setDados_bancarios] = useState("");
    const [data_registro, setData_registro] = useState("");
    const [status_atividade, setStatus_atividade] = useState("");
    const [observacoes, setObservacoes] = useState("");
    const [categorias, setCategorias] = useState("");

    const salvarParceiro = async () => {
        try {
            const novoParceiro = {
                numeroUnico,
                cpf_cnpj,
                endereco,
                contato,
                email,
                dados_bancarios,
                data_registro,
                status_atividade,
                observacoes,
                categorias,
            };

            const response = await axios.post(
                "http://localhost:4000/parceiro",
                novoParceiro,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response.data);

            // Limpar o formulário
            //   setNumeroUnico("");
            //   setNaturezaReceita("");
            //   setFormasPgto("");
            //   setDescricao("");
            //   setDtvencimento("");
            //   setValor("");
        } catch (error) {
            console.error("Erro ao salvar a receita:", error);
        }
    };

    return (
        <div className="">
            <div className="">
                <div className="">
                    <h4>Cadastro de Parceiro</h4>
                </div>
                <div id="RazaoSocial" className="">
                    <label>Número único: </label>
                    <InputText
                        value={numeroUnico}
                        onChange={(e) => setNumeroUnico(e.target.value)}
                        readOnly="true"
                    />
                    <br></br>
                </div>

                <div id="RazaoSocial" className="">
                    <label>Razão social: </label>
                    <InputText
                        autoResize
                        value={razao_social}
                        onChange={(e) => setRazao_social(e.target.value)}
                    />
                    <br></br>
                </div>
                {/* <div className="">
                    <Button label="Lançar" onClick={salvarReceita} />
                    <Button label="Limpar Campos" />
                </div> */}
            </div>
        </div>
    )
}
