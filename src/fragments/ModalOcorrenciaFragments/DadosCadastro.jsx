import PropTypes from 'prop-types';
import '../../css/ocorrencias.css';


function DadosCadastro({ dataOcorrencia }) {

    return (
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
                            <div key={index}>
                                <div className="infoViagem card">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col d-flex">
                                                <div className="mt-1 txt-TabDataIda"><strong>DATA SAÍDA: </strong>
                                                    <strong className='me-2'>{viagens.dataSaida}</strong> ||
                                                </div>
                                                <div className="ms-2 mt-1 txt-TabDataVolta"><strong>DATA VOLTA: </strong>
                                                    <strong>{viagens.dataVolta}</strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="divInformacoesViagens p-3 mb-2">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col">
                                                <div className="mb-3"><strong>PROCEDIMENTOS: </strong> {viagens.procedimento}</div>
                                                <div className="mb-1"><strong>OBSERVAÇÕES: </strong>{viagens.observacao}</div>
                                            </div>
                                        </div>
                                    </div>
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
    )

}

DadosCadastro.propTypes = {
    dataOcorrencia: PropTypes.object.isRequired,
}

export default DadosCadastro;