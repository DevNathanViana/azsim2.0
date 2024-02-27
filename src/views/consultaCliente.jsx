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
  const [dadosBasicos, setDadosBasicos] = useState({})


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
      navigate(`/cadastroCliente/${id}`);
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



  const clientesFiltrados = clientes.filter((cliente) =>
    Object.values(cliente).some((valor) =>
      valor.toString().toLowerCase().includes(filtro.toLowerCase())
    )
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
                <strong>Editar</strong>
              </td>

            </tr>
          </thead>

          <tbody>
            {clientesParaExibir.map((cliente) => (
              <tr id='linhaInfoUsuario' key={cliente.id}>
                <td onClick={toggleModal} className="col-1">{cliente.codificador}</td>
                <td onClick={toggleModal} className="col-2">{cliente.nome}</td>
                <td onClick={toggleModal} className="col-3">
                  <p>{cliente.cidade}</p>
                </td>
                <td onClick={toggleModal} className="col-3">
                  <p>{cliente.endereco}</p>
                </td>
                <td className="col-2">
                  <Button className='btnEdit' onClick={() => handleEditCliente(cliente.id)}><i className="bi bi-pencil-square" /></Button>
                  {/* <Button className='btnTrash' onClick={() => handleDeleteCliente(cliente.id)}><i className="bi bi-trash3"></i></Button> */}
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