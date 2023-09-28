import './form.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Button, Form } from 'reactstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function Formulario() {

    const validationFields = yup.object().shape({
        código: yup.string().required("Este campo é obrigatório."),
        unidade: yup.string().required("Este campo é obrigatório."),
        habil: yup.string().required("Este campo é obrigatório."),
        condor: yup.string().required("Este campo é obrigatório."),
        natureza: yup.string().required("Este campo é obrigatório."),
        cpfcnpj: yup.string().required("Este campo é obrigatório."),
        inscMunicipal: yup.string().required("Este campo é obrigatório."),
        nome: yup.string().required("Este campo é obrigatório."),
        nomeFantasia: yup.string().required("Este campo é obrigatório."),
        cidade: yup.string().required("Este campo é obrigatório."),
        bairro: yup.string().required("Este campo é obrigatório."),
        endereço: yup.string().required("Este campo é obrigatório."),
        uf: yup.string().required("Este campo é obrigatório."),
        cep: yup.string().required("Este campo é obrigatório."),
        nomeContato: yup.string().required("Este campo é obrigatório."),
        telefone: yup.string().required("Este campo é obrigatório."),
        senha: yup.string().required("Este campo é obrigatório."),
        contraSenha: yup.string().required("Este campo é obrigatório."),
        dataNascimento: yup.string().required("Este campo é obrigatório."),
        setor: yup.string().required("Este campo é obrigatório."),
        localInstalação: yup.string().required("Este campo é obrigatório.")
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationFields)
    });


    const onSubmit = (data) => {
        console.log(data)
    }


    return (

        <div>

            <nav className=" navbar navbar-dark bg-primary fixed-top mb-5" id="navbar">
                <button className="navbar-toggler ms-3" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                    <span className="navbar-toggler-icon"></span>

                </button>
                <div className=" offcanvas offcanvas-start text-bg-primary" tabIndex="-1" id="offcanvasDarkNavbar"
                    aria-labelledby="offcanvasDarkNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">AZSIM 2.0.0</h5>

                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                            aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-start flex-grow-1 pe-3">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="#">Inicio</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="dados">Cadastro</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="#">Sair</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>


            <div className="container justify-content-center">

                <h2 className='txtDados ms-3'>1 - Dados Básicos</h2>

                <Form method="POST"
                    className="text-start justify-content-center p-3">
                    <div className="row">
                        <div className="col">
                            <label htmlFor="documento" className="form-label">* Código</label>
                            <input name='codigo' {...register("código", { required: true })} type="text" className="form-control" id="documento" placeholder=""
                            />
                            <p className='error-message'>{errors.código?.message}</p>
                        </div>
                        <div className="col mb-2">
                            <label htmlFor="unidade" className="form-label">* Unidade</label>
                            <select name='unidade'  {...register("unidade", { required: true })} id="unidade" className="form-select" aria-label=".form-select example">
                                <option defaultValue={"Montenegro"} value="1">Montenegro</option>
                                <option value="2">Porto Alegre</option>
                            </select>
                            <p className='error-message'>{errors.unidade?.message}</p>

                        </div>
                        <div className="col">
                            <label htmlFor="habil" className="form-label">* Hábil</label>
                            <input name='habil' {...register("habil", { required: true })} type="text" className="form-control" id="habil" placeholder="" />
                            <p className='error-message'>{errors.habil?.message}</p>
                        </div>
                        <div className="col h-25">
                            <label htmlFor="condor" className="form-label">* Condor</label>
                            <input name='condor' {...register("condor", { required: true })} type="text" className="form-control" id="condor" placeholder="" />
                            <p className='error-message'>{errors.condor?.message}</p>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col">
                            <label htmlFor="natureza" className="form-label">* Natureza</label>
                            <select name='natureza' {...register("natureza", { required: true })} id="natureza" className="form-select" aria-label=".form-select example"
                            >
                                <option defaultValue={"FÍSICA"} value="1">FÍSICA</option>
                                <option value="2">JURÍDICA</option>
                            </select>
                            <p className='error-message'>{errors.natureza?.message}</p>
                        </div>
                        <div className="col">
                            <label htmlFor="cpf" className="form-label">* CPF/CNPJ</label>
                            <input name='cpf/cnpj' maxLength="14" type="text" {...register("cpfcnpj", { required: true })} className="form-control" id="cpf" placeholder="" />
                            <p className='error-message'>{errors.cpfcnpj?.message}</p>
                        </div>
                        <div className="col">
                            <label htmlFor="inscMunicipal" className="form-label">* Inscrição Municipal</label>
                            <input name='insc.municipal' {...register("incmunincipal", { required: true })} type="text" className="form-control" id="inscMunicipal" placeholder=""
                            />
                            <p className='error-message'>{errors.inscMunicipal?.message}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col mb-2">

                            <label htmlFor="nome" className="form-label">* Nome/Razão Social</label>
                            <input name='nome'  {...register("nome/razao-social", { required: true })} type="text" className="form-control" id="nome" placeholder="" />
                            <p className='error-message'>{errors.nome?.message}</p>
                        </div>
                        <div className="col">
                            <label htmlFor="nome_fantasia" className="form-label">* Nome Fantasia</label>
                            <input name='nomeFantasia' {...register("nome-fantasia", { required: true })} type="text" className="form-control" id="nome_fantasia" placeholder="" />
                            <p className='error-message'>{errors.nomeFantasia?.message}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col mb-2">
                            <label htmlFor="endereco" className="form-label">* Endereço</label>
                            <input name='endereco' {...register("endereço", { required: true })} type="text" className="form-control" id="endereco" placeholder="" />
                            <p className='error-message'>{errors.endereço?.message}</p>
                        </div>
                        <div className="col">
                            <label htmlFor="bairro" className="form-label">* Bairro</label>
                            <input name='bairro' {...register("bairro", { required: true })} type="text" className="form-control" id="bairro" placeholder="" />
                            <p className='error-message'>{errors.bairro?.message}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="cidade" className="form-label">* Cidade</label>
                            <input name='cidade' {...register("cidade", { required: true })} type="text" className="form-control" id="cidade" placeholder="" />
                            <p className='error-message'>{errors.cidade?.message}</p>
                        </div>
                        <div className="col">
                            <label htmlFor="uf" className="form-label">* Uf</label>
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
                            <p className='error-message'>{errors.uf?.message}</p>
                        </div>

                        <div className="col">
                            <label htmlFor="cep" className="form-label">* CEP</label>
                            <input name='cep' {...register("cep", { required: true })} required type="number" maxLength="9" className="form-control" id="cep"
                                placeholder="" />
                            <p className='error-message'>{errors.cep?.message}</p>
                        </div>

                    </div>
                    <div className="row mt-2">
                        <div className="col-lg ">
                            <label htmlFor="observacao" className="form-label">Observações</label>
                            <textarea {...register("observacoes", { required: false })} className="form-control" id="observacao" rows="3"></textarea>
                        </div>

                    </div>

                </Form>
            </div>

            <hr />

            <div className="container justify-content-center">
                <h2 className='txt'>2 - Contatos</h2>

                <Form method="post">
                    <div className="row">
                        <div className="col mb-2">
                            <label htmlFor="nomeContato" className="form-label">* Nome</label>
                            <input  {...register("contatoNome", { required: true })} type="text" className="form-control" id="nomeContato" placeholder="" />
                            <p className='error-message'>{errors.nomeContato?.message}</p>
                        </div>

                        <div className="col mb-2">
                            <label htmlFor="telefone" className="form-label">* Telefone</label>
                            <input  {...register("telefone", { required: true })} maxLength="15" required type="number"
                                className="form-control" id="telefone" placeholder="" />
                            <p className='error-message'>{errors.telefone?.message}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col mb-2">
                            <label htmlFor="senha" className="form-label">* Senha </label>
                            <input  {...register("senha", { required: true })} type="password" className="form-control" id="senha" placeholder="" />
                            <p className='error-message'>{errors.senha?.message}</p>
                        </div>


                        <div className="col mb-2">
                            <label htmlFor="contraSenha" className="form-label">* Contra-Senha</label>
                            <input  {...register("contraSenha", { required: true })} type="password" className="form-control" id="contraSenha" placeholder="" />
                            <p className='error-message'>{errors.contraSenha?.message}</p>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col mb-2">
                            <label htmlFor="DataDeNascimento" className="form-label">* Data de Nascimento</label>
                            <input  {...register("dataNascimento", { required: true })} type="date" className="form-control" id="DataDeNascimento"
                                placeholder="" />
                            <p className='error-message'>{errors.dataNascimento?.message}</p>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Observações</label>
                        <textarea  {...register("observacoes", { required: false })} className="form-control" id="exampleFormControlTextarea1" rows="3" ></textarea>
                    </div>
                </Form>
            </div>

            <hr />

            <div className="container justify-content-center">

                <h2 className='txt'>3 - Setorização</h2>


                <Form method="post">
                    <div className="row">
                        <div className="col mb-2">
                            <label htmlFor="Setor" className="form-label">* Setor</label>
                            <input  {...register("setor", { required: true })} type="text" className="form-control" id="Setor" placeholder=""
                            />
                            <p className='error-message'>{errors.setor?.message}</p>
                        </div>

                        <div className="col mb-2">
                            <label htmlFor="localInstalacao" className="form-label">* Local da
                                Instalação</label>
                            <input  {...register("localInstalacao", { required: true })} type="text" className="form-control" id="localInstalacao"
                                placeholder="" />
                            <p className='error-message'>{errors.localInstalação?.message}</p>
                        </div>


                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1"
                                className="form-label">Observações</label>
                            <textarea  {...register("observacoes", { required: false })} className="form-control" id="exampleFormControlTextarea1"
                                rows="3"></textarea>
                        </div>
                    </div>
                </Form>
            </div>

            <hr />

            <div className="container justify-content-center">

                <h2 className='txt'>4 - Viagens</h2>


                <Form method="post">
                    <div className="row">
                        <div className="col mb-2">
                            <label htmlFor="nomeContato" className="form-label">Nome</label>
                            <input  {...register("viagem-nome", { required: false })} type="text" className="form-control" id="nomeContato" placeholder=""
                            />
                        </div>


                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Observações</label>
                            <textarea  {...register("viagem-observacoes", { required: false })} className="form-control" id="exampleFormControlTextarea1" rows="3"
                            ></textarea>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col mb-2">
                            <label htmlFor="dataIda" className="form-label">Data de Volta</label>
                            <input  {...register("data-volta", { required: false })} type="date" className="form-control" id="dataIda" />
                        </div>

                        <div className="col mb-2">
                            <label htmlFor="dataVolta" className="form-label">Data de Saída</label>
                            <input {...register("data-saida", { required: true })} type="date" className="form-control" id="dataVolta" />
                        </div>

                    </div>

                    <div className="mb-3">
                        <label htmlFor="Procedimentos" className="form-label">Procedimentos</label>
                        <textarea {...register("viagem-observacoes", { required: true })} className="form-control" id="Procedimentos" rows="3"
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
    )
}

export default Formulario
