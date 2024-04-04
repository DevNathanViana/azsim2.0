import '../css/ocorrencias.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Button, ModalFooter } from 'reactstrap';


// import Modal from '../fragments/modal';
// import { Form } from 'reactstrap'

function ModalOcorrencia({ dataOcorrencia, onSubmit, selectedValue, handleSelectChange }) {
    const { register, handleSubmit, formState: { errors } } = useForm();






    return <div className="modal fade" id={`modal-${dataOcorrencia.id}`} tabIndex="-1" aria-labelledby={`modalLabel-${dataOcorrencia.id}`} aria-hidden="true">
        <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
                <div className="modal-header text-center justify-content-center" data-backdrop="static" data-keyboard="false">
                    <nav className=" navbar navbar-dark bg-primary fixed-top mb-5 navbar text-center justify-content-center"
                        id="navbar">
                        <div className="btn-fechaModal">
                        </div>
                        <div className="txtDescricao"><h2 className="mt-1">{dataOcorrencia.descricaoDaOcorrencia}</h2>
                        </div>
                    </nav>
                </div>
                <header className="headerModalInfo mt-3">
                    <div className="divInfosModal row">
                        <div className="col-8 mb-2ms-4">
                            <div className="mt-4 ms-3"><strong>Cliente:  </strong>{dataOcorrencia.nomeOcorrencia}</div>
                            <div className=' ms-3'><strong>Endereço: </strong>{dataOcorrencia.enderecoOcorrencia}&nbsp;&nbsp;<strong>Bairro: </strong> {dataOcorrencia.bairroOcorrencia}
                                &nbsp; <strong>Cidade: </strong> {dataOcorrencia.cidadeOcorrencia}
                            </div>
                            <div className=' ms-3'><strong>Ponto de Referência:   </strong>{dataOcorrencia.referenciaOcorrencia}</div>
                        </div>


                        <div className="col text-end me-4">
                            <div className="mt-4"><strong>Data: </strong>{dataOcorrencia.dataDaOcorrencia}</div>
                            <div><strong>Hora: </strong>{dataOcorrencia.horaOcorrencia}</div>
                        </div>
                    </div>
                </header>

                <div className="modal-body p-0">
                    <div className="div1">
                        <form>
                            <div className="row ms-1 me-2 mt-2">
                                <div className="col">
                                    <label htmlFor="categoria" className="form-label">Categoria</label>
                                    <input {...register("categoria", { required: true })} id={`categoria${dataOcorrencia.id}`} type="text" className="form-control" aria-label=".form-select example" />
                                    {errors.categoria && <span className='fieldRequired'>Campo obrigatório</span>}
                                </div>
                                <div className="col">
                                    <label htmlFor="sub-categoria" className="form-label">Sub-Categoria</label>
                                    <input {...register("subCategoria", { required: true })} id={`sub-categoria${dataOcorrencia.id}`} type="text" className="form-control" aria-label=".form-select example" />
                                    {errors.subCategoria && <span className='fieldRequired'>Campo obrigatório</span>}

                                </div>

                                <div className="col">
                                    <label htmlFor="operador" className="form-label">Operador</label>
                                    <input {...register("operador", { required: true })} type="text" className="form-control" id={`operador${dataOcorrencia.id}`} aria-label=".form-select example" />
                                    {errors.operador && <span className='fieldRequired'>Campo obrigatório</span>}

                                </div>

                            </div>
                            <div className="row ms-1 me-2 mt-2">

                                <div className="col-5">
                                    <label htmlFor="deslocamento" className="form-label">Foi necessário deslocamento?</label>
                                    <select {...register("deslocamento", { required: true })} value={selectedValue} onChange={handleSelectChange} id={`deslocamento${dataOcorrencia.id}`} className="form-select" aria-label=".form-select example">
                                        <option value="sim">Sim</option>
                                        <option value="nao">Não</option>
                                    </select>
                                </div>

                                <div className="col">
                                    <label htmlFor="numAgente" className="form-label">Número Agente</label>
                                    <input {...register("numAgente", { required: selectedValue === "sim" })} disabled={selectedValue === 'nao'} type="text" className="form-control" id={`numAgente${dataOcorrencia.id}`} placeholder="" />
                                    {errors.numAgente && <span className='fieldRequired'>Campo obrigatório</span>}

                                </div>
                                <div className="col">
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
                                <div className="row  ms-2 me-2 mt-2">
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

                                <div className="row ms-2 me-2 mt-2 mb-3">
                                    <div className="col-sm">
                                        <label htmlFor="resumo" className="form-label">Resumo*</label>
                                        <textarea {...register("resumo", { required: selectedValue === "sim" })} disabled={selectedValue === 'nao'} className="form-control" id={`resumo${dataOcorrencia.id}`} rows="3"></textarea>
                                        {errors.resumo && <span className='fieldRequired'>Campo obrigatório</span>}
                                    </div>

                                </div>

                                <div className="row ms-2 me-2 mt-2 mb-3">
                                    <div className="col-sm">
                                        <label htmlFor="procedimentos" className="form-label">Procedimentos</label>
                                        <textarea {...register("procedimentos", { required: selectedValue === "sim" })} disabled={selectedValue === 'nao'} className="form-control" id="procedimentos" rows="3"></textarea>
                                        {errors.procedimentos && <span className='fieldRequired'>Campo obrigatório</span>}
                                    </div>
                                </div>

                                <div className="row ms-2 me-2 mt-2 mb-3">
                                    <div className="col-sm">
                                        <label htmlFor="ocorrenciaPolicial" className="form-label">Ocorrência Policial</label>
                                        <textarea {...register("ocorrenciaPolicial", { required: selectedValue === "sim" })} className="form-control" id="ocorrenciaPolicial" rows="3"></textarea>
                                        {errors.ocorrenciaPolicial && <span className='fieldRequired'>Campo obrigatório</span>}

                                    </div>
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

                                    <div className="container">
                                        <div className="row">

                                            <div className="col">
                                                <strong> NOME: </strong> {dataOcorrencia.nomeContato}
                                            </div>

                                            <div className="col">
                                                <strong>TELEFONE: </strong> {dataOcorrencia.numeroContato}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <strong>SENHA: </strong> {dataOcorrencia.senha}
                                            </div>

                                            <div className="col">
                                                <strong> CONTRA-SENHA: </strong> {dataOcorrencia.contraSenha}
                                            </div>

                                        </div>


                                    </div>


                                </div>


                            </div>
                        </div>


                        <div className="tab-content" id={`myTabContent-${dataOcorrencia.id}`}>
                            <div className="tab-pane fade" id={`setorizacao-${dataOcorrencia.id}`} role="tabpanel" aria-labelledby={`setorizacao-tab-${dataOcorrencia.id}`}
                            >
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
                                    <div className="divInformacoesSetores p-3 mt-2 mb-2">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="mb-1"><strong>SETOR: </strong> {dataOcorrencia.setor} &nbsp;</div>
                                                    <div className="mb-1"> <strong>LOCAL DA
                                                        INSTALAÇÃO: </strong>{dataOcorrencia.localInstalacao}</div>
                                                </div>
                                            </div>
                                            <div className="mb-1"><strong>OBSERVAÇÕES: </strong> {dataOcorrencia.observacoesSetores}</div>
                                        </div>
                                    </div>
                                    <div className="divInformacoesSetores p-3 mt-2 mb-2">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="mb-1"><strong>SETOR: </strong> {dataOcorrencia.setor} &nbsp;</div>
                                                    <div className="mb-1"> <strong>LOCAL DA
                                                        INSTALAÇÃO: </strong>{dataOcorrencia.localInstalacao}</div>
                                                </div>
                                            </div>
                                            <div className="mb-1"><strong>OBSERVAÇÕES: </strong> {dataOcorrencia.observacoesSetores}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="tab-content" id={`myTabContent-${dataOcorrencia.id}`}>
                            <div className="tab-pane fade" id={`viagens-${dataOcorrencia.id}`} role="tabpanel" aria-labelledby={`viagens-tab-${dataOcorrencia.id}`}>
                                <div className="infoViagem card">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col d-flex">
                                                <div className="mt-1 txt-TabDataIda"><strong>DATA
                                                    SAÍDA: </strong>
                                                    <strong className='me-2'>{dataOcorrencia.dataSaidaViagem}</strong> ||
                                                </div>
                                                <div className=" ms-2 mt-1 txt-TabDataVolta"><strong>DATA VOLTA
                                                    : </strong>    <strong>{dataOcorrencia.dataVoltaViagem}</strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="divInformacoesViagens p-3 mb-2">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col">
                                                <div className="mb-3"><strong>PROCEDIMENTOS: </strong> {dataOcorrencia.procedimentoViagem}
                                                </div>

                                                <div className="mb-1"><strong>OBSERVAÇÕES: </strong>{dataOcorrencia.observacoesViagem}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
                <ModalFooter>
                    <Button color="secondary" >Fechar</Button>
                    <Button onClick={() => handleSubmit((formData) => onSubmit(formData, dataOcorrencia.id))()} aria-label="Close" data-bs-dismiss="modal" color="success" >Fechar e Encerrar</Button>
                </ModalFooter>
            </div>
        </div>
    </div >;
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