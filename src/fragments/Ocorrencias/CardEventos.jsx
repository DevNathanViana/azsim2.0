import { Fragment } from "react";
import PropTypes from 'prop-types';

function CardEventos({ index, gravidadeClassEvento, data }) {
    return (
        <Fragment key={index}>
            <div className={`divInformacoesEventos p-3 mt-1 mb-2 ${gravidadeClassEvento}`}>
                <div className="container divInformacoesDeDentro">
                    <div className="row mb-1">
                        <div className="col-1 divDaBola">
                            <div className="bola"></div>
                        </div>
                        <div className="col">
                            <strong>
                                {data.dataevento ? new Date(data.dataevento).toLocaleString('pt-BR') : 'N/E'}
                            </strong>
                        </div>
                        <div className="col eventoEReferencia">
                            <strong>{data.status ? data.status.slice(0, 40) : 'N/E'}</strong> . <strong>{data.referencia ? data.referencia.slice(0, 40) : 'N/E'}</strong>
                        </div>
                        <div className="col descricaoEvento">
                            <strong>{data.destatus ? data.destatus.slice(0, 40) : 'N/E'}</strong>
                        </div>
                        <div className="col">
                            <strong>{data.nmcliente ? data.nmcliente.slice(0, 40) : 'N/E'}</strong>
                        </div>
                        <div className="col text-end">
                            <strong>{data.cidade ? data.cidade.slice(0, 40) : 'N/E'}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

CardEventos.propTypes = {
    index: PropTypes.number.isRequired,
    gravidadeClassEvento: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
};

export default CardEventos;
