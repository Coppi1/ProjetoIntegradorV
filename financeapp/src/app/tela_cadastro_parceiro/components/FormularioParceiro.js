import axios from 'axios';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
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
        <div className={styles.}>
            <div className="">
                <div className="">
                    <h4>Lançamento de Receitas</h4>
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
                    <label>Razlao social: </label>
                    <InputText
                        autoResize
                        value={razao_social}
                        onChange={(e) => setRazao_social(e.target.value)}
                    />
                    <br></br>
                </div>

                <div id="Desc" className="">
                    <label>Descrição da Receita: </label>
                    <InputTextarea
                        autoResize
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                    <br></br>
                </div>

                <div id="Natureza" className="">
                    <label>Natureza da Receita: </label>
                    <Dropdown
                        value={naturezaReceita}
                        onChange={(e) => setNaturezaReceita(e.value)}
                        options={naturezas}
                        optionLabel="descricao"
                        placeholder="Selecione a natureza"
                    />
                    <br></br>
                </div>

                <div id="DataVenc" className="">
                    <label>Data de Vencimento:</label>
                    <Calendar
                        value={dtVencimento}
                        onChange={(e) => setDtvencimento(e.value)}
                        dateFormat="dd/mm/yy"
                        locale="br"
                    />
                    <br></br>
                </div>

                <div id="Valor" className="">
                    <label htmlFor="currency-us" className="font-bold block mb-2">
                        {""}
                        Valor:
                    </label>
                    <InputNumber
                        inputId="currency-us"
                        value={valor}
                        onValueChange={(e) => setValor(e.value)}
                        mode="currency"
                        currency="BRL"
                        locale="pt-BR"
                    />
                    <br></br>
                </div>

                <div id="FormaPgto" className="">
                    <label>Forma de Pagamento:</label>
                    <Dropdown
                        value={formaPgto}
                        onChange={(e) => setformaPgto(e.value)}
                        options={formasPgto}
                        optionLabel="descricao"
                        placeholder="Selecione a forma de pagamento"
                        className="w-full md:w-14rem"
                    />
                </div>

                <div className="">
                    <Button label="Lançar" onClick={salvarReceita} />
                    <Button label="Limpar Campos" />
                </div>
            </div>
        </div>


    )
}
