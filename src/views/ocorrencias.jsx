import '../css/ocorrencias.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ModalOcorrencia from '../fragments/ocorrenciaModal';
import styled from 'styled-components';
import axios from 'axios';
// import axios from 'axios';
// import { Button } from 'reactstrap';
// import Modal from '../fragments/modal';
// import { Form } from 'reactstrap'

function Ocorrencias() {
  const [colocaEventosNaTela, setColocaEventosNaTela] = useState([]);
  const [colocaOcorrenciasNaTela, setColocaOcorrenciasNaTela] = useState([]);
  const [ocorrenciaModal, setOCorrenciaModal] = useState();
  const { register, handleSubmit } = useForm({});
  const [selectedValue, setSelectedValue] = useState("sim");
  const [horas, setHoras] = useState('00');
  const [minutos, setMinutos] = useState('00');
  const [segundos, setSegundos] = useState('00');
  const [filtroNomeEventos, setFiltroNomeEventos] = useState('');

  const handleFiltroNomeChangeEvento = (event) => {
    setFiltroNomeEventos(event.target.value);
  };

  const filtrarDados = async () => {
    try {
      const respostaEventosFiltrados = await axios.get(`http://seu-endpoint-api/eventos?nome=${filtroNomeEventos}`);
      setColocaEventosNaTela(respostaEventosFiltrados.data);

      // const respostaOcorrenciasFiltradas = await axios.get(`http://seu-endpoint-api/ocorrencias?nome=${filtroNomeOcorrencias}`);
      // setColocaOcorrenciasNaTela(respostaOcorrenciasFiltradas.data);
    } catch (error) {
      console.error('Erro ao filtrar dados:', error);
    }
  };

  useEffect(() => {
    const relogio = setInterval(() => {
      const dateToday = new Date();
      let hr = dateToday.getHours();
      let min = dateToday.getMinutes();
      let s = dateToday.getSeconds();

      if (hr < 10) hr = '0' + hr;
      if (min < 10) min = '0' + min;
      if (s < 10) s = '0' + s;

      setHoras(hr);
      setMinutos(min);
      setSegundos(s);
    }, 1000);

    return () => {
      clearInterval(relogio);
    };
  }, []);



  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };


  const onSubmit = (formData, dataId) => {

    const dataJson = JSON.stringify(formData);
    console.log(dataJson);
    alert('Formulário enviado com sucesso!')

    setColocaOcorrenciasNaTela((ocorrenciasAntigas) => {
      const novasOcorrencias = ocorrenciasAntigas.filter((ocorrencia) => ocorrencia.id !== dataId);
      return novasOcorrencias;
    })

  };

  // useEffect(() => {
  //   const ws = new WebSocket('ws://localhost:8080');

  //   ws.onmessage = (event) => {
  //     const dadosRecebidos = JSON.parse(event.data);
  //     const dadosEmCache = JSON.parse(localStorage.getItem('cachedData') || '[]');
  //     dadosEmCache.unshift(dadosRecebidos);
  //     const limiteLista = 20;
  //     const dadosLimitados = dadosEmCache.slice(0, limiteLista);
  //     localStorage.setItem('cachedData', JSON.stringify(dadosLimitados));
  //     if (dadosRecebidos.type === 'evento') {
  //       setColocaEventosNaTela((dadosAntigosDaListaEventos) => [dadosRecebidos, ...dadosAntigosDaListaEventos]);
  //     } else if (dadosRecebidos.type === 'ocorrencia') {
  //       setColocaOcorrenciasNaTela((dadosAntigosDaListaOcorrencias) => [dadosRecebidos, ...dadosAntigosDaListaOcorrencias]);
  //     }
  //   };
  //   return () => {
  //     ws.close();
  //   };
  // }, []);





  useEffect(() => {
    const cachedData = JSON.parse(localStorage.getItem('cachedData') || '[]');
    setColocaEventosNaTela(cachedData);
    setColocaOcorrenciasNaTela(cachedData);

  }, []);

  const ScrollContainer = styled.div`
  overflow: hidden;
  max-width: 100%;
`;


  // Função para renderizar um card com os dados recebidos
  const renderEventCard = (data, index) => {

    if (data.id) {
      // Se dataOcorrencia.dataOcorrencia for undefined, retorne null para evitar a renderização do card
      return null;
    }

    return (

      <Fragment key={index} >

        <div className="divInformacoesEventos p-3 mt-2 mb-2">
          <div className="container">

            <div className="row mb-1">
              <div className="col text-start">
                <strong>DATA:</strong> {data.data}
              </div>
              <div className="col text-center">
                <strong>DESCRIÇÃO:</strong> {data.descricao}
              </div>
              <div className="col text-end">
                <strong>STATUS:</strong> {data.status}
              </div>
            </div>
            <div className="row mb-1">
              <div className="col text-start">
                <strong>CODIFICADOR:</strong> {data.codificador}
              </div>
              <div className="col text-center">
                <strong>CLIENTE:</strong> {data.cliente}
              </div>
              <div className="col text-end">
                <strong>COM:</strong> {data.com}
              </div>
            </div>
            <div className="row text-start">
              <div className="col">
                <strong>CTX:</strong> {data.ctx}
              </div>
              <div className="col text-center">
                <strong>ENDEREÇO:</strong> {data.endereco}
              </div>
              <div className="col text-end">
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
      // Se dataOcorrencia.dataOcorrencia for undefined, retorne null para evitar a renderização do card
      return null;
    }

    // Determina a classe de estilo com base na gravidade
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

      <div className="infobtn">
        <div className="relogio">
          <div className='me-2 p-3'>
            <span id="Horas">{horas}</span>
            <span id="tempo"><h6>Horas</h6></span>
          </div>
          <div className='me-2 p-3'>
            <span id="Minutos">{minutos}</span>
            <span id="tempo"><h6>Minutos</h6>   </span>
          </div>
          <div className='me-2 p-3'>
            <span id="Segundos">{segundos}</span>
            <span id="tempo"><h6>Segundos</h6></span>
          </div>
        </div>
      </div>

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


