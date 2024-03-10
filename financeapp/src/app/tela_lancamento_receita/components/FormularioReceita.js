import { Card } from "primereact/card";
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import styles from "./styles.module.css";
import { Button } from 'primereact/button';


export const FormularioReceita = () => {
    const [numeroUnico, setNumeroUnico] = useState("");
    const [naturezaReceita, setNaturezaReceita] = useState("null");
    const [pagamentos, setPagamentos] = useState("null")
    const [descricao, setdescricao] = useState("");

    const naturezas = [
        { name: "Serviço Prestados", code: "1" },
        { name: "Recebimentos de Clientes", code: "2" },
        { name: "Contas Recebidas", code: "LDN" },
        { name: "Contas a Receber", code: "IST" },
    ];

    const formaPagamento = [
        { name: "Pix", code: "1" },
        { name: "Transferencia", code: "2" },
        { name: "Boleto", code: "LDN" },
        { name: "Cartão de Credito", code: "IST" },
        { name: "Cartão de Debito", code: "IST" },
    ];





    const [dtVencimento, setDtvencimento] = useState("");

    const [valor, setValor] = useState();

    return (
        <div id="conteiner" className={styles.body}>
            <Card className={styles.card} >
                <div id="formCard" className={styles.conteiner}>
                    <h3>Lançamento de Receitas</h3>
                    <div id="Numero" className={styles.formGroup}>
                        <label>Número único: </label>
                        <InputText
                            value={numeroUnico}
                            onChange={(e) => setNumeroUnico(e.target.value)}
                        />
                        <br></br>
                    </div>

                    <div id="Desc" className={styles.formGroup}>
                        <label>Descrição da Receita: </label>
                        <InputText
                            value={descricao}
                            onChange={(e) => setdescricao(e.target.value)}
                        />
                        <br></br>
                    </div>

                    <div id="SelecReceita" className={styles.formGroup}>
                        <label>Natureza da Receita: </label>
                        <Dropdown
                            value={naturezaReceita}
                            onChange={(e) => setNaturezaReceita(e.value)}
                            options={naturezas}
                            optionLabel="name"
                            placeholder="Selecione a natureza"
                            className="w-full md:w-14rem"
                        />
                        <br></br>
                    </div>

                    <div id="DataVenc" className={styles.formGroup}>
                        <label>Data de Vencimento:</label>
                        <Calendar value={dtVencimento} onChange={(e) => e.target.value} />
                    </div>

                    <div id="Valor" className={styles.formGroup}>
                        <label htmlFor="currency-us" className="font-bold block mb-2"> Valor</label>
                        <InputNumber
                            inputId="currency-us"
                            value={valor}
                            onValueChange={(e) => setValor(e.value)}
                            mode="currency"
                            currency="USD"
                            locale="en-US"
                        />
                    </div>

                    <div id="FormaPgto" className={styles.formGroup}>
                        <label>Forma de Pagamento:</label>
                        <Dropdown
                            value={pagamentos}
                            onChange={(e) => setPagamentos(e.value)}
                            options={formaPagamento}
                            optionLabel="name"
                            placeholder="Selecione a forma de pagamento"
                            className="w-full md:w-14rem"
                        />
                        <br></br>
                    </div>

                    <div className={styles.button}>
                        <Button label="Cadastrar" />
                        <Button label="Limpar Campos" />
                    </div>



                </div>
            </Card>
        </div>
    );
};
