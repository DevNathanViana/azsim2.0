import PropTypes from 'prop-types';

function TabViagens({ activeTab, clienteSelecionado }) {

    return (
        <div className={`tab-pane fade ${activeTab === 'viagens' ? 'show active' : ''}`} id={`viagens`} role="tabpanel" aria-labelledby={`viagens-tab`}>
            <div className="modalViagens j-content-center">
                <div className="container justify-content-center">
                    <h2 className='txtViagens ms-3'>4 - Viagens</h2>
                    <br></br>
                    <div className="row">
                        {(clienteSelecionado?.viagens || []).map((viagem, index) => (
                            <div key={index} className="col mb-2">
                                <div className="row">
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor={`nome-saida-${index}`} className="form-label"><strong>Nome de Saida</strong></label>
                                            <input
                                                disabled
                                                id={`nome-saida-${index}`}
                                                className="form-control"
                                                value={viagem.nomeContatoNotificacaoSaida || ""}
                                                name={`nome-saida-${index}`}
                                                readOnly
                                            />
                                        </div>
                                        <div className="col">
                                            <label htmlFor={`nome-volta-${index}`} className="form-label"><strong>Nome de Volta</strong></label>
                                            <input
                                                disabled
                                                id={`nome-volta-${index}`}
                                                className="form-control"
                                                value={viagem.nomeContatoNotificacaoVolta || ""}
                                                name={`nome-volta-${index}`}
                                                readOnly
                                            />
                                        </div>
                                        <div className="col">
                                            <label htmlFor={`data-saida-${index}`} className="form-label"><strong>Data de Saida</strong></label>
                                            <input
                                                disabled
                                                id={`data-saida-${index}`}
                                                className="form-control"
                                                value={viagem.dataSaida || ""}
                                                name={`data-saida-${index}`}
                                                readOnly
                                            />
                                        </div>
                                        <div className="col">
                                            <label htmlFor={`data-volta-${index}`} className="form-label"><strong>Data de Volta</strong></label>
                                            <input
                                                disabled
                                                id={`data-volta-${index}`}
                                                className="form-control"
                                                value={viagem.dataVolta || ""}
                                                name={`data-volta-${index}`}
                                                readOnly
                                            />


                                        </div>
                                        <div className="row mt-3">
                                            <div className="col">
                                                <label htmlFor={`viagem-obs-${index}`} className="form-label"><strong>Observações</strong></label>
                                                <textarea
                                                    rows={3}
                                                    disabled
                                                    id={`viagem-obs-${index}`}
                                                    className="form-control"
                                                    value={viagem.observacao || ""}
                                                    name={`viagem-obs-${index}`}
                                                    readOnly
                                                />
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col">
                                                <label htmlFor={`viagem-procedimentos-${index}`} className="form-label"><strong>Procedimentos</strong></label>
                                                <textarea
                                                    rows='3'
                                                    disabled
                                                    id={`viagem-procedimentos-${index}`}
                                                    className="form-control"
                                                    value={viagem.procedimento || ""}
                                                    name={`viagem-procedimentos-${index}`}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>


    )

}

TabViagens.propTypes = {
    activeTab: PropTypes.object.isRequired,
    clienteSelecionado: PropTypes.object.isRequired,
}

export default TabViagens;