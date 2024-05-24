import '../css/cadastros.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Button, Form } from 'reactstrap';
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';
import ErrorCard from '../fragments/ErrorCard';
import { useParams } from 'react-router-dom';


function Formulario() {



    const { register, handleSubmit, formState: { errors }, setError, setValue } = useForm({});
    const [natureza, setNatureza] = useState("FISICA");
    const [idCliente, setIdCliente] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const { id: idNaURL } = useParams();
    const { id } = useParams();

    const carregarDadosCliente = async () => {

        try {
            if (id) {
                const response = await axios.get(`http://127.0.0.1:8080/api/cliente/${id}`);
                const clienteParaEdicao = response.data;

                Object.entries(clienteParaEdicao).forEach(([campo, valor]) => {
                    setValue(campo, valor);
                });

                setDadosBasicos({
                    unidade: clienteParaEdicao.unidade,
                    codHabil: clienteParaEdicao.codHabil,
                    codCondor: clienteParaEdicao.codCondor,
                    natureza: clienteParaEdicao.natureza,
                    documento: clienteParaEdicao.documento,
                    inscMunicipal: clienteParaEdicao.inscMunicipal,
                    nome: clienteParaEdicao.nome,
                    nomeFantasia: clienteParaEdicao.nomeFantasia,
                    endereco: clienteParaEdicao.endereco,
                    bairro: clienteParaEdicao.bairro,
                    cidade: clienteParaEdicao.cidade,
                    uf: clienteParaEdicao.uf,
                    cep: clienteParaEdicao.cep,
                    observacao: clienteParaEdicao.observacao,
                    codificador: clienteParaEdicao.codificador,
                    contatos: clienteParaEdicao.contatos,
                    setores: clienteParaEdicao.setores,
                    viagens: clienteParaEdicao.viagens,
                });
            } else {
                setDadosBasicos({
                    unidade: 'Montenegro',
                    codHabil: '',
                    codCondor: '',
                    natureza: 'FISICA',
                    documento: '',
                    inscMunicipal: '',
                    nome: '',
                    nomeFantasia: '',
                    endereco: '',
                    bairro: '',
                    cidade: '',
                    uf: 'AC',
                    cep: '',
                    observacao: '',
                    codificador: '',
                    contatos: [{ nome: '', telefone: '', senha: '', contraSenha: '', dataNascimento: '', observacao: '' }],
                    setores: [{ setor: '', localizacao: '', observacao: '' }],
                    viagens: [{ nomeContatoNotificacaoSaida: '', nomeContatoNotificacaoVolta: '', observacao: '', dataSaida: '', dataVolta: '', procedimentos: '' }],
                });
            }
        } catch (error) {
            setErrorMessage('Erro ao carregar dados do cliente. Por favor, tente novamente mais tarde.');
            console.error('Erro ao carregar dados do cliente:', error);
        }
    };

    useEffect(() => {
        try {
            carregarDadosCliente(id);
        } catch (error) {
            setErrorMessage('Erro ao carregar dados do cliente durante o efeito. Por favor, tente novamente.');
            console.error('Erro ao carregar dados do cliente durante o efeito:', error);
        }
    }, [id]);

    const clearMessages = () => {
        setErrorMessage('');
        setSuccessMessage('');
    };


    const [dadosBasicos, setDadosBasicos] = useState({
        unidade: 'Montenegro',
        codHabil: '',
        codCondor: '',
        natureza: '',
        documento: 'FISICA',
        inscMunicipal: '',
        nome: '',
        nomeFantasia: '',
        endereco: '',
        bairro: '',
        cidade: '',
        uf: 'AC',
        cep: '',
        observacao: '',
        codificador: '',
        contatos: [{ nome: '', telefone: '', senha: '', contraSenha: '', dataNascimento: '', observacao: '' }],
        setores: [{ setor: '', localizacao: '', observacao: '' }],
        viagens: [{ nomeContatoNotificacaoSaida: '', nomeContatoNotificacaoVolta: '', observacao: '', dataSaida: '', dataVolta: '', procedimentos: '' }],
    });

    const duplicateContato = () => {
        try {
            setDadosBasicos({
                ...dadosBasicos,
                contatos: [...dadosBasicos.contatos, { nome: '', telefone: '', senha: '', contraSenha: '', dataNascimento: '', observacao: '' }],
            });
        } catch (error) {
            setErrorMessage('Erro ao duplicar contato. Por favor, tente novamente.');
            console.error('Erro ao duplicar contato:', error);
        }
    };

    const duplicateSetor = () => {
        try {
            setDadosBasicos({
                ...dadosBasicos,
                setores: [...dadosBasicos.setores, { setor: '', localizacao: '', observacao: '' }],
            });
        } catch (error) {
            setErrorMessage('Erro ao duplicar setor. Por favor, tente novamente.');
            console.error('Erro ao duplicar setor:', error);
        }
    };

    const duplicateViagem = () => {
        try {
            setDadosBasicos({
                ...dadosBasicos,
                viagens: [...dadosBasicos.viagens, { nomeContatoNotificacaoSaida: '', nomeContatoNotificacaoVolta: '', observacao: '', dataSaida: '', dataVolta: '', procedimentos: '' }],
            });
        } catch (error) {
            setErrorMessage('Erro ao duplicar viagem. Por favor, tente novamente.');
            console.error('Erro ao duplicar viagem:', error);
        }
    };



    const onSubmit = async (data) => {
        const camposObrigatorios = ['unidade', 'natureza', 'documento', 'nome'];
        camposObrigatorios.forEach((campo) => {
            if (!data[campo]) {
                setError(campo, {
                    type: 'manual',
                    message: 'Este campo é obrigatório',
                });
            }
        });
        try {
            let contatos = [];
            if (dadosBasicos.contatos && Array.isArray(dadosBasicos.contatos)) {
                contatos = dadosBasicos.contatos.map((contato) => ({
                    nome: contato.nome,
                    telefone: contato.telefone,
                    senha: contato.senha,
                    contraSenha: contato.contraSenha,
                    dataNascimento: contato.dataNascimento,
                    observacao: contato.observacao,
                }))
            }

            let setores = [];
            if (dadosBasicos.setores && Array.isArray(dadosBasicos.setores)) {
                setores = dadosBasicos.setores.map((setor) => ({
                    setor: setor.setor,
                    localizacao: setor.localizacao,
                    observacao: setor.observacao,
                }))
            }

            let viagens = [];
            if (dadosBasicos.viagens && Array.isArray(dadosBasicos.viagens)) {
                viagens = dadosBasicos.viagens.map((viagem) => ({
                    nomeContatoNotificacaoSaida: viagem.nomeContatoNotificacaoSaida,
                    nomeContatoNotificacaoVolta: viagem.nomeContatoNotificacaoVolta,
                    observacao: viagem.observacao,
                    dataSaida: viagem.dataSaida,
                    dataVolta: viagem.dataVolta,
                    procedimento: viagem.procedimentos,
                }))
            }

            const dadosRequisicao = {
                id: idCliente,
                ...dadosBasicos,
                contatos,
                setores,
                viagens,
            };

            console.log('Data antes da requisição:', dadosRequisicao);

            let resposta;

            if (idCliente) {
                resposta = await axios.put(`http://localhost:8080/api/cliente/${idCliente}`, dadosRequisicao);
            } else if (idNaURL) {
                resposta = await axios.put(`http://localhost:8080/api/cliente/${idNaURL}`, dadosRequisicao);
            } else {
                resposta = await axios.post('http://localhost:8080/api/cliente', dadosRequisicao);
            }

            if (resposta.status === 200) {
                const novoIdCliente = resposta.data.id;

                if (idCliente || idNaURL) {
                    setSuccessMessage('Cliente atualizado com sucesso.');
                } else {
                    setIdCliente(novoIdCliente);
                    setSuccessMessage('Cliente salvo com sucesso.');
                }
                carregarDadosCliente(idCliente);
                setTimeout(clearMessages, 5000);
            }
        } catch (error) {
            setErrorMessage('Erro ao submeter o formulário. Por favor, verifique os dados e tente novamente.');
            console.error('Erro ao submeter o formulário:', error);


            if (error.response) {
                if (error.response.status === 500) {
                    const serverErrorMessage = error.response.data?.message;

                    if (serverErrorMessage.includes('CODIFICADOR_EM_USO')) {
                        setErrorMessage('Erro: O codificador já está em uso.');
                    } else {
                        setErrorMessage(`Erro: O codificador já está em uso.`);
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
        try {
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
        } catch (error) {
            setErrorMessage('Erro ao deletar item. Por favor, tente novamente.');
            console.error('Erro ao deletar item:', error);
        }
    };

    const handleChangeNatureza = (e) => {
        try {
            const selectedNatureza = e.target.value;
            setNatureza(selectedNatureza);
        } catch (error) {
            setErrorMessage('Erro ao lidar com a mudança de natureza. Por favor, tente novamente.');
            console.error('Erro ao lidar com a mudança de natureza:', error);
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
                                <select value={dadosBasicos.unidade || ""} name='unidade'  {...register("unidade", { required: false })} id="unidade" className={`form-select ${errors.unidade ? 'is-invalid' : ''}`} aria-label=".form-select example" onChange={(e) => setDadosBasicos({ ...dadosBasicos, unidade: e.target.value })}>
                                    <option defaultValue={"Montenegro"} value="Montenegro">Montenegro</option>
                                    <option value="Porto Alegre">Porto Alegre</option>
                                    <div className="invalid-feedback">{errors.unidade?.message}</div>

                                </select>
                            </div>

                            <div className="col">
                                <label htmlFor="codHabil" className="form-label"><strong>Hábil</strong></label>
                                <input name='codHabil' {...register("codHabil", { required: false })} type="text" className="form-control" id="codHabil" placeholder=""
                                    onChange={(e) => setDadosBasicos({ ...dadosBasicos, codHabil: e.target.value })} value={dadosBasicos.codHabil || ""}
                                />
                            </div>
                            <div className="col h-25">
                                <label htmlFor="codCondor" className="form-label"><strong>Condor</strong></label>
                                <input name='codCondor' {...register("codCondor", { required: false })} type="text" className="form-control" id="codCondor" placeholder=""
                                    onChange={(e) => setDadosBasicos({ ...dadosBasicos, codCondor: e.target.value })} value={dadosBasicos.codCondor || ""}
                                />
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col">
                                <label htmlFor="natureza" className="form-label">
                                    <strong>* Natureza</strong>
                                </label>
                                <select
                                    value={natureza}
                                    name="natureza"
                                    {...register("natureza", { required: true })}
                                    id="natureza"
                                    className="form-select"
                                    aria-label=".form-select example"
                                    onChange={handleChangeNatureza}
                                >

                                    <option value="FISICA">
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
                                    value={dadosBasicos.documento || ""}
                                />
                                {errors['documento'] && <ErrorCard message="O campo CPF/CNPJ deve ser preenchido." />}
                            </div>
                            <div className="col">
                                <label htmlFor="inscMunicipal" className="form-label"><strong>Inscrição Municipal</strong></label>
                                <input name='inscMunicipal' {...register("inscMunicipal", { required: false })} type="text" className="form-control" id="inscMunicipal" placeholder=""
                                    onChange={(e) => setDadosBasicos({ ...dadosBasicos, inscMunicipal: e.target.value })} value={dadosBasicos.inscMunicipal || ""}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col mb-2">
                                <label htmlFor="nome" className="form-label"><strong>* Nome/Razão Social</strong></label>
                                <input
                                    value={dadosBasicos.nome || ""}
                                    name='nome'
                                    {...register("nome", { required: true })}
                                    type="text"
                                    className={`form-control ${errors['nome'] ? 'is-invalid' : ''}`}
                                    id="nome"
                                    placeholder=""
                                    onChange={(e) => setDadosBasicos({ ...dadosBasicos, nome: e.target.value })}
                                />
                                {errors['nome'] && <ErrorCard className="cardErro" message="O campo Nome/Razão Social deve ser preenchido." />}
                            </div>
                            <div className="col">
                                <label htmlFor="nomeFantasia" className="form-label"><strong>Nome Fantasia</strong></label>
                                <input name='nomeFantasia' {...register("nomeFantasia", { required: false })} type="text" className="form-control" id="nomeFantasia" placeholder=""
                                    onChange={(e) => setDadosBasicos({ ...dadosBasicos, nomeFantasia: e.target.value })} value={dadosBasicos.nomeFantasia || ""}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col mb-2">
                                <label htmlFor="endereco" className="form-label"><strong>Endereço</strong></label>
                                <input name='endereco' {...register("endereco", { required: false })} type="text" className="form-control" id="endereco" placeholder=""
                                    onChange={(e) => setDadosBasicos({ ...dadosBasicos, endereco: e.target.value })} value={dadosBasicos.endereco || ""}
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="bairro" className="form-label"><strong>Bairro</strong></label>
                                <input name='bairro' {...register("bairro", { required: false })} type="text" className="form-control" id="bairro" placeholder=""
                                    onChange={(e) => setDadosBasicos({ ...dadosBasicos, bairro: e.target.value })} value={dadosBasicos.bairro || ""}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="cidade" className="form-label"><strong>Cidade</strong></label>
                                <input name='cidade' {...register("cidade", { required: false })} type="text" className="form-control" id="cidade" placeholder=""
                                    onChange={(e) => setDadosBasicos({ ...dadosBasicos, cidade: e.target.value })} value={dadosBasicos.cidade || ""}
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="uf" className="form-label"><strong>Uf</strong></label>
                                <select value={dadosBasicos.uf || ""} name='uf' {...register("uf", { required: false })} id="uf" className="form-select" aria-label=".form-select example" onChange={(e) => setDadosBasicos({ ...dadosBasicos, uf: e.target.value })}>
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
                                    value={dadosBasicos.cep || ""}
                                    onChange={(e) => setDadosBasicos({ ...dadosBasicos, cep: e.target.value })}
                                />
                            </div>

                        </div>
                        <div className="row mt-2">
                            <div className="col-lg ">
                                <label htmlFor="observacao" className="form-label"><strong>Observações</strong></label>
                                <input {...register("observacao", { required: false })} className="form-control" id="observacao" rows="3" onChange={(e) => setDadosBasicos({ ...dadosBasicos, observacao: e.target.value })} value={dadosBasicos.observacao || ""} />
                            </div>

                        </div>




                        <hr />
                        <div className="container justify-content-center">
                            <h2 className='txt'>2 - Contatos </h2>
                            {dadosBasicos.contatos && dadosBasicos.contatos.map((contato, index) => (
                                <div key={index} className='contatosDivMain'>
                                    <div className="row">
                                        <div className="col-5 mb-2">
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
                                            <label htmlFor={`senha${index}`} className="form-label"><strong>Senha</strong></label>
                                            <input
                                                {...register(`senha${index}`, { required: false })}
                                                type="text"
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
                                                type="text"
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
                                            {dadosBasicos.contatos.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-excluir"
                                                    onClick={() => deleteItem('contatos', index)}
                                                >
                                                    X
                                                </button>
                                            )}
                                        </div>
                                        <div className='row'>
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

                                        </div>
                                        <div className='row'>
                                            <div className="col mb-2">
                                                <label htmlFor={`observacoesctt${index}`} className="form-label"><strong>Observações</strong></label>
                                                <textarea
                                                    {...register(`contatos[${index}].observacoes`, { required: false })}
                                                    className="form-control"
                                                    id={`observacoesctt${index}`}
                                                    rows="2"
                                                    value={contato.observacoes}
                                                    onChange={(e) => setDadosBasicos({
                                                        ...dadosBasicos,
                                                        contatos: dadosBasicos.contatos.map((c, i) => (i === index ? { ...c, observacao: e.target.value } : c)),
                                                    })}
                                                ></textarea>
                                            </div>

                                        </div>
                                    </div>
                                    <hr></hr>

                                </div>

                            ))}
                            <button type="button" className="btn btn-primary" onClick={duplicateContato}><i className="bi bi-plus-lg"></i></button>
                        </div>


                        <div className="container justify-content-center">
                            <hr></hr>

                            <h2 className='txt'>3 - Setorização</h2>


                            {dadosBasicos.setores && dadosBasicos.setores.map((setor, index) => (
                                <div key={index} className="divMainSetores">


                                    <div className="row">
                                        <div className="col-5 mb-1">
                                            <label htmlFor={`setor${index}`} className="form-label"><strong>Setor</strong></label>
                                            <input value={setor.setor} {...register(`setor${index}`, { required: false })} type="string" className="form-control" id={`setor${index}`} placeholder="" onChange={(e) => setDadosBasicos({
                                                ...dadosBasicos,
                                                setores: dadosBasicos.setores.map((c, i) => (i === index ? { ...c, setor: e.target.value } : c)),
                                            })} />
                                        </div>

                                        <div className="col-6 mb-1">
                                            <label htmlFor={`localInstalacao${index}`} className="form-label"><strong>Local da
                                                Instalação</strong></label>
                                            <input value={setor.localizacao} {...register(`localizacao${index}`, { required: false })} type="text" className="form-control" id={`localizacao${index}`}
                                                placeholder="" onChange={(e) => setDadosBasicos({
                                                    ...dadosBasicos,
                                                    setores: dadosBasicos.setores.map((c, i) => (i === index ? { ...c, localizacao: e.target.value } : c)),
                                                })}
                                            />
                                        </div>
                                        <div className=" col mb-1 ">
                                            {dadosBasicos.setores.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="btn btn-danger btn-excluir"
                                                    onClick={() => deleteItem('setores', index)}
                                                >
                                                    X
                                                </button>
                                            )}
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className=" col mb-1">
                                            <label htmlFor={`observacoes${index}`}
                                                className="form-label"><strong>Observações</strong></label>
                                            <textarea value={setor.observacao} {...register(`observacoes${index}`, { required: false })} className="form-control" id={`observacoes${index}`} onChange={(e) => setDadosBasicos({
                                                ...dadosBasicos,
                                                setores: dadosBasicos.setores.map((c, i) => (i === index ? { ...c, observacao: e.target.value } : c)),
                                            })} rows="1"></textarea>

                                        </div>
                                    </div>
                                    <hr></hr>

                                </div>
                            ))}
                            <button type="button" className="btn btn-primary" onClick={duplicateSetor}><i className="bi bi-plus-lg"></i></button>

                        </div>


                        <div className="container justify-content-center">
                            <hr></hr>

                            <h2 className='txt'>4 - Viagens </h2>

                            {dadosBasicos.setores && dadosBasicos.viagens.map((viagem, index) => (
                                <div key={index} className="row">

                                    <div className="col mb-2">
                                        <label htmlFor={`nomeContatoNotificacaoSaida${index}`} className="form-label"><strong>Nome - Notificação Saida</strong></label>
                                        <input value={viagem.nomeContatoNotificacaoSaida} {...register(`nomeContatoNotificacaoSaida${index}`, { required: false })} type="text" className="form-control" id={`nomeContatoNotificacaoSaida${index}`} placeholder=""
                                            onChange={(e) => setDadosBasicos({
                                                ...dadosBasicos,
                                                viagens: dadosBasicos.viagens.map((c, i) => (i === index ? { ...c, nomeContatoNotificacaoSaida: e.target.value } : c)),
                                            })}
                                        />
                                    </div>

                                    <div className="col mb-2">
                                        <label htmlFor={`nomeContatoNotificacaoVolta${index}`} className="form-label"><strong>Nome - Notificação Volta</strong></label>
                                        <input value={viagem.nomeContatoNotificacaoVolta} {...register(`nomeContatoNotificacaoVolta${index}`, { required: false })} type="text" className="form-control" id={`nomeContatoNotificacaoVolta${index}`} placeholder=""
                                            onChange={(e) => setDadosBasicos({
                                                ...dadosBasicos,
                                                viagens: dadosBasicos.viagens.map((c, i) => (i === index ? { ...c, nomeContatoNotificacaoVolta: e.target.value } : c)),
                                            })}
                                        />
                                    </div>



                                    <div className="col-2 mb-2">
                                        <label htmlFor={`dataSaida${index}`} className="form-label"><strong>Data de Saída</strong></label>
                                        <input value={viagem.dataSaida}  {...register(`data-saida${index}`, { required: false })} type="date" className="form-control" id={`dataSaida${index}`} onChange={(e) => setDadosBasicos({
                                            ...dadosBasicos,
                                            viagens: dadosBasicos.viagens.map((c, i) => (i === index ? { ...c, dataSaida: e.target.value } : c)),
                                        })}
                                        />
                                    </div>

                                    <div className="col-2 mb-2">
                                        <label htmlFor={`dataVolta${index}`} className="form-label"><strong>Data de Volta</strong></label>
                                        <input value={viagem.dataVolta} {...register(`data-volta${index}`, { required: false })} type="date" className="form-control" id={`dataVolta${index}`} onChange={(e) => setDadosBasicos({
                                            ...dadosBasicos,
                                            viagens: dadosBasicos.viagens.map((c, i) => (i === index ? { ...c, dataVolta: e.target.value } : c)),
                                        })}
                                        />
                                    </div>
                                    <div className=" col-1 btn-excluir">
                                        {dadosBasicos.viagens.length > 1 && (
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-excluir"
                                                onClick={() => deleteItem('viagens', index)}
                                            >
                                                X
                                            </button>
                                        )}
                                    </div>

                                    <div className="row">
                                        <div className=" col mb-3">
                                            <label htmlFor={`observacao${index}`} className="form-label"><strong>Observações</strong></label>
                                            <textarea value={viagem.observacao} {...register(`observacao${index}`, { required: false })} className="form-control" id={`observacao${index}`} rows="3" onChange={(e) => setDadosBasicos({
                                                ...dadosBasicos,
                                                viagens: dadosBasicos.viagens.map((c, i) => (i === index ? { ...c, observacao: e.target.value } : c)),
                                            })}></textarea>

                                        </div>
                                    </div>

                                    <div className="col mb-3">
                                        <label htmlFor={`procedimentos${index}`} className="form-label"><strong>Procedimentos</strong></label>
                                        <textarea value={viagem.procedimentos} {...register(`procedimentos${index}`, { required: false })} className="form-control" id={`procedimentos${index}`} rows="3" onChange={(e) => setDadosBasicos({
                                            ...dadosBasicos,
                                            viagens: dadosBasicos.viagens.map((c, i) => (i === index ? { ...c, procedimentos: e.target.value } : c)),
                                        })}></textarea>
                                    </div>
                                    <hr />

                                </div>

                            ))}

                            <button type="button" className="btn btn-primary" onClick={duplicateViagem}><i className="bi bi-plus-lg"></i></button>


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


            </div >

        </body >

    )


}

export default Formulario;