import PropTypes from 'prop-types';
import '../../css/ocorrencias.css';
import { Fragment } from 'react';


function HeaderModal({ dataOcorrencia }) {

    return (
        <Fragment>
            <div className="modal-header text-center justify-content-center" data-keyboard="false">
                <nav className="navbar navbar-dark bg-primary fixed-top mb-5 navbar text-center justify-content-center" id="navbar">
                    <div className="txtDescricao">
                        <h2 className="mt-1 t-center">
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
        </Fragment>
    )

}

HeaderModal.propTypes = {
    dataOcorrencia: PropTypes.object.isRequired
}

export default HeaderModal;