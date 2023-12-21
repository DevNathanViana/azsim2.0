import { Route, Routes } from 'react-router-dom';
import Navbar from '../fragments/navbar';
import Formulario from './form';
import Ocorrencias from './ocorrencias';
import ConsultaCliente from './consultaClient';
function Home() {
  return (
    <div>
      <Navbar />
        <Routes>
          <Route path='/form' element={<Formulario />} />
          <Route path='/ocorrencias' element={<Ocorrencias />} />
          <Route path='/consulta' element={<ConsultaCliente />} />
        </Routes>
    </div>
  );
}

export default Home;
