import { Routes, Route} from "react-router-dom";
import Login from './Login';
import Sign_up from './Sing';
import Recover_pass from './Recovery';
import Reset_pass from './Reset_pass';
import Index from "./Metodos";
import Confirmation_Acount from "./Confirmation";
import Bitacoras from "./Bitacoras";
import Equipos from "./Equipos";
import Registros from "./Registros";
import Uso from "./Uso";
import Reporte from "./Reporte";
import Metodos from "./Metodos";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Sign_up" element={<Sign_up />} />
                <Route path="/Recover_pass" element={<Recover_pass />} />
                <Route path="/Reset_pass" element={<Reset_pass />} />
                <Route path="/Index" element={<Index />} />
                <Route path="/Confirmation_Acount" element={<Confirmation_Acount/>} />
                <Route path="/Bitacoras" element={<Bitacoras/>}/>
                <Route path="/Equipos" element={<Equipos/>}/>
                <Route path="/Registros" element={<Registros/>}/>
                <Route path="/Uso" element={<Uso/>}/>
                <Route path="/Reporte" element={<Reporte/>}/>
                <Route path="/Inicio" element={<Metodos/>}/>
            </Routes>
        </div>
    );
}

export default App;