import { Link } from "react-router-dom"
import '../css/form.css'

function Navbar() {



    return (
        <>
            <nav className=" navbar navbar-dark bg-primary fixed-top mb-5" id="navbar">
                <button className="navbar-toggler ms-3" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                    <span className="navbar-toggler-icon"></span>

                </button>
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
                                <Link className="nav-link" id="form" aria-current="page" to="/form">Cadastrar</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" id="ocorrencias" aria-current="page" to="/ocorrencias">Ocorrencias</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" id="consultaCliente" aria-current="page" to="/consulta">Consultar Cliente</Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>



        </>

    )

}

export default Navbar