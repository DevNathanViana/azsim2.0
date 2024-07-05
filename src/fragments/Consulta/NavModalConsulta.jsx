import PropTypes from 'prop-types';


function NavModalConsulta({ activeTab, toggleTab }) {
    return (
        <ul className="nav nav-tabs text-center mt-3 ms-2 justify-content-center" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
                <button
                    className={`nav-link ${activeTab === 'dados' ? 'active' : ''}`}
                    id={`dados-tab`}
                    data-bs-toggle="tab"
                    data-bs-target={`#dados`}
                    type="button"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                    onClick={() => toggleTab('dados')}
                >
                    Dados Básicos
                </button>
            </li>
            <li className="nav-item" role="presentation">
                <button
                    className={`nav-link ${activeTab === 'contatos' ? 'active' : ''}`}
                    id={`contatos-tab`}
                    data-bs-toggle="tab"
                    data-bs-target={`#contatos`}
                    type="button"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                    onClick={() => toggleTab('contatos')}
                >
                    Contatos
                </button>
            </li>
            <li className="nav-item" role="presentation">
                <button
                    className={`nav-link ${activeTab === 'setorizacao' ? 'active' : ''}`}
                    id={`setorizacao-tab`}
                    data-bs-toggle="tab"
                    data-bs-target={`#setorizacao`}
                    type="button"
                    role="tab"
                    aria-controls="contact"
                    aria-selected="false"
                    onClick={() => toggleTab('setorizacao')}
                >
                    Setorização
                </button>
            </li>
            <li className="nav-item" role="presentation">
                <button
                    className={`nav-link ${activeTab === 'viagens' ? 'active' : ''}`}
                    id={`viagens-tab`}
                    data-bs-toggle="tab"
                    data-bs-target={`#viagens`}
                    type="button"
                    role="tab"
                    aria-controls="contact"
                    aria-selected="false"
                    onClick={() => toggleTab('viagens')}
                >
                    Viagens
                </button>
            </li>
        </ul>

    )

}

NavModalConsulta.propTypes = {
    activeTab: PropTypes.func.isRequired,
    toggleTab: PropTypes.func.isRequired,
}



export default NavModalConsulta;