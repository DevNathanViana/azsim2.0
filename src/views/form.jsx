import '../css/form.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Button, Form, } from 'reactstrap';
import { useForm } from "react-hook-form";


function Formulario() {

    const { register, handleSubmit, formState: { errors } } = useForm({});


    const onSubmit = (data) => {
        console.log((data))
    }



    return (

<body className='DivOfAll'>
    

        <div>


            <div className="container justify-content-center">

                <h2 className='txtDados ms-3'>1 - Dados Básicos</h2>

                <Form method="POST"
                    className="text-start justify-content-center p-3">
                    <div className="row">
                        <div className="col">
                            <label htmlFor="documento" className="form-label"><strong>* Código</strong></label>
                            <input name='codigo' {...register("código", { required: true })} type="text" className="form-control" id="documento" placeholder=""
                            />
                        </div>
                        <div className="col mb-2">
                            <label htmlFor="unidade" className="form-label"><strong>* Unidade</strong></label>
                            <select name='unidade'  {...register("unidade", { required: true })} id="unidade" className="form-select" aria-label=".form-select example">
                                <option defaultValue={"Montenegro"} value="1">Montenegro</option>
                                <option value="2">Porto Alegre</option>
                            </select>
                        </div>
                        <div className="col">
                            <label htmlFor="habil" className="form-label"><strong>* Hábil</strong></label>
                            <input name='habil' {...register("habil", { required: true })} type="text" className="form-control" id="habil" placeholder="" />
                        </div>
                        <div className="col h-25">
                            <label htmlFor="condor" className="form-label"><strong>* Condor</strong></label>
                            <input name='condor' {...register("condor", { required: true })} type="text" className="form-control" id="condor" placeholder="" />
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col">
                            <label htmlFor="natureza" className="form-label"><strong>* Natureza</strong></label>
                            <select name='natureza' {...register("natureza", { required: true })} id="natureza" className="form-select" aria-label=".form-select example"
                            >
                                <option defaultValue={"FÍSICA"} value="1">FÍSICA</option>
                                <option value="2">JURÍDICA</option>
                            </select>
                        </div>
                        <div className="col">
                            <label htmlFor="cpf" className="form-label"><strong>* CPF/CNPJ</strong></label>
                            <input name='cpf/cnpj' maxLength="14" type="text" {...register("cpfcnpj", { required: true })} className="form-control" id="cpf" placeholder="" />
                        </div>
                        <div className="col">
                            <label htmlFor="inscMunicipal" className="form-label"><strong>* Inscrição Municipal</strong></label>
                            <input name='insc.municipal' {...register("incmunincipal", { required: true })} type="number" className="form-control" id="inscMunicipal" placeholder="" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col mb-2">

                            <label htmlFor="nome" className="form-label"><strong>* Nome/Razão Social</strong></label>
                            <input name='nome'  {...register("nome/razao-social", { required: true })} type="text" className="form-control" id="nome" placeholder="" />                        </div>
                        <div className="col">
                            <label htmlFor="nome_fantasia" className="form-label"><strong>* Nome Fantasia</strong></label>
                            <input name='nomeFantasia' {...register("nome-fantasia", { required: true })} type="text" className="form-control" id="nome_fantasia" placeholder="" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col mb-2">
                            <label htmlFor="endereco" className="form-label"><strong>* Endereço</strong></label>
                            <input name='endereco' {...register("endereço", { required: true })} type="text" className="form-control" id="endereco" placeholder="" />
                        </div>
                        <div className="col">
                            <label htmlFor="bairro" className="form-label"><strong>* Bairro</strong></label>
                            <input name='bairro' {...register("bairro", { required: true })} type="text" className="form-control" id="bairro" placeholder="" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="cidade" className="form-label"><strong>* Cidade</strong></label>
                            <input name='cidade' {...register("cidade", { required: true })} type="text" className="form-control" id="cidade" placeholder="" />
                        </div>
                        <div className="col">
                            <label htmlFor="uf" className="form-label"><strong>* Uf</strong></label>
                            <select name='uf' {...register("uf", { required: true })} id="uf" className="form-select" aria-label=".form-select example">
                                <option defaultValue={"AC"} value="1">AC</option>
                                <option value="2">AL</option>
                                <option value="3">AM</option>
                                <option value="4">BA</option>
                                <option value="5">CE</option>
                                <option value="6">DF</option>
                                <option value="7">ES</option>
                                <option value="8">GO</option>
                                <option value="9">MA</option>
                                <option value="10">MT</option>
                                <option value="11">MS</option>
                                <option value="12">MG</option>
                                <option value="13">PA</option>
                                <option value="14">PB</option>
                                <option value="15">PR</option>
                                <option value="16">PE</option>
                                <option value="17">PI</option>
                                <option value="18">RJ</option>
                                <option value="19">RN</option>
                                <option value="20">RS</option>
                                <option value="21">RO</option>
                                <option value="22">RR</option>
                                <option value="23">SC</option>
                                <option value="24">SP</option>
                                <option value="25">SE</option>
                                <option value="26">TO</option>
                            </select>
                        </div>

                        <div className="col">
                            <label htmlFor="cep" className="form-label"><strong>* CEP</strong></label>
                            <input name='cep' {...register("cep", { required: true })} required type="number" maxLength="9" className="form-control" id="cep"
                                placeholder="" />
                        </div>

                    </div>
                    <div className="row mt-2">
                        <div className="col-lg ">
                            <label htmlFor="observacao" className="form-label"><strong>Observações</strong></label>
                            <textarea {...register("observacoes", { required: false })} className="form-control" id="observacao" rows="3"></textarea>
                        </div>

                    </div>

                </Form>
            </div>

            <hr />

            <div className="container justify-content-center">
                <h2 className='txt'>2 - Contatos</h2>

                <Form method="post" className="text-start justify-content-center p-3">
                    <div className="row">
                        <div className="col mb-2">
                            <label htmlFor="nomeContato" className="form-label"><strong>* Nome</strong></label>
                            <input  {...register("contatoNome", { required: true })} type="text" className="form-control" id="nomeContato" placeholder="" />
                        </div>

                        <div className="col mb-2">
                            <label htmlFor="telefone" className="form-label"><strong>* Telefone</strong></label>
                            <input  {...register("telefone", { required: true })} maxLength="15" required type="number"
                                className="form-control" id="telefone" placeholder="" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col mb-2">
                            <label htmlFor="senha" className="form-label"><strong>* Senha </strong></label>
                            <input  {...register("senha", { required: true })} type="password" className="form-control" id="senha" placeholder="" />
                        </div>


                        <div className="col mb-2">
                            <label htmlFor="contraSenha" className="form-label"><strong>* Contra-Senha</strong></label>
                            <input  {...register("contraSenha", { required: true })} type="password" className="form-control" id="contraSenha" placeholder="" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col mb-2">
                            <label htmlFor="DataDeNascimento" className="form-label"><strong>* Data de Nascimento</strong></label>
                            <input  {...register("dataNascimento", { required: true })} type="date" className="form-control" id="DataDeNascimento"
                                placeholder="" />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="obsContato" className="form-label"><strong>Observações</strong></label>
                        <textarea  {...register("observacoes", { required: false })} className="form-control" id="obsContato" rows="3" ></textarea>
                    </div>
                </Form>
            </div>

            <hr />

            <div className="container justify-content-center">

                <h2 className='txt'>3 - Setorização</h2>


                <Form method="post" className="text-start justify-content-center p-3">
                    <div className="row">
                        <div className="col mb-2">
                            <label htmlFor="Setor" className="form-label"><strong>* Setor</strong></label>
                            <input  {...register("setor", { required: true })} type="text" className="form-control" id="Setor" placeholder=""
                            />
                        </div>

                        <div className="col mb-2">
                            <label htmlFor="localInstalacao" className="form-label"><strong>* Local da
                                Instalação</strong></label>
                            <input  {...register("localInstalacao", { required: true })} type="text" className="form-control" id="localInstalacao"
                                placeholder="" />
                        </div>


                        <div className="mb-3">
                            <label htmlFor="obsSetor"
                                className="form-label"><strong>Observações</strong></label>
                            <textarea  {...register("observacoes", { required: false })} className="form-control" id="obsSetor"
                                rows="3"></textarea>
                        </div>
                    </div>
                </Form>
            </div>

            <hr />

            <div className="container justify-content-center">

                <h2 className='txt'>4 - Viagens</h2>


                <Form method="post" className="text-start justify-content-center p-3">
                    <div className="row">
                        <div className="col mb-2">
                            <label htmlFor="nomeViagem" className="form-label"><strong>Nome</strong></label>
                            <input  {...register("viagem-nome", { required: false })} type="text" className="form-control" id="nomeViagem" placeholder=""
                            />
                        </div>


                        <div className="mb-3">
                            <label htmlFor="obsviagem" className="form-label"><strong>Observações</strong></label>
                            <textarea  {...register("viagem-observacoes", { required: false })} className="form-control" id="obsviagem" rows="3"
                            ></textarea>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col mb-2">
                            <label htmlFor="dataIda" className="form-label"><strong>Data de Volta</strong></label>
                            <input  {...register("data-volta", { required: false })} type="date" className="form-control" id="dataIda" />
                        </div>

                        <div className="col mb-2">
                            <label htmlFor="dataVolta" className="form-label"><strong>Data de Saída</strong></label>
                            <input {...register("data-saida", { required: false })} type="date" className="form-control" id="dataVolta" />
                        </div>

                    </div>

                    <div className="mb-3">
                        <label htmlFor="Procedimentos" className="form-label"><strong>Procedimentos</strong></label>
                        <textarea {...register("viagem-observacoes", { required: false })} className="form-control" id="Procedimentos" rows="3"
                        ></textarea>
                    </div>
                </Form>



                <div className="col">
                    <div className="col text-center mt-3 mb-3">
                        <Button id="btnCadastro" onClick={() => handleSubmit(onSubmit)()} type="submit" className="btn btn-primary">Salvar</Button>
                    </div>
                </div>
            </div>


        </div>

        </body>

    )

    
}

export default Formulario
