import PropTypes from 'prop-types';
import { Fragment } from 'react';


function Utilitarios({ filtroNomeEventos, handleFiltroNomeChangeEvento, }) {
    return (
        <Fragment>
            <div className="utilitarios">
                <div className="filtro">
                    <div className='d-flex'>
                        <input
                            className='form-control'
                            type="text"
                            name="filtroNome"
                            id="filtroEvento"
                            placeholder='Digite para filtrar...'
                            value={filtroNomeEventos}
                            onChange={handleFiltroNomeChangeEvento}
                        />
                        <button className='btn btn-secondary ms-2'>Filtrar</button>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

Utilitarios.propTypes = {
    filtroNomeEventos: PropTypes.object.isRequired,
    handleFiltroNomeChangeEvento: PropTypes.func.isRequired,
};

export default Utilitarios;