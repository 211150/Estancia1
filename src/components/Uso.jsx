import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { CSVLink } from 'react-csv';
import Navegador from './Navegador';


const url="http://localhost:3000/api/uso/create?";
const url1="http://localhost:3000/api/uso/update?";

class Uso extends Component {
state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    id: '',
    area: '',
    periodo: '',
    fecha: '',
    usuario: '',
    gradoGrup: '',
    firma: '',
    materia: '',
    equipoUtil:'',
    tiempoUso:'',
    horaEntra:'',
    horaSali: '',
    observacion:'',
    tipoModal: ''
  }
}

peticionGet=()=>{
axios.get('http://localhost:3000/api/uso/view').then(response=>{
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

        axios.delete(`http://localhost:3000/api/uso/delete?id=${id}`, {
            data: this.state.form,
        })
            .then(response=>{
                this.setState({modalEliminar: false});
                this.peticionGet();

                console.log(response)

            })
            .catch(err =>{
                console.log(err)
                console.log(`http://localhost:3000/api/uso/delete?id=${id}`)

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
      area: empresa.area,
      periodo: empresa.periodo,
      fecha: empresa.fecha,
      usuario: empresa.usuario,
      gradoGrup: empresa.gradoGrup,
      firma: empresa.firma,
      materia: empresa.materia,
      equipoUtil: empresa.equipoUtil,
      tiempoUso: empresa.tiempoUso,
      horaEntra: empresa.horaEntra,
      horaSali: empresa.horaSali,
      observacion: empresa.observacion,
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
    const {data}= this.state;
  return (
    <div className="App">
    <Navegador></Navegador>
  <button className="btn btn-success position-absolute top-1 start-50 translate-middle-x" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Registro de Usos</button>
  
  <br /><br />
  <CSVLink data={data} filename={"tablaReporteUsos.csv"}><button className="btn btn-success ">Exportar CSV</button></CSVLink>
  
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Área</th>
          <th>Período</th>
          <th>Fecha</th>
          <th>Nombre del (a) <br/>
            Usuario (a)</th>
          <th>Grado/<br/>Grupo</th>
          <th>Firma</th>
          <th>Actividad realizada/<br/>materia</th>
          <th>Equipo<br/>utilizado</th>
          <th>Tiempo<br/>de uso</th>
          <th>Hora de<br/>Entrada</th>
          <th>Hora de<br/>Salida</th>
          <th>Observaciones</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(empresa=>{
          return(
            <tr>
          <td>{empresa.area}</td>
          <td>{empresa.periodo}</td>
          <td>{empresa.fecha}</td>
          <td>{empresa.usuario}</td>
          <td>{empresa.gradoGrup}</td>
          <td>{empresa.firma}</td>
          <td>{empresa.materia}</td>
          <td>{empresa.equipoUtil}</td>
          <td>{empresa.tiempoUso}</td>
          <td>{empresa.horaEntra}</td>
          <td>{empresa.horaSali}</td>
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
                    <label htmlFor="nombre">Área</label>
                    <input className="form-control" type="text" name="area" id="area" onChange={this.handleChange} value={form?form.area: ''}/>
                    <br />
                    <label htmlFor="periodo">Período</label>
                    <input className="form-control" type="text" name="periodo" id="periodo" onChange={this.handleChange} value={form?form.periodo: ''}/>
                    <br />
                    <label htmlFor="fecha">Fecha</label>
                    <input className="form-control" type="text" name="fecha" id="fecha" onChange={this.handleChange} value={form?form.fecha:''}/>
                    <br />
                    <label htmlFor="usuario">Usuario</label>
                    <input className="form-control" type="text" name="usuario" id="usuario" onChange={this.handleChange} value={form?form.usuario:''}/>
                    <br />
                    <label htmlFor="gradoGrup">Grado/Grupo</label>
                    <input className="form-control" type="text" name="gradoGrup" id="gradoGrup" onChange={this.handleChange} value={form?form.gradoGrup:''}/>
                    <br />
                    <label htmlFor="firma">Firma</label>
                    <input className="form-control" type="text" name="firma" id="firma" onChange={this.handleChange} value={form?form.firma:''}/>
                    <br />
                    <label htmlFor="materia">Actividad realizada/materia</label>
                    <input className="form-control" type="text" name="materia" id="materia" onChange={this.handleChange} value={form?form.materia:''}/>
                    <br />
                    <label htmlFor="equipoUtil">Equipo utilizado</label>
                    <input className="form-control" type="text" name="equipoUtil" id="equipoUtil" onChange={this.handleChange} value={form?form.equipoUtil:''}/>
                    <br />
                    <label htmlFor="tiempoUso">Tiempo de uso</label>
                    <input className="form-control" type="text" name="tiempoUso" id="tiempoUso" onChange={this.handleChange} value={form?form.tiempoUso:''}/>
                    <br />
                    <label htmlFor="horaEntra">Hora de entrada</label>
                    <input className="form-control" type="text" name="horaEntra" id="horaEntra" onChange={this.handleChange} value={form?form.horaEntra:''}/>
                    <br />
                    <label htmlFor="horaSali">Hora de salida</label>
                    <input className="form-control" type="text" name="horaSali" id="horaSali" onChange={this.handleChange} value={form?form.horaSali:''}/>
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
export default Uso;