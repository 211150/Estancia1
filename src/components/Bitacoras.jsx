import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader, Nav } from 'reactstrap';
import { CSVLink } from 'react-csv';
import Navegador from './Navegador';

const url="http://localhost:3000/api/bitacora/create?";
const url1="http://localhost:3000/api/bitacora/update?";

class Bitacoras extends Component {
state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    id: '',
    fecha: '',
    equipo: '',
    horaUso: '',
    nombreEntre: '',
    nombreReci: '',
    entregaEntre:'',
    entregaReci:'',
    observacion:'',
    tipoModal: ''
  }
}

peticionGet=()=>{
axios.get('http://localhost:3000/api/bitacora/view').then(response=>{
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

        axios.delete(`http://localhost:3000/api/bitacora/delete?id=${id}`, {
            data: this.state.form,
        })
            .then(response=>{
                this.setState({modalEliminar: false});
                this.peticionGet();

                console.log(response)

            })
            .catch(err =>{
                console.log(err)
                console.log(`http://localhost:3000/api/bitacora/delete?id=${id}`)

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
      fecha: empresa.fecha,
        equipo: empresa.equipo,
        horaUso: empresa.horaUso,
        nombreEntre: empresa.nombreEntre,
        nombreReci: empresa.nombreReci,
        entregaEntre: empresa.entregaEntre,
        entregaReci: empresa.entregaReci,
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
    
  <button className="btn btn-success position-absolute top-1 start-50 translate-middle-x" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Registro de Bitacora</button>
  <br /><br />
  <CSVLink data={data} filename={"tablaReporteBitacora.csv"}><button className="btn btn-success ">Exportar CSV</button></CSVLink>
  
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>AP/<br/>Equipo para IoT</th>
          <th>Hora de Uso</th>
          <th>Al solicitar<br/>
          Nombre de quien entrega</th>
          <th>Al solicitar<br/>
          Nombre de quien recibe</th>
          <th>Al entregar<br/>
          Nombre de quien entrega</th>
          <th>Al entregar<br/>
          Nombre de quien recibe</th>
          <th>Observaciones</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(empresa=>{
          return(
            <tr>
          <td>{empresa.fecha}</td>
          <td>{empresa.equipo}</td>
          <td>{empresa.horaUso}</td>
          <td>{empresa.nombreEntre}</td>
          <td>{empresa.nombreReci}</td>
          <td>{empresa.entregaEntre}</td>
          <td>{empresa.entregaReci}</td>
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
                    <label htmlFor="nombre">fecha</label>
                    <input className="form-control" type="text" name="fecha" id="fecha" onChange={this.handleChange} value={form?form.fecha: ''}/>
                    <br />
                    <label htmlFor="equipo">AP/Equipo para IoT</label>
                    <input className="form-control" type="text" name="equipo" id="equipo" onChange={this.handleChange} value={form?form.equipo: ''}/>
                    <br />
                    <label htmlFor="horaUso">Hora de uso</label>
                    <input className="form-control" type="text" name="horaUso" id="horaUso" onChange={this.handleChange} value={form?form.horaUso:''}/>
                    <br />
                    <label htmlFor="nombreEntre">Al solicitar/Nombre de quien entrega</label>
                    <input className="form-control" type="text" name="nombreEntre" id="nombreEntre" onChange={this.handleChange} value={form?form.nombreEntre:''}/>
                    <br />
                    <label htmlFor="nombreReci">Al solicitar/Nombre de quien recibe</label>
                    <input className="form-control" type="text" name="nombreReci" id="nombreReci" onChange={this.handleChange} value={form?form.nombreReci:''}/>
                    <br />
                    <label htmlFor="entregaEntre">Al entregar/Nombre de quien entrega</label>
                    <input className="form-control" type="text" name="entregaEntre" id="entregaEntre" onChange={this.handleChange} value={form?form.entregaEntre:''}/>
                    <br />
                    <label htmlFor="entregaReci">Al entregar/Nombre de quien recibe</label>
                    <input className="form-control" type="text" name="entregaReci" id="entregaReci" onChange={this.handleChange} value={form?form.entregaReci:''}/>
                    <br />
                    <label htmlFor="observacion">Observaciones</label>
                    <input className="form-control" type="text" name="observacion" id="observacion" onChange={this.handleChange} value={form?form.observacion:''}/>
                    
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
               Estás seguro que deseas eliminar el registro de uso
               
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
export default Bitacoras;