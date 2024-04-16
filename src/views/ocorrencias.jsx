import "../fragments/init"
import '../css/ocorrencias.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ModalOcorrencia from '../fragments/ocorrenciaModal';
import styled from 'styled-components';
import axios from 'axios';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function Ocorrencias() {
  const [colocaEventosNaTela, setColocaEventosNaTela] = useState([]);
  const [colocaOcorrenciasNaTela, setColocaOcorrenciasNaTela] = useState([]);
  const [ocorrenciaModal, setOCorrenciaModal] = useState();
  const { register, handleSubmit } = useForm({});
  const [selectedValue, setSelectedValue] = useState("sim");
  const [filtroNomeEventos, setFiltroNomeEventos] = useState('');



  const handleFiltroNomeChangeEvento = (event) => {
    setFiltroNomeEventos(event.target.value);
  };

  const filtrarDados = async () => {
    try {
      const respostaEventosFiltrados = await axios.get(`http://seu-endpoint-api/eventos?nome=${filtroNomeEventos}`);
      setColocaEventosNaTela(respostaEventosFiltrados.data);
    } catch (error) {
      console.error('Erro ao filtrar dados:', error);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const onSubmit = (formData, dataId) => {
    const dataJson = JSON.stringify(formData);
    console.log(dataJson);
    alert('Formulário enviado com sucesso!');

    setColocaOcorrenciasNaTela((ocorrenciasAntigas) => {
      const novasOcorrencias = ocorrenciasAntigas.filter((ocorrencia) => ocorrencia.id !== dataId);
      return novasOcorrencias;
    });
  };



  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/monitor-websocket');
    const stompClient = Stomp.over(socket);

    const connectCallBack = () => {
      console.log('Conexão WebSocket estabelecida com sucesso!');
    };

    const errorCallback = (error) => {
      console.error('Erro na conexão WebSocket:', error);
    };

    socket.onclose = () => {
      console.log('Conexão encerrada');
      reconnect();
    };

    const reconnect = () => {
      console.log("Reconectando...");
      if (stompClient !== null) {
        stompClient.disconnect();
      }
      connect();
    };

    const connect = () => {
      stompClient.connect({}, connectCallBack, errorCallback);
    };

    connect();

    return () => {
      if (stompClient !== null) {
        stompClient.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const cachedData = JSON.parse(localStorage.getItem('cachedData') || '[]');
    setColocaEventosNaTela(cachedData);
    setColocaOcorrenciasNaTela(cachedData);
  }, []);


  const ScrollContainer = styled.div`
  overflow: hidden;
  max-width: 100%;
`;


  const renderEventCard = (data, index) => {

    if (data.id) {
      return null;
    }

    const gravidadeClassEvento = data.gravidade === 'normal' ? 'evento-normal-gravidade' :
      'evento-grave-gravidade';

    return (

      <Fragment key={index} >

        <div className={`divInformacoesEventos t-start p-3 mt-2 mb-2 ${gravidadeClassEvento}`} >
          <div className="container">

            <div className="row mb-1">
              <div className="col">
                <strong>STATUS:</strong> {data.status}
              </div>
              <div className="col">
                <strong>CODIFICADOR:</strong> {data.codificador}
              </div>
              <div className="col endereco" >
                <strong>ENDEREÇO:</strong> {data.endereco}
              </div>
              <div className="col">
                <strong>STATUS:</strong> {data.status}
              </div>
            </div>
            <div className="row">
              <div className="col " >
                <strong>DESCRIÇÃO:</strong> {data.descricao}

              </div>
              <div className="col cliente">
                <strong>CLIENTE:</strong> {data.cliente}
              </div>

              <div className="col">
                <strong>COM:</strong> {data.com} /   <strong>CTX:</strong> {data.ctx}
              </div>
              <div className="col">
                <strong>CIDADE:</strong> {data.cidade}
              </div>
            </div>
          </div>
        </div>


      </Fragment>


    )
  }

  const renderOcorrenciaCard = (dataOcorrencia, index) => {

    if (!dataOcorrencia.id) {
      return null;
    }

    const gravidadeClass = dataOcorrencia.gravidade === 'normal' ? 'normal-gravidade' :
      dataOcorrencia.gravidade === 'moderada' ? 'moderada-gravidade' :
        'grave-gravidade';


    return (

      <Fragment key={index} >
        <div className={`infoOcorrencia card mb-3 ${gravidadeClass}`}  >
          <div id='cardOcorrencia' onClick={() => { setOCorrenciaModal(dataOcorrencia) }} className={`card-important card-header ${gravidadeClass}`} data-bs-toggle="modal" data-bs-target={`#modal-${dataOcorrencia.id}`}>
            <div className="row">
              <div className="col">
                <div className="dataEHoraCard mt-1 text-start"><strong>{dataOcorrencia.dataDaOcorrencia}</strong></div>
              </div>
              <div className="col">
                <div className="dataEHoraCard mt-1 text-end "><strong>{dataOcorrencia.horaOcorrencia}</strong></div>
              </div>
              <div className="descricaoOcorrencia mt-1 text-center"><strong>{dataOcorrencia.descricaoDaOcorrencia}</strong></div>
            </div>
            <ScrollContainer><div className="nomeNoCard mt-2 mb-1 text-center scroll-on-hover"><strong className='ellipsis'>{dataOcorrencia.nomeOcorrencia}</strong></div></ScrollContainer>
            <ScrollContainer><div className="nomeNoCard mb-1 text-center scroll-on-hover"><strong className='ellipsis'>{dataOcorrencia.enderecoOcorrencia}</strong></div></ScrollContainer>
          </div>
        </div>

      </Fragment>

    )
  }

  return (
    <>


      <div className="utilitarios">
        <div className="fitro ">
          <label className='text-start' id='labelFiltro' htmlFor="filtroNome">Filtrar eventos por nome</label>
          <div className='d-flex'>
            <input
              className='form-control'
              type="text"
              name="filtroNome"
              id="filtroEvento"
              placeholder='Ex: João da Silva'
              value={filtroNomeEventos}
              onChange={handleFiltroNomeChangeEvento}
            />
            <button className='btn btn-secondary ms-2' onClick={filtrarDados}>Filtrar</button>
          </div>
        </div>
      </div>

      <div className='divEventos'>
        {colocaEventosNaTela.map((data, index) => { return renderEventCard(data, index) })}
      </div>
      <div className="divOcorrencias">
        {colocaOcorrenciasNaTela.map((dataOcorrencia, index) => { return renderOcorrenciaCard(dataOcorrencia, index) })}
      </div>
      {/* {newFunction(dataOcorrencia, handleSubmit, onSubmit, register, selectedValue, handleSelectChange)} */}

      <ModalOcorrencia
        dataOcorrencia={ocorrenciaModal || {}}
        handleSelectChange={handleSelectChange}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        selectedValue={selectedValue}
      // dismissModal={dismissModal}
      />

    </>

  )

}

export default Ocorrencias