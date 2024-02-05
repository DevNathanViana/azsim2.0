import '../css/consultaCliente.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
function ConsultaCliente() {
  const [filtro, setFiltro] = useState('');
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado] = useState(null);
  const [modal, setModal] = useState(false);
  const [ordenacao, setOrdenacao] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  // Mova a declaração da função para fora do useEffect
  const buscarClientes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/cliente');

      /* , {
      //   // params: {
      //   //   filtro, // filtro de texto
      //   //   dataInicio,
      //   //   dataFim,
      //   //   ordenacao
      //   // }
      }*/

      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  useEffect(() => {
    buscarClientes();
  },);


  const toggleModal = () => {
    setModal(!modal);
  };

  const handleEditCliente = async (cliente) => {
    try {
      const response = await axios.get(`http://seu-backend.com/api/clientes/${cliente.id}`);
      const clienteParaEdicao = response.data; // Detalhes completos do cliente

      // Redirecionar para a página de edição, passando os detalhes do cliente
      history.push({
        pathname: `/editar-cliente/${cliente.id}`,
        state: { cliente: clienteParaEdicao }
      });
    } catch (error) {
      console.error('Erro ao obter detalhes do cliente:', error);
    }
  };


  const handleDeleteCliente = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/clientes/${id}`);
      // Atualize o estado de clientes removendo o cliente
      const novosClientes = clientes.filter(cliente => cliente.id !== id);
      setClientes(novosClientes);
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
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

    // Aplica o filtro de data
    if (dataInicio) {
      resultadosFiltrados = resultadosFiltrados.filter(cliente =>
        new Date(cliente.data) >= new Date(dataInicio)
      );
    }
    if (dataFim) {
      resultadosFiltrados = resultadosFiltrados.filter(cliente =>
        new Date(cliente.data) <= new Date(dataFim)
      );
    }

    // Aplica a ordenação
    if (ordenacao === '1') {
      resultadosFiltrados.sort((a, b) => new Date(a.data) - new Date(b.data));
    } else if (ordenacao === '2') {
      resultadosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));
    } else if (ordenacao === '3') {
      resultadosFiltrados.sort((a, b) => b.nome.localeCompare(a.nome));
    }

    setClientes(resultadosFiltrados);
  };



  const clientesFiltrados = clientes.filter((cliente) =>
    Object.values(cliente).some((valor) =>
      valor.toString().toLowerCase().includes(filtro.toLowerCase())
    )
  );

  const clientesParaExibir = filtro ? clientesFiltrados : clientes.slice(-20);

  return (
    <>

      <div className="filtros">
        <div id='filtrosgroup' className="input-group me-3 w-50 mb-3">
          <label className="input-group-text" htmlFor="inputGroupSelect01">Ordenar</label>
          <select className="form-select" id="inputGroupSelect01" value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)}>
            <option value="">Mais novos</option>
            <option value="1">Mais antigos</option>
            <option value="2">A-Z</option>
            <option value="3">Z-A</option>
          </select>
        </div>


        <div id='filtrosgroup2' className="input-group me-3 w-50 mb-3">
          <input className="form-control" type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
          <input className="form-control" type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
        </div>


        <div className="input-group w-50 mb-3">
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
              <td className="col-1">
                <strong>Código</strong>
              </td>
              <td className="col-2">
                <strong>Nome</strong>
              </td>
              <td className="col-2">
                <strong>Cidade</strong>
              </td>
              <td className="col-3">
                <strong>Endereço</strong>
              </td>
              <td className="col-2">
                <strong>Editar/Excluir</strong>
              </td>
              <td className="col-2">
                <strong>Ver +</strong>
              </td>
            </tr>
          </thead>

          <tbody>
            {clientesParaExibir.map((cliente, id) => (
              <tr key={id}>
                <td className="col-1">{cliente.codHabil}</td>
                <td className="col-2">{cliente.nome}</td>
                <td className="col-3">
                  <p>{cliente.cidade}</p>
                </td>
                <td className="col-3">
                  <p>{cliente.endereco}</p>
                </td>
                <td className="col-2">
                  <Button className='btnEdit' onClick={() => handleEditCliente(cliente)}><i className="bi bi-pencil-square" /></Button>
                  <Button className='btnTrash' onClick={() => handleDeleteCliente(cliente.id)}><i className="bi bi-trash3"></i></Button>
                </td>
                <td className="col-1">
                  <Button className='btnView' onClick={toggleModal}><i className="bi bi-eye"></i></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Detalhes do Cliente</ModalHeader>
        <ModalBody>
          {/* Renderize aqui os detalhes do cliente */}
          <p>Nome: {clienteSelecionado?.nome}</p>
          <p>Cidade: {clienteSelecionado?.cidade}</p>
          <p>Endereço: {clienteSelecionado?.endereco}</p>
          {/* Adicione mais campos conforme necessário */}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Fechar</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ConsultaCliente;