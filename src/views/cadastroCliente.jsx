import '../css/form.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Button, Form } from 'reactstrap';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';
import ErrorCard from '../fragments/ErrorCard';

function Formulario() {



    const { register, handleSubmit, formState: { errors }, setError } = useForm({});
    const [natureza, setNatureza] = useState("FISICA");

    const [errorMessage, setErrorMessage] = useState(null); // Estado para armazenar a mensagem de erro da requisição
    const [successMessage, setSuccessMessage] = useState('');

    const clearMessages = () => {
        setErrorMessage('');
        setSuccessMessage('');
    };

    const [dadosBasicos, setDadosBasicos] = useState({
        unidade: 'Montenegro',
        codHabil: '',
        codCondor: '',
        natureza: 'FISICA',
        documento: '',
        incMunincipal: '',
        nome: '',
        nomeFantasia: '',
        endereco: '',
        bairro: '',
        cidade: '',
        uf: 'AC',
        cep: '',
        observacoes: '',
        codificador: 87,
        contatos: [{ nomectt: '', telefone: '', senha: '', contraSenha: '', dataNascimento: '', observacoes: '' }],
        setores: [{ setor: '', localInstalacao: '', observacoes: '' }],
        viagens: [{ nomeSaida: '', nomeVolta: '', observacoes: '', dataSaida: '', dataVolta: '', procedimentos: '' }],
    });



    const onSubmit = async (data) => {
        // Validar campos obrigatórios



        const camposObrigatorios = ['unidade', 'codificador', 'natureza', 'documento', 'nome/razao-social'];
        camposObrigatorios.forEach((campo) => {
            if (!data[campo]) {
                setError(campo, {
                    type: 'manual',
                    message: 'Este campo é obrigatório',
                });
            }
        });
        try {
            const contatos = [
                {
                    nome: data['nome'],
                    telefone: data['telefone'],
                    senha: data['senha'],
                    contraSenha: data['contraSenha'],
                    dataNascimento: data['dataNascimento'],
                    observacoesContato: data['observacoes'],
                }
            ];

            const setores = [
                {
                    setor: data['setor'],
                    localizacao: data['localInstalacao'],
                    observacao: data['observacoesSetor'],
                }
            ];

            const viagens = [
                {
                    nomeContatoNotificacaoSaida: data['nomeSaida'],
                    nomeContatoNotificacaoVolta: data['nomeVolta'],
                    observacao: data['ViagemObservacoes'],
                    dataSaida: data['data-ida'],
                    dataVolta: data['data-volta'],
                    procedimento: data['procedimentos'],
                }
            ];

            // Construa o objeto de dados para a requisição
            const dadosRequisicao = {
                ...dadosBasicos,
                contatos,
                setores,
                viagens,
            };


            console.log('Data antes da requisição:', dadosRequisicao);
            const resposta = await axios.post('http://localhost:8080/api/cliente', dadosRequisicao);
            console.log(resposta)

            if (resposta.status === 200) {
                setSuccessMessage('Cliente salvo com sucesso.');
                setTimeout(clearMessages, 5000);
            }
        } catch (error) {
            console.error('Erro ao salvar o cadastro:', error);

            if (error.response) {
                if (error.response.status === 500) {
                    const serverErrorMessage = error.response.data?.message;

                    if (serverErrorMessage.includes('CODIFICADOR_EM_USO')) {
                        setErrorMessage('Erro: O codificador já está em uso.');
                    } else {
                        setErrorMessage(`Erro no servidor: ${serverErrorMessage}`);
                    }
                } else {
                    setErrorMessage(`Erro no servidor: ${error.response.data?.message}`);
                }
            } else if (error.request) {
                setErrorMessage('Não foi possível conectar ao sistema AZSIM. Verifique sua conexão e tente novamente.');
            } else {
                setErrorMessage('Erro ao configurar a requisição.');
            }
            setTimeout(clearMessages, 5000);
        }
    };


    return (

        <body className='DivOfAll'>


            <div>


                <div className="container justify-content-center">

                    <h2 className='txtDados ms-3'>1 - Dados Básicos</h2>

                    <Form method="POST"
                        className="text-start justify-content-center p-3">
                        <div className="row">
                            <div className="col mb-2">
                                <label htmlFor="unidade" className="form-label"><strong>* Unidade</strong></label>
                                <select name='unidade'  {...register("unidade", { required: false })} id="unidade" className={`form-select ${errors.unidade ? 'is-invalid' : ''}`} aria-label=".form-select example" onChange={(e) => setDadosBasicos({ ...dadosBasicos, unidade: e.target.value })}>
                                    <option defaultValue={"Montenegro"} value="Montenegro">Montenegro</option>
                                    <option value="Porto Alegre">Porto Alegre</option>
                                    <div className="invalid-feedback">{errors.unidade?.message}</div>

                                </select>
                            </div>
                            <div className="col">
                                <label htmlFor="codificador" className="form-label"><strong>* Codificador</strong></label>
                                <input name='codificador' {...register("codificador", { required: true })} type="text" className={`form-control ${errors['codificador'] ? 'is-invalid' : ''}`} id="codificador" placeholder=""
                                    onChange={(e) => setDadosBasicos({ ...dadosBasicos, codificador: e.target.value })} />
                                {errors['codificador'] && <ErrorCard message="O campo codificadorcadastro deve ser preenchido." />}
                            </div>
                            <div className="col">
                                <label htmlFor="codHabil" className="form-label"><strong>Hábil</strong></label>
                                <input name='codHabil' {...register("codHabil", { required: false })} type="text" className="form-control" id="codHabil" placeholder=""
                                    onChange={(e) => setDadosBasicos({ ...dadosBasicos, codHabil: e.target.value })} />
                            </div>
                            <div className="col h-25">
                                <label htmlFor="codCondor" className="form-label"><strong>Condor</strong></label>
                                <input name='codCondor' {...register("codCondor", { required: false })} type="text" className="form-control" id="codCondor" placeholder=""
                                    onChange={(e) => setDadosBasicos({ ...dadosBasicos, codCondor: e.target.value })} />
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col">
                                <label htmlFor="natureza" className="form-label">
                                    <strong>* Natureza</strong>
                                </label>
                                <select
                                    name="natureza"
                                    {...register("natureza", { required: false })}
                                    id="natureza"
                                    className="form-select"
                                    aria-label=".form-select example"
                                    onChange={(e) => setNatureza(e.target.value)}
                                >
                                    <option defaultValue={"FISICA"} value="FISICA">
                                        FISICA
                                    </option>
                                    <option value="JURIDICA">JURIDICA</option>
                                </select>
                            </div>
                            <div className="col">
                                <label htmlFor="documento" className="form-label">    <strong>* {natureza === "FISICA" ? "CPF" : "CNPJ"}</strong></label>
                                <InputMask
                                    mask={natureza === "FISICA" ? "999.999.999-99" : "99.999.999/9999-99"}
                                    maskChar=""
                                    name="documento"
                                    {...register("documento", { required: true })}
                                    type="text"
                                    className={`form-control ${errors['documento'] ? 'is-invalid' : ''}`}
                                    id="documento"
                                    placeholder=""
                                    onChange={(e) => setDadosBasicos({ ...dadosBasicos, documento: e.target.value })}
                                />
                                {errors['documento'] && <ErrorCard message="O campo CPF/CNPJ deve ser preenchido." />}
                            </div>
                            <div className="col">
                                <label htmlFor="inscMunicipal" className="form-label"><strong>Inscrição Municipal</strong></label>
                                <input name='incMunincipal' {...register("incMunincipal", { required: false })} type="text" className="form-control" id="inscMunicipal" placeholder=""
                                    onChange={(e) => setDadosBasicos({ ...dadosBasicos, incMunincipal: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col mb-2">
                                <label htmlFor="nome" className="form-label"><strong>* Nome/Razão Social</strong></label>
                                <input
                                    name='nome'
                                    {...register("nome/razao-social", { required: true })}
                                    type="text"
                                    className={`form-control ${errors['nome/razao-social'] ? 'is-invalid' : ''}`}
                                    id="nome/razaoSocial"
                                    placeholder=""
                                    onChange={(e) => setDadosBasicos({ ...dadosBasicos, nome: e.target.value })}
                                />
                                {errors['nome/razao-social'] && <ErrorCard message="O campo Nome/Razão Social deve ser preenchido." />}
                            </div>
                            <div className="col">
                                <label htmlFor="nomeFantasia" className="form-label"><strong>Nome Fantasia</strong></label>
                                <input name='nomeFantasia' {...register("nomeFantasia", { required: false })} type="text" className="form-control" id="nomeFantasia" placeholder=""
                                    onChange={(e) => setDadosBasicos({ ...dadosBasicos, nomeFantasia: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col mb-2">
                                <label htmlFor="endereco" className="form-label"><strong>Endereço</strong></label>
                                <input name='endereco' {...register("endereco", { required: false })} type="text" className="form-control" id="endereco" placeholder=""
                                    onChange={(e) => setDadosBasicos({ ...dadosBasicos, endereco: e.target.value })}
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="bairro" className="form-label"><strong>Bairro</strong></label>
                                <input name='bairro' {...register("bairro", { required: false })} type="text" className="form-control" id="bairro" placeholder=""
                                    onChange={(e) => setDadosBasicos({ ...dadosBasicos, bairro: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="cidade" className="form-label"><strong>Cidade</strong></label>
                                <input name='cidade' {...register("cidade", { required: false })} type="text" className="form-control" id="cidade" placeholder=""
                                    onChange={(e) => setDadosBasicos({ ...dadosBasicos, cidade: e.target.value })}
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="uf" className="form-label"><strong>Uf</strong></label>
                                <select name='uf' {...register("uf", { required: false })} id="uf" className="form-select" aria-label=".form-select example" onChange={(e) => setDadosBasicos({ ...dadosBasicos, uf: e.target.value })}>
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
                                <label htmlFor="cep" className="form-label"><strong>CEP</strong></label>
                                <InputMask
                                    mask="99999-999"
                                    maskChar=""
                                    name="cep"
                                    {...register("cep", { required: false })}
                                    required
                                    type="text"
                                    className="form-control"
                                    id="cep"
                                    placeholder=""
                                    onChange={(e) => setDadosBasicos({ ...dadosBasicos, cep: e.target.value })}
                                />
                            </div>

                        </div>
                        <div className="row mt-2">
                            <div className="col-lg ">
                                <label htmlFor="observacao" className="form-label"><strong>Observações</strong></label>
                                <input {...register("observacoes", { required: false })} className="form-control" id="observacao" rows="3" onChange={(e) => setDadosBasicos({ ...dadosBasicos, observacoes: e.target.value })} />
                            </div>

                        </div>




                        <hr />

                        <div className="container justify-content-center">
                            <h2 className='txt'>2 - Contatos </h2>




                            <div className="row">
                                <div className="col mb-2">
                                    <label htmlFor={`nome`} className="form-label"><strong>Nome</strong></label>
                                    <input name='nome'  {...register(`nome`, { required: false })} type="text" className="form-control" id={`nome`} placeholder="" onChange={(e) => setDadosBasicos({ ...dadosBasicos, contatos: [{ ...dadosBasicos.contatos[0], [e.target.name]: e.target.value }] })}


                                    />

                                </div>

                                <div className="col mb-2">
                                    <label htmlFor={`telefone`} className="form-label"><strong>Telefone</strong></label>
                                    <InputMask
                                        mask="(99) 99999-9999" // Máscara para telefone
                                        maskChar=""
                                        name="telefone"
                                        required
                                        {...register(`telefone`, { required: false })}
                                        type="text"
                                        className="form-control"
                                        htmlFor={`telefone`}
                                        placeholder=""
                                        onChange={(e) => setDadosBasicos({ ...dadosBasicos, contatos: e.target.value })}
                                    />
                                </div>

                                <div className="col mb-2">
                                    <label htmlFor={`senha`} className="form-label"><strong>Senha </strong></label>
                                    <input  {...register(`senha`, { required: false })} type="password" className="form-control" id={`senha`} placeholder="" onChange={(e) => setDadosBasicos({ ...dadosBasicos, contatos: e.target.value })}
                                    />
                                </div>


                                <div className="col mb-2">
                                    <label htmlFor={`contraSenha`} className="form-label"><strong>Contra-Senha</strong></label>
                                    <input  {...register(`contraSenha`, { required: false })} type="password" className="form-control" id={`contraSenha`} placeholder="" onChange={(e) => setDadosBasicos({ ...dadosBasicos, contatos: e.target.value })} />
                                </div>

                                <div className="col mb-2">
                                    <label htmlFor={`dataNascimento`} className="form-label"><strong>Data de Nascimento</strong></label>
                                    <input  {...register(`dataNascimento`, { required: false })} type="date" className="form-control" id={`dataNascimento`} onChange={(e) => setDadosBasicos({ ...dadosBasicos, contatos: e.target.value })}
                                        placeholder="" />
                                </div>

                                <div className="col mb-2">
                                    <label htmlFor={`observacoesctt`} className="form-label"><strong>Observações</strong></label>
                                    <textarea {...register(`contatos[0].observacoes`, { required: false })} className="form-control" id={`observacoesctt`} rows="1"></textarea>
                                </div>


                            </div>

                        </div>

                        <hr />

                        <div className="container justify-content-center">

                            <h2 className='txt'>3 - Setorização</h2>



                            <div className="row">
                                <div className="col mb-1">
                                    <label htmlFor={`setor`} className="form-label"><strong>Setor</strong></label>
                                    <input  {...register(`setor`, { required: false })} type="text" className="form-control" id={`setor`} placeholder="" onChange={(e) => setDadosBasicos({ ...dadosBasicos, setores: e.target.value })}

                                    />
                                </div>

                                <div className="col mb-1">
                                    <label htmlFor={`localInstalacao`} className="form-label"><strong>Local da
                                        Instalação</strong></label>
                                    <input  {...register(`localInstalacao`, { required: false })} type="text" className="form-control" id={`localInstalacao`}
                                        placeholder="" onChange={(e) => setDadosBasicos({ ...dadosBasicos, setores: e.target.value })}
                                    />
                                </div>


                                <div className=" col mb-1">
                                    <label htmlFor={`observacoesSetor`}
                                        className="form-label"><strong>Observações</strong></label>
                                    <textarea {...register(`observacoesSetor`, { required: false })} className="form-control" id={`observacoesSetor`} rows="1"></textarea>

                                </div>
                            </div>

                        </div>

                        <hr />




                        <h2 className='txt'>4 - Viagens </h2>


                        <div className="row">
                            <div className="col mb-2">
                                <label htmlFor={`nomeSaida`} className="form-label"><strong>Nome - Notificação Saida</strong></label>
                                <input  {...register(`nomeSaida`, { required: false })} type="text" className="form-control" id={`nomeSaida`} placeholder=""
                                    onChange={(e) => setDadosBasicos({ ...dadosBasicos, viagens: e.target.value })}
                                />
                            </div>

                            <div className="col mb-2">
                                <label htmlFor={`nomeVolta`} className="form-label"><strong>Nome - Notificação Volta</strong></label>
                                <input  {...register(`nomeVolta`, { required: false })} type="text" className="form-control" id={`nomeVolta`} placeholder=""
                                    onChange={(e) => setDadosBasicos({ ...dadosBasicos, viagens: e.target.value })}
                                />
                            </div>

                            <div className=" col mb-3">
                                <label htmlFor={`ViagemObservacoes`} className="form-label"><strong>Observações</strong></label>
                                <textarea {...register(`ViagemObservacoes`, { required: false })} className="form-control" id={`ViagemObservacoes`} rows="1"></textarea>

                            </div>


                            <div className="col mb-2">
                                <label htmlFor={`dataIda`} className="form-label"><strong>Data de Volta</strong></label>
                                <input  {...register(`data-volta`, { required: false })} type="date" className="form-control" id={`dataIda`} onChange={(e) => setDadosBasicos({ ...dadosBasicos, viagens: e.target.value })}
                                />
                            </div>

                            <div className="col mb-2">
                                <label htmlFor={`dataVolta`} className="form-label"><strong>Data de Saída</strong></label>
                                <input   {...register(`data-ida`, { required: false })} type="date" className="form-control" id={`dataVolta`} onChange={(e) => setDadosBasicos({ ...dadosBasicos, viagens: e.target.value })}
                                />
                            </div>

                            <div className="col mb-3">
                                <label htmlFor={`procedimentos`} className="form-label"><strong>Procedimentos</strong></label>
                                <textarea {...register(`procedimentos`, { required: false })} className="form-control" id={`procedimentos`} rows="1"></textarea>
                            </div>
                        </div>
                    </Form>


                </div>


                <div className="col">
                    <div className="col text-center mt-3 mb-3">
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        <Button id="btnCadastro" onClick={() => handleSubmit(onSubmit)()} type="submit" className="btn btn-primary">Salvar</Button>
                    </div>
                </div>


            </div>

        </body >

    )


}

export default Formulario;
