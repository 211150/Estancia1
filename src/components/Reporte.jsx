import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { CSVLink } from 'react-csv';
import Navegador from './Navegador';

const url="http://localhost:3000/api/reporte/create?";
const url1="http://localhost:3000/api/reporte/update?";
const url2="http://localhost:3000/api/reporte/delete?";

class Reporte extends Component {
state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    id: '',
    cubiculo: '',
    numeroAula: '',
    energiaElec: '',
    infraestructura: '',
    tipoModal: ''
  }
}

peticionGet=()=>{
axios.get('http://localhost:3000/api/reporte/view').then(response=>{
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
  this.peticionGet();
}

peticionPut=()=>{
  axios.put(url1+this.state.form.id, this.state.form).then(response=>{

    this.modalInsertar();
    this.peticionGet();
  })
}


    peticionDelete=(id)=>{

        axios.delete(`http://localhost:3000/api/reporte/delete?id=${id}`, {
            data: this.state.form,
        })
            .then(response=>{
                this.setState({modalEliminar: false});
                this.peticionGet();

                console.log(response)

            })
            .catch(err =>{
                console.log(err)
                console.log(`http://localhost:3000/api/reporte/delete?id=${id}`)

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
      cubiculo: empresa.cubiculo,
      numeroAula: empresa.numeroAula,
      energiaElec: empresa.energiaElec,
      infraestructura: empresa.infraestructura
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
  <button className="btn btn-success position-absolute top-1 start-50 translate-middle-x" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Reporte de Cubiculos</button>
  
  <br /><br />
  <CSVLink data={data} filename={"tablaReporteCubiculos.csv"}><button className="btn btn-success ">Exportar CSV</button></CSVLink>
  
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Cubículo</th>
          <th>Número de Cubiculo</th>
          <th>Energia Electrica</th>
          <th>Infraestructura</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map(empresa=>{
          return(
            <tr>
          <td>{empresa.cubiculo}</td>
          <td>{empresa.numeroAula}</td>
          <td>{empresa.energiaElec}</td>
          <td>{empresa.infraestructura}</td>
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
                    <label htmlFor="nombre">Cubiculo</label>
                    <input className="form-control" type="text" name="cubiculo" id="cubiculo" onChange={this.handleChange} value={form?form.cubiculo: ''}/>
                    <br />
                    <label htmlFor="nombre">Numero de Cubiculo</label>
                    <input className="form-control" type="text" name="numeroAula" id="numeroAula" onChange={this.handleChange} value={form?form.numeroAula: ''}/>
                    <br />
                    <label htmlFor="energiaElec">Energia Electrica</label>
                    <input className="form-control" type="text" name="energiaElec" id="energiaElec" onChange={this.handleChange} value={form?form.energiaElec:''}/>
                    <br />
                    <label htmlFor="infraestructura">Infraestructura</label>
                    <input className="form-control" type="text" name="infraestructura" id="infraestructura" onChange={this.handleChange} value={form?form.infraestructura:''}/>
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
               Estás seguro que deseas eliminar el reporte
               
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
export default Reporte;