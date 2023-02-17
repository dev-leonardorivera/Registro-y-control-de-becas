import React from 'react'
import { useState, useEffect, } from 'react'
import { useNavigate } from 'react-router-dom';
import {useParams, Link} from 'react-router-dom'
import './Dashboard.css'
import Reportes from '../component/Reportes';
import UsersAdmin from '../component/UsersAdmin'
import Graficos from '../component/Graficos'
import Formulario from '../component/Formulario'
import imgLogo from '../img/UNEFA-logo.jpg'
import Cookies from 'universal-cookie';
import './Dashboard.css'
/*---------------------------------------------------------------------- */

function Dashboard() {

    const [btnIsActive1,setBtnIsActive1] = useState(true)
    const [btnIsActive2,setBtnIsActive2] = useState(false)
    const [btnIsActive3,setBtnIsActive3] = useState(false)
    const [btnIsActive4,setBtnIsActive4] = useState(false)
    const parametro = useParams() // recive el dato desde el link 
    const [seccion,setSeccion] = useState('Inicio')
    const [stylebar1, setStylebar1] = useState(' width: 30%;');
    const nextTo = useNavigate();
    const cookies = new Cookies();
    const [config,setConfig] =useState(false);
/*---------------------------------------------------------------------- */

    useEffect(()=>{
        setSeccion(parametro.seccion)
        if(parametro.seccion === 'Inicio'){
            setBtnIsActive1(true)
            setBtnIsActive2(false)
            setBtnIsActive3(false)
            setBtnIsActive4(false)

        }
        if(parametro.seccion === 'DatosEstudiantes'){
            setBtnIsActive1(false)
            setBtnIsActive2(true)
            setBtnIsActive3(false)
            setBtnIsActive4(false)
        }
        if(parametro.seccion === 'Configuracion'){
            
            setBtnIsActive1(false)
            setBtnIsActive2(false)
            setBtnIsActive3(true)
            setBtnIsActive4(false)

        }
        if(parametro.seccion === 'Reportes'){
            
            setBtnIsActive1(false)
            setBtnIsActive2(false)
            setBtnIsActive3(false)
            setBtnIsActive4(true)

        }
    },[parametro])

    function salir(){
        cookies.set('PermisoEntrar',false);
        cookies.set('userName', '');
        cookies.set('userLastName', '');
        cookies.set('accesAdmin','' );
        nextTo('/');
    }

    
/*---------------------------------------------------------------------- */
  useEffect(()=>{   
        if(cookies.get('PermisoEntrar')==='true'){
            
        }else{
            nextTo('/')
        }
        if(cookies.get('accesAdmin')==='No'){
            setConfig(true);
        }
  },[])
    
/*---------------------------------------------------------------------- */
  
  return (

<>
<div className="container-fluid ">
    <div className="row flex-nowrap bg-light" >
        <div className=" col-3  col-xl-2 px-sm-2 px-0 bg-primary  ">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                
                <div  className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none  text-center mt-3">
                    <span className=" fs-1 d-none d-sm-inline mb-4 " style={{userSelect:'none'}}><img src={imgLogo}alt="hugenerd" width="60%" height="60%" className="rounded-circle"></img></span>
                </div>
                <div className='row  mb-auto' > 
                    <div className='col-12 mb-4 '>
                
                        <Link to={'/Dashboard/Inicio'} className='text-decoration-none'>
                            <a  className={`nav-link pb-1 px-0 align-middle  text-white btn-menu ${btnIsActive1 ? "btn-isActive" : ""}`}>
                                <i class="fa-solid fa-house mx-1 fa-lg"></i><span className="ms-1 d-none d-sm-inline ">Inicio</span>
                            </a>
                        </Link> 
                    </div>
                    <div className='col-12 mb-4 '>               
                        <Link to={'/Dashboard/DatosEstudiantes'} className={`text-decoration-none nav-link pb-1 px-0 align-middle  text-white btn-menu ${btnIsActive2 ? "btn-isActive" : ""}`}>
                                <a>

                                    <i class="fa-solid fa-user-tie mx-1 m-auto fa-lg"></i><span className="ms-1 d-none d-sm-inline">Datos Estudiante</span> 
                                </a>    
                        </Link>
                    </div>
                    <div className='col-12 mb-4 '>               
                        <Link to={'/Dashboard/Reportes'} className={`text-decoration-none nav-link pb-1 px-0 align-middle  text-white btn-menu ${btnIsActive4 ? "btn-isActive" : ""}`}>
                                <a>
                                
                                    <i class="fa-solid fa-file mx-1 m-auto fa-lg"></i><span className="ms-1 d-none d-sm-inline">Reportes</span> 
                                </a>    
                        </Link>
                    </div>
                    <div className={`col-12 mb-4 ${config ? "config" : ""} `}>
                
                        <Link to={'/Dashboard/Configuracion'}  className={`text-decoration-none nav-link pb-1 px-0 align-middle  text-white btn-menu ${btnIsActive3 ? "btn-isActive" : ""}`}>
                                <a>

                                    <i class="fa-solid fa-gear mx-1 fa-lg"></i><span className="ms-1 d-none d-sm-inline">Configuracion</span> 
                                </a>
                        </Link>
                    </div>
                    
                </div>
                <div className='col-12 mb-4 ' onClick={salir}>
                    <a   data-bs-toggle="collapse  " className="nav-link pb-1 px-0 align-middle  text-white btn-menu">
                        <i class="fa-solid fa-right-from-bracket mx-1 fa-lg"></i><span className="ms-1 d-none d-sm-inline">Salir</span> 
                    </a>
                </div>               
            </div>
        </div>
        <div className="col align-self-center p-4 ">
            <div >
                
                {seccion==='Inicio'&&<Graficos></Graficos>}
                {seccion==='DatosEstudiantes'&&<Formulario></Formulario>}
                {seccion==='Configuracion'&&<UsersAdmin></UsersAdmin>}
                {seccion==='Reportes'&&<Reportes></Reportes>}
                
            </div>

            
        </div>
    </div>
</div>


</>
  )
  
}

export default Dashboard