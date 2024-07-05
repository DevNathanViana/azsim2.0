import { Route, Routes } from 'react-router-dom';
import Formulario from './cadastroCliente';
import Ocorrencias from './ocorrencias';
import ConsultaCliente from './consultaCliente';
import Navbar from '../fragments/Geral/sidebar';
import '../css/home.css';

function Home() {

  return (
    <div className='englobaTudo'>
      <Navbar />
      <Routes>
        <Route path='/cadastroCliente' element={<Formulario />} />
        <Route path='/edicaoCliente/:id' element={<Formulario />} />
        <Route path='/ocorrencias' element={<Ocorrencias />} />
        <Route path='/consultaCliente' element={<ConsultaCliente />} />
      </Routes>
    </div>
  );
}

export default Home;
