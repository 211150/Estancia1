import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { CSVLink } from 'react-csv';
import Navegador from './Navegador';

const url="http://localhost:3000/api/registro/create?";
const url1="http://localhost:3000/api/registro/update?";

class Registros extends Component {
state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    id: '',
    prograAca: '',
    numero: '',
    description: '',
    unidad: '',
    cantidad: '',
    observacion:'',
    tipoModal: ''
  }
}

peticionGet=()=>{
axios.get('http://localhost:3000/api/registro/view').then(response=>{
  this.setState({data: response.data});
}).catch(error=>{
  console.log(error.message);
})
}

peticionPost=async()=>{
  delete this.state.form.id;
 await axios.post(url,this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  }).catch(error=>{
    console.log(error.message);
  })
}

peticionPut=()=>{
  axios.put(url1+this.state.form.id, this.state.form).then(response=>{

    this.modalInsertar();
    this.peticionGet();
  })
}


    peticionDelete=(id)=>{

        axios.delete(`http://localhost:3000/api/registro/delete?id=${id}`, {
            data: this.state.form,
        })
            .then(response=>{
                this.setState({modalEliminar: false});
                this.peticionGet();

                console.log(response)

            })
            .catch(err =>{
                console.log(err)
                console.log(`http://localhost:3000/api/registro/delete?id=${id}`)

            } )
    }


modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar});
}

seleccionarEmpresa=(empresa)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
      id: empresa.id,
      prograAca: empresa.prograAca,
      numero: empresa.numero,
      description: empresa.description,
      unidad: empresa.unidad,
      cantidad: empresa.cantidad,
      observacion: empresa.observacion
    }
  })
}

handleChange=async e=>{
e.persist();
await this.setState({
  form:{
    ...this.state.form,
    [e.target.name]: e.target.value
  }
});
console.log(this.state.form);
}

  componentDidMount() {
    this.peticionGet();
  }
  

  render(){
    const {form}=this.state;
    const {data}=this.state;
  return (
    <div className="App">
    <Navegador></Navegador>
  <button className="btn btn-success position-absolute top-1 start-50 translate-middle-x" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Registro de Mantenimiento</button>
  <br /><br />
  <CSVLink data={data} filename={"tablaReporteRegistros.csv"}><button className="btn btn-success ">Exportar CSV</button></CSVLink>
  
    <table class="table table-striped">
      <thead>
        <tr>
          {/* <th>ID</th> */}
          <th>Programa académico</th>
          <th>Nº</th>
          <th>Descripción del producto </th>
          <th>Unidad</th>
          <th>Cantidad</th>
          <th>Observaciones</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(empresa=>{
          return(
            <tr>
          {/* <td>{empresa.id}</td> */}
          <td>{empresa.prograAca}</td>
          <td>{empresa.numero}</td>
          <td>{empresa.description}</td>
          <td>{empresa.unidad}</td>
          <td>{empresa.cantidad}</td>
          <td>{empresa.observacion}</td>
          <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarEmpresa(empresa); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarEmpresa(empresa); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                </td>
          </tr>
          )
        })}
      </tbody>
    </table>



    <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    {/* <label htmlFor="id">ID</label>
                    <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: ''}/>
                    <br /> */}
                    <label htmlFor="nombre">Programa Académico</label>
                    <input className="form-control" type="text" name="prograAca" id="prograAca" onChange={this.handleChange} value={form?form.prograAca: ''}/>
                    <br />
                    <label htmlFor="nombre">Nº</label>
                    <input className="form-control" type="text" name="numero" id="numero" onChange={this.handleChange} value={form?form.numero: ''}/>
                    <br />
                    <label htmlFor="description">Descripción del producto</label>
                    <input className="form-control" type="text" name="description" id="description" onChange={this.handleChange} value={form?form.description: ''}/>
                    <br />
                    <label htmlFor="unidad">Unidad</label>
                    <input className="form-control" type="text" name="unidad" id="unidad" onChange={this.handleChange} value={form?form.unidad:''}/>
                    <br />
                    <label htmlFor="cantidad">Cantidad</label>
                    <input className="form-control" type="text" name="cantidad" id="cantidad" onChange={this.handleChange} value={form?form.cantidad:''}/>
                    <br />
                    <label htmlFor="observacion">Observaciones</label>
                    <input className="form-control" type="text" name="observacion" id="observacion" onChange={this.handleChange} value={form?form.observacion:''}/>
                    <br />
                  </div>
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal=='insertar'?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                    Insertar
                  </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                    Actualizar
                  </button>
  }
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>


          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
               Estás seguro que deseas eliminar el registro de este equipo
               <label htmlFor="id">ID</label>
                    {/* <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: ''}/> */}
                <br />
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete(this.state.form.id)}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>
  </div>



  );
}
}
export default Registros;
