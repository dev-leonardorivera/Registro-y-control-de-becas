
import axios from 'axios'
import { useState, useEffect} from 'react';
import { CSVLink, CSVDownload } from "react-csv";

const URL_API = 'http://localhost/backend_becas/getAllStudents.php';
const URL_API2 = 'http://localhost/backend_becas/getStudentsFilter.php';




function Reportes() {

  const [carrera, setCarrera] = useState('0')
  const [becados, setBecados] = useState('todos')
  const [listaEstudiantes, setListaEstudiantes] = useState([])


useEffect(function(){

  Buscar()

},[])




async function Buscar(){
  /* SI SE VA A FILTRAR TODO**/
  if(carrera ==='0' && becados ==='todos'){
    const res = await axios.post(URL_API);
        setListaEstudiantes(res.data)
        console.log('pasa por aqui')
  }
  /* SI SE VA A FILTRAR todos dependiendo la carrera**/
  if(carrera >'0' && becados ==='todos'){
    const obj = {
      carrera: carrera
      ,becados:becados
    }
    const res = await axios.post(URL_API2,obj);
    setListaEstudiantes(res.data)
    console.log('pasa por aqui2')

  }
  /* SI SE VA A FILTRAR TODAS las carreras pero dependiendo si estan becados o no */
  if(carrera ==='0' && becados!=='todos'){
    const obj = {
      carrera,becados
    }
    const res = await axios.post(URL_API2,obj);
        setListaEstudiantes(res.data)
        console.log('pasa por aqui 3')
        //console.log(res.data)
  }
  /* SI SE VA A FILTRAR por carrera y si estan becados o no**/
  if(carrera >'0' && becados !=='todos'){
    const obj = {
      carrera,becados
    }
    const res = await axios.post(URL_API2,obj);
        setListaEstudiantes(res.data)
        console.log('pasa por aqui4')
  }
  //console.log(listaEstudiantes)
}
  

  
  
  
  
  
  
  return (
    <>
      <div className='bg-white p-4 shadow' style={{height:'90%'}}> 
        <div className='row my-2'>
          <div className='col'> 
            <label  class="form-label fw-bold fs-6">Carreras.  <span style={{color:'red'}}>*</span></label> 
            <select value={carrera} class="form-select" aria-label="Default select example" onChange={e => setCarrera(e.target.value)}>
                <option value='0' selecte>Todas</option>
                <option value="1">Ingenieria de Sistemas</option>
                <option value="2">Ingenieria Civil</option>
                <option value="3">Licenciatura en turismo</option>
                <option value="4">Licenciatura en Administracion y gestion municipal</option>
                <option value="5">TSU. Enfermeria</option>
                <option value="6">TSU. Analisis y diseño de sistemas</option>
            </select>
          </div>
          <div className='col'>
          <label  class="form-label fw-bold fs-6">Becados.  <span style={{color:'red'}}>*</span></label>
            <select class="form-select" aria-label="Default select example" onChange={e => setBecados(e.target.value)}>
              <option selected>Todos</option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>
            

              
             
      

          </div>
          <div className='col-12 my-2'>
              <button type="button" onClick={Buscar}  class="btn btn-primary me-1"><i class="fa-solid fa-magnifying-glass"></i> Buscar</button>
              <CSVLink  data={ listaEstudiantes} filename="DatosFiltradosEstudiantesUNEFA" separator={";"} class="btn btn-primary me-1"><i class="fa-solid fa-file-arrow-down"></i> Excel</CSVLink>
              
            </div>
        </div>
        <div className='row mt-4'>
          <div className='col-12 table-responsive'>
          <table id='tabla' class="table table-hover text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Telefono</th>
                <th scope="col">Direccion</th>
                <th scope="col">Becado</th>
                <th scope="col">Carrera</th>

              </tr>
            </thead>
            <tbody>
              {
                listaEstudiantes.map((data,index) =>(
                  <tr>
                    <th scope="row">{index}</th>
                    <td>{data['nombreEstudiante']}</td>
                    <td>{data['apellidoEstudiante']}</td>
                    <td>{data['telefono']}</td>
                    <td>{data['direccion']}</td>
                    <td>{data['becado']}</td>
                    <td>{data['nombreCarreca']}</td>
                  </tr>

                )
                )
              }
             
            </tbody>
          </table>
          
          
          </div>
        </div>

      </div>
    </>
  )
}

export default Reportes