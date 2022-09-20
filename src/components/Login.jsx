import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../asset/style/Log_in.css";
import Swal from 'sweetalert2'
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login() {
    const navigator = useNavigate()
    const data = useState({
        email: '',
        password: '',
        validat: ''
    })

    const url = 'http://localhost:3000/api/user/login'

    const { handleSubmit, register, formState: { errors } } = useForm();

    const onSubmit = values => {
        const data = values;

        console.log(data);
        axios.post(url, {
            email: data.email,
            password: data.password,
            validat: data.validat
        })
            .then(res => {
                if (res.request.status === 200) {
                    if (data.email === "nadanada5463453dfdg@ids.upchiapas.edu.mx") {
                        Swal.fire(
                            'Bienvenido',
                            '' + res.data.data.name + '',
                            'success'
                        )
                        navigator('/Shop')
                    }
                    else {
                        Swal.fire(
                            'Bienvenido',
                            '' + res.data.data.name + '',
                            'success'
                        )
                        navigator('/Index')
                    }

                }
            })
            .catch(err => {
                Swal.fire(
                    'Error!',
                    '' + err.response.data.error + '',
                    'error'
                )



            })




    }






    return (
        <section class="h-100 gradient-form bg-secondary">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-8">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div className="col-lg-6">
                                    <div className="card-body p-md-12 mx-md-4">
                                        <br></br>
                                        <div className="text-center">
                                            <img src="https://universidadesdemexico.mx/logos/original/logo-universidad-politecnica-de-chiapas.webp"
                                                width="190px;" alt="logo"></img>
                                            <h4 className="mt-1 mb-5 pb-1">Login</h4>
                                        </div>

                                        <form noValidate onSubmit={handleSubmit(onSubmit)}>
                        
                                            <div className="form-outline mb-4">
                                                <label className="form-label" for="form2Example11" >Email</label>
                                                <input type="email" className="form-control" id="email" placeholder="Email" required {...register("email", {
                                                    required: {
                                                        value: true,
                                                        message: "Obligatorio",
                                                    },
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "Invalido email"
                                                    }
                                                })}></input>
                                                {errors.email && <span className="text-primary">{errors.email.message}</span>}
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
                                                        message: "Password with a minimum of 8 characters"
                                                    }
                                                })}></input>
                                                {errors.password && <span className="text-primary">{errors.password.message}</span>}
                                            </div>
                                            <div class="text-center pt-1 mb-5 pb-1">
                                            <span><a className="text-muted" href="/Recover_pass">¿Olvido su contraseña?</a></span>
                                            <div className="text-center pt-1 mb-5 pb-1">
                                                <button type="submit" className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3">Iniciar sesión</button>
                                                
                                                <div className="d-flex align-items-center justify-content-center pb-4">
                                                <span className="fw-bold text-light"><a className="btn btn-outline-primary"href="/Sign_up">Crear cuenta</a></span>
                                            </div>
                                            </div>
                                            </div>
                   
                                        </form>
                                    </div>
                                </div>
                                <div className="card bg-info p-md-4 col-lg-6 d-flex align-items-center gradient-custom-2">
                                    <div className="text-white px-5 py-4 p-md-5 mx-md-1">
                                        <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                        <br/><br/><br/>
                                        <h1 className="text-center mb-4">Bienvenido</h1>
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

export default Login;