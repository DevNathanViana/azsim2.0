import PropTypes from 'prop-types';

function TabDadosBasicos({ activeTab, clienteSelecionado }) {

    return (
        <div className={`tab-pane fade ${activeTab === 'dados' ? 'show active' : ''}`} id={`dados`} role="tabpanel" aria-labelledby={`dados-tab`}>
            <div className="modalDadosBasicos j-content-center">
                <div className="container justify-content-center">
                    <h2 className='txtDados ms-3'>1 - Dados Básicos</h2>
                    <br></br>
                    <div className="row">
                        <div className="col mb-2">
                            <label htmlFor="unidade" className="form-label"><strong>* Unidade</strong></label>
                            <input className="form-select" value={clienteSelecionado?.unidade || ""} disabled name='unidade' readOnly />
                        </div>
                        <div className="col">
                            <label htmlFor="Hábil" className="form-label"><strong>Hábil</strong></label>
                            <input name='Hábil' type="text" id="Hábil" disabled value={clienteSelecionado?.codHabil || ""} className="form-control" readOnly />
                        </div>
                        <div className="col">
                            <label htmlFor="Condor" className="form-label"><strong>Condor</strong></label>
                            <input name='Condor' type="text" id="Condor" disabled value={clienteSelecionado?.codCondor || ""} className="form-control" readOnly />
                        </div>
                        <div className="col">
                            <label htmlFor="codificador" className="form-label"><strong>Codificador</strong></label>
                            <input name='codificador' type="text" id="codificador" disabled value={clienteSelecionado?.codificador || ""} className="form-control" readOnly />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col mb-2">
                            <label htmlFor="Natureza" className="form-label"><strong>* Natureza</strong></label>
                            <input className="form-select" disabled value={clienteSelecionado?.natureza || ""} name='Natureza' readOnly />
                        </div>
                        <div className="col">
                            <label htmlFor="CPF" className="form-label"><strong>* CPF</strong></label>
                            <input name='CPF' disabled type="text" id="CPF" value={clienteSelecionado?.documento || ""} className="form-control" readOnly />
                        </div>
                        <div className="col">
                            <label htmlFor="Inscrição" className="form-label"><strong>Inscrição Municipal</strong></label>
                            <input name='Inscrição' disabled type="text" id="Inscrição" value={clienteSelecionado?.inscMunicipal || ""} className="form-control" readOnly />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <label htmlFor=" Nome" className="form-label"><strong>* Nome/Razão Social</strong></label>
                            <input name=' Nome' disabled type="text" id=" Nome" value={clienteSelecionado?.nome || ""} className="form-control" readOnly />
                        </div>
                        <div className="col">
                            <label htmlFor="Nomef" className="form-label"><strong>Nome Fantasia</strong></label>
                            <input name='Nomef' disabled type="text" id="Nomef" value={clienteSelecionado?.nomeFantasia || ""} className="form-control" readOnly />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <label htmlFor="Endereço" className="form-label"><strong>Endereço</strong></label>
                            <input name='Endereço' disabled type="text" id="Endereço" value={clienteSelecionado?.endereco || ""} className="form-control" readOnly />
                        </div>
                        <div className="col">
                            <label htmlFor="Bairro" className="form-label"><strong>Bairro</strong></label>
                            <input name='Bairro' disabled type="text" id="Bairro" value={clienteSelecionado?.bairro || ""} className="form-control" readOnly />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="Cidade" className="form-label"><strong>Cidade</strong></label>
                            <input name='Cidade' disabled type="text" id="Cidade" value={clienteSelecionado?.cidade || ""} className="form-control" readOnly />
                        </div>
                        <div className="col">
                            <label htmlFor="Uf" className="form-label"><strong>Uf</strong></label>
                            <input name='Uf' disabled type="text" id="Uf" value={clienteSelecionado?.uf || ""} className="form-control" readOnly />
                        </div>
                        <div className="col">
                            <label htmlFor="CEP" className="form-label"><strong>CEP</strong></label>
                            <input name='CEP' disabled type="text" id="CEP" value={clienteSelecionado?.cep || ""} className="form-control" readOnly />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <label htmlFor="Observações" className="form-label"><strong>Observações</strong></label>
                            <textarea name='Observações' disabled type="text" rows='3' id="Observações" value={clienteSelecionado?.observacao || ""} className="form-control" readOnly />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}

TabDadosBasicos.propTypes = {
    activeTab: PropTypes.object.isRequired,
    clienteSelecionado: PropTypes.object.isRequired,
}

export default TabDadosBasicos;