
function CamposInfosOcorrencias () {

return (

<>

<div class="row ms-1 me-2 mt-2" >
  <div class="col">
    <label for="categoria" class="form-label">Categoria</label>
    <select id="categoria" class="form-select" aria-label=".form-select example">
      <option selected value="1"></option>
      <option value="2"></option>
    </select>
  </div>
  <div class="col">
    <label for="sub-categoria" class="form-label">Sub-Categoria</label>
    <select id="sub-categoria" class="form-select" aria-label=".form-select example">
      <option selected value="1"></option>
      <option value="2"></option>
    </select>
  </div>

  <div class="col">
    <label for="operador" class="form-label">Operador</label>
    <select id="operador" class="form-select" aria-label=".form-select example">
      <option selected value="1"></option>
      <option value="2"></option>
    </select>
  </div>

</div>
<div class="row ms-1 me-2 mt-2">

  <div class="col-5">
    <label for="deslocamento" class="form-label">Foi necessário deslocamento?</label>
    <select id="deslocamento" class="form-select" aria-label=".form-select example">
      <option selected value="1">Não</option>
      <option value="2">Sim</option>
    </select>
  </div>

  <div class="col">
    <label for="numAgente" class="form-label">Número Agente</label>
    <input type="text" class="form-control" id="numAgente" placeholder=""/>
  </div>
  <div class="col">
    <label for="agente" class="form-label">Agente</label>
    <select id="agente" class="form-select" aria-label=".form-select example">
      <option selected value="1"></option>
      <option value="2"></option>
    </select>
  </div>

</div>

<div>
  <div class="row ms-1 me-2 mt-2">

    <div class="col">
      <label for="horaSaida" class="form-label">H. Saída Empr.</label>
      <input type="text" class="form-control" id="horaSaida" placeholder="00:00"/>
    </div>

    <div class="col">
      <label for="horaChegada" class="form-label">H. Cheg. Local</label>
      <input type="text" class="form-control" id="horaChegada" placeholder="00:00"/>
    </div>

    <div class="col">
      <label for="tempDeslocamento" class="form-label">Tempo de Desloc.</label>
      <input type="text" class="form-control" id="tempDeslocamento" placeholder="00:00"/>
    </div>

  </div>

  <div class="row ms-1 me-2 mt-2">

    <div class="col">
      <label for="horaSaidaLocal" class="form-label">H. Saída Local</label>
      <input type="text" class="form-control" id="horaSaidaLocal" placeholder="00:00"/>
    </div>

    <div class="col">
      <label for="horaChegadaEmpresa" class="form-label">H. Cheg. Empr.</label>
      <input type="text" class="form-control" id="horaChegadaEmpresa" placeholder="00:00"/>
    </div>

    <div class="col">
      <label for="tempRetorno" class="form-label">Tempo de Retorno</label>
      <input type="text" class="form-control" id="tempRetorno" placeholder="00:00"/>
    </div>
  </div>

  <div class="row ms-1 me-2 mt-2">

    <div class="col">
      <label for="horaAbateLacre" class="form-label">H. Abate Lacre</label>
      <input type="text" class="form-control" id="horaAbateLacre" placeholder="00:00"/>
    </div>

    <div class="col">
      <label for="horaLacre" class="form-label">H. Lacre</label>
      <input type="text" class="form-control" id="horaLacre" placeholder="00:00"/>
    </div>

    <div class="col">
      <label for="tempAtemdimento" class="form-label">Tempo de Atendimento</label>
      <input type="text" class="form-control" id="tempAtemdimento" placeholder="00:00"/>
    </div>
  </div>
  <div class="row  ms-1 me-2 mt-2">
    <div class="col">
      <label for="kmSaida" class="form-label">Km de Saída</label>
      <input type="text" class="form-control" id="kmSaida" placeholder="00:00"/>
    </div>

    <div class="col">
      <label for="kmRetorno" class="form-label">Km de Retorno</label>
      <input type="text" class="form-control" id="kmRetorno" placeholder="00:00"/>
    </div>

    <div class="col">
      <label for="kmTotal" class="form-label">Km Total Percorrido</label>
      <input type="text" class="form-control" id="kmTotal" placeholder="00:00"/>
    </div>
  </div>

  <div class="row ms-1 me-2 mt-2 mb-3">
    <div class="col-sm">
      <label for="resumo" class="form-label">Resumo*</label>
      <textarea class="form-control" id="resumo" rows="3"></textarea>
    </div>

  </div>

  <div class="row ms-1 me-2 mt-2 mb-3">
    <div class="col-sm">
      <label for="procedimentos" class="form-label">Procedimentos</label>
      <textarea class="form-control" id="procedimentos" rows="3"></textarea>
    </div>
  </div>

  <div class="row ms-1 me-2 mt-2 mb-3">
    <div class="col-sm">
      <label for="ocorrenciaPolicial" class="form-label">Ocorrência Policial</label>
      <textarea class="form-control" id="ocorrenciaPolicial" rows="3"></textarea>
    </div>
  </div>
</div>
</>

)

}

export default CamposInfosOcorrencias