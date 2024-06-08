import '../css/ocorrencias.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

function ModalOcorrencia({ dataOcorrencia, onSubmit, selectedValue, handleSelectChange }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [modalOpen, setModalOpen] = useState(false);


    const handleCategoryChange2 = (e) => {
        setSelectedCategory(e.target.value);
    };
    
    const handleBlur = () => {
        setModalOpen(true);
    };

    const subCategoryOptions = {
        '1': [
            { value: 'setor Em Curto', label: 'SETOR EM CURTO' },
            { value: 'Sinal Teste Revisao', label: 'SINAL TESTE REVISAO' },
            { value: 'Sinal Teste Cliente', label: 'SINAL TESTE CLIENTE' },
            { value: 'conserto Sistema', label: 'CONSERTO SISTEMA' },
            { value: 'troca Codificador', label: 'TROCA CODIFICADOR' },
            { value: 'linha Telefonica Cortada', label: 'LINHA TELEFONICA CORTADA' },
            { value: 'sinal Teste Instalacao', label: 'SINAL TESTE INSTALACAO' },
            { value: 'bateria Fraca', label: 'BATERIA FRACA' },
            { value: 'teste Ctf Base Cliente', label: 'TESTE CTF BASE-CLIENTE' },
            { value: 'sensorIr', label: 'SENSOR IR/CONT.PRESO' },
            { value: 'sistema Com Problema-Colocacao RetiradaKit', label: 'SIST.C/PROBLEMA COLOCAÇÃO/RETIRADA KIT' },
            { value: 'canal Rf Aberto', label: 'CANAL RF ABERTO' },
            { value: 'mau Contato', label: 'MAU-CONTATO' },
            { value: 'az Senha', label: 'AZ SENHA AGENTE/TÉCNICO' },
        ],
        '2': [
            { value: 'sem Energia', label: 'SEM ENERGIA/REDE' },
            { value: 'ag No Local', label: 'AG NO LOCAL' },
            { value: 'presenca Animais', label: 'PRESENÇA DE ANIMAIS E/OU INSETOS' },
            { value: 'alarme Acidental', label: 'SINAL DE ALARME ACIDENTAL' },
            { value: 'procedimento Partida', label: 'PROCEDIMENTO PARTIDA' },
            { value: '3 SOS', label: 'SUBTIPOOCORRENCIA 3 SOS' },
            { value: 'suspeito Local', label: 'SINAL POR SUSPEITO NO LOCAL' },
            { value: 'arrombamento', label: 'SINAL ALARME ARROMBAMENTO' },
            { value: 'janela/porta Mal Fechada', label: 'JANELA/PORTA MAL FECHADA' },
            { value: 'alarme indesejado', label: 'SINAL DE ALARME INDESEJADO' },
        ],
        '3': [
            { value: 'situacao bloqueio', label: 'SITUAÇÃO DE BLOQUEIO' },
            { value: 'ativacao remota', label: 'ATIVAÇÃO REMOTA MTA' },
            { value: 'abertura/fechamento', label: 'ACOMPANHAMENTO ABERTURA/FECHAMENTO' },
            { value: 'verificacao externa', label: 'VERIFICAÇÃO EXTERNA' },
            { value: 'presenca no local (solicitada)', label: 'PRESENÇA NO LOCAL(SOLICITADO PELO CLIENTE)' },
            { value: 'deslacre de chave', label: 'DESLACRE DE CHAVE' },
            { value: 'malote', label: 'MALOTE' },
            { value: 'desativacao remota', label: 'DESATIVAÇÃO REMOTA MTA' },
            { value: 'ponto base', label: 'PONTO BASE' },
        ],
        '5': [
            { value: 'nada', label: 'nada' }
        ]
    };

    const filteredSubCategories = subCategoryOptions[selectedCategory] || [];

    return (
        <div className={`modal fade ${modalOpen ? 'show' : ''}`} id={`modal-${dataOcorrencia.id}`} tabIndex="-1" aria-labelledby={`modalLabel-${dataOcorrencia.id}`} aria-hidden={!modalOpen} style={{ display: modalOpen ? 'block' : 'none' }} data-bs-backdrop="false">
            <div className="modal-dialog modal-fullscreen">
                <div className="modal-content">
                    <div className="modal-header text-center justify-content-center" data-keyboard="false">
                        <nav className="navbar navbar-dark bg-primary fixed-top mb-5 navbar text-center justify-content-center" id="navbar">
                            <div className="txtDescricao">
                                <h2 className="mt-1">
                                    {dataOcorrencia && dataOcorrencia.evento ? dataOcorrencia.evento.destatus : "nao disponivel"}
                                </h2>
                            </div>
                        </nav>
                    </div>
                    <header className="headerModalInfo mt-3">
                        <div className="divInfosModal row">
                            <div className="col-8 mb-2ms-4">
                                <div className="mt-4 ms-3">
                                    <strong>Cliente: </strong>
                                    {dataOcorrencia && dataOcorrencia.evento ? dataOcorrencia.evento.nmcliente : "nao disponivel"}
                                </div>
                                <div className='ms-3'>
                                    <strong>Endereço: </strong>
                                    {dataOcorrencia && dataOcorrencia.evento ? dataOcorrencia.evento.endereco : "nao disponivel"}
                                    &nbsp; &nbsp;
                                    <strong>Bairro:</strong>
                                    &nbsp; &nbsp;
                                    <strong>Cidade: </strong>
                                    {dataOcorrencia && dataOcorrencia.evento ? dataOcorrencia.evento.cidade : "nao disponivel"}
                                </div>
                                <div className='ms-3'>
                                    <strong>Ponto de Referência: </strong>
                                    {dataOcorrencia.referenciaOcorrencia}
                                </div>
                            </div>
                            <div className="col text-end me-4">
                                <div className="mt-4">
                                    <strong>Data: </strong>
                                    {dataOcorrencia && dataOcorrencia.evento
                                        ? new Date(dataOcorrencia.evento.dataevento).toLocaleDateString('pt-BR')
                                        : 'Não disponível'}
                                </div>
                                <div>
                                    <strong>Hora: </strong>
                                    {dataOcorrencia && dataOcorrencia.evento
                                        ? new Date(dataOcorrencia.evento.dataevento).toLocaleTimeString('pt-BR')
                                        : 'Não disponível'}
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="modal-body p-0">
                        <div className="div1">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row ms-1 me-2 mt-2">
                                    <div className="col">
                                        <label htmlFor="categoria" className="form-label">Categoria</label>
                                        <select
                                            {...register("categoria", { required: true })}
                                            id={`categoria${dataOcorrencia.id}`}
                                            className="form-select"
                                            onChange={handleCategoryChange2}
                                        >
                                            <option value="">Selecione uma Categoria</option>
                                            <option value="1">ACIONAMENTO TÉCNICO</option>
                                            <option value="2">ACIONAMENTO OPERACIONAL</option>
                                            <option value="3">ACIONAMENTO SERVIÇO</option>
                                            <option value="5">SUPORTE</option>
                                            <option value="7">RONDA</option>
                                        </select>
                                        {errors.categoria && <span className='fieldRequired'>Campo obrigatório</span>}
                                    </div>
                                    <div className="col">
                                        <label htmlFor="sub-categoria" className="form-label">Sub-Categoria</label>
                                        <select
                                            {...register("subCategoria", { required: true })}
                                            id={`sub-categoria${dataOcorrencia.id}`}
                                            className="form-select"
                                        >
                                            <option value="">Selecione uma Sub-Categoria</option>
                                            {filteredSubCategories.map(sub => (
                                                <option key={sub.value} value={sub.value}>{sub.label}</option>
                                            ))}
                                        </select>
                                        {errors.subCategoria && <span className='fieldRequired'>Campo obrigatório</span>}
                                    </div>

                                    <div className="col">
                                        <label htmlFor="operador" className="form-label">Operador</label>
                                        <input {...register("operador", { required: true })} type="text" className="form-control" id={`operador${dataOcorrencia.id}`} aria-label=".form-select example" />
                                        {errors.operador && <span className='fieldRequired'>Campo obrigatório</span>}
                                    </div>
                                </div>
                                <div className="row ms-1 me-2 mt-2">
                                    <div className="col-12">
                                        <label htmlFor="deslocamento" className="form-label">Foi necessário deslocamento?</label>
                                        <select {...register("deslocamento", { required: true })} value={selectedValue} onChange={handleSelectChange} id={`deslocamento${dataOcorrencia.id}`} className="form-select" aria-label=".form-select example">
                                            <option defaultValue="nao">Não</option>
                                            <option value="sim">Sim</option>
                                        </select>
                                    </div>
                                </div>
                                {selectedValue === 'sim' && (
                                    <div>
                                        <div className="row ms-2 me-2 mt-1">
                                            <div className="col-6">
                                                <label htmlFor="numAgente" className="form-label">Número Agente</label>
                                                <input {...register("numAgente", { required: selectedValue === "sim" })} disabled={selectedValue === 'nao'} type="text" className="form-control" id={`numAgente${dataOcorrencia.id}`} placeholder="" />
                                                {errors.numAgente && <span className='fieldRequired'>Campo obrigatório</span>}
                                            </div>
                                            <div className="col-6">
                                                <label htmlFor="agente" className="form-label">Agente</label>
                                                <input {...register("agente", { required: selectedValue === "sim" })} disabled={selectedValue === 'nao'} id={`agente${dataOcorrencia.id}`} type="text" className="form-control" aria-label=".form-select example" />
                                                {errors.agente && <span className='fieldRequired'>Campo obrigatório</span>}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="row ms-2 me-2 mt-2">
                                                <div className="col">
                                                    <label htmlFor="horaSaida" className="form-label">H. Saída Empr.</label>
                                                    <input {...register("horaSaida", { required: selectedValue === "sim" })} disabled={selectedValue === 'nao'} type="text" className="form-control" id={`horaSaida${dataOcorrencia.id}`} placeholder="00:00" />
                                                    {errors.horaSaida && <span className='fieldRequired'>Campo obrigatório</span>}
                                                </div>
                                                <div className="col">
                                                    <label htmlFor="horaChegada" className="form-label">H. Cheg. Local</label>
                                                    <input {...register("horaChegada", { required: selectedValue === "sim" })} disabled={selectedValue === 'nao'} type="text" className="form-control" id={`horaChegada${dataOcorrencia.id}`} placeholder="00:00" />
                                                    {errors.horaChegada && <span className='fieldRequired'>Campo obrigatório</span>}
                                                </div>
                                                <div className="col">
                                                    <label htmlFor="tempDeslocamento" className="form-label">Tempo de Desloc.</label>
                                                    <input {...register("tempDeslocamento", { required: selectedValue === "sim" })} disabled={selectedValue === 'nao'} type="text" className="form-control" id={`tempDeslocamento${dataOcorrencia.id}`} placeholder="00:00" />
                                                    {errors.tempDeslocamento && <span className='fieldRequired'>Campo obrigatório</span>}
                                                </div>
                                            </div>
                                            <div className="row ms-2 me-2 mt-2">
                                                <div className="col">
                                                    <label htmlFor="horaSaidaLocal" className="form-label">H. Saída Local</label>
                                                    <input {...register("horaSaidaLocal", { required: selectedValue === "sim" })} disabled={selectedValue === 'nao'} type="text" className="form-control" id={`horaSaidaLocal${dataOcorrencia.id}`} placeholder="00:00" />
                                                    {errors.horaSaidaLocal && <span className='fieldRequired'>Campo obrigatório</span>}
                                                </div>
                                                <div className="col">
                                                    <label htmlFor="horaChegadaEmpresa" className="form-label">H. Cheg. Empr.</label>
                                                    <input {...register("horaChegadaEmpresa", { required: selectedValue === "sim" })} disabled={selectedValue === 'nao'} type="text" className="form-control" id={`horaChegadaEmpresa${dataOcorrencia.id}`} placeholder="00:00" />
                                                    {errors.horaChegadaEmpresa && <span className='fieldRequired'>Campo obrigatório</span>}
                                                </div>
                                                <div className="col">
                                                    <label htmlFor="tempRetorno" className="form-label">Tempo de Retorno</label>
                                                    <input {...register("tempRetorno", { required: selectedValue === "sim" })} disabled={selectedValue === 'nao'} type="text" className="form-control" id={`tempRetorno${dataOcorrencia.id}`} placeholder="00:00" />
                                                    {errors.tempRetorno && <span className='fieldRequired'>Campo obrigatório</span>}
                                                </div>
                                            </div>
                                            <div className="row ms-2 me-2 mt-2">
                                                <div className="col">
                                                    <label htmlFor="horaAbateLacre" className="form-label">H. Abate Lacre</label>
                                                    <input {...register("horaAbateLacre", { required: selectedValue === "sim" })} disabled={selectedValue === 'nao'} type="text" className="form-control" id={`horaAbateLacre${dataOcorrencia.id}`} placeholder="00:00" />
                                                    {errors.horaAbateLacre && <span className='fieldRequired'>Campo obrigatório</span>}
                                                </div>
                                                <div className="col">
                                                    <label htmlFor="horaLacre" className="form-label">H. Lacre</label>
                                                    <input {...register("horaLacre", { required: selectedValue === "sim" })} disabled={selectedValue === 'nao'} type="text" className="form-control" id={`horaLacre${dataOcorrencia.id}`} placeholder="00:00" />
                                                    {errors.horaLacre && <span className='fieldRequired'>Campo obrigatório</span>}
                                                </div>
                                                <div className="col">
                                                    <label htmlFor="tempAtemdimento" className="form-label">Tempo de Atendimento</label>
                                                    <input {...register("tempAtendimento", { required: selectedValue === "sim" })} disabled={selectedValue === 'nao'} type="text" className="form-control" id={`tempAtendimento${dataOcorrencia.id}`} placeholder="00:00" />
                                                    {errors.tempAtendimento && <span className='fieldRequired'>Campo obrigatório</span>}
                                                </div>
                                            </div>
                                            <div className="row ms-2 me-2 mt-2">
                                                <div className="col">
                                                    <label htmlFor="kmSaida" className="form-label">Km de Saída</label>
                                                    <input {...register("kmSaida", { required: selectedValue === "sim" })} disabled={selectedValue === 'nao'} type="text" className="form-control" id={`kmSaida${dataOcorrencia.id}`} placeholder="00:00" />
                                                    {errors.kmSaida && <span className='fieldRequired'>Campo obrigatório</span>}
                                                </div>
                                                <div className="col">
                                                    <label htmlFor="kmRetorno" className="form-label">Km de Retorno</label>
                                                    <input {...register("kmRetorno", { required: selectedValue === "sim" })} disabled={selectedValue === 'nao'} type="text" className="form-control" id={`kmRetorno${dataOcorrencia.id}`} placeholder="00:00" />
                                                    {errors.kmRetorno && <span className='fieldRequired'>Campo obrigatório</span>}
                                                </div>
                                                <div className="col">
                                                    <label htmlFor="kmTotal" className="form-label">Km Total Percorrido</label>
                                                    <input {...register("kmTotal", { required: selectedValue === "sim" })} disabled={selectedValue === 'nao'} type="text" className="form-control" id={`kmTotal${dataOcorrencia.id}`} placeholder="00:00" />
                                                    {errors.kmTotal && <span className='fieldRequired'>Campo obrigatório</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="row ms-2 me-2 mt-2 mb-3">
                                    <div className="col-sm">
                                        <label htmlFor="resumo" className="form-label">Resumo*</label>
                                        <textarea {...register("resumo", { required: true })} className="form-control" id={`resumo${dataOcorrencia.id}`} rows="3"></textarea>
                                        {errors.resumo && <span className='fieldRequired'>Campo obrigatório</span>}
                                    </div>
                                </div>
                                <div className="row ms-2 me-2 mt-2 mb-3">
                                    <div className="col-sm">
                                        <label htmlFor="procedimentos" className="form-label">Procedimentos</label>
                                        <textarea {...register("procedimentos")} className="form-control" id="procedimentos" rows="3"></textarea>
                                        {errors.procedimentos && <span className='fieldRequired'>Campo obrigatório</span>}
                                    </div>
                                </div>
                                <div className="row ms-2 me-2 mt-2 mb-3">
                                    <div className="col-sm">
                                        <label htmlFor="ocorrenciaPolicial" className="form-label">Ocorrência Policial</label>
                                        <textarea {...register("ocorrenciaPolicial")} className="form-control" id="ocorrenciaPolicial" rows="3" onBlur={handleBlur}></textarea>
                                        {errors.ocorrenciaPolicial && <span className='fieldRequired'>Campo obrigatório</span>}
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="div2 ">

                            <ul className="nav nav-tabs text-center mt-3 ms-2 justify-content-center" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id={`contatos-tab-${dataOcorrencia.id}`} data-bs-toggle="tab"
                                        data-bs-target={`#contatos-${dataOcorrencia.id}`} type="button" role="tab" aria-controls="home"
                                        aria-selected="true">Contatos
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id={`setorizacao-tab-${dataOcorrencia.id}`} data-bs-toggle="tab"
                                        data-bs-target={`#setorizacao-${dataOcorrencia.id}`} type="button" role="tab" aria-controls="profile"
                                        aria-selected="false">Setorização
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id={`viagens-tab-${dataOcorrencia.id}`} data-bs-toggle="tab" data-bs-target={`#viagens-${dataOcorrencia.id}`}
                                        type="button" role="tab" aria-controls="contact" aria-selected="false">Viagens
                                    </button>
                                </li>

                            </ul>



                            <div className="tab-content" id={`myTabContent-${dataOcorrencia.id}`}>
                                <div className="tab-pane fade show active" id={`contatos-${dataOcorrencia.id}`} role="tabpanel"
                                    aria-labelledby={`contatos-tab-${dataOcorrencia.id}`}>

                                    <div className="divInformacoesContatos p-3 mt-2 mb-2">
                                        {dataOcorrencia && dataOcorrencia.cliente && dataOcorrencia.cliente.contatos && dataOcorrencia.cliente.contatos.length > 0
                                            ? (dataOcorrencia.cliente.contatos.map((contato, index) => (
                                                <div className="row cardContatos" key={index}>

                                                    <div className="col-12 mb-2" >
                                                        <div className="card">
                                                            <div className="card-body cardCtt">
                                                                <div className="row">
                                                                    <div className="col">
                                                                        <strong> NOME: </strong> {contato.nome || "nao disponivel"}
                                                                    </div>
                                                                    <div className="col">
                                                                        <strong>TELEFONE: </strong> {contato.telefone || "nao disponivel"}
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col">
                                                                        <strong>SENHA: </strong> {dataOcorrencia.senha || "Não disponivel"}
                                                                    </div>
                                                                    <div className="col">
                                                                        <strong> CONTRA-SENHA: </strong> {dataOcorrencia.contraSenha || "Não disponivel"}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                            ) : (<div className="col">
                                                <strong>Nenhum contato cadastrado.</strong>
                                            </div>
                                            )}
                                    </div>

                                </div>
                            </div>



                            <div className="tab-content" id={`myTabContent-${dataOcorrencia.id}`}>
                                <div className="tab-pane fade" id={`setorizacao-${dataOcorrencia.id}`} role="tabpanel" aria-labelledby={`setorizacao-tab-${dataOcorrencia.id}`}>
                                    <div className="infoCentral card mb-3">
                                        <div className="card-header">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="mt-1 h6"><i className="bi bi-upc"></i><strong>CODIFICADOR: </strong>
                                                        {dataOcorrencia.codificadorSetor}
                                                    </div>
                                                    <div className="mt-1 h6"><i className="bi bi-modem"></i><strong>MODELO
                                                        CENTRAL: </strong> {dataOcorrencia.central}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="cardSetores d-flex">
                                        {dataOcorrencia && dataOcorrencia.cliente && dataOcorrencia.cliente.setores && dataOcorrencia.cliente.setores.lenght > 0
                                            ? (dataOcorrencia.cliente.setores.map((setor, index) => (
                                                <div className="divInformacoesSetores p-3 mt-2 mb-2" key={index}>
                                                    <div className="container">

                                                        <div >
                                                            <div className="row">
                                                                <div className="col">
                                                                    <div className="mb-1"><strong>SETOR: </strong> {setor.setor} &nbsp;</div>
                                                                    <div className="mb-1"><strong>LOCAL DA INSTALAÇÃO: </strong>{setor.localizacao}</div>
                                                                </div>
                                                            </div>
                                                            <div className="mb-1"><strong>OBSERVAÇÕES: </strong> {setor.observacao}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))

                                            ) : (
                                                <div className="col">
                                                    <strong>Nenhum Setor cadastrado.</strong>
                                                </div>
                                            )}

                                    </div></div></div>
                            <div className="tab-content" id={`myTabContent-${dataOcorrencia.id}`}>
                                <div className="tab-pane fade" id={`viagens-${dataOcorrencia.id}`} role="tabpanel" aria-labelledby={`viagens-tab-${dataOcorrencia.id}`}>
                                    {dataOcorrencia && dataOcorrencia.cliente && dataOcorrencia.cliente.viagens && dataOcorrencia.cliente.viagens.lenght > 0
                                        ? (dataOcorrencia.cliente.viagens.map((viagens, index) => (
                                            <div className="cardViagens p-3 mt-2 mb-2" key={index}>
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="mb-1"><strong>DATA DA SAÍDA: </strong> {viagens.dataSaida}</div>
                                                            <div className="mb-1"><strong>VEÍCULO: </strong>{viagens.veiculo}</div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-1"><strong>DESTINO: </strong> {viagens.destino}</div>
                                                </div>
                                            </div>
                                        ))

                                        ) : (
                                            <div className="col">
                                                <strong>Nenhuma viagem cadastrada.</strong>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>

                    </div>
                    <footer className="modal-footer justify-content-start">
                        <div className="row">
                            <div className="col-2 ms-1">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { handleSubmit((formData) => onSubmit(formData, dataOcorrencia.id))() }}> Fechar</button>
                            </div>
                        </div>
                    </footer>
                </div>
            </div ></div >
    )

}

ModalOcorrencia.propTypes = {
    dataOcorrencia: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    selectedValue: PropTypes.string.isRequired,
    handleSelectChange: PropTypes.func.isRequired,
};

export default ModalOcorrencia