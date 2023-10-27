import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Table } from 'reactstrap';
import { useForm } from "react-hook-form";
import '../css/cadastros.css';
import EventosCard from '../fragments/EventosCard';


function InfoView() {


    


    function exibeEvento() {

        const conteudoEvento = `
        <div id='monitorEventos' class='divInformacoesEventos p-3 mt-2 mb-2 '>
            <div class='container'>
                <div class='row mb-1'>
                    <div class='col'>
                        <strong> DATA:</strong> 12/02/23
                    </div>
                    <div class='col'>
                        <strong> DESCRIÇÃO: </strong>arrombamento
                    </div>
                    <div class='col text-end'>
                        <strong> STATUS:</strong> 121212
                    </div>
                </div>
                <div class='row mb-1'>
                    <div class='col'>
                        <strong> CODIFICADOR:</strong> 00987
                    </div>
                    <div class='col'>
                        <strong> CLIENTE:</strong> Nathan Viana
                    </div>
                    <div class='col text-end'>
                        <strong>COM:</strong> 09909
                    </div>
                </div>
                <div class='row'>
                    <div class='col'>
                        <strong>CTX:</strong> 09877
                    </div>
                    <div class='col'>
                        <strong>ENDEREÇO:</strong> Estrada Geral De Laranjeiras
                    </div>
                    <div class='col text-end'>
                        <strong>CIDADE:</strong> Pescaria Brava
                    </div>
                </div>
            </div>
        </div>`;

        const DivOndeVaiSerExibidoEvento = document.getElementById("divEventos");



        DivOndeVaiSerExibidoEvento.innerHTML += conteudoEvento;

    }

    function exibeOcorrencias() {

        const conteudoOcorrencias = `
  
  <div class="infoOcorrencia card mb-3">
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

     <div className='fundoInformacoes'>
     <div class="mb-1 text-center"><strong>Nathan De Oliveira Viana</strong></div>
          <div class="mb-1 text-center"><strong>Rua Marcolino Martins Cabral</strong></div>
     </div>
  </div>`

        const DivOndeVaiSerExibidoOcorrencia = document.getElementById("divOcorrencias");
        DivOndeVaiSerExibidoOcorrencia.innerHTML += conteudoOcorrencias;

    }

    return (
        <>

            <br />
            <br />
            <br />
            <br />

            <button class='fixed-top mb-5' id="exibirEvento" onClick={() => exibeEvento()} type='button'>addEvento</button>
            <button class='fixed-bottom' id="exibirOcorrencia" onClick={() => exibeOcorrencias()} type='button'>addOcorrencia</button>

            <div id='divEventos' class='divEventos'>


            </div>


            <div id='divOcorrencias' class="divOcorrencias mt-3 ">
            </div>

        </>

    )


}

export default InfoView