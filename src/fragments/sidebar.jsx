
import { Link } from 'react-router-dom';
import '../css/ocorrencias.css';

function Navbar() {

    return (
        <>
            <nav className="navbar navbar-dark bg-primary fixed-top mb-5" id="navbar">
                <button className="navbar-toggler ms-3" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="atalhos">
                    <Link className="btnAtalho me-3" to="/ocorrencias" >
                        <i className="bi bi-display"></i> Monitor de Eventos
                    </Link>
                    <Link className="btnAtalho me-3" to="/cadastroCliente" >
                        <i className="bi bi-person-fill-add"></i> Cadastro de Clientes
                    </Link>
                    <Link className="btnAtalho me-3" to="/consultaCliente" >
                        <i className="bi bi-search"></i> Atendimentos
                    </Link>
                </div>
                <div className="offcanvas offcanvas-start text-bg-primary" tabIndex="-1" id="offcanvasDarkNavbar"
                    aria-labelledby="offcanvasDarkNavbarLabel">
                    <div className="offcanvas-header">
                        <strong className="offcanvas-title" id="offcanvasDarkNavbarLabel">AZSIM 2.0.0</strong>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                            aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-start flex-grow-1 pe-3">
                            <li className="nav-item mb-5">
                                <h2 id="titulo"><strong>Monitor</strong></h2>
                                <Link className="nav-link" id="subtitulo" aria-current="page" to="/ocorrencias">
                                    <strong>Monitor de Eventos</strong>
                                </Link>
                                <Link className="nav-link" id="subtitulo" aria-current="page" to="/#">
                                    <strong>Consulta Atendimento</strong>
                                </Link>
                            </li>
                            <li className="nav-item mb-5">
                                <h2 id="titulo"><strong>Clientes</strong></h2>
                                <Link className="nav-link" id="subtitulo" aria-current="page" to="/cadastroCliente">
                                    <strong>Cadastro cliente</strong>
                                </Link>
                                <Link className="nav-link" id="subtitulo" aria-current="page" to="/consultaCliente">
                                    <strong>Consulta cliente</strong>
                                </Link>
                            </li>
                            <li className="nav-item mb-5">
                                <h2 id="titulo"><strong>Ordens de serviço</strong></h2>
                                <Link className="nav-link" id="subtitulo" aria-current="page" to="/#">
                                    <strong>Cadastro OS</strong>
                                </Link>
                                <Link className="nav-link" id="subtitulo" aria-current="page" to="/#">
                                    <strong>Consulta OS</strong>
                                </Link>
                            </li>
                            <h2 id="titulo"><strong>Relatórios</strong></h2>
                            <h2 id="titulo"><strong>Administração</strong></h2>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
