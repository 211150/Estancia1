import '../asset/style/Confirmation_Acount.css'
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from "axios";

function Confirmation() {
    const navigator = useNavigate()
    const [data, setData] = useState({
        valor: 'false'
    })


    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }

    const querystring = window.location.search
    const params = new URLSearchParams(querystring)



    const validate = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
      
        var raw = JSON.stringify({
          "email": params.get('email'),
        });

        const url = 'http://localhost:3000/api/user/config?'

        if (data.valor === 'true') {
            console.log('Validation Success: ' + data.valor);
 

          
            console.log(raw);
            axios.post(url, {
                valor: data.valor,
                email: params.get('email'),
                
                
            })
                .then(res => {
                    console.log(res.data)
                })
            Swal.fire(
                'Gracias por confirmar',
                'success'
            )
            navigator('/')

        }
        if (data.valor === 'false') {
            console.log('Validation error: ' + data.valor);

            axios.post(url, {
                valor: data.valor,
                email: params.get('email'),
            })
                .then(res => {
                    console.log(res.data)
                    
                })

            Swal.fire(
                'Tiempo de espera agotado',
                'error'
            )
            navigator('/')





        }
    }





    return (
        <div className="container w-75 mt-5 bg-light rounder shadow">
            <div className="row align-items-stretch">
                <div className="col acount d-none d-lg-block col-md-5 col-lg-7 col-xl-6 rounder">

                </div>

                <div className="col p-5 rounder-end">
                   
                    <h2 className="fw-bold text-center py-5">Bienvenido</h2>
                    <h4 className="fw-bold text-center">Click en el boton!</h4><br/>

                    <form className="was-validated" onSubmit={validate}>
                        <div className="form-check">
                            <input class="form-check-input" onChange={(e) => handle(e)} value={true} type="radio" name="flexRadioDefault" id="valor" />
                            <label class="form-check-label" for="flexRadioDefault1">
                            Active y acepte.
                            </label>
                        </div><br />
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Confirmar</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Confirmation;