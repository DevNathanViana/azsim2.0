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
  const [erro, setErro] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const [mensagemUsuario, setMensagemUsuario] = useState('');

  const handleFiltroNomeChangeEvento = (event) => {
    setFiltroNomeEventos(event.target.value);
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


  const filtrarDados = async () => {
    try {
      const respostaEventosFiltrados = await axios.get(`http://seu-endpoint-api/eventos?nome=${filtroNomeEventos}`);
      setColocaEventosNaTela(respostaEventosFiltrados.data);
      setErro(null);
    } catch (error) {
      console.error('Erro ao filtrar dados:', error);
      ('Erro ao filtrar dados. Por favor, tente novamente.');
      setTimeout(() => {
        setErro(null);
      }, 3000);
    }
  };

  useEffect(() => {
    if (erro) {
      const timer = setTimeout(() => {
        setErro(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [erro]);

  useEffect(() => {
    if (mensagemUsuario) {
      const timer = setTimeout(() => {
        setMensagemUsuario('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [mensagemUsuario]);

  useEffect(() => {
    const socket = new SockJS('http://127.0.0.1:8080/api/monitor-websocket');
    const client = Stomp.over(socket);

    const connectCallBack = () => {

      console.log('Conexão WebSocket estabelecida com sucesso!');
      setMensagemUsuario('Conexão WebSocket estabelecida com sucesso!');
      setErro(''); // Limpa o estado de erro
      setStompClient(client);
      client.subscribe('/topic/ocorrencias', (message) => {
        const dadosRecebidos = JSON.parse(message.body);
        console.log(dadosRecebidos);
        const dadosEmCache = JSON.parse(localStorage.getItem('cachedData') || '[]');
        dadosEmCache.unshift(dadosRecebidos);
        const limiteLista = 20;
        const dadosLimitados = dadosEmCache.slice(0, limiteLista);
        localStorage.setItem('cachedData', JSON.stringify(dadosLimitados));
        setColocaOcorrenciasNaTela((dadosAntigosDaListaOcorrencias) => [dadosRecebidos, ...dadosAntigosDaListaOcorrencias]);
      });
      client.subscribe('/topic/eventos', (message) => {
        const dadosRecebidos = JSON.parse(message.body);
        console.log(dadosRecebidos)
        const dadosEmCache = JSON.parse(localStorage.getItem('cachedData') || '[]');
        dadosEmCache.unshift(dadosRecebidos);
        const limiteLista = 20;
        const dadosLimitados = dadosEmCache.slice(0, limiteLista);
        localStorage.setItem('cachedData', JSON.stringify(dadosLimitados));
        setColocaEventosNaTela((dadosAntigosDaListaEventos) => [dadosRecebidos, ...dadosAntigosDaListaEventos]);
      });
    };

    const connect = () => {
      client.connect({}, connectCallBack, (error) => {
        console.error('Erro ao conectar:', error);
        setErro('Erro ao conectar ao servidor WebSocket. Por favor, tente novamente.');
      });
    };

    const reconnect = () => {
      console.log("Reconectando...");
      if (stompClient !== null) {
        stompClient.disconnect();
      }
      connect();
    };

    socket.onclose = () => {
      console.log('Conexão encerrada');
      setMensagemUsuario('Conexão WebSocket encerrada. Tentando reconectar...');
      reconnect();
    };

    connect();

    return () => {
      socket.close();
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
    const gravidadeClassEvento = data.gravidade === '' ? 'evento-normal-gravidade' :
      'evento-grave-gravidade';
    return (



      <Fragment key={index} >
        <div className={`divInformacoesEventos p-3 mt-2 mb-2 ${gravidadeClassEvento}`} >
          <div className="container divInformacoesDeDentro">
            <div className=" row mb-1">
              <div className="col-1 divDaBola">
                <div className="bola"></div>
              </div>
              <div className="col">
                <strong>
                  {data.dataevento ? new Date(data.dataevento).toLocaleString('pt-BR') : 'N/E'}
                </strong>
              </div>
              <div className="col eventoEReferencia">
                <strong>{data.status ? data.status.slice(0, 40) : 'N/E'}</strong> . <strong>{data.referencia ? data.referencia.slice(0, 40) : 'N/E'}</strong>
              </div>
              <div className="col descricaoEvento" >
                <strong>{data.destatus ? data.destatus.slice(0, 40) : 'N/E'}</strong>
              </div>
              <div className="col">
                <strong>{data.nmcliente ? data.nmcliente.slice(0, 40) : 'N/E'}</strong>
              </div>
              <div className="col text-end">
                <strong>{data.cidade ? data.cidade.slice(0, 40) : 'N/E'}</strong>
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
            <div className="row mb-4">
              <div className="col dataCard mt-1 text-start">
                <strong>
                  {dataOcorrencia && dataOcorrencia.evento
                    ? new Date(dataOcorrencia.evento.dataevento).toLocaleDateString('pt-BR')
                    : 'Não disponível'}
                </strong>
              </div>
              <div className=" col HoraCard mt-1 me-4 text-end">
                <strong>
                  {dataOcorrencia && dataOcorrencia.evento
                    ? new Date(dataOcorrencia.evento.dataevento).toLocaleTimeString('pt-BR')
                    : 'Não disponível'}
                </strong>
              </div>
            </div>
            <div className="row">
              <div className="descricaoOcorrencia mt-1 text-center"><strong>{dataOcorrencia && dataOcorrencia.evento ? dataOcorrencia.evento.destatus : "Nao disponivel"}</strong></div>
            </div>
            <ScrollContainer><div className="nomeNoCard mt-2 mb-1 text-center scroll-on-hover"><strong className='ellipsis'> {dataOcorrencia && dataOcorrencia.evento ? dataOcorrencia.evento.nmcliente : "Não disponível"}</strong></div></ScrollContainer>
            <ScrollContainer><div className="nomeNoCard mb-1 text-center scroll-on-hover"><strong className='ellipsis'> {dataOcorrencia && dataOcorrencia.evento ? dataOcorrencia.evento.endereco : "Não disponível"}</strong></div></ScrollContainer>
          </div>
        </div>

      </Fragment>

    )
  }

  return (
    <>
      <div className="divMensagem fixed-top">
        {erro && <div className="alert alert-danger  ms-3 ">{erro}</div>}
        {mensagemUsuario && <div className="alert alert-success">{mensagemUsuario}</div>}
      </div>
      .
      <div className="utilitarios">
        <div className="filtro">

          <div className='d-flex'>
            <input
              className='form-control'
              type="text"
              name="filtroNome"
              id="filtroEvento"
              placeholder='Digite para filtrar...'
              value={filtroNomeEventos}
              onChange={handleFiltroNomeChangeEvento}
            />
            <button className='btn btn-secondary ms-2' onClick={filtrarDados}>Filtrar</button>

          </div>

        </div>


      </div>



      <div className='divEventos'>
        <div className="cabecalho">
          <div className="cabecalho2">
            <div className="row mb-1">
              <div className="col text-start">
                <strong></strong>
              </div>
              <div className="col data">
                <strong>Data</strong>
              </div>
              <div className="col evento">
                <strong>Evento</strong>
              </div>
              <div className="col descricao">
                <strong>Descrição</strong>
              </div>
              <div className="col cliente">
                <strong>Cliente</strong>
              </div>
              <div className="col text-end">
                <strong>Cidade</strong>
              </div>

            </div>
          </div>
        </div>
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