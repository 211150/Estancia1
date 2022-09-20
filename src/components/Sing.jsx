import React, { useState } from "react";
import "../asset/style/Log_in.css";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Sing(){
    const navigator = useNavigate()
    const data = useState({
        name: "",
        email: "",
        password: ""
    })

    const url = 'http://localhost:3000/api/user/create' 



    const { handleSubmit, register, formState: { errors } } = useForm();

    const onSubmit = values =>{
        console.log(values);
        const data = values
        Swal.fire(
            'Bienvenido',
            'Creación exitosa',
            'success'
        )
        axios.post(url,{
            name: data.name,
            email: data.email,
            password: data.password
        })
        .then(res=>{
            console.log(res.data)
        })
        navigator('/')

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
                                        <h4 className="mt-1 mb-5 pb-1">Registro</h4>
                                    </div>

                                    <div className="form-outline mb-4">
                                            <label className="form-label" for="form2Example11" >Nombre</label>
                                            <input type="name" className="form-control" id="name" placeholder="Name" required {...register("name", {
                                                required: {
                                                    value: true,
                                                    message: "Obligatorio",
                                                },
                                            })}></input>
                                            {errors.name && <span className="text-primary">{errors.name.message}</span>}
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
                                                    message: "Contraseña con un minimo de 8 caracteres"
                                                }
                                            })}></input>
                                            {errors.password && <span className="text-primary">{errors.password.message}</span>}
                                        </div>
                                        <div className="text-center pt-1 mb-5 pb-1">
                                            <button type="submit" className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3">Acceder</button>
                                            <div className="d-flex align-items-center justify-content-center pb-4">
                                            <span className="fw-bold text-light"><a className="btn btn-outline-primary"href="/">Login</a></span>
                                        </div>
                                        </div>

                                       
                                    </form>
                                </div>
                            </div>
                            <div className="card bg-info p-md-4 col-lg-6 d-flex align-items-center gradient-custom-2">
                                <div className="text-white px-5 py-4 p-md-5 mx-md-1">
                                    <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                    <br/><br/><br/>
                                    <h1 className="text-center mb-4">Crear cuenta</h1>
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

export default Sing;