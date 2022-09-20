import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { CSVLink } from 'react-csv';
import Navegador from './Navegador';

const url="http://localhost:3000/api/equipo/create?";
const url1="http://localhost:3000/api/equipo/update?";

class Equipos extends Component {
state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    id: '',
    numero: '',
    descriptionP: '',
    unidad: '',
    serie: '',
    cantidad: '',
    ajuste: '',
    calibracion: '',
    remplazo:'',
    manto:'',
    fechaProg:'',
    observacion:'',
    tipoModal: ''
  }
}

peticionGet=()=>{
axios.get('http://localhost:3000/api/equipo/view').then(response=>{
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

        axios.delete(`http://localhost:3000/api/equipo/delete?id=${id}`, {
            data: this.state.form,
        })
            .then(response=>{
                this.setState({modalEliminar: false});
                this.peticionGet();

                console.log(response)

            })
            .catch(err =>{
                console.log(err)
                console.log(`http://localhost:3000/api/equipo/delete?id=${id}`)

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
      numero: empresa.numero,
      descriptionP: empresa.descriptionP,
      unidad: empresa.unidad,
      serie: empresa.serie,
      cantidad: empresa.cantidad,
      ajuste: empresa.ajuste,
      calibracion: empresa.calibracion,
      remplazo: empresa.remplazo,
      manto: empresa.manto,
      fechaProg: empresa.fechaProg,
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
  <button className="btn btn-success position-absolute top-1 start-50 translate-middle-x" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Reporte de Equipos</button>
  <br /><br />
  <CSVLink data={data} filename={"tablaReporteEquipos.csv"}><button className="btn btn-success ">Exportar CSV</button></CSVLink>
  
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nº</th>
          <th>Descripción del producto </th>
          <th>Unidad</th>
          <th>Número de Inventario/Serie</th>
          <th>Cantidad</th>
          <th>Ajuste</th>
          <th>Calibración</th>
          <th>Reemplazo</th>
          <th>Manto</th>
          <th>Fecha programada</th>
          <th>Observaciones</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(empresa=>{
          return(
            <tr>
          <td>{empresa.numero}</td>
          <td>{empresa.descriptionP}</td>
          <td>{empresa.unidad}</td>
          <td>{empresa.serie}</td>
          <td>{empresa.cantidad}</td>
          <td>{empresa.ajuste}</td>
          <td>{empresa.calibracion}</td>
          <td>{empresa.remplazo}</td>
          <td>{empresa.manto}</td>
          <td>{empresa.fechaProg}</td>
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
                    <label htmlFor="nombre">Nº</label>
                    <input className="form-control" type="text" name="numero" id="numero" onChange={this.handleChange} value={form?form.numero: ''}/>
                    <br />
                    <label htmlFor="descriptionP">Descripción del producto</label>
                    <input className="form-control" type="text" name="descriptionP" id="descriptionP" onChange={this.handleChange} value={form?form.descriptionP: ''}/>
                    <br />
                    <label htmlFor="unidad">Unidad</label>
                    <input className="form-control" type="text" name="unidad" id="unidad" onChange={this.handleChange} value={form?form.unidad:''}/>
                    <br />
                    <label htmlFor="serie">Número de Inventario/Serie</label>
                    <input className="form-control" type="text" name="serie" id="serie" onChange={this.handleChange} value={form?form.serie:''}/>
                    <br />
                    <label htmlFor="cantidad">Cantidad</label>
                    <input className="form-control" type="text" name="cantidad" id="cantidad" onChange={this.handleChange} value={form?form.cantidad:''}/>
                    <br />
                    <label htmlFor="ajuste">Ajuste</label>
                    <input className="form-control" type="text" name="ajuste" id="ajuste" onChange={this.handleChange} value={form?form.ajuste:''}/>
                    <br />
                    <label htmlFor="calibracion">Calibración</label>
                    <input className="form-control" type="text" name="calibracion" id="calibracion" onChange={this.handleChange} value={form?form.calibracion:''}/>
                    <br />
                    <label htmlFor="remplazo">Reemplazo</label>
                    <input className="form-control" type="text" name="remplazo" id="remplazo" onChange={this.handleChange} value={form?form.remplazo:''}/>
                    <br />
                    <label htmlFor="manto">Manto</label>
                    <input className="form-control" type="text" name="manto" id="manto" onChange={this.handleChange} value={form?form.manto:''}/>
                    <br />
                    <label htmlFor="fechaProg">Fecha programada</label>
                    <input className="form-control" type="text" name="fechaProg" id="fechaProg" onChange={this.handleChange} value={form?form.fechaProg:''}/>
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
export default Equipos;