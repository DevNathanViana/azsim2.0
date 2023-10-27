import '../css/ocorrencias.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import ModalOcorrencias from '../fragments/modal-ocorrencias';
import { useEffect, useState } from 'react';

function Ocorrencias() {
  const [colocaEventosNaTela, setColocaEventosNaTela] = useState([]);
  const [colocaOcorrenciasNaTela, setColocaOcorrenciasNaTela] = useState([]);

  // Função para carregar os dados do localStorage quando a página é renderizada
  useEffect(() => {
    const cachedData = JSON.parse(localStorage.getItem('cachedData') || '[]');
    setColocaEventosNaTela(cachedData);
    setColocaOcorrenciasNaTela(cachedData);
  }, []);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080'); // Use a URL WebSocket apropriada

    ws.onmessage = (event) => {
      const dadosRecebidos = JSON.parse(event.data);

      const novosDados = dadosRecebidos;
      const dadosEmCache = JSON.parse(localStorage.getItem('cachedData') || '[]');
      dadosEmCache.unshift(novosDados); // Insira os novos dados no início (no topo)
       // Corte o array se ele exceder um limite de tamanho específico (250)
    if (dadosEmCache.length > 250) {
        dadosEmCache.splice(250); // Mantenha apenas os 250 primeiros elementos
      }
      localStorage.setItem('cachedData', JSON.stringify(dadosEmCache));
  
      // Atualize com os dados mais recentes
   
      // Mantenha a lista de tamanho máximo 250
      setColocaEventosNaTela((prevDataListEvent) => {
        const newEventList = [...prevDataListEvent, dadosRecebidos];
        return newEventList;
      });

      setColocaOcorrenciasNaTela((prevDataListOcorrencia) => {
        const newOcorrenciaList = [...prevDataListOcorrencia, dadosRecebidos];
        return newOcorrenciaList;
      });

      setColocaEventosNaTela(dadosEmCache);
      setColocaOcorrenciasNaTela(dadosEmCache);
    
  
    };

    return () => {
      ws.close();
    };
  }, []);



    // Função para renderizar um card com os dados recebidos
    const renderEventCard = (data, index) => (
        <div key={index} className="divInformacoesEventos p-3 mt-2 mb-2">
            <div className="container">

                <div className="row mb-1">
                    <div className="col">
                        <strong>DATA:</strong> {data.data}
                    </div>
                    <div className="col">
                        <strong>DESCRIÇÃO:</strong> {data.descricao}
                    </div>
                    <div className="col text-end">
                        <strong>STATUS:</strong> {data.status}
                    </div>
                </div>
                <div className="row mb-1">
                    <div className="col">
                        <strong>CODIFICADOR:</strong> {data.codificador}
                    </div>
                    <div className="col">
                        <strong>CLIENTE:</strong> {data.cliente}
                    </div>
                    <div className="col text-end">
                        <strong>COM:</strong> {data.com}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <strong>CTX:</strong> {data.ctx}
                    </div>
                    <div className="col">
                        <strong>ENDEREÇO:</strong> {data.endereco}
                    </div>
                    <div className="col text-end">
                        <strong>CIDADE:</strong> {data.cidade}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderOcorrenciaCard = (data, index) => (
        <div key={index} className="infoOcorrencia card mb-3">
            <div className="card-important card-header" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <div className="row">
                    <div className="col">
                        <div className=" dataEHoraCard mt-1 h6 text-start"><strong>{data.dataOcorrencia}</strong>
                        </div>
                    </div>
                    <div className="col">
                        <div className="dataEHoraCard mt-1 h6 text-end"><strong>{data.hora}</strong>
                        </div>
                    </div>
                    <div className="mt-1 h5 text-center"><strong>{data.descricaoDaOcorrencia}</strong></div>
                </div>
            </div>

            <div classNameName='fundoInformacoes'>
                <div className="mb-1 text-center"><strong>{data.nomeOcorrencia}</strong></div>
                <div className="mb-1 text-center"><strong>{data.enderecoOcorrencia}</strong></div>
            </div>


        </div>
    )

    return (
        <>
            <div className='divEventos'>
                {colocaEventosNaTela.map((data, index) => renderEventCard(data, index))}
            </div>
            <div className="divOcorrencias">
                {colocaOcorrenciasNaTela.map((data, index) => renderOcorrenciaCard(data, index))}
            </div>

            <ModalOcorrencias />

        </>

    )

}

export default Ocorrencias