import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../fragments/navbar';
import InfoView from './infoView';
import Formulario from './form';
import Ocorrencias from './ocorrencias';
function Home() {
  return (
    <div>
      <Navbar />
        <Routes>
          <Route path='/infoView' element={<InfoView />} />
          <Route path='/form' element={<Formulario />} />
          <Route path='/ocorrencias' element={<Ocorrencias />} />
        </Routes>
    </div>
  );
}

export default Home;
