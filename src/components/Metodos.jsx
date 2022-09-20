import React, { useState } from 'react';
import Upimg from './Upimg';


function Metodos() {
    return (
        <div >
            <div >
                <nav class="navbar navbar-light bg-light">
                    <div class="container-fluid">

                    <div class="dropdown">
                            <button class="btn btn-outline-black dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="24" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                </svg>
                               
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <li><a href="/" class="dropdown-item" type="button">Cerrar sesión</a></li>
                            </ul>
                        </div>
                        

                        <div class="dropdown">
                            <button class="btn btn-outline-secondary" href="#">
                                <span><a a className="text-primary" href="/Reporte">Cubículo</a></span>
                            </button>
                        </div>
                        <div class="dropdown">
                            <button class="btn btn-outline-secondary" href="#">
                                <span><a a className="text-primary" href="/Bitacoras">Proyectores</a></span>
                                
                            </button>
                        </div>
                        <div class="dropdown">
                            <button  class="btn btn-outline-secondary" href="#">
                                <span><a a className="text-primary" href="/Equipos">Equipos</a></span>
                                
                            </button>
                        </div>
                        <div class="dropdown">
                        <button  class="btn btn-outline-secondary" type="button"><span><a a className="text-primary" href="/Uso">Usos</a></span>
                                </button>
                        </div>
                        <div class="dropdown">
                        <button  class="btn btn-outline-secondary" href="#">
                                <span><a a className="text-primary" href="/Registros">Mantenimiento</a></span>
                            </button>
                        </div>


                        
                    </div>
                </nav>
                
            </div>
            <Upimg></Upimg>
           
        </div>
    );
}

export default Metodos;