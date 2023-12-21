import '../css/form.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Button, Form } from 'reactstrap';
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';


function Formulario() {



    const { register, handleSubmit, reset } = useForm({});
    const [ativo, setAtivo] = useState(false);
    const [natureza, setNatureza] = useState("FÍSICA");
    const [contatos, setContatos] = useState([{}]); // Estado para armazenar os contatos
    const [setor, setSetor] = useState([{}]); // Estado para armazenar os contatos
    const [viagem, setViagem] = useState([{}]);
    const clienteParaEdicao = location.state?.cliente;

    const [dadosBasicos, setDadosBasicos] = useState({
        codigo: '',
        unidade: '',
        habil: '',
        condor: '',
        natureza: 'FÍSICA',
        cpfcnpj: '',
        incmunincipal: '',
        nomeRazaoSocial: '',
        nomeFantasia: '',
        endereco: '',
        bairro: '',
        cidade: '',
        uf: 'AC',
        cep: '',
        observacoes: ''
    });

    useEffect(() => {
        if (clienteParaEdicao) {
            setDadosBasicos({
                codigo: clienteParaEdicao.codigo,
                unidade: clienteParaEdicao.unidade,
                habil: clienteParaEdicao.habil,
                condor: clienteParaEdicao.condor,
                natureza: clienteParaEdicao.natureza,
                cpfcnpj: clienteParaEdicao.cpfcnpj,
                incmunincipal: clienteParaEdicao.incmunincipal,
                nomeRazaoSocial: clienteParaEdicao.nomeRazaoSocial,
                nomeFantasia: clienteParaEdicao.nomeFantasia,
                endereco: clienteParaEdicao.endereco,
                bairro: clienteParaEdicao.bairro,
                cidade: clienteParaEdicao.cidade,
                uf: clienteParaEdicao.uf,
                cep: clienteParaEdicao.cep,
                observacoes: clienteParaEdicao.observacoes
            });
            setContatos(clienteParaEdicao.contatos || [{}]);
            setSetor(clienteParaEdicao.setores || [{}]);
            setViagem(clienteParaEdicao.viagens || [{}]);
        }
    }, [clienteParaEdicao]);


    const handleAddContato = () => {
        setContatos([...contatos, {}]); // Adiciona um novo objeto de contato ao estado
    };
    const handleAddSetor = () => {
        setSetor([...setor, {}]); // Adiciona um novo objeto de contato ao estado
    };
    const handleAddViagem = () => {
        setViagem([...viagem, {}]); // Adiciona um novo objeto de contato ao estado
    };


    const onSubmit = async () => {
        try {
            const data = {
                ...dadosBasicos,
                contatos,
                setor,
                viagem
                // Adicione outros campos do formulário aqui
            };

            if (clienteParaEdicao) {
                // Cliente para edição, enviar requisição PUT
                const resposta = await axios.put(`/formulario/editar/${clienteParaEdicao.id}`, data);
                console.log(resposta)
            } else {
                // Nenhum cliente para edição, enviar requisição POST
                const resposta = await axios.post('/formulario/salvar', data);
                console.log(resposta)
            }
        } catch (error) {
            console.error('Erro ao salvar o cadastro:', error);
        }
        reset()
    };



    const toggleAtivo = () => {
        setAtivo(!ativo);
    };




    return (

        <body className='DivOfAll'>


            <div>


                <div className="container justify-content-center">

                    <h2 className='txtDados ms-3'>1 - Dados Básicos</h2>

                    <Form method="POST"
                        className="text-start justify-content-center p-3">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="codigo" className="form-label"><strong>* Código</strong></label>
                                <input
                                    name='codigo'
                                    {...register("código", { required: true })}
                                    type="text"
                                    className="form-control"
                                    id="documento"
                                    placeholder=""
                                    value={dadosBasicos.codigo}
                                    onChange={(e) => setDadosBasicos({ ...dadosBasicos, codigo: e.target.value })}
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
                                <label htmlFor="natureza" className="form-label">
                                    <strong>* Natureza</strong>
                                </label>
                                <select
                                    name="natureza"
                                    {...register("natureza", { required: true })}
                                    id="natureza"
                                    className="form-select"
                                    aria-label=".form-select example"
                                    onChange={(e) => setNatureza(e.target.value)}
                                >
                                    <option defaultValue={"FÍSICA"} value="FÍSICA">
                                        FÍSICA
                                    </option>
                                    <option value="JURÍDICA">JURÍDICA</option>
                                </select>
                            </div>
                            <div className="col">
                                <label htmlFor="cpf" className="form-label">    <strong>* {natureza === "FÍSICA" ? "CPF" : "CNPJ"}</strong></label>
                                <InputMask
                                    mask={natureza === "FÍSICA" ? "999.999.999-99" : "99.999.999/9999-99"}
                                    maskChar=""
                                    name="cpf/cnpj"
                                    {...register("cpfcnpj", { required: true })}
                                    type="text"
                                    className="form-control"
                                    id="cpfCnpj"
                                    placeholder=""
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="inscMunicipal" className="form-label"><strong>* Inscrição Municipal</strong></label>
                                <input name='insc.municipal' {...register("incmunincipal", { required: true })} type="text" className="form-control" id="inscMunicipal" placeholder="" />
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
                                    <option defaultValue={"AC"} value="AC">AC</option>
                                    <option value="AL">AL</option>
                                    <option value="AM">AM</option>
                                    <option value="BA">BA</option>
                                    <option value="CE">CE</option>
                                    <option value="DF">DF</option>
                                    <option value="ES">ES</option>
                                    <option value="GO">GO</option>
                                    <option value="MA">MA</option>
                                    <option value="MT">MT</option>
                                    <option value="MS">MS</option>
                                    <option value="MG">MG</option>
                                    <option value="PA">PA</option>
                                    <option value="PB">PB</option>
                                    <option value="PR">PR</option>
                                    <option value="PE">PE</option>
                                    <option value="PI">PI</option>
                                    <option value="RJ">RJ</option>
                                    <option value="RN">RN</option>
                                    <option value="RS">RS</option>
                                    <option value="RO">RO</option>
                                    <option value="RR">RR</option>
                                    <option value="SC">SC</option>
                                    <option value="SP">SP</option>
                                    <option value="SE">SE</option>
                                    <option value="TO">TO</option>
                                </select>
                            </div>

                            <div className="col">
                                <label htmlFor="cep" className="form-label"><strong>* CEP</strong></label>
                                <InputMask
                                    mask="99999-999"
                                    maskChar=""
                                    name="cep"
                                    {...register("cep", { required: true })}
                                    required
                                    type="text"
                                    className="form-control"
                                    id="cep"
                                    placeholder=""
                                />
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
                    <h2 className='txt'>2 - Contatos  <Button id='addContBtn' onClick={handleAddContato}><i className="bi bi-person-add"></i></Button></h2>

                    {contatos.map((contato, index) => (
                        <Form key={index + 1} method="post" className="text-start justify-content-center p-3">



                            <div className="row">
                                <div className="col mb-2">
                                    <label htmlFor={`nomeContato${index + 1}`} className="form-label"><strong>* Nome</strong></label>
                                    <input  {...register(`contatoNome${index + 1}`, { required: true })} type="text" className="form-control" id={`nomeContato${index + 1}`} placeholder="" />
                                </div>

                                <div className="col mb-2">
                                    <label htmlFor={`telefone${index + 1}`} className="form-label"><strong>* Telefone</strong></label>
                                    <InputMask
                                        mask="(99) 99999-9999" // Máscara para telefone
                                        maskChar=""
                                        name="telefone"
                                        required
                                        {...register(`telefone${index + 1}`, { required: true })}
                                        type="text"
                                        className="form-control"
                                        htmlFor={`telefone${index + 1}`}
                                        placeholder=""
                                    />
                                </div>

                                <div className="col mb-2">
                                    <label htmlFor={`senha${index + 1}`} className="form-label"><strong>* Senha </strong></label>
                                    <input  {...register(`senha${index + 1}`, { required: true })} type="password" className="form-control" id={`senha${index + 1}`} placeholder="" />
                                </div>


                                <div className="col mb-2">
                                    <label htmlFor={`contrasenha${index + 1}`} className="form-label"><strong>* Contra-Senha</strong></label>
                                    <input  {...register(`contraSenha${index + 1}`, { required: true })} type="password" className="form-control" id={`contrasenha${index + 1}`} placeholder="" />
                                </div>

                                <div className="col mb-2">
                                    <label htmlFor={`dataDeNascimento${index + 1}`} className="form-label"><strong>* Data de Nascimento</strong></label>
                                    <input  {...register(`dataNascimento${index + 1}`, { required: true })} type="date" className="form-control" id={`dataDeNascimento${index + 1}`}
                                        placeholder="" />
                                </div>

                                <div className="col mb-2">
                                    <label htmlFor={`obsContato${index + 1}`} className="form-label"><strong>Observações</strong></label>
                                    <textarea  {...register(`observacoesCtt${index + 1}`, { required: false })} className="form-control" id={`obsContato${index + 1}`} rows="1" ></textarea>
                                </div>


                            </div>
                        </Form>

                    ))}
                </div>

                <hr />

                <div className="container justify-content-center">

                    <h2 className='txt'>3 - Setorização  <Button id='addSetorBtn' onClick={handleAddSetor}><i className="bi bi-building-add"></i></Button></h2>

                    {setor.map((contato, index) => (
                        <Form key={index + 1} method="post" className="text-start justify-content-center p-3">
                            <div className="row">
                                <div className="col mb-1">
                                    <label htmlFor={`setor${index + 1}`} className="form-label"><strong>* Setor</strong></label>
                                    <input  {...register(`setor${index + 1}`, { required: true })} type="text" className="form-control" id={`setor${index + 1}`} placeholder=""
                                    />
                                </div>

                                <div className="col mb-1">
                                    <label htmlFor={`localInstalacao${index + 1}`} className="form-label"><strong>* Local da
                                        Instalação</strong></label>
                                    <input  {...register(`localInstalacao${index + 1}`, { required: true })} type="text" className="form-control" id={`localInstalacao${index + 1}`}
                                        placeholder="" />
                                </div>


                                <div className=" col mb-1">
                                    <label htmlFor={`obsSetor${index + 1}`}
                                        className="form-label"><strong>Observações</strong></label>
                                    <textarea  {...register(`observacoes${index + 1}`, { required: false })} className="form-control" id={`obsSetor${index + 1}`}
                                        rows="1"></textarea>
                                </div>
                            </div>
                        </Form>
                    ))}
                </div>

                <hr />
                <div id="divDoCheckDasViagens" className="form-check form-switch">
                    <input checked={ativo} onChange={toggleAtivo} className="form-check-input AtivaViagem" type="checkbox" role="switch" id="flexSwitchCheckChecked" />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault"><h5>Há viagens</h5></label>
                </div>

                <div className="container justify-content-center">

                    <h2 className='txt'>4 - Viagens  <Button id='addViagemBtn' onClick={handleAddViagem}><i className="bi bi-send-plus"></i></Button></h2>


                    {viagem.map((viagem, index) => (
                        <Form key={index + 1} method="post" className="text-start justify-content-center p-3">
                            <div className="row">
                                <div className="col mb-2">
                                    <label htmlFor={`nomeViagem${index + 1 + 1}`} className="form-label"><strong>Nome</strong></label>
                                    <input disabled={!ativo} {...register(`viagem-nome${index + 1}`)} required={ativo} type="text" className="form-control" id={`nomeViagem${index + 1}`} placeholder=""
                                    />
                                </div>


                                <div className=" col mb-3">
                                    <label htmlFor={`obsViagem${index + 1}`} className="form-label"><strong>Observações</strong></label>
                                    <textarea disabled={!ativo}  {...register(`viagem-observacoes${index + 1}`)} required={ativo} className="form-control" id={`obsViagem${index + 1}`} rows="1"
                                    ></textarea>
                                </div>


                                <div className="col mb-2">
                                    <label htmlFor={`dataIda${index + 1}`} className="form-label"><strong>Data de Volta</strong></label>
                                    <input disabled={!ativo} {...register(`data-volta${index + 1}`)} required={ativo} type="date" className="form-control" id={`dataIda${index + 1}`} />
                                </div>

                                <div className="col mb-2">
                                    <label htmlFor={`dataVolta${index + 1}`} className="form-label"><strong>Data de Saída</strong></label>
                                    <input disabled={!ativo}  {...register(`data-ida${index + 1}`)} required={ativo} type="date" className="form-control" id={`dataVolta${index + 1}`} />
                                </div>

                                <div className="col mb-3">
                                    <label htmlFor={`procedimentos${index + 1}`} className="form-label"><strong>Procedimentos</strong></label>
                                    <textarea disabled={!ativo} {...register(`viagem-observacoes${index + 1}`)} required={ativo} className="form-control" id={`procedimentos${index + 1}`} rows="1"
                                    ></textarea>
                                </div>
                            </div>
                        </Form>

                    ))}
                </div>


                <div className="col">
                    <div className="col text-center mt-3 mb-3">
                        <Button id="btnCadastro" onClick={() => handleSubmit(onSubmit)()} type="submit" className="btn btn-primary">Salvar</Button>
                    </div>
                </div>


            </div>

        </body>

    )


}

export default Formulario;
