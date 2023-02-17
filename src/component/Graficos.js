import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Graficos.css'
import Cookies from 'react-cookie/cjs/Cookies'
import imgRegistrados from '../img/icons/registro.png'
import imgConBecas from '../img/icons/anadir.png'
import imgSinBecas from '../img/icons/eliminar.png'
import './Graficos.css'
const URL_API = 'http://localhost/backend_becas/getDashboard.php'




function Graficos() {

  const cookies = new Cookies();
  const [registrados, setRegistrados] = useState(0)
  const [conBecas, setConBecas] = useState(0)
  const [sinBecas, setSinBecas] = useState(0)
  const [countSistemas, setCountSistemas] = useState(0)
  const [countCivil, setCountCivil] = useState(0)
  const [countTurismo, setCountTurismo] = useState(0)
  const [countAdministracion, setCountAdministracion] = useState(0)
  const [countEnfermeria, setCountEnfermeria] = useState(0)
  const [countAnalisis, setCountAnalisis] = useState(0)
  const [porcentajeCon, setPorcentajeCon] = useState('')
  const [porcentajeSin, setPorcentajeSin] = useState('')
  //Por de pocentaje
  const [porSistemas, setPorSistemas] = useState(0)
  const [porCivil, setPorCivil] = useState(0)
  const [portTurismo, setPorTurismo] = useState(0)
  const [porAdministracion, setPorAdministracion] = useState(0)
  const [porEnfermeria, setPorEnfermeria] = useState(0)
  const [porAnalisis, setPorAnalisis] = useState(0)


  useEffect(()=>{
    setPorcentajeCon((conBecas*(100/registrados)).toFixed())
    setPorcentajeSin((sinBecas*(100/registrados)).toFixed())
    setPorSistemas((countSistemas*(100/registrados)).toFixed())
    setPorCivil((countCivil*(100/registrados)).toFixed())
    setPorTurismo((countTurismo*(100/registrados)).toFixed())
    setPorAdministracion((countAdministracion*(100/registrados)).toFixed())
    setPorEnfermeria((countEnfermeria*(100/registrados)).toFixed())
    setPorAnalisis((countAnalisis*(100/registrados)).toFixed())
   
  },[registrados])

  useEffect(()=>{
    getDatos()
  },[])


  async function getDatos(){
    const res = await axios.get(URL_API)  
    res.data.map((e,index)=>{
    if(index<=2){
        if(index==0){
          setRegistrados(e['COUNT(estudiantes.cedula)'])
        }
        if(index==1){
          setConBecas(e['COUNT(estudiantes.cedula)'])
        }
        if(index==2){
          setSinBecas(e['COUNT(estudiantes.cedula)'])
        }
        
    }else{
        if(index==3){
          setCountSistemas(e['COUNT(estudiantes.idCarrera)'])
        }
        if(index==4){
          setCountCivil(e['COUNT(estudiantes.idCarrera)'])
        }
        if(index==5){
          setCountTurismo(e['COUNT(estudiantes.idCarrera)'])
        }
        if(index==6){
          setCountAdministracion(e['COUNT(estudiantes.idCarrera)'])
        }
        if(index==7){
          setCountEnfermeria(e['COUNT(estudiantes.idCarrera)'])
        }
        if(index==8){
          setCountAnalisis(e['COUNT(estudiantes.idCarrera)'])
        }
    }
    })
  
    
  }

  return (
    <div  style={{height:'90%'}} >
                                      {/*<!-- Content Row -->*/}
{/*---------------------------------------------------------------------------------------------------------------- */}
      <div class="row">
{/*---------------------------------------------------------------------------------------------------------------- */}
        <div className='col-4 mb-4 '>
            <div className='card border-left-primary shadow h-100 py-2'>
              <div class="card-body pe-4 px-4 m-auto">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class=" fw-bold text-title-card text-primary text-uppercase ">
                            Registrados
                        </div>
                        <div class="text-card mb-0  text-center">{registrados}</div>
                    </div>
                    <div class="col-auto">
                      <img className='img-card' src={imgRegistrados}></img>
                    </div>
                </div>
              </div>
            </div>       
          </div>
      {/*---------------------------------------------------------------------------------------------------------------- */}
      {/*---------------------------------------------------------------------------------------------------------------- */}
          <div className='col-4 mb-4'>
            <div className='card border-left-primary shadow h-100 py-2'>
              <div class="card-body pe-4 px-4 m-auto">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class=" fw-bold text-title-card text-primary text-uppercase ">
                            CON BECAS</div>
                        <div class="text-card  mb-0  text-center">{conBecas}</div>
                    </div>
                    <div class="col-auto">
                      <img className='img-card'  src={imgConBecas}></img>
                    </div>
                </div>
              </div>
            </div>       
          </div>
        {/*---------------------------------------------------------------------------------------------------------------- */}
        {/*---------------------------------------------------------------------------------------------------------------- */}
          <div className='col-4 mb-4'>
            <div className='card border-left-primary shadow h-100 py-2'>
              <div class="card-body pe-4 px-4 m-auto">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <div class=" fw-bold text-title-card text-primary text-uppercase ">
                          SIN BECAS</div>
                        <div class="text-card  mb-0 text-center">{sinBecas}</div>
                    </div>
                    <div class="col-auto">
                      <img className='img-card'  src={imgSinBecas}></img> 
                    </div>
                </div>
              </div>
            </div>       
          </div>
        {/*---------------------------------------------------------------------------------------------------------------- */}
        
      </div>
{/*---------------------------------------------------------------------------------------------------------------- */}

      <div className='row' >
    








        
      {/*<!-- Pie Chart -->*/}
          <div class="col-12">
          
              <div class="card shadow ">
              
                 
                  
                  <div class="card-body">
                      <div class="chart-pie pt-2 pb-2  ">
                        <h2 className='fs-1 text-primary ' >✅Bienvenid@ {cookies.get('userName')+' '+cookies.get('userLastName')}.</h2>
                        <br></br>
                        <h3 className='text-primary'>Grafico General.</h3>
                        
                        <hr></hr>
                        <div class="mt-4 text-center small">
                          <span class="m-1">
                              <i class="fas fa-circle text-primary"></i> Con becas.
                          </span>
                          <span class="m-1">
                              <i class="fas fa-circle text-success"></i> Sin becas.
                          </span>
                        </div>
                        <br></br>
                        <div class="progress">
                          <div class="progress-bar" role="progressbar" aria-label="Segment one" style={{width: porcentajeCon+'%'}} aria-valuenow={porcentajeCon+'%'} aria-valuemin="0" aria-valuemax="100">{porcentajeCon}%</div>
                          <div class="progress-bar bg-success" role="progressbar" aria-label="Segment two" style={{width: porcentajeSin+'%'}} aria-valuenow={porcentajeSin+'%'}  aria-valuemin="0" aria-valuemax="100">{porcentajeSin}%</div>
                        </div>
                        
                        
                        <br></br>
                        <h2 className='text-primary'>Grafico por carrera.</h2>
                        <hr className='mb-3'></hr>
                        <div className='mb-3'>
                          <div className='d-flex justify-content-between text-secondary'>
                            <h4 class="small font-weight-bold d-inline">Ingenieria de sistemas. </h4> <span class=" text-end"> {countSistemas} - {porSistemas}%</span> 
                          </div>
                          <div class="progress"  >
                            <div class="progress-bar bg-primary" role="progressbar" aria-label="Success example" style={{width: porSistemas+'%'}} aria-valuenow={porSistemas+'%'} aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>

                        <div className='mb-3'>
                          <div className='d-flex justify-content-between text-secondary'>
                            <h4 class="small font-weight-bold d-inline">Ingenieria civil. </h4> <span class=" text-end">{countCivil} - {porCivil}%</span> 
                          </div>
                          <div class="progress" >
                            <div class="progress-bar bg-primary" role="progressbar" aria-label="Success example" style={{width: porCivil+'%'}} aria-valuenow={ porCivil+'%'} aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                        
                        <div className='mb-3'>
                          <div className='d-flex justify-content-between text-secondary'>
                            <h4 class="small font-weight-bold d-inline">licenciatura en turismo. </h4> <span class=" text-end">{countTurismo} - {portTurismo}%</span> 
                          </div>
                          <div class="progress"  >
                            <div class="progress-bar bg-primary" role="progressbar" aria-label="Success example" style={{width: portTurismo+'%'}} aria-valuenow={ portTurismo+'%'} aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>

                        <div className='mb-3'>
                          <div className='d-flex justify-content-between text-secondary'>
                            <h4 class="small font-weight-bold d-inline">licenciatura en Administracion y gestion municipal.  </h4> <span class=" text-end">{countAdministracion} - {porAdministracion}%</span> 
                          </div>
                          <div class="progress"  >
                            <div class="progress-bar bg-primary" role="progressbar" aria-label="Success example" style={{width: porAdministracion+'%'}} aria-valuenow={porAdministracion+'%'} aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>

                        <div className='mb-3'>
                          <div className='d-flex justify-content-between text-secondary'>
                            <h4 class="small font-weight-bold d-inline">TSU. Enfermeria.</h4> <span class=" text-end">{countEnfermeria} - {porEnfermeria}%</span> 
                          </div>
                          <div class="progress"  >
                            <div class="progress-bar bg-primary" role="progressbar" aria-label="Success example" style={{width: porEnfermeria+'%'}} aria-valuenow={ porEnfermeria+'%'}aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>

                        <div className='mb-3'>
                          <div className='d-flex justify-content-between text-secondary'>
                            <h4 class="small font-weight-bold d-inline">TSU. Analisis y diseño de sistemas. </h4> <span class=" text-end">{countAnalisis} - {porAnalisis}%</span> 
                          </div>
                          <div class="progress" >
                            <div class="progress-bar bg-primary" role="progressbar" aria-label="Success example" style={{width: porAnalisis+'%'}} aria-valuenow={porAnalisis+'%'} aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>

                      </div>
                      
                  </div>
              </div>
          </div>

      </div>




























    </div>
  )
}

export default Graficos