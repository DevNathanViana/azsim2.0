import { Link, Route, Routes } from 'react-router-dom'
import '../css/form.css'
import Ocorrencias from './ocorrencias'
import Formulario from './form'
import Navbar from '../fragments/navbar'
import InfoView from './infoView'


function Home() {

    return (

        <div>

            <Navbar/>

            <Routes>
                <Route path='/infoView' element={< InfoView />} />
                <Route path='/form' element={<Formulario />} />
                <Route path='/ocorrencias' element={<Ocorrencias />} />
            </Routes>


        </div>

    )
}

export default Home