import '../css/cadastros.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Button, Form } from 'reactstrap';
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Duplicadores from '../fragments/Cadastro/Duplicadores';
import DadosBasicos from '../fragments/Cadastro/dadosBasicos';
import Contatos from '../fragments/Cadastro/contatos';
import Setores from '../fragments/Cadastro/setores';
import Viagem from '../fragments/Cadastro/viagem';

function Formulario() {
    const { register, handleSubmit, formState: { errors }, setError, setValue } = useForm({});
    const [natureza, setNatureza] = useState("FISICA");
    const [idCliente, setIdCliente] = useState();
    const { id: idNaURL } = useParams();
    const navigate = useNavigate();

    const [dadosBasicos, setDadosBasicos] = useState({
        unidade: 'Montenegro',
        codHabil: '',
        codCondor: '',
        codificador: '',
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
        contatos: [{ nome: '', telefone: '', senha: '', contraSenha: '', dataNascimento: '', observacao: '' }],
        setores: [{ setor: '', localizacao: '', observacao: '' }],
        viagens: [{ nomeContatoNotificacaoSaida: '', nomeContatoNotificacaoVolta: '', observacao: '', dataSaida: '', dataVolta: '', procedimentos: '' }],
    });

    const carregarDadosCliente = useCallback(async () => {
        try {
            if (idNaURL) {
                const response = await axios.get(`http://127.0.0.1:8080/api/cliente/${idNaURL}`);
                const clienteParaEdicao = response.data;

                Object.entries(clienteParaEdicao).forEach(([campo, valor]) => {
                    setValue(campo, valor);
                });

                setDadosBasicos({
                    id: clienteParaEdicao.id,
                    unidade: clienteParaEdicao.unidade,
                    codHabil: clienteParaEdicao.codHabil,
                    codCondor: clienteParaEdicao.codCondor,
                    codificador: clienteParaEdicao.codificador,
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
                    contatos: clienteParaEdicao.contatos,
                    setores: clienteParaEdicao.setores,
                    viagens: clienteParaEdicao.viagens,
                });
            }
        } catch (error) {
            console.error('Erro ao carregar dados do cliente:', error);
        }
    }, [idNaURL, setValue]);

    useEffect(() => {
        carregarDadosCliente();
    }, [carregarDadosCliente]);


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
                }));
            }

            let setores = [];
            if (dadosBasicos.setores && Array.isArray(dadosBasicos.setores)) {
                setores = dadosBasicos.setores.map((setor) => ({
                    setor: setor.setor,
                    localizacao: setor.localizacao,
                    observacao: setor.observacao,
                }));
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
                }));
            }

            const dadosRequisicao = {
                id: idCliente,
                ...dadosBasicos,
                contatos,
                setores,
                viagens,
            };

            console.log('Data antes da requisição:', dadosRequisicao);

            const resposta = await axios.post(`http://127.0.0.1:8080/api/cliente`, dadosRequisicao);

            if (resposta.status === 200) {
                const novoIdCliente = resposta.data.id;
                if (idCliente || idNaURL) {
                    console.log('Cliente atualizado com sucesso.');
                } else {
                    setIdCliente(novoIdCliente);
                }
                carregarDadosCliente(idCliente);

                const result = await Swal.fire({
                    title: 'Cliente cadastrado com sucesso!',
                    text: 'Quer cadastrar outro cliente?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Sim',
                    cancelButtonText: 'Não',
                });

                if (result.isConfirmed) {
                    window.location.reload();
                    window.scrollTo(0, 0);
                    setDadosBasicos(dadosBasicos);
                } else {
                    console.log("Dados do cliente mantidos nos campos.")
                }
            }
        } catch (error) {
            console.error('Erro ao submeter o formulário:', error);
            await Swal.fire({
                title: 'Erro ao submeter o formulário',
                text: 'Ocorreu um erro ao tentar cadastrar o cliente. Por favor, tente novamente.',
                icon: 'error',
                confirmButtonText: 'Ok',
            });
        }
    };

    const handleNovoCliente = () => {
        setDadosBasicos(dadosBasicos); // Certifique-se de que `setDadosBasicos` está definido corretamente
        navigate('/cadastroCliente', { replace: true });
        window.scrollTo(0, 0);
        window.location.reload();
    };

    const { duplicateContato, duplicateSetor, duplicateViagem } = Duplicadores(dadosBasicos, setDadosBasicos);

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
            console.error('Erro ao deletar item:', error);
        }
    };

    const handleChangeNatureza = (e) => {
        try {
            const selectedNatureza = e.target.value;
            setNatureza(selectedNatureza);
        } catch (error) {
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
                        <DadosBasicos errors={errors} handleChangeNatureza={handleChangeNatureza} natureza={natureza} dadosBasicos={dadosBasicos} register={register} setDadosBasicos={setDadosBasicos} />

                        <hr />

                        <div className="container justify-content-center">
                            <h2 className='txt'>2 - Contatos <button type="button" className="btn btn-primary" onClick={duplicateContato}><i className="bi bi-plus-lg"></i></button></h2>
                            {dadosBasicos.contatos && dadosBasicos.contatos.map((contato, index) => (
                                <Contatos key={index} index={index} register={register} contato={contato} deleteItem={deleteItem} dadosBasicos={dadosBasicos} setDadosBasicos={setDadosBasicos} />

                            ))}
                        </div>

                        <div className="container justify-content-center">
                            <h2 className='txt'>3 - Setorização <button type="button" className="btn btn-primary" onClick={duplicateSetor}><i className="bi bi-plus-lg"></i></button></h2>
                            {dadosBasicos.setores && dadosBasicos.setores.map((setor, index) => (
                                <Setores key={index} index={index} register={register} setor={setor} deleteItem={deleteItem} dadosBasicos={dadosBasicos} setDadosBasicos={setDadosBasicos} />

                            ))}

                        </div>


                        <div className="container justify-content-center">

                            <h2 className='txt'>4 - Viagens<button type="button" className="btn btn-primary" onClick={duplicateViagem}><i className="bi bi-plus-lg"></i></button>
                            </h2>

                            {dadosBasicos.setores && dadosBasicos.viagens.map((viagem, index) => (
                                <Viagem key={index} index={index} register={register} viagem={viagem} deleteItem={deleteItem} dadosBasicos={dadosBasicos} setDadosBasicos={setDadosBasicos} />

                            ))}
                        </div>
                    </Form>


                </div>
                <div className="col">
                    <div className="col text-center mt-3 mb-3">
                        <Button id="btnCadastro" onClick={() => handleSubmit(onSubmit)()} type="submit" className="btn btn-primary">Salvar</Button>
                        <Link id="bntNovoCliente" to="/cadastroCliente" onClick={handleNovoCliente} type="button" className="btn ms-3 btn-success"><i className="bi bi-person-fill-add" /> Adicionar Novo Cliente</Link>
                        <Link className="ms-3 t-center btn btn-danger"
                            to="/consultaCliente">
                            Cancelar
                        </Link>                    </div>
                </div>
            </div >
        </body >

    )


}
export default Formulario;