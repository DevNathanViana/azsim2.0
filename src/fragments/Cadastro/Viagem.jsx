import PropTypes from 'prop-types';
// import '../css/cadastros.css';


function Viagem({ dadosBasicos, setDadosBasicos, register, index, viagem, deleteItem }) {

    return (
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
    )


}

Viagem.propTypes = {
    dadosBasicos: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    setDadosBasicos: PropTypes.func.isRequired,
    register: PropTypes.object.isRequired,
    viagem: PropTypes.object.isRequired,
    deleteItem: PropTypes.object.isRequired,
}


export default Viagem;