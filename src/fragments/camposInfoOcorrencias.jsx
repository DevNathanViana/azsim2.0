import { useState } from "react";

function CamposInfosOcorrencias() {

  const [selectedValue, setSelectedValue] = useState(''); // Estado para a seleção

  // Função para manipular a mudança na seleção
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (

    <>

      <div className="row ms-1 me-2 mt-2" >
        <div className="col">
          <label htmlFor="categoria" className="form-label">Categoria</label>
          <select id="categoria" className="form-select" aria-label=".form-select example">
            <option selected value="1"></option>
            <option value="2"></option>
          </select>
        </div>
        <div className="col">
          <label htmlFor="sub-categoria" className="form-label">Sub-Categoria</label>
          <select id="sub-categoria" className="form-select" aria-label=".form-select example">
            <option selected value="1"></option>
            <option value="2"></option>
          </select>
        </div>

        <div className="col">
          <label htmlFor="operador" className="form-label">Operador</label>
          <select id="operador" className="form-select" aria-label=".form-select example">
            <option selected value="1"></option>
            <option value="2"></option>
          </select>
        </div>

      </div>
      <div className="row ms-1 me-2 mt-2">

        <div className="col-5">
          <label  htmlFor="deslocamento" className="form-label">Foi necessário deslocamento?</label>
          <select value={selectedValue} onChange={handleSelectChange} id="deslocamento" className="form-select" aria-label=".form-select example">
          <option value="1">Sim</option>
          <option value="2">Não</option>
          </select>
        </div>

        <div className="col">
          <label htmlFor="numAgente" className="form-label">Número Agente</label>
          <input  disabled={selectedValue === '2'} type="text" className="form-control" id="numAgente" placeholder="" />
        </div>
        <div className="col">
          <label htmlFor="agente" className="form-label">Agente</label>
          <select  disabled={selectedValue === '2'} id="agente" className="form-select" aria-label=".form-select example">
            <option selected value="2"></option>
            <option value="2"></option>
          </select>
        </div>

      </div>

      <div>
        <div className="row ms-2 me-2 mt-2">

          <div className="col">
            <label htmlFor="horaSaida" className="form-label">H. Saída Empr.</label>
            <input disabled={selectedValue === '2'} type="text" className="form-control" id="horaSaida" placeholder="00:00" />
          </div>

          <div className="col">
            <label htmlFor="horaChegada" className="form-label">H. Cheg. Local</label>
            <input  disabled={selectedValue === '2'} type="text" className="form-control" id="horaChegada" placeholder="00:00" />
          </div>

          <div className="col">
            <label htmlFor="tempDeslocamento" className="form-label">Tempo de Desloc.</label>
            <input  disabled={selectedValue === '2'} type="text" className="form-control" id="tempDeslocamento" placeholder="00:00" />
          </div>

        </div>

        <div className="row ms-2 me-2 mt-2">

          <div className="col">
            <label htmlFor="horaSaidaLocal" className="form-label">H. Saída Local</label>
            <input  disabled={selectedValue === '2'} type="text" className="form-control" id="horaSaidaLocal" placeholder="00:00" />
          </div>

          <div className="col">
            <label htmlFor="horaChegadaEmpresa" className="form-label">H. Cheg. Empr.</label>
            <input  disabled={selectedValue === '2'} type="text" className="form-control" id="horaChegadaEmpresa" placeholder="00:00" />
          </div>

          <div className="col">
            <label htmlFor="tempRetorno" className="form-label">Tempo de Retorno</label>
            <input  disabled={selectedValue === '2'} type="text" className="form-control" id="tempRetorno" placeholder="00:00" />
          </div>
        </div>

        <div className="row ms-2 me-2 mt-2">

          <div className="col">
            <label htmlFor="horaAbateLacre" className="form-label">H. Abate Lacre</label>
            <input  disabled={selectedValue === '2'} type="text" className="form-control" id="horaAbateLacre" placeholder="00:00" />
          </div>

          <div className="col">
            <label htmlFor="horaLacre" className="form-label">H. Lacre</label>
            <input  disabled={selectedValue === '2'} type="text" className="form-control" id="horaLacre" placeholder="00:00" />
          </div>

          <div className="col">
            <label htmlFor="tempAtemdimento" className="form-label">Tempo de Atendimento</label>
            <input  disabled={selectedValue === '2'} type="text" className="form-control" id="tempAtemdimento" placeholder="00:00" />
          </div>
        </div>
        <div className="row  ms-2 me-2 mt-2">
          <div className="col">
            <label htmlFor="kmSaida" className="form-label">Km de Saída</label>
            <input  disabled={selectedValue === '2'} type="text" className="form-control" id="kmSaida" placeholder="00:00" />
          </div>

          <div className="col">
            <label htmlFor="kmRetorno" className="form-label">Km de Retorno</label>
            <input  disabled={selectedValue === '2'} type="text" className="form-control" id="kmRetorno" placeholder="00:00" />
          </div>

          <div className="col">
            <label htmlFor="kmTotal" className="form-label">Km Total Percorrido</label>
            <input  disabled={selectedValue === '2'} type="text" className="form-control" id="kmTotal" placeholder="00:00" />
          </div>
        </div>

        <div className="row ms-2 me-2 mt-2 mb-3">
          <div className="col-sm">
            <label htmlFor="resumo" className="form-label">Resumo*</label>
            <textarea  disabled={selectedValue === '2'} className="form-control" id="resumo" rows="3"></textarea>
          </div>

        </div>

        <div className="row ms-2 me-2 mt-2 mb-3">
          <div className="col-sm">
            <label htmlFor="procedimentos" className="form-label">Procedimentos</label>
            <textarea  disabled={selectedValue === '2'} className="form-control" id="procedimentos" rows="3"></textarea>
          </div>
        </div>

        <div className="row ms-2 me-2 mt-2 mb-3">
          <div className="col-sm">
            <label htmlFor="ocorrenciaPolicial" className="form-label">Ocorrência Policial</label>
            <textarea  disabled={selectedValue === '2'} className="form-control" id="ocorrenciaPolicial" rows="3"></textarea>
          </div>
        </div>
      </div>
    </>

  )

}

export default CamposInfosOcorrencias