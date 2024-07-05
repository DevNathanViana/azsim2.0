import '../css/consultaCliente.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import NavModalConsulta from '../fragments/Consulta/navModalConsulta';
import TabDadosBasicos from '../fragments/Consulta/tabDadosBasicos';
import TabContatos from '../fragments/Consulta/tabContatos copy';
import TabSetores from '../fragments/Consulta/tabSetores';
import TabViagens from '../fragments/Consulta/tabViagens';

function ConsultaCliente() {

  const [filtro, setFiltro] = useState('');
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState('dados');
  const [dadosBasicos, setDadosBasicos] = useState({});

  const buscarClientes = useCallback(async () => {
    try {
      let response;
      if (filtro) {
        response = await axios.get(`http://127.0.0.1:8080/api/cliente?nome=${filtro}`);
      } else {
        response = await axios.get('http://127.0.0.1:8080/api/cliente');
      }
      setClientes(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [filtro]);

  useEffect(() => {
    buscarClientes();
  }, [buscarClientes]);

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
        const response = await axios.get(`http://127.0.0.1:8080/api/cliente/${id}`);
        const clienteParaEdicao = response.data;

        console.log('Dados recebidos da API:', clienteParaEdicao);

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
      navigate(`/edicaoCliente/${id}`);
    } catch (error) {
      console.error('Erro ao obter detalhes do cliente. Verifique sua conexão e tente novamente.');
    }
  };


  const handleDetalhesCliente = (cliente) => {
    setClienteSelecionado(cliente);
    setModal(true);
  };

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  const clientesParaExibir = filtro ? clientesFiltrados : clientes.slice(-90);

  return (
    <>
      <div className="filtros d-flex justify-content-between align-items-center">
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
            className="btn btn-primary"
            type="button"
            id="button-addon2"
          >
            Buscar
          </button>
        </div>
      </div>
      <div className='divBtnAdd'>
        <Link className="btnAddcliente t-center btn btn-primary"
          to="/cadastroCliente">
          <i className="bi bi-person-fill-add"> Adicionar Cliente +</i>
        </Link>
      </div>


      {filtro && clientesParaExibir.length > 0 ? (
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
                <tr key={cliente.id} onClick={() => handleDetalhesCliente(cliente)}>
                  <td className="col-2 tdTabela">{cliente.nome}</td>
                  <td className="col-3 tdTabela">
                    <p>{cliente.unidade}</p>
                  </td>
                  <td className="col-3 tdTabela">
                    <p>{cliente.endereco}</p>
                  </td>
                  <td className="col-2 tdTabela">
                    <Button className='btnEdit' onClick={() => handleEditCliente(cliente.id)}><i className="bi bi-pencil-square" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : filtro && clientesParaExibir.length === 0 ? (
        <div className="divTabela">
          <p>Nenhum resultado encontrado. Refine sua pesquisa para obter resultados.</p>
        </div>
      ) : (
        <div className="divTabela">
          <p>Filtre para ter resultados.</p>
        </div>

      )}



      <Modal isOpen={modal} toggle={toggleModal} size="xl" className="modal-fullscreen modalCliente">
        <ModalHeader toggle={toggleModal}>Detalhes do Cliente</ModalHeader>
        <ModalBody>
          <NavModalConsulta activeTab={activeTab} toggleTab={toggleTab} />

          <div className="tab-content" id={`myTabContent-dados`}>

            <TabDadosBasicos activeTab={activeTab} clienteSelecionado={clienteSelecionado} />
            <TabContatos activeTab={activeTab} clienteSelecionado={clienteSelecionado} />
            <TabSetores activeTab={activeTab} clienteSelecionado={clienteSelecionado} />
            <TabViagens activeTab={activeTab} clienteSelecionado={clienteSelecionado} />
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