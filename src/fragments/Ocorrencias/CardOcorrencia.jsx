import { Fragment } from "react";
import PropTypes from 'prop-types';

function CardOcorrencia({ index, dataOcorrencia, PegaDadosComplementares, gravidadeClass, ScrollContainer }) {
    return (
        <Fragment key={index}>
            <div onClick={() => { PegaDadosComplementares(dataOcorrencia.id) }} className={`infoOcorrencia card mb-3 ${gravidadeClass}`}>
                <div id='cardOcorrencia'
                    className={`card-important card-header ${gravidadeClass}`} data-bs-toggle="modal" data-bs-target={`#modal-${dataOcorrencia.id}`}>
                    <div className="row mb-4">
                        <div className="col dataCard mt-1 text-start">
                            <strong>
                                {dataOcorrencia && dataOcorrencia.evento
                                    ? new Date(dataOcorrencia.evento.dataevento).toLocaleDateString('pt-BR')
                                    : ''}
                            </strong>
                        </div>
                        <div className="col HoraCard mt-1 me-4 text-end">
                            <strong>
                                {dataOcorrencia && dataOcorrencia.evento
                                    ? new Date(dataOcorrencia.evento.dataevento).toLocaleTimeString('pt-BR')
                                    : ''}
                            </strong>
                        </div>
                    </div>
                    <div className="row">
                        <div className="descricaoOcorrencia mt-1 text-center"><strong>{dataOcorrencia && dataOcorrencia.evento ? dataOcorrencia.evento.destatus : ""}</strong></div>
                    </div>
                    <ScrollContainer>
                        <div className="nomeNoCard mt-2 mb-1 text-center scroll-on-hover">
                            <strong className='ellipsis'>{dataOcorrencia && dataOcorrencia.evento ? dataOcorrencia.evento.nmcliente : ""}</strong>
                        </div>
                    </ScrollContainer>
                    <ScrollContainer>
                        <div className="nomeNoCard mb-1 text-center scroll-on-hover">
                            <strong className='ellipsis'>{dataOcorrencia && dataOcorrencia.evento ? dataOcorrencia.evento.endereco : ""}</strong>
                        </div>
                    </ScrollContainer>
                </div>
            </div>
        </Fragment>
    );
}

CardOcorrencia.propTypes = {
    index: PropTypes.number.isRequired,
    dataOcorrencia: PropTypes.object.isRequired,
    PegaDadosComplementares: PropTypes.func.isRequired,
    gravidadeClass: PropTypes.string.isRequired,
    ScrollContainer: PropTypes.object.isRequired,
};

export default CardOcorrencia;
