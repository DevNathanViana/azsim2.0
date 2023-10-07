import CamposInfosOcorrencias from "./camposInfoOcorrencias"
import ListaContatos from "./listaContatos"
import ListaSetores from "./listaSetorizacao"
import ListaViagens from "./listaViagens"
import Tabs from "./tabs-modal"


function ModalOcorrencias() {

    return (

        <>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-fullscreen ">
                    <div class="modal-content">
                        <div class="modal-header text-center justify-content-center">
                            <nav class=" navbar navbar-dark bg-primary fixed-top mb-5 navbar text-center justify-content-center"
                                id="navbar">
                                <div class="container  justify-content-center titleClienteName"><h2 class=" ms-3">Invasão de setor
                                    11</h2></div>
                            </nav>

                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <header class="headerModalInfo">
                            <div class="row">
                                <div class="col-8 mb-2  ms-4">
                                    <div class="mt-3"><strong>Cliente:</strong> Nathan de Oliveira Viana</div>
                                    <div><strong>Endereço:</strong> Estrada Geral Laranjeiras &nbsp;<strong> Bairro:</strong>
                                        Laranjeiras &nbsp; <strong> Cidade:</strong> Pescaria Brava
                                    </div>
                                    <div><strong>Ponto de Referência:</strong> Prox. Subida Torre Embratel</div>
                                </div>

                                <div class="col text-end me-4">
                                    <div class="mt-3"><strong>Data:</strong> 12/10/21</div>
                                    <div><strong>Hora:</strong> 22:11</div>
                                </div>
                            </div>
                        </header>



                        <div class="modal-body p-0">

                            <div class="div1">
                                <CamposInfosOcorrencias />
                            </div>

                            <div class="div2 ">

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