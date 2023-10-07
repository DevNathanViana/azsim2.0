import '../css/ocorrencias.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import ModalOcorrencias from '../fragments/modal-ocorrencias';

function Ocorrencias() {


    return (
        <>

            <br />
            <br />
            <br />

            <div class="divEventos ">

                <div id="monitorEventos" class="divInformacoesEventos p-3 mt-2 mb-2">
                    <div class="container">
                        <div class="row mb-1">
                            <div class="col">
                                <strong> DATA:</strong>
                            </div>
                            <div class="col">
                                <strong> DESCRIÇÃO:</strong>
                            </div>
                            <div class="col text-end">
                                <strong> STATUS:</strong>
                            </div>
                        </div>
                        <div class="row mb-1">
                            <div class="col">
                                <strong> CODIFICADOR:</strong>
                            </div>
                            <div class="col">
                                <strong> CLIENTE:</strong>
                            </div>
                            <div class="col text-end">
                                <strong>COM:</strong>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <strong>CTX:</strong>
                            </div>
                            <div class="col">
                                <strong>ENDEREÇO:</strong>
                            </div>
                            <div class="col text-end">
                                <strong>CIDADE:</strong>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="divOcorrencias mt-3">
                <div class="infoOcorrencia card ">
                    <div class="card-important card-header" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <div class="row">
                            <div class="col">
                                <div class=" dataEHoraCard mt-1 h6 text-start"><strong>12/09/2023</strong>
                                </div>
                            </div>
                            <div class="col">
                                <div class="dataEHoraCard mt-1 h6 text-end"><strong>12:22:46</strong>
                                </div>
                            </div>
                            <div class="mt-1 h5 text-center"><strong>INVASÃO</strong></div>
                        </div>
                    </div>

                    <div class="card-body infoOcorrencia">
                        <div class="mb-1 ">Nathan De Oliveira Viana</div>
                        <div class="mb-1 ">Rua Marcolino Martins Cabral</div>
                    </div>
                </div>
            </div>

            <ModalOcorrencias />

        </>

    )

}

export default Ocorrencias
