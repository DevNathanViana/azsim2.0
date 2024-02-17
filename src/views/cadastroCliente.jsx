import '../css/cadastros.css'
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
    const [idCliente, setIdCliente] = useState(null);
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
        observacao: '',
        codificador: 87,
        contatos: [{ nome: '', telefone: '', senha: '', contraSenha: '', dataNascimento: '', observacao: '' }],
        setores: [{ setor: '', localInstalacao: '', observacao: '' }],
        viagens: [{ nomeSaida: '', nomeVolta: '', observacao: '', dataSaida: '', dataVolta: '', procedimentos: '' }],
    });

    const duplicateContato = () => {
        setDadosBasicos({
            ...dadosBasicos,
            contatos: [...dadosBasicos.contatos, { nomectt: '', telefone: '', senha: '', contraSenha: '', dataNascimento: '', observacao: '' }],
        });
    };

    const duplicateSetor = () => {
        setDadosBasicos({
            ...dadosBasicos,
            setores: [...dadosBasicos.setores, { setor: '', localInstalacao: '', observacao: '' }],
        });
    };

    const duplicateViagem = () => {
        setDadosBasicos({
            ...dadosBasicos,
            viagens: [...dadosBasicos.viagens, { nomeSaida: '', nomeVolta: '', observacao: '', dataSaida: '', dataVolta: '', procedimentos: '' }],
        });
    };

    const onSubmit = async (data) => {
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

            const contatos = dadosBasicos.contatos.map((contato) => ({
                nome: contato.nome,
                telefone: contato.telefone,
                senha: contato.senha,
                contraSenha: contato.contraSenha,
                dataNascimento: contato.dataNascimento,
                observacao: contato.observacao,
            }));

            const setores = dadosBasicos.setores.map((setor) => ({
                setor: setor.setor,
                localizacao: setor.localInstalacao,
                observacao: setor.observacao,
            }));

            const viagens = dadosBasicos.viagens.map((viagem) => ({
                nomeContatoNotificacaoSaida: viagem.nomeSaida,
                nomeContatoNotificacaoVolta: viagem.nomeVolta,
                observacao: viagem.observacao,
                dataSaida: viagem.dataSaida,
                dataVolta: viagem.dataVolta,
                procedimento: viagem.procedimentos,
            }));


            // Construa o objeto de dados para a requisição
            const dadosRequisicao = {
                id: idCliente,
                ...dadosBasicos,
                contatos,
                setores,
                viagens,
            };


            console.log('Data antes da requisição:', dadosRequisicao);

            if (idCliente) {
                // Se houver um ID de cliente, envie uma requisição PUT para atualizar o cliente
                const resposta = await axios.post(`http://localhost:8080/api/cliente/`, dadosRequisicao);

                if (resposta.status === 200) {
                    setSuccessMessage('Cliente atualizado com sucesso.');
                    setTimeout(clearMessages, 5000);
                }
            } else {
                // Se não houver um ID de cliente, envie uma requisição POST para criar um novo cliente
                const resposta = await axios.post('http://localhost:8080/api/cliente', dadosRequisicao);

                if (resposta.status === 200) {
                    setIdCliente(resposta.data.id); // Atualize o estado com o ID do cliente
                    setSuccessMessage('Cliente salvo com sucesso.');
                    setTimeout(clearMessages, 5000);
                }
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

    const deleteItem = (type, index) => {
        switch (type) {
            case 'contatos':
                setDadosBasicos({
                    ...dadosBasicos,
                    contatos: dadosBasicos.contatos.filter((_, i) => i !== index),
                });
                break;
            case 'setores':
                setDadosBasicos({
                    ...dadosBasicos,
                    setores: dadosBasicos.setores.filter((_, i) => i !== index),
                });
                break;
            case 'viagens':
                setDadosBasicos({
                    ...dadosBasicos,
                    viagens: dadosBasicos.viagens.filter((_, i) => i !== index),
                });
                break;
            default:
                break;
        }
    };
    return (

        <body className='DivOfAll'>


            <div>


                <div className="container justify-content-center">

                    <h2 className='txtDados ms-3'>1 - Dados Básicos</h2>

                    <Form method="POST" className="text-start justify-content-center p-3">

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
                                    onChange={(e) => setNatureza(e.target.value)}>

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
                                <input {...register("observacao", { required: false })} className="form-control" id="observacao" rows="3" onChange={(e) => setDadosBasicos({ ...dadosBasicos, observacao: e.target.value })} />
                            </div>
                        </div>


                        <hr />

                        <div className="container justify-content-center">
                            <h2 className='txt'>2 - Contatos </h2>
                            {dadosBasicos.contatos.map((contato, index) => (
                                <div className="row" key={index}>
                                    <div className="col mb-2">
                                        <label htmlFor={`nome${index}`} className="form-label"><strong>Nome</strong></label>
                                        <input
                                            name={`nome${index}`}
                                            {...register(`nome${index}`, { required: false })}
                                            type="text"
                                            className="form-control"
                                            id={`nome${index}`}
                                            placeholder=""
                                            value={contato.nome}
                                            onChange={(e) => setDadosBasicos({
                                                ...dadosBasicos,
                                                contatos: dadosBasicos.contatos.map((c, i) => (i === index ? { ...c, nome: e.target.value } : c)),
                                            })}

                                        />

                                    </div>

                                    <div className="col mb-2">
                                        <label htmlFor={`telefone${index}`} className="form-label"><strong>Telefone</strong></label>
                                        <InputMask
                                            mask="(99) 99999-9999"
                                            maskChar=""
                                            name={`telefone${index}`}
                                            required
                                            {...register(`telefone${index}`, { required: false })}
                                            type="text"
                                            className="form-control"
                                            htmlFor={`telefone${index}`}
                                            placeholder=""
                                            value={contato.telefone}
                                            onChange={(e) => setDadosBasicos({
                                                ...dadosBasicos,
                                                contatos: dadosBasicos.contatos.map((c, i) => (i === index ? { ...c, telefone: e.target.value } : c)),
                                            })}
                                        />
                                    </div>

                                    <div className="col mb-2">
                                        <label htmlFor={`senha${index}`} className="form-label"><strong>Senha</strong></label>
                                        <input
                                            {...register(`senha${index}`, { required: false })}
                                            type="password"
                                            className="form-control"
                                            id={`senha${index}`}
                                            placeholder=""
                                            value={contato.senha}
                                            onChange={(e) => setDadosBasicos({
                                                ...dadosBasicos,
                                                contatos: dadosBasicos.contatos.map((c, i) => (i === index ? { ...c, senha: e.target.value } : c)),
                                            })}
                                        />
                                    </div>

                                    <div className="col mb-2">
                                        <label htmlFor={`contraSenha${index}`} className="form-label"><strong>Contra-Senha</strong></label>
                                        <input
                                            {...register(`contraSenha${index}`, { required: false })}
                                            type="password"
                                            className="form-control"
                                            id={`contraSenha${index}`}
                                            placeholder=""
                                            value={contato.contraSenha}
                                            onChange={(e) => setDadosBasicos({
                                                ...dadosBasicos,
                                                contatos: dadosBasicos.contatos.map((c, i) => (i === index ? { ...c, contraSenha: e.target.value } : c)),
                                            })}
                                        />
                                    </div>

                                    <div className="col-1">
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-excluir"
                                            onClick={() => deleteItem('contatos', index)}
                                        >
                                            X
                                        </button>
                                    </div>

                                    <div className="row">

                                        <div className="col mb-2">
                                            <label htmlFor={`dataNascimento${index}`} className="form-label"><strong>Data de Nascimento</strong></label>
                                            <input
                                                {...register(`dataNascimento${index}`, { required: false })}
                                                type="date"
                                                className="form-control"
                                                id={`dataNascimento${index}`}
                                                value={contato.dataNascimento}
                                                onChange={(e) => setDadosBasicos({
                                                    ...dadosBasicos,
                                                    contatos: dadosBasicos.contatos.map((c, i) => (i === index ? { ...c, dataNascimento: e.target.value } : c)),
                                                })}
                                            />
                                        </div>
                                        
                                        <div className="col mb-10">
                                            <label htmlFor={`observacoesctt${index}`} className="form-label"><strong>Observações</strong></label>
                                            <textarea
                                                {...register(`contatos[${index}].observacoes`, { required: false })}
                                                className="form-control"
                                                id={`observacoesctt${index}`}
                                                rows="1"
                                                value={contato.observacoes}
                                                onChange={(e) => setDadosBasicos({
                                                    ...dadosBasicos,
                                                    contatos: dadosBasicos.contatos.map((c, i) => (i === index ? { ...c, observacao: e.target.value } : c)),
                                                })}
                                            ></textarea>
                                        </div>

                                    </div>

                                </div>
                            ))}


                            <hr />

                            <button type="button" className="btn btn-primary" onClick={duplicateContato}>...</button>
                        </div>

                        <div className="container justify-content-center">

                            <h2 className='txt'>3 - Setorização</h2>

                            {dadosBasicos.setores.map((setor, index) => (
                                <div key={index} className="row">
                                    <div className="col-1 mb-1">
                                        <label htmlFor={`setor${index}`} className="form-label"><strong>Setor</strong></label>
                                        <input value={setor.setor} {...register(`setor${index}`, { required: false })} type="number" className="form-control" id={`setor${index}`} placeholder="" onChange={(e) => setDadosBasicos({
                                            ...dadosBasicos,
                                            setores: dadosBasicos.setores.map((c, i) => (i === index ? { ...c, setor: e.target.value } : c)),
                                        })} />
                                    </div>

                                    <div className="col-5 mb-1">
                                        <label htmlFor={`localInstalacao${index}`} className="form-label"><strong>Local da
                                            Instalação</strong></label>
                                        <input value={setor.localInstalacao} {...register(`localInstalacao${index}`, { required: false })} type="text" className="form-control" id={`localInstalacao${index}`}
                                            placeholder="" onChange={(e) => setDadosBasicos({
                                                ...dadosBasicos,
                                                setores: dadosBasicos.setores.map((c, i) => (i === index ? { ...c, localInstalacao: e.target.value } : c)),
                                            })}
                                        />
                                    </div>

                                    <div className=" col-5 mb-1">
                                        <label htmlFor={`observacoes${index}`}
                                            className="form-label"><strong>Observações</strong></label>
                                        <textarea value={setor.observacao} {...register(`observacoes${index}`, { required: false })} className="form-control" id={`observacoes${index}`} onChange={(e) => setDadosBasicos({
                                            ...dadosBasicos,
                                            setores: dadosBasicos.setores.map((c, i) => (i === index ? { ...c, observacao: e.target.value } : c)),
                                        })} rows="1"></textarea>

                                    </div>
                                    <div className=" col mb-1 ">
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-excluir"
                                            onClick={() => deleteItem('setores', index)}
                                        >
                                            X
                                        </button>
                                    </div>

                                </div>
                            ))}

                            <hr />

                            <button type="button" className="btn btn-primary" onClick={duplicateSetor}>...</button>

                        </div>

                        <div className="container justify-content-center">

                            <h2 className='txt'>4 - Viagens </h2>

                            {dadosBasicos.viagens.map((viagem, index) => (
                                <div key={index} className="row">
                                    <div className="col mb-4">
                                        <label htmlFor={`nomeSaida${index}`} className="form-label"><strong>Nome - Notificação Saida</strong></label>
                                        <input value={viagem.nomeSaida} {...register(`nomeSaida${index}`, { required: false })} type="text" className="form-control" id={`nomeSaida${index}`} placeholder=""
                                            onChange={(e) => setDadosBasicos({
                                                ...dadosBasicos,
                                                viagens: dadosBasicos.viagens.map((c, i) => (i === index ? { ...c, nomeSaida: e.target.value } : c)),
                                            })}
                                        />
                                    </div>

                                    <div className="col mb-3">
                                        <label htmlFor={`nomeVolta${index}`} className="form-label"><strong>Nome - Notificação Volta</strong></label>
                                        <input value={viagem.nomeVolta} {...register(`nomeVolta${index}`, { required: false })} type="text" className="form-control" id={`nomeVolta${index}`} placeholder=""
                                            onChange={(e) => setDadosBasicos({
                                                ...dadosBasicos,
                                                viagens: dadosBasicos.viagens.map((c, i) => (i === index ? { ...c, nomeVolta: e.target.value } : c)),
                                            })}
                                        />
                                    </div>


                                    <div className="col mb-2">
                                        <label htmlFor={`dataSaida${index}`} className="form-label"><strong>Data de Saída</strong></label>
                                        <input value={viagem.dataSaida}  {...register(`data-saida${index}`, { required: false })} type="date" className="form-control" id={`dataSaida${index}`} onChange={(e) => setDadosBasicos({
                                            ...dadosBasicos,
                                            viagens: dadosBasicos.viagens.map((c, i) => (i === index ? { ...c, dataSaida: e.target.value } : c)),
                                        })}
                                        />
                                    </div>

                                    <div className="col mb-2">
                                        <label htmlFor={`dataVolta${index}`} className="form-label"><strong>Data de Volta</strong></label>
                                        <input value={viagem.dataVolta} {...register(`data-volta${index}`, { required: false })} type="date" className="form-control" id={`dataVolta${index}`} onChange={(e) => setDadosBasicos({
                                            ...dadosBasicos,
                                            viagens: dadosBasicos.viagens.map((c, i) => (i === index ? { ...c, dataVolta: e.target.value } : c)),
                                        })}
                                        />
                                    </div>

                                    <div className="col-1 btn-excluir">
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-excluir"
                                            onClick={() => deleteItem('viagens', index)}>
                                            X
                                        </button>
                                    </div>

                                    <div className="row">

                                        <div className=" col mb-11">
                                            <label htmlFor={`observacao${index}`} className="form-label"><strong>Observações</strong></label>
                                            <textarea value={viagem.observacao} {...register(`observacao${index}`, { required: false })} className="form-control" id={`observacao${index}`} rows="5" onChange={(e) => setDadosBasicos({
                                                ...dadosBasicos,
                                                viagens: dadosBasicos.viagens.map((c, i) => (i === index ? { ...c, observacao: e.target.value } : c)),
                                            })}></textarea>

                                        </div>

                                    </div>

                                    <div className="row">

                                        <div className="col mb-11">
                                            <label htmlFor={`procedimentos${index}`} className="form-label"><strong>Procedimentos</strong></label>
                                            <textarea value={viagem.procedimentos} {...register(`procedimentos${index}`, { required: false })} className="form-control" id={`procedimentos${index}`} rows="5" onChange={(e) => setDadosBasicos({
                                                ...dadosBasicos,
                                                viagens: dadosBasicos.viagens.map((c, i) => (i === index ? { ...c, procedimentos: e.target.value } : c)),
                                            })}></textarea>
                                        </div>

                                    </div>

                                </div>

                            ))}

                            <hr />

                            <button type="button" className="btn btn-primary" onClick={duplicateViagem}>...</button>


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
