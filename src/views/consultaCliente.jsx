import '../css/consultaCliente.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

function ConsultaCliente() {

  const [filtro, setFiltro] = useState('');
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState('dados'); // Estado para controlar a aba ativa

  const [dadosBasicos, setDadosBasicos] = useState({})


  const buscarClientes = async () => {
    try {
      let response;

      if (filtro) {
        response = await axios.get(`http://localhost:8080/api/cliente?nome=${filtro}`);
      } else {
        response = await axios.get('http://localhost:8080/api/cliente');
      }

      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  useEffect(() => {
    buscarClientes();
  },);



  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const toggleModal = (cliente) => {
    setClienteSelecionado(cliente)
    setModal(!modal);
  };

  const navigate = useNavigate();

  const handleEditCliente = async (id) => {
    try {
      if (id) {
        const response = await axios.get(`http://localhost:8080/api/cliente/${id}`);
        const clienteParaEdicao = response.data;

        console.log('Dados recebidos da API:', clienteParaEdicao);

        // Preencha os campos do formulário com os dados do cliente para edição
        setDadosBasicos({
          ...dadosBasicos,
          unidade: clienteParaEdicao.unidade,
          codHabil: clienteParaEdicao.codHabil,
          codCondor: clienteParaEdicao.codCondor,
          natureza: clienteParaEdicao.natureza,
          documento: clienteParaEdicao.documento,
          incMunincipal: clienteParaEdicao.incMunincipal,
          nome: clienteParaEdicao.nome,
          nomeFantasia: clienteParaEdicao.nomeFantasia,
          endereco: clienteParaEdicao.endereco,
          bairro: clienteParaEdicao.bairro,
          cidade: clienteParaEdicao.cidade,
          uf: clienteParaEdicao.uf,
          cep: clienteParaEdicao.cep,
          observacao: clienteParaEdicao.observacao,
          codificador: clienteParaEdicao.codificador,
          contatos: clienteParaEdicao.contatos,
          setores: clienteParaEdicao.setores,
          viagens: clienteParaEdicao.viagens,
        });
      }
      // Redirecionar para a página de edição, passando os detalhes do cliente como parâmetros na URL
      navigate(`/edicaoCliente/${id}`);
    } catch (error) {
      console.error('Erro ao obter detalhes do cliente:', error);
    }
  };


  const handleBuscarClientes = async () => {
    // Carrega todos os clientes
    await buscarClientes();

    // Aplica o filtro de texto
    let resultadosFiltrados = clientes.filter(cliente =>
      Object.values(cliente).some(valor =>
        valor.toString().toLowerCase().includes(filtro.toLowerCase())
      )
    );
    setClientes(resultadosFiltrados);
  };

  const handleDetalhesCliente = (cliente) => {
    setClienteSelecionado(cliente);
    setModal(true);
  };

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  const clientesParaExibir = filtro ? clientesFiltrados : clientes.slice(-20);

  return (
    <>

      <div className="filtros">
        <div className="input-group w-100 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Digite o que deseja filtrar"
            aria-label="Digite o que deseja filtrar"
            aria-describedby="button-addon2"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={handleBuscarClientes} // Adiciona a chamada da função de busca ao clicar no botão
          >
            Buscar
          </button>
        </div>
      </div>



      <div className="divTabela">
        <table className="tabela-clientes  table table-bordered table-striped table-hover">
          <thead className="table-light">
            <tr>
              <td className="col-5">
                <strong>Nome</strong>
              </td>
              <td className="col">
                <strong>Unidade</strong>
              </td>
              <td className="col-6">
                <strong>Endereço</strong>
              </td>
              <td className="col-1">
                <strong>Editar</strong>
              </td>

            </tr>
          </thead>

          <tbody>
            {clientesParaExibir.map((cliente) => (
              <tr id='linhaInfoUsuario' key={cliente.id} onClick={() => handleDetalhesCliente(cliente)}>
                <td onClick={toggleModal} className="col-2 tdTabela">{cliente.nome}</td>
                <td onClick={toggleModal} className="col-3 tdTabela">
                  <p>{cliente.unidade}</p>
                </td>
                <td onClick={toggleModal} className="col-3 tdTabela">
                  <p>{cliente.endereco}</p>
                </td>
                <td className="col-2 tdTabela">
                  <Button className='btnEdit' onClick={() => handleEditCliente(cliente.id)}><i className="bi bi-pencil-square" /></Button>
                  {/* <Button className='btnTrash' onClick={() => handleDeleteCliente(cliente.id)}><i className="bi bi-trash3"></i></Button> */}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <Modal isOpen={modal} toggle={toggleModal} size="xl" className="modal-fullscreen modalCliente">
        <ModalHeader toggle={toggleModal}>Detalhes do Cliente</ModalHeader>
        <ModalBody>
          <ul className="nav nav-tabs text-center mt-3 ms-2 justify-content-center" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'dados' ? 'active' : ''}`}
                id={`dados-tab`}
                data-bs-toggle="tab"
                data-bs-target={`#dados`}
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
                onClick={() => toggleTab('dados')}
              >
                Dados Básicos
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'contatos' ? 'active' : ''}`}
                id={`contatos-tab`}
                data-bs-toggle="tab"
                data-bs-target={`#contatos`}
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
                onClick={() => toggleTab('contatos')}
              >
                Contatos
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'setorizacao' ? 'active' : ''}`}
                id={`setorizacao-tab`}
                data-bs-toggle="tab"
                data-bs-target={`#setorizacao`}
                type="button"
                role="tab"
                aria-controls="contact"
                aria-selected="false"
                onClick={() => toggleTab('setorizacao')}
              >
                Setorização
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'viagens' ? 'active' : ''}`}
                id={`viagens-tab`}
                data-bs-toggle="tab"
                data-bs-target={`#viagens`}
                type="button"
                role="tab"
                aria-controls="contact"
                aria-selected="false"
                onClick={() => toggleTab('viagens')}
              >
                Viagens
              </button>
            </li>
          </ul>

          <div className="tab-content" id={`myTabContent-dados`}>
            {/* Dados Básicos */}
            <div className={`tab-pane fade ${activeTab === 'dados' ? 'show active' : ''}`} id={`dados`} role="tabpanel" aria-labelledby={`dados-tab`}>
              <div className="modalDadosBasicos j-content-center">
                <div className="container justify-content-center">
                  <h2 className='txtDados ms-3'>1 - Dados Básicos</h2>
                  <br></br>
                  <div className="row">
                    <div className="col mb-2">
                      <label htmlFor="unidade" className="form-label"><strong>* Unidade</strong></label>
                      <input className="form-select" value={clienteSelecionado?.unidade || ""} disabled name='unidade' readOnly />
                    </div>
                    <div className="col">
                      <label htmlFor="Hábil" className="form-label"><strong>Hábil</strong></label>
                      <input name='Hábil' type="text" id="Hábil" disabled value={clienteSelecionado?.codHabil || ""} className="form-control" readOnly />
                    </div>
                    <div className="col">
                      <label htmlFor="Condor" className="form-label"><strong>Condor</strong></label>
                      <input name='Condor' type="text" id="Condor" disabled value={clienteSelecionado?.codCondor || ""} className="form-control" readOnly />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col mb-2">
                      <label htmlFor="Natureza" className="form-label"><strong>* Natureza</strong></label>
                      <input className="form-select" disabled value={clienteSelecionado?.natureza || ""} name='Natureza' readOnly />
                    </div>
                    <div className="col">
                      <label htmlFor="CPF" className="form-label"><strong>* CPF</strong></label>
                      <input name='CPF' disabled type="text" id="CPF" value={clienteSelecionado?.documento || ""} className="form-control" readOnly />
                    </div>
                    <div className="col">
                      <label htmlFor="Inscrição" className="form-label"><strong>Inscrição Municipal</strong></label>
                      <input name='Inscrição' disabled type="text" id="Inscrição" value={clienteSelecionado?.inscMunicipal || ""} className="form-control" readOnly />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col">
                      <label htmlFor=" Nome" className="form-label"><strong>* Nome/Razão Social</strong></label>
                      <input name=' Nome' disabled type="text" id=" Nome" value={clienteSelecionado?.nome || ""} className="form-control" readOnly />
                    </div>
                    <div className="col">
                      <label htmlFor="Nomef" className="form-label"><strong>Nome Fantasia</strong></label>
                      <input name='Nomef' disabled type="text" id="Nomef" value={clienteSelecionado?.nomeFantasia || ""} className="form-control" readOnly />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col">
                      <label htmlFor="Endereço" className="form-label"><strong>Endereço</strong></label>
                      <input name='Endereço' disabled type="text" id="Endereço" value={clienteSelecionado?.endereco || ""} className="form-control" readOnly />
                    </div>
                    <div className="col">
                      <label htmlFor="Bairro" className="form-label"><strong>Bairro</strong></label>
                      <input name='Bairro' disabled type="text" id="Bairro" value={clienteSelecionado?.bairro || ""} className="form-control" readOnly />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label htmlFor="Cidade" className="form-label"><strong>Cidade</strong></label>
                      <input name='Cidade' disabled type="text" id="Cidade" value={clienteSelecionado?.cidade || ""} className="form-control" readOnly />
                    </div>
                    <div className="col">
                      <label htmlFor="Uf" className="form-label"><strong>Uf</strong></label>
                      <input name='Uf' disabled type="text" id="Uf" value={clienteSelecionado?.uf || ""} className="form-control" readOnly />
                    </div>
                    <div className="col">
                      <label htmlFor="CEP" className="form-label"><strong>CEP</strong></label>
                      <input name='CEP' disabled type="text" id="CEP" value={clienteSelecionado?.cep || ""} className="form-control" readOnly />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col">
                      <label htmlFor="Observações" className="form-label"><strong>Observações</strong></label>
                      <textarea name='Observações' disabled type="text" rows='3' id="Observações" value={clienteSelecionado?.observacao || ""} className="form-control" readOnly />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contatos */}
            <div className={`tab-pane fade ${activeTab === 'contatos' ? 'show active' : ''}`} id={`contatos`} role="tabpanel" aria-labelledby={`contatos-tab`}>
              <div className="modalContatos j-content-center">
                <div className="container justify-content-center">
                  <h2 className='txtContatos ms-3'>2 - Contatos</h2>
                  <br></br>

                  <div className="row">
                    {(clienteSelecionado?.contatos || []).map((contato, index) => (
                      <div key={index} className="col mb-2">
                        <div className="row">
                          <div className="col">
                            <label htmlFor={`contato-nome-${index}`} className="form-label"><strong>Nome do Contato</strong></label>
                            <input
                              disabled
                              id={`contato-nome-${index}`}
                              className="form-control"
                              value={contato.nome || ""}
                              name={`contato-nome-${index}`}
                              readOnly
                            />
                          </div>
                          <div className="col">
                            <label htmlFor={`contato-senha-${index}`} className="form-label"><strong>Senha</strong></label>
                            <input
                              disabled
                              id={`contato-senha-${index}`}
                              className="form-control"
                              value={contato.senha || ""}
                              name={`contato-senha-${index}`}
                              readOnly
                            />
                          </div>
                          <div className="col">
                            <label htmlFor={`contato-contraSenha-${index}`} className="form-label"><strong>Contra Senha</strong></label>
                            <input
                              disabled
                              id={`contato-contraSenha-${index}`}
                              className="form-control"
                              value={contato.contraSenha || ""}
                              name={`contato-contraSenha-${index}`}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col">
                            <label htmlFor={`contato-telefone-${index}`} className="form-label"><strong>Telefone</strong></label>
                            <input
                              disabled
                              id={`contato-telefone-${index}`}
                              className="form-control"
                              value={contato.telefone || ""}
                              name={`contato-telefone-${index}`}
                              readOnly
                            />
                          </div>
                          <div className="col">
                            <label htmlFor={`contato-nome-${index}`} className="form-label"><strong>Data de Nascimento</strong></label>
                            <input
                              disabled
                              id={`contato-dataNascimento-${index}`}
                              className="form-control"
                              value={contato.dataNascimento ? new Date(contato.dataNascimento).toLocaleDateString('pt-BR') : ""}
                              name={`contato-dataNascimento-${index}`}
                              readOnly
                            />
                          </div>
                          <div className="row mt-3">
                            <div className="col">
                              <label htmlFor={`contato-observacao-${index}`} className="form-label"><strong>Observações</strong></label>
                              <textarea
                                disabled
                                rows={3}
                                id={`contato-observacao-${index}`}
                                className="form-control"
                                value={contato.observacao || ""}
                                name={`contato-observacao -${index}`}
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                  </div>

                  {/* Continue adicionando mais campos conforme necessário */}
                </div>
              </div>
            </div>
            {/* Setorização */}
            <div className={`tab-pane fade ${activeTab === 'setorizacao' ? 'show active' : ''}`} id={`setorizacao`} role="tabpanel" aria-labelledby={`setorizacao-tab`}>
              <div className="modalSetorizacao j-content-center">
                <div className="container justify-content-center">
                  <h2 className='txtSetorizacao ms-3'>3 - Setorização</h2>
                  <br></br>

                  <div className="row">
                    {(clienteSelecionado?.setores || []).map((setor, index) => (
                      <div key={index} className="col mb-2">
                        {/* Adicione campos de setorização conforme necessário */}
                        <div className="row">
                          <div className="col">
                            <label htmlFor={`setor-nome-${index}`} className="form-label"><strong>Setor</strong></label>
                            <input
                              disabled
                              id={`setor-nome-${index}`}
                              className="form-control"
                              value={setor.setor || ""}
                              name={`setor-nome-${index}`}
                              readOnly
                            />
                          </div>
                          <div className="col">
                            <label htmlFor={`setor-local-${index}`} className="form-label"><strong>Local da Instalação</strong></label>
                            <input
                              disabled
                              id={`setor-local-${index}`}
                              className="form-control"
                              value={setor.localizacao || ""}
                              name={`setor-local-${index}`}
                              readOnly
                            />
                          </div>
                          <div className="row mt-3">
                            <div className="col">
                              <label htmlFor={`setor-nome-${index}`} className="form-label"><strong>Observações</strong></label>
                              <input
                                disabled
                                id={`setor-obs-${index}`}
                                className="form-control"
                                value={setor.observacao || ""}
                                name={`setor-obs-${index}`}
                                readOnly
                              />
                            </div>
                          </div>

                          {/* Adicione outros campos de setorização conforme necessário */}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Continue adicionando mais campos de setorização conforme necessário */}
                </div>
              </div>
            </div>

            {/* Viagens */}
            <div className={`tab-pane fade ${activeTab === 'viagens' ? 'show active' : ''}`} id={`viagens`} role="tabpanel" aria-labelledby={`viagens-tab`}>
              <div className="modalViagens j-content-center">
                <div className="container justify-content-center">
                  <h2 className='txtViagens ms-3'>4 - Viagens</h2>
                  <br></br>
                  <div className="row">
                    {(clienteSelecionado?.viagens || []).map((viagem, index) => (
                      <div key={index} className="col mb-2">
                        {/* Adicione campos de viagens conforme necessário */}
                        <div className="row">
                          <div className="row">
                            <div className="col">
                              <label htmlFor={`nome-saida-${index}`} className="form-label"><strong>Nome de Saida</strong></label>
                              <input
                                disabled
                                id={`nome-saida-${index}`}
                                className="form-control"
                                value={viagem.nomeContatoNotificacaoSaida || ""}
                                name={`nome-saida-${index}`}
                                readOnly
                              />
                            </div>
                            <div className="col">
                              <label htmlFor={`nome-volta-${index}`} className="form-label"><strong>Nome de Volta</strong></label>
                              <input
                                disabled
                                id={`nome-volta-${index}`}
                                className="form-control"
                                value={viagem.nomeContatoNotificacaoVolta || ""}
                                name={`nome-volta-${index}`}
                                readOnly
                              />
                            </div>
                            <div className="col">
                              <label htmlFor={`data-saida-${index}`} className="form-label"><strong>Data de Saida</strong></label>
                              <input
                                disabled
                                id={`data-saida-${index}`}
                                className="form-control"
                                value={viagem.dataSaida || ""}
                                name={`data-saida-${index}`}
                                readOnly
                              />
                            </div>
                            <div className="col">
                              <label htmlFor={`data-volta-${index}`} className="form-label"><strong>Data de Volta</strong></label>
                              <input
                                disabled
                                id={`data-volta-${index}`}
                                className="form-control"
                                value={viagem.dataVolta || ""}
                                name={`data-volta-${index}`}
                                readOnly
                              />


                            </div>
                            <div className="row mt-3">
                              <div className="col">
                                <label htmlFor={`viagem-obs-${index}`} className="form-label"><strong>Observações</strong></label>
                                <textarea
                                  rows={3}
                                  disabled
                                  id={`viagem-obs-${index}`}
                                  className="form-control"
                                  value={viagem.observacao || ""}
                                  name={`viagem-obs-${index}`}
                                  readOnly
                                />
                              </div>
                            </div>

                            <div className="row mt-3">
                              <div className="col">
                                <label htmlFor={`viagem-procedimentos-${index}`} className="form-label"><strong>Procedimentos</strong></label>
                                <textarea
                                  rows='3'
                                  disabled
                                  id={`viagem-procedimentos-${index}`}
                                  className="form-control"
                                  value={viagem.procedimento || ""}
                                  name={`viagem-procedimentos-${index}`}
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>

                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Fechar</Button>
          <Button className='btnEdit' onClick={() => handleEditCliente(clienteSelecionado.id)}><i className="bi bi-pencil-square" /></Button>
        </ModalFooter>
      </Modal >

    </>
  );
}

export default ConsultaCliente;