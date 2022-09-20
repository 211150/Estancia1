import React, {useState} from "react";
import "../asset/style/Recover_pass.css";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Reset_pass() {

    const querystring = window.location.search
    const params = new URLSearchParams(querystring)

    const data = useState({
        password: ''
    })

    const url = 'http://localhost:3000/api/user/update_password'
    const navigator = useNavigate()
    const { handleSubmit, register, formState: { errors } } = useForm();

    const onSubmit = values =>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
      
        var raw = JSON.stringify({
          "email": params.get('email'),
        });
        if (values.password1 === values.password) {
            const data = values
            axios.put(url,{
                email: params.get('email'),
                password: data.password
            })
            .then(response => {
                console.log(response.data);
                Swal.fire(
                    ''+response.data.err+'!',
                    '',
                    'success'
                )
            })
            navigator('/')
        }
        else {
            Swal.fire(
                'Password incorrecto',
                'Verifica nuevamente',
                'error'
            )
        }

    }

    return(
    <section class="h-100 gradient-form bg-secondary">
    <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-8">
                <div className="card rounded-3 text-black">
                    <div className="row g-0">
                        <div className="col-lg-6">
                            <div className="card-body p-md-12 mx-md-4">
                                <div className="text-center">
                                    <img src="https://universidadesdemexico.mx/logos/original/logo-universidad-politecnica-de-chiapas.webp"
                                        width="190px;" alt="logo"></img>
                                    <h4 className="mt-1 mb-5 pb-1">Restablecer Contaseña</h4>
                                </div>

                            
                                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-outline mb-4">
                                        <label className="form-label" for="form2Example22">Contraseña</label>
                                        <input type="password" className="form-control" placeholder="Password" required {...register("password1", {
                                            required: {
                                                value: true,
                                                message: "Obligatory field",
                                            },
                                            minLength: {
                                                value: 8,
                                                message: "Password with a minimum of 8 characters"
                                            }
                                        })}></input>
                                        {errors.password1 && <span className="text-primary">{errors.password1.message}</span>}
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className="form-label" for="form2Example22">Contraseña</label>
                                        <input type="password" className="form-control" placeholder="Password" required {...register("password", {
                                            required: {
                                                value: true,
                                                message: "Obligatorio",
                                            },
                                            minLength: {
                                                value: 8,
                                                message: "Contraseña con un minimo de 8 caracteres"
                                            }
                                        })}></input>
                                        {errors.password && <span className="text-primary">{errors.password.message}</span>}
                                    </div>
                                    <div className="text-center pt-1 mb-5 pb-1">
                                        <button type="submit" className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3">Restablecer</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                        <div className="card bg-info p-md-4 col-lg-6 d-flex align-items-center gradient-custom-2">
                            <div className="text-white px-5 py-4 p-md-5 mx-md-1">
                                <br/><br/><br/><br/><br/>
                                <br/><br/><br/>
                                <h1 className="text-center mb-4">Restablecer contraseña</h1>
                                <p className="text-center mb-5 pb-1 "></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
    );
}

export default Reset_pass;