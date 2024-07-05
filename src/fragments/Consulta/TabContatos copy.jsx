import PropTypes from 'prop-types';

function TabContatos({ activeTab, clienteSelecionado }) {

    return (
        <div className={`tab-pane fade ${activeTab === 'contatos' ? 'show active' : ''}`} id={`contatos`} role="tabpanel" aria-labelledby={`contatos-tab`}>
            <div className="modalContatos j-content-center">
                <div className="container justify-content-center">
                    <h2 className='txtContatos ms-3'>2 - Contatos</h2>
                    <br></br>

                    <div className="row">
                        {(clienteSelecionado?.contatos || []).map((contato, index) => (
                            <div key={index} className="col mb-2">
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor={`contato-nome-${index}`} className="form-label"><strong>Nome do Contato</strong></label>
                                        <input
                                            disabled
                                            id={`contato-nome-${index}`}
                                            className="form-control"
                                            value={contato.nome || ""}
                                            name={`contato-nome-${index}`}
                                            readOnly
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor={`contato-senha-${index}`} className="form-label"><strong>Senha</strong></label>
                                        <input
                                            disabled
                                            id={`contato-senha-${index}`}
                                            className="form-control"
                                            value={contato.senha || ""}
                                            name={`contato-senha-${index}`}
                                            readOnly
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor={`contato-contraSenha-${index}`} className="form-label"><strong>Contra Senha</strong></label>
                                        <input
                                            disabled
                                            id={`contato-contraSenha-${index}`}
                                            className="form-control"
                                            value={contato.contraSenha || ""}
                                            name={`contato-contraSenha-${index}`}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label htmlFor={`contato-telefone-${index}`} className="form-label"><strong>Telefone</strong></label>
                                        <input
                                            disabled
                                            id={`contato-telefone-${index}`}
                                            className="form-control"
                                            value={contato.telefone || ""}
                                            name={`contato-telefone-${index}`}
                                            readOnly
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor={`contato-nome-${index}`} className="form-label"><strong>Data de Nascimento</strong></label>
                                        <input
                                            disabled
                                            id={`contato-dataNascimento-${index}`}
                                            className="form-control"
                                            value={contato.dataNascimento ? new Date(contato.dataNascimento).toLocaleDateString('pt-BR') : ""}
                                            name={`contato-dataNascimento-${index}`}
                                            readOnly
                                        />
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col">
                                            <label htmlFor={`contato-observacao-${index}`} className="form-label"><strong>Observações</strong></label>
                                            <textarea
                                                disabled
                                                rows={3}
                                                id={`contato-observacao-${index}`}
                                                className="form-control"
                                                value={contato.observacao || ""}
                                                name={`contato-observacao -${index}`}
                                                readOnly
                                            />
                                            <br></br>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>

                </div>
                <br></br>
            </div>
        </div>

    )

}

TabContatos.propTypes = {
    activeTab: PropTypes.object.isRequired,
    clienteSelecionado: PropTypes.object.isRequired,
}

export default TabContatos;