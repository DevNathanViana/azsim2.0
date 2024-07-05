import PropTypes from 'prop-types';

function TabSetores({ activeTab, clienteSelecionado }) {

    return (
        <div className={`tab-pane fade ${activeTab === 'setorizacao' ? 'show active' : ''}`} id={`setorizacao`} role="tabpanel" aria-labelledby={`setorizacao-tab`}>
            <div className="modalSetorizacao j-content-center">
                <div className="container justify-content-center">
                    <h2 className='txtSetorizacao ms-3'>3 - Setorização</h2>
                    <br></br>


                    <div className="row">
                        {(clienteSelecionado?.setores || []).map((setor, index) => (
                            <div key={index} className="col mb-2">
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor={`setor-nome-${index}`} className="form-label"><strong>Setor</strong></label>
                                        <input
                                            disabled
                                            id={`setor-nome-${index}`}
                                            className="form-control"
                                            value={setor.setor || ""}
                                            name={`setor-nome-${index}`}
                                            readOnly
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor={`setor-local-${index}`} className="form-label"><strong>Local da Instalação</strong></label>
                                        <input
                                            disabled
                                            id={`setor-local-${index}`}
                                            className="form-control"
                                            value={setor.localizacao || ""}
                                            name={`setor-local-${index}`}
                                            readOnly
                                        />
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col">
                                            <label htmlFor={`setor-nome-${index}`} className="form-label"><strong>Observações</strong></label>
                                            <input
                                                disabled
                                                id={`setor-obs-${index}`}
                                                className="form-control"
                                                value={setor.observacao || ""}
                                                name={`setor-obs-${index}`}
                                                readOnly
                                            />
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

TabSetores.propTypes = {
    activeTab: PropTypes.object.isRequired,
    clienteSelecionado: PropTypes.object.isRequired,
}

export default TabSetores;