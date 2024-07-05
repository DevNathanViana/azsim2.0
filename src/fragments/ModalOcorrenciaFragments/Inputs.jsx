import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';
import '../../css/ocorrencias.css';


function Inputs({ dataOcorrencia, handleSubmit, onSubmit, register, handleCategoryChange2, errors, selectedValue, handleSelectChange, filteredSubCategories }) {

    return (
        <div className="div1">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row ms-1 me-2 mt-2">
                    <div className="col">
                        <label htmlFor="tipoocorrencia" className="form-label">Categoria</label>
                        <select
                            {...register("tipoocorrencia", { required: false })}
                            id={`tipoocorrencia${dataOcorrencia.id}`}
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
                        <label htmlFor="subtipoocorrencia" className="form-label">Sub-Categoria</label>
                        <select
                            {...register("subtipoocorrencia", { required: false })}
                            id={`subtipoocorrencia${dataOcorrencia.id}`}
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
                        <input {...register("operador", { required: false })} type="text" className="form-control" id={`operador${dataOcorrencia.id}`} aria-label=".form-select example" />
                        {errors.operador && <span className='fieldRequired'>Campo obrigatório</span>}
                    </div>
                </div>
                <div className="row ms-1 me-2 mt-2">
                    <div className="col-12">
                        <label htmlFor="deslocamento" className="form-label">Foi necessário deslocamento?</label>
                        <select {...register("deslocamento", { required: true })} value={selectedValue} onChange={handleSelectChange} id={`deslocamento${dataOcorrencia.id}`} className="form-select" aria-label=".form-select example">
                            <option value="sim">Sim</option>
                            <option value="nao">Não</option>
                        </select>
                    </div>
                </div>
                {selectedValue === 'sim' && (
                    <div>
                        <div className="row ms-2 me-2 mt-1">
                            <div className="col-6">
                                <label htmlFor="idagente" className="form-label">Número Agente</label>
                                <input
                                    {...register("idagente", { required: false })} disabled={selectedValue === 'nao'} type="text" className="form-control" id={`numAgente${dataOcorrencia.id}`} placeholder="" />
                                {errors.idagente && <span className='fieldRequired'>Campo obrigatório</span>}
                            </div>
                            <div className="col-6">
                                <label htmlFor="agente" className="form-label">Agente</label>
                                <input
                                    {...register("agente", { required: false })} disabled={selectedValue === 'nao'} id={`agente${dataOcorrencia.id}`} type="text" className="form-control" aria-label=".form-select example" />
                                {errors.agente && <span className='fieldRequired'>Campo obrigatório</span>}
                            </div>
                        </div>
                        <div>
                            <div className="row ms-2 me-2 mt-2">
                                <div className="col">
                                    <label htmlFor="horasaidaemp" className="form-label">H. Saída Empr.</label>
                                    <InputMask mask="9999-99-99T99:99"
                                        {...register("horasaidaemp", { required: false })} disabled={selectedValue === 'nao'} type="text" className="form-control" id={`horaSaida${dataOcorrencia.id}`} placeholder="yyyy-mm-dd HH-MM" />
                                    {errors.horasaidaemp && <span className='fieldRequired'>Campo obrigatório</span>}
                                </div>
                                <div className="col">
                                    <label htmlFor="horachegadacliente" className="form-label">H. Cheg. Local</label>
                                    <InputMask mask="9999-99-99T99:99"
                                        {...register("horachegadacliente", { required: false })} disabled={selectedValue === 'nao'} type="text" className="form-control" id={`horaChegada${dataOcorrencia.id}`} placeholder="yyyy-mm-dd HH-MM" />
                                    {errors.horachegadacliente && <span className='fieldRequired'>Campo obrigatório</span>}
                                </div>
                                <div className="col">
                                    <label htmlFor="tempodeslocamento" className="form-label">Tempo de Desloc.</label>
                                    <InputMask mask="9999-99-99T99:99"
                                        {...register("tempodeslocamento", { required: false })} disabled={selectedValue === 'nao'} type="text" className="form-control" id={`tempDeslocamento${dataOcorrencia.id}`} placeholder="yyyy-mm-dd HH-MM" />
                                    {errors.tempodeslocamento && <span className='fieldRequired'>Campo obrigatório</span>}
                                </div>
                            </div>
                            <div className="row ms-2 me-2 mt-2">
                                <div className="col">
                                    <label htmlFor="horasaidacliente" className="form-label">H. Saída Local</label>
                                    <InputMask mask="9999-99-99T99:99"
                                        {...register("horasaidacliente", { required: false })} disabled={selectedValue === 'nao'} type="text" className="form-control" id={`horaSaidaLocal${dataOcorrencia.id}`} placeholder="yyyy-mm-dd HH-MM" />
                                    {errors.horasaidacliente && <span className='fieldRequired'>Campo obrigatório</span>}
                                </div>
                                <div className="col">
                                    <label htmlFor="horachegadaemp" className="form-label">H. Cheg. Empr.</label>
                                    <InputMask mask="9999-99-99T99:99"
                                        {...register("horachegadaemp", { required: false })} disabled={selectedValue === 'nao'} type="text" className="form-control" id={`horaChegadaEmpresa${dataOcorrencia.id}`} placeholder="yyyy-mm-dd HH-MM" />
                                    {errors.horachegadaemp && <span className='fieldRequired'>Campo obrigatório</span>}
                                </div>
                                <div className="col">
                                    <label htmlFor="temporetorno" className="form-label">Tempo de Retorno</label>
                                    <InputMask mask="9999-99-99T99:99"
                                        {...register("temporetorno", { required: false })} disabled={selectedValue === 'nao'} type="text" className="form-control" id={`tempRetorno${dataOcorrencia.id}`} placeholder="yyyy-mm-dd HH-MM" />
                                    {errors.temporetorno && <span className='fieldRequired'>Campo obrigatório</span>}
                                </div>
                            </div>
                            <div className="row ms-2 me-2 mt-2">
                                <div className="col">
                                    <label htmlFor="horaAbateLacre" className="form-label">H. Abate Lacre</label>
                                    <InputMask mask="9999-99-99T99:99"
                                        {...register("horaAbateLacre", { required: false })} disabled={selectedValue === 'nao'} type="text" className="form-control" id={`horaAbateLacre${dataOcorrencia.id}`} placeholder="yyyy-mm-dd HH-MM" />
                                    {errors.horaAbateLacre && <span className='fieldRequired'>Campo obrigatório</span>}
                                </div>
                                <div className="col">
                                    <label htmlFor="lacre" className="form-label">H. Lacre</label>
                                    <InputMask mask="9999-99-99T99:99"
                                        {...register("lacre", { required: false })} disabled={selectedValue === 'nao'} type="text" className="form-control" id={`horaLacre${dataOcorrencia.id}`} placeholder="yyyy-mm-dd HH-MM" />
                                    {errors.lacre && <span className='fieldRequired'>Campo obrigatório</span>}
                                </div>
                                <div className="col">
                                    <label htmlFor="tempoatendimento" className="form-label">Tempo de Atendimento</label>
                                    <InputMask mask="9999-99-99T99:99"
                                        {...register("tempoatendimento", { required: false })} disabled={selectedValue === 'nao'} type="text" className="form-control" id={`tempAtendimento${dataOcorrencia.id}`} placeholder="yyyy-mm-dd HH-MM" />
                                    {errors.tempoatendimento && <span className='fieldRequired'>Campo obrigatório</span>}
                                </div>
                            </div>
                            <div className="row ms-2 me-2 mt-2">
                                <div className="col">
                                    <label htmlFor="kmsaida" className="form-label">Km de Saída</label>
                                    <InputMask {...register("kmsaida", { required: false })} disabled={selectedValue === 'nao'} type="text" className="form-control" id={`kmSaida${dataOcorrencia.id}`} placeholder="0km" />
                                    {errors.kmsaida && <span className='fieldRequired'>Campo obrigatório</span>}
                                </div>
                                <div className="col">
                                    <label htmlFor="kmretorno" className="form-label">Km de Retorno</label>
                                    <InputMask {...register("kmretorno", { required: false })} disabled={selectedValue === 'nao'} type="text" className="form-control" id={`kmRetorno${dataOcorrencia.id}`} placeholder="0km" />
                                    {errors.kmretorno && <span className='fieldRequired'>Campo obrigatório</span>}
                                </div>
                                <div className="col">
                                    <label htmlFor="kmtotal" className="form-label">Km Total Percorrido</label>
                                    <InputMask  {...register("kmtotalpercorrido", { required: false })} disabled={selectedValue === 'nao'} type="text" className="form-control" id={`kmTotal${dataOcorrencia.id}`} placeholder="0km" />
                                    {errors.kmtotalpercorrido && <span className='fieldRequired'>Campo obrigatório</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="row ms-2 me-2 mt-2 mb-3">
                    <div className="col-sm">
                        <label htmlFor="resumo" className="form-label">Resumo*</label>
                        <textarea {...register("resumo", { required: false })} className="form-control" id={`resumo${dataOcorrencia.id}`} rows="3"></textarea>
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
                        <label htmlFor="ocorrenciapolicialresumo" className="form-label">Ocorrência Policial</label>
                        <textarea {...register("ocorrenciapolicialresumo")} className="form-control" id="ocorrenciapolicialresumo" rows="3" ></textarea>
                        {errors.ocorrenciapolicial && <span className='fieldRequired'>Campo obrigatório</span>}
                    </div>
                </div>
            </form>
        </div>
    )

}

Inputs.propTypes = {
    dataOcorrencia: PropTypes.object.isRequired,
    handleSubmit: PropTypes.object.isRequired,
    onSubmit: PropTypes.object.isRequired,
    register: PropTypes.object.isRequired,
    handleCategoryChange2: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    selectedValue: PropTypes.object.isRequired,
    handleSelectChange: PropTypes.object.isRequired,
    filteredSubCategories: PropTypes.object.isRequired,
}

export default Inputs;