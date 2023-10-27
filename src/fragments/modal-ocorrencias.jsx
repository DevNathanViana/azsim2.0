import CamposInfosOcorrencias from "./camposInfoOcorrencias"
import ListaContatos from "./listaContatos"
import ListaSetores from "./listaSetorizacao"
import ListaViagens from "./listaViagens"
import Tabs from "./tabs-modal"


function ModalOcorrencias() {

    return (

        <>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen ">
                    <div className="modal-content">
                        <div className="modal-header text-center justify-content-center">
                            <nav className=" navbar navbar-dark bg-primary fixed-top mb-5 navbar text-center justify-content-center"
                                id="navbar">
                                <div className="container  justify-content-center titleClienteName"><h2 className="mt-1 ms-5">Invasão de setor
                                    11 </h2>
                                </div>
                            </nav>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <header className="headerModalInfo">
                            <div className="row">
                                <div className="col-8 mb-2  ms-4">
                                    <div className="mt-3"><strong>Cliente:</strong> Nathan de Oliveira Viana</div>
                                    <div><strong>Endereço:</strong> Estrada Geral Laranjeiras &nbsp;<strong> Bairro:</strong>
                                        Laranjeiras &nbsp; <strong> Cidade:</strong> Pescaria Brava
                                    </div>
                                    <div><strong>Ponto de Referência:</strong> Prox. Subida Torre Embratel</div>
                                </div>

                                <div className="col text-end me-4">
                                    <div className="mt-3"><strong>Data:</strong> 12/10/21</div>
                                    <div><strong>Hora:</strong> 22:11</div>
                                </div>
                            </div>
                        </header>



                        <div className="modal-body p-0">

                            <div className="div1">
                                <CamposInfosOcorrencias />
                            </div>

                            <div className="div2 ">

                                <Tabs />

                                <ListaContatos />

                                <ListaSetores />

                                <ListaViagens />

                            </div>
                        </div>


                    </div>
                </div>
            </div>

        </>

    )

}

export default ModalOcorrencias