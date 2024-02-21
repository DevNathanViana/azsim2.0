import { Route, Routes } from 'react-router-dom';
import Navbar from '../fragments/sidebar';
import Formulario from './cadastroCliente';
import Ocorrencias from './ocorrencias';
import ConsultaCliente from './consultaCliente';
function Home() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/cadastroCliente' element={<Formulario />} />
        <Route path='/cadastroCliente/:id' element={<Formulario />} />
        <Route path='/ocorrencias' element={<Ocorrencias />} />
        <Route path='/consultaCliente' element={<ConsultaCliente />} />
      </Routes>
    </div>
  );
}

export default Home;
