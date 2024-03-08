import { Link } from "react-router-dom"
import '../css/ocorrencias.css'

function Navbar() {



    return (
        <>
            <nav className=" navbar navbar-dark bg-primary fixed-top mb-5" id="navbar">
                <button className="navbar-toggler ms-3" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="atalhos">
                    <Link className="btnAtalho me-3" to="/ocorrencias"><i className="bi bi-display"></i></Link>
                    <Link className="btnAtalho me-3" to="/cadastroCliente"><i className="bi bi-person-fill-add"></i></Link>
                    <Link className="btnAtalho me-3" to="/consultaCliente"><i className="bi bi-search"></i></Link>
                </div>
                <div className=" offcanvas offcanvas-start text-bg-primary" tabIndex="-1" id="offcanvasDarkNavbar"
                    aria-labelledby="offcanvasDarkNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">AZSIM 2.0.0</h5>

                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                            aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-start flex-grow-1 pe-3">

                            <li className="nav-item">
                                <Link className="nav-link" id="form" aria-current="page" to="/cadastroCliente"><strong>Cadastrar</strong></Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" id="ocorrencias" aria-current="page" to="/ocorrencias"><strong>Ocorrencias</strong></Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" id="consultaCliente" aria-current="page" to="/consultaCliente"><strong>Consultar Cliente</strong></Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>



        </>

    )

}

export default Navbar