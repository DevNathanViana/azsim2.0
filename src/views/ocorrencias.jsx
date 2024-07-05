import "../fragments/Geral/init"
import '../css/ocorrencias.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Swal from 'sweetalert2';
import ModalOcorrencia from "../fragments/Ocorrencias/ModalOcorrencia";
import CardEventos from "../fragments/Ocorrencias/cardEventos";
import Utilitarios from "../fragments/Ocorrencias/utilitarios";
import CardOcorrencia from "../fragments/Ocorrencias/cardOcorrencia";

function Ocorrencias() {

  const [colocaEventosNaTela, setColocaEventosNaTela] = useState([]);
  const [colocaOcorrenciasNaTela, setColocaOcorrenciasNaTela] = useState([]);
  const [ocorrenciaModal, setOCorrenciaModal] = useState(null);
  const { register, handleSubmit } = useForm();
  const [filtroNomeEventos, setFiltroNomeEventos] = useState('');
  const [erro, setErro] = useState(null);
  const stompClientRef = useRef(null);
  const [mensagemUsuario, setMensagemUsuario] = useState('');

  const handleFiltroNomeChangeEvento = (event) => {
    setFiltroNomeEventos(event.target.value);
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
    limparCache()
    const connectCallBack = () => {
      console.log('Conexão WebSocket estabelecida com sucesso!');
      stompClientRef.current = client;
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
        console.log(dadosRecebidos);
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
        // Adicionar atraso antes de exibir o modal de erro
        setTimeout(() => {
          // Verificar se a conexão foi estabelecida
          if (!stompClientRef.current || !stompClientRef.current.connected) {
            Swal.fire({
              title: 'Erro!',
              text: 'Erro ao conectar. Por favor, tente novamente.',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        }, 5000);
      });
    };
    const reconnect = () => {
      console.log("Reconectando...");
      if (stompClientRef.current !== null) {
        stompClientRef.current.disconnect();
      }
      connect();
    };

    socket.onclose = () => {
      console.log('Conexão encerrada');
      reconnect();
    };

    connect();

    return () => {
      socket.close();
      if (stompClientRef.current !== null) {
        stompClientRef.current.disconnect();
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

  const limparCache = () => {
    localStorage.removeItem('cachedData');
    setColocaOcorrenciasNaTela([]);
    setColocaEventosNaTela([]);
    setMensagemUsuario('Cache limpo com sucesso!');
  };

  const renderEventCard = (data, index) => {
    if (data.id) {
      return null;
    }

    const gravidadeClassEvento = data.gravidade === '' ? 'evento-normal-gravidade' : 'evento-grave-gravidade';

    return <CardEventos index={index} data={data} gravidadeClassEvento={gravidadeClassEvento} />;
  };

  const renderOcorrenciaCard = (dataOcorrencia, index) => {
    if (!dataOcorrencia.id) {
      return null;
    }

    const gravidadeClass = dataOcorrencia.gravidade === 'normal' ? 'normal-gravidade' :
      dataOcorrencia.gravidade === 'moderada' ? 'moderada-gravidade' :
        'grave-gravidade';

    const PegaDadosComplementares = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/ocorrencia/${id}`);
        setOCorrenciaModal(response.data);
        console.log(response);
      } catch (error) {
        console.error('Erro ao obter dados complementares:', error);
      }
    };

    return <CardOcorrencia index={index} dataOcorrencia={dataOcorrencia} gravidadeClass={gravidadeClass} PegaDadosComplementares={PegaDadosComplementares} ScrollContainer={ScrollContainer} />;
  };


  return (
    <Fragment>
      <Utilitarios handleFiltroNomeChangeEvento={handleFiltroNomeChangeEvento} filtroNomeEventos={filtroNomeEventos} />

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

      <ModalOcorrencia dataOcorrencia={ocorrenciaModal || {}}
        handleSubmit={handleSubmit}
        register={register}
        setOCorrenciaModal={setOCorrenciaModal}
        setColocaOcorrenciasNaTela={setColocaOcorrenciasNaTela}
      />
    </Fragment>
  )


}

export default Ocorrencias