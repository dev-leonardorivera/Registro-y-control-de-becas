import React from 'react'
import Cookies from 'react-cookie/cjs/Cookies'
import axios from 'axios'
import { useState} from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './formulario.css'


const URL_API = 'http://localhost/backend_becas/setEstudiantes.php'
const URL_API2= 'http://localhost/backend_becas/setUpdateEstudiantes.php'
const URL_API3= 'http://localhost/backend_becas/getStudent.php'
const URL_API4= 'http://localhost/backend_becas/deleteStudent.php'


function Formulario() {
    const cookies = new Cookies();
    
    const [tipoCI   ,  setTipoCi]    = useState('V');
    const [cedula  ,  setCedula]    = useState();
    const [nombre   ,  setNombre]    = useState('');
    const [apellido ,  setApellido]  = useState('');
    const [carrera  ,  setCarrera]   = useState();
    const [telefono ,  setTelefono]  = useState('');
    const [direccion,  setDireccion] = useState('');
    const [becado   ,  setBecado]    = useState('No');


    
    function confirmDelete(){
       
        if(typeof(cedula)==='undefined'){
            toast.error('Faltan campos obligatorios por llenar.',{duration:3000})
            toast.error('El campo cedula es obligartio para poder usar la opcion eliminar.',{duration:3000})
        }else{

            toast(() => (
                <div className='row align-items-center'>
                    <div className='col'>
                    <p>¿Seguro que quiere eliminar a este estudiante?</p>
    
                    </div>
                    <div className='col'>
                        <button className='btn btn-danger m-1' onClick={deleteUser}>
                        Eliminar
                        </button>
                    </div>
                </div>
               
              ),{duration:3000});
        }

    }

    async function deleteUser(e){
            e.preventDefault();
            toast.dismiss(e.id)
       
            if(typeof(cedula) === 'undefined' || cedula === ''){
    
                toast.error('Faltan campos obligatorios por llenar',{duration:3000})
                toast.error('El campo cedula es obligartio para poder usar la opcion eliminar',{duration:3000})
    
            }else{
                    const obj = {cedula};
                    const res = await axios.post(URL_API4,obj)
                    
                    if(res.data[0] ==='NO'){
                        toast.error('No se pudo eliminar el Estudainte',{duration:4000})
                    }
                    if(res.data[0] ==='SI'){
                        toast.success('Se ELimino el estudiante del registro.',{duration:3000})
                        limpiar();
                    }
                
    
            }
    }

    async function getstudent(){
        if(cedula === '' || typeof(cedula) ==='undefined'){
            toast.error('El campo cedula es obligatorio para buscar',{duration:3000})
        }else{
            const obj = {cedula}
            const res = await axios.post(URL_API3,obj)
         

            if(res.data[0]==='No'){
                toast.error('No se consiguio al estuainte en el registro.',{duration:3000})
            }else if(res.data[0]==='No1'){
                toast.error('El campo cedula es necesario para poder hacer la busqueda y la cedula debe ser mayor a 1 millon.',{duration:3000})

            }else{

                setTipoCi(res.data[0].tipoCedula)
                setCedula(res.data[0].cedula)
                setNombre(res.data[0].nombreEstudiante)
                setApellido(res.data[0].apellidoEstudiante)
                setTelefono(res.data[0].telefono)
                setDireccion(res.data[0].direccion)
                setCarrera(res.data[0].idCarrera)
                setBecado(res.data[0].becado)
            }

        }

    }

    async function setNewStudent(){
      
        if(tipoCI === '' || typeof(tipoCI) ==='undefined' || typeof(cedula) ==='undefined' || cedula === '' || nombre ==='' || typeof(nombre) ==='undefined' || apellido === '' || typeof(apellido) ==='undefined' || carrera === '' || typeof(carrera) ==='undefined' || telefono==='' || typeof(telefono) ==='undefined' || direccion ==='' || typeof(direccion) ==='undefined' || becado==='' || typeof(becado) ==='undefined' ){

            
            toast.error('Faltan campos obligatorios por llenar',{duration:3000})

        }else{
            if(carrera === 'Menu de carreras'){
                toast.error('Seleccione una carrera',{duration:3000})
            }else{

                const obj = {tipoCI, cedula, nombre, apellido, carrera, telefono, direccion, becado};
                const res = await axios.post(URL_API,obj)
                
                if(res.data[0] ==='NO'){
                    
                    toast((t) => (
                        
                        <div className='row align-items-center'>
                            <div className='col'>
                            <p>¿Quiere guardar los nuevos datos del estudiante?</p>
            
                            </div>
                            <div className='col'>
                                <button className='btn btn-success m-1' onClick={setNewStudentRetry}>
                                Guardar
                                </button>
                          
                            </div>
                        </div>
                      ),{duration:5000});
                    toast.error('El estudiante que intenta guardar ya existe.',{duration:3000})
                }
                if(res.data[0] ==='NO1'){
                    toast.error('No se puede gaurdar usuarios con datos vacios',{duration:3000})
                }
                if(res.data[0] ==='SI'){
                    toast.success('Se guardo el estudiante con exito',{duration:3000})
                }
                
            }

        }
        }
    async function setNewStudentRetry(e){
        e.preventDefault();
        toast.dismiss(e.id)
        
      
            if(tipoCI === '' || typeof(tipoCI) ==='undefined' || typeof(cedula) ==='undefined' || cedula === '' || nombre ==='' || typeof(nombre) ==='undefined' || apellido === '' || typeof(apellido) ==='undefined' || carrera === '' || typeof(carrera) ==='undefined' || telefono==='' || typeof(telefono) ==='undefined' || direccion ==='' || typeof(direccion) ==='undefined' || becado==='' || typeof(becado) ==='undefined' ){
    
                
                toast.error('Faltan campos obligatorios por llenar',{duration:3000})
    
            }else{
                if(carrera === 'Menu de carreras'){
                    toast.error('Seleccione una carrera',{duration:3000})
                }else{
    
                    const obj = {tipoCI, cedula, nombre, apellido, carrera, telefono, direccion, becado };
                    const res = await axios.post(URL_API2,obj)
                    

                    if(res.data[0] ==='NO'){
                        toast.error('No se puede gaurdar usuarios con datos vacios',{duration:4000})
                    }
                    if(res.data[0] ==='SI'){
                        toast.success('Se guardo el estudiante con exito',{duration:3000})
                    }
                }
    
            }
    }
    function limpiar (){
        setTipoCi('V')
        setCedula('')
        setNombre('')
        setApellido('')
        setTelefono('')
        setDireccion('')
        setCarrera('')
        setBecado('No')

   

    }


  return (
    <form className='bg-white p-4 shadow' style={{height:'90%'}}>
        <h2 className='fs-1 text-primary'>✅Bienvenid@ {cookies.get('userName')+' '+cookies.get('userLastName')}.</h2>
        <br></br>
        
        <h2>Datos de estudiante.</h2>
        <hr></hr>
        
        <div class="row g-3">
                
            <div class="col-12 col-lg-6">
                <div className='row'>
                    <di className='col'> 
                        <label  class="form-label fw-bold fs-6">Cedula. <span style={{color:'red'}}>*</span></label>
                    </di>
                    <di className='col justify-content-end text-end'> 
                        <button className='btn' onClick={limpiar} ><i class="fa-solid fa-rotate-right rotated"></i></button>
                    </di>
                </div>
                
                <div className='row g-0'>
                     <div className='col-4 col-sm-4 col-md-2'>      
                        <select value={tipoCI } class=" form-select" onChange={e => setTipoCi(e.target.value)} > 
                            <option value="V" selected>V</option>
                            <option value="E">E</option>
                        </select>
                    </div>
                    <div className='col-8 col-sm-8 col-md-10'>
                        <input value={cedula} type="Number" class="form-control" placeholder="Cedula" onChange={e => setCedula(e.target.value)} ></input>
                    </div>      
                </div>     
            </div>
                

            <div class="col-6">
                <label  class="form-label fw-bold fs-6">Nombre.  <span style={{color:'red'}}>*</span></label>
                <input value={nombre} type="text" class="form-control" placeholder="Nombre" aria-label="Nombre" onChange={e => setNombre(e.target.value)} ></input>
            </div>
            <div class="col-6">
                <label  class="form-label fw-bold fs-6">Apellido  <span style={{color:'red'}}>*</span></label>
                <input value={apellido} type="text" class="form-control" placeholder="Apellido" aria-label="Apellido" onChange={e => setApellido(e.target.value)} ></input>
            </div>
            <div className='col '>
                <label  class="form-label fw-bold fs-6">Carrera.  <span style={{color:'red'}}>*</span></label>
                <select value={carrera} class="form-select" aria-label="Default select example" onChange={e => setCarrera(e.target.value)} >
                    <option selecte>Menu de carreras</option>
                    <option value="1">Ingenieria de Sistemas</option>
                    <option value="2">Ingenieria Civil</option>
                    <option value="3">Licenciatura en turismo</option>
                    <option value="4">Licenciatura en Administracion y gestion municipal</option>
                    <option value="5">TSU. Enfermeria</option>
                    <option value="6">TSU. Analisis y diseño de sistemas</option>
                </select>

            </div>
            <div class="col-12">
                <label  class="form-label fw-bold fs-6">Telefono. <span style={{color:'red'}}>*</span></label>
                <div className='input-group'>
                    <div class="input-group-text">+58</div>
                    <input type="Number" value={telefono} class="form-control" placeholder="4125555555" onChange={e => setTelefono(e.target.value)} ></input>
                </div>
            </div>
            <div class="mb-2">
                <label  class="form-label fw-bold fs-6">Direccion <span style={{color:'red'}}>*</span></label>
                <textarea value={direccion} class="form-control"  rows="3" onChange={e => setDireccion(e.target.value)}  ></textarea>
            </div>
            <div className='col-12'>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label fw-bold fs-6">Becado</label>
                    <select value={becado} class="form-select" aria-label="Default select example" onChange={e => setBecado(e.target.value)} >
                        <option value='No' selected>No</option>
                        <option value='Si'>Si</option>
                        
                    </select>
                </div>
                    
                
            </div>
          
            
            <div className='col-12'>
                <div class="d-grid gap-5 d-md-block ">
                    <button class="btn btn-primary m-1" type="button" onClick={ getstudent}>Buscar</button>
                    <button class="btn btn-primary m-1" type="button" onClick={confirmDelete}>Eliminar</button>
                    <button class="btn btn-primary m-1" type="button" onClick={setNewStudent}>Guardar</button>
                    
                </div>
            </div>
        </div>
        <Toaster position='bottom-center' ></Toaster> 
  
        
    </form>
    
  )
}

export default Formulario