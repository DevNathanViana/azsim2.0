
function ListaViagens() {

    return (

        <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade" id="viagens" role="tabpanel" aria-labelledby="viagens-tab" th: fragment="listaDeViagens">
                <div className="infoViagem card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col">
                                <div className="mt-1 h6"><i className="bi bi-arrow-up"></i><strong>DATA
                                    SAÍDA:</strong>
                                    20/08/2023
                                </div>
                                <div className="mt-1 h6"><i className="bi bi-arrow-down"></i><strong>DATA VOLTA
                                    :</strong> 28/08/2023
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="divInformacoesViagens p-3 mb-2">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="mb-3"><strong>PROCEDIMENTOS:</strong> LIGAR PARA OS CONTATOS
                                    SALVOS, CASO NÃO SEJA POSSÍVEL UMA COMUNICAÇÃO , ACIONAR OS BOMBEIROS
                                </div>

                                <div className="mb-1"><strong>OBSERVAÇÕES:</strong> LIGAR PARA OS CONTATOS
                                    SALVOS, CASO NÃO SEJA POSSÍVEL UMA COMUNICAÇÃO , ACIONAR OS BOMBEIROS
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="infoViagem card ">
                    <div className="card-header">
                        <div className="row">
                            <div className="col">
                                <div className="mt-1 h6"><i className="bi bi-arrow-up"></i><strong>DATA
                                    SAÍDA:</strong>
                                    20/08/2023
                                </div>
                                <div className="mt-1 h6"><i className="bi bi-arrow-down"></i><strong>DATA VOLTA
                                    :</strong> 28/08/2023
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="divInformacoesViagens p-3 mb-2">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="mb-3"><strong>PROCEDIMENTOS:</strong> LIGAR PARA OS CONTATOS
                                    SALVOS, CASO NÃO SEJA POSSÍVEL UMA COMUNICAÇÃO , ACIONAR OS BOMBEIROS
                                </div>

                                <div className="mb-1"><strong>OBSERVAÇÕES:</strong> LIGAR PARA OS CONTATOS
                                    SALVOS, CASO NÃO SEJA POSSÍVEL UMA COMUNICAÇÃO , ACIONAR OS BOMBEIROS
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>

    )

}

export default ListaViagens