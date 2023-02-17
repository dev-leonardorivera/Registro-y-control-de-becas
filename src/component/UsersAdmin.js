import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { Cookies } from 'react-cookie';
const URL_API = 'http://localhost/backend_becas/setUserAdmin.php'
const URL_API2 = 'http://localhost/backend_becas/getDatosConfig.php'
const URL_API3 = 'http://localhost/backend_becas/delateUserAdmin.php'


function UsersAdmin() {
    const cookies = new Cookies();
    const [id, setId] = useState('')
    const [listaDatos, setListaDatos] = useState([])
    const [user, setUser] = useState('')
    const [userName, setUserName] = useState('')
    const [userLastName, setUserLastName] = useState('')
    const [userPass, setUserPass] = useState('')
    const [adminPermit, setAdminPermit ] = useState('No');
    const [actualizar, setActualizar] = useState(0)
    useEffect(()=>{
        getDatos();
      },[])
    useEffect(()=>{
        getDatos();
        
      },[actualizar])

    useEffect(()=>{
        eliminarUser()
        
    },[id])
    
    function cambiarID(e){
        e.preventDefault()
        setId(e.target[0].value)
       
        
    }

    async function eliminarUser (){
        const obj = {id}
        const res = await axios.post(URL_API3,obj)
      
        if(res.data[0]==='SI'){
            toast.success('Se Elimino El usuario',{duration:3000})
        }if (res.data[0]==='NO') {
            toast.error('error',{duration:3000})
        } else {
            
        }

        setActualizar(Number(actualizar)+1)
    }
      
    async function getDatos(){
        const res = await axios.get(URL_API2)
        setListaDatos(res.data)
     
        
        
      }
    

    async function SetNewUserAdmin(e){
        e.preventDefault()
        if(user === '' || userName === '' || userLastName ==='' || userPass === ''|| adminPermit === ''){

            
            toast.error('Faltan campos obligatorios por llenar',{duration:3000})

        }else{
            
            const obj = {user,userName,userLastName,userPass,adminPermit};
            const res = await axios.post(URL_API,obj)
            
            if(res.data[0] ==='NO'){
                toast.error('El Usuario que intenta guardar ya existe.',{duration:3000})
            }
            if(res.data[0] ==='NO1'){
                toast.error('No se puede gaurdar usuarios con datos vacios',{duration:4000})
            }
            if(res.data[0] ==='SI'){
                toast.success('Se guardo el usuario exito',{duration:3000})
            }

        }
        setActualizar(Number(actualizar)+1)
        
        

      }

  return (

    <div className='bg-white p-4 shadow' style={{height:'90%'}} >
    <h2 className='fs-1 text-primary'>✅Bienvenid@ {cookies.get('userName')+' '+cookies.get('userLastName')}.</h2>
    <br></br>
    <h2 >Usuarios Activos.</h2>
    <hr></hr>
   
    <table class="table table-hover text-center">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Usuario</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Admin</th>
            <th scope="col">Eliminar</th>
            </tr>
        </thead>
        <tbody>
            {listaDatos.map((data,index) =>(
                <tr>
                    <th scope="row">{index}</th>
                    <td>{data['USER']}</td>
                    <td>{data['NOMBRE']}</td>
                    <td>{data['APELLIDO']}</td>
                    <td>{data['ADMIN']}</td>
                    <td>
                        <form onSubmit={cambiarID}>
                            <input type='hidden' value={data['USER']}></input>
                            <button class="btn btn-primary" type="submit"><i class="fa-solid fa-trash"></i></button> 
                        </form>
                    </td>
                </tr>


            )
            )}
       
        </tbody>
    
    </table>
    <br></br>
    <h2>Agregar usuario nuevo.</h2>
    <hr></hr>
    <form>
        <div className='row'>
            <div className='col'>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Usuario. *</label>
                    <input onChange={e => setUser(e.target.value)} autoComplete='off' type="text" class="form-control" id="exampleFormControlInput1" placeholder="Usuario"></input>
                </div>
            </div>
            <div className='col'>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Nombre. *</label>
                    <input onChange={e => setUserName(e.target.value)} type="text" class="form-control" id="exampleFormControlInput1" placeholder="Nombre"></input>
                </div>
            </div>
            <div className='col'>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Apellido. *</label>
                    <input onChange={e => setUserLastName(e.target.value)} autoComplete='off' type="text" class="form-control" id="exampleFormControlInput1" placeholder="Apellido"></input>
                </div>
            </div>
            <div className='col'>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Contraseña. *</label>
                    <input onChange={e => setUserPass(e.target.value)} type="password"  autoComplete='off' class="form-control"  placeholder="Contraseña"></input>
                </div>
            </div>
            <div className='col-12'>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Admin</label>
                    <select onChange={e => setAdminPermit(e.target.value)} class="form-select" aria-label="Default select example">
                        <option value='No' selected>No</option>
                        <option value='Si'>Si</option>
                        
                    </select>
                </div>
            </div>
            <div className='col'>
                <button class="btn btn-primary" onClick={SetNewUserAdmin}>Guardar</button>    
            </div>
        </div>
    </form>
    <Toaster position='bottom-center' ></Toaster>    
    </div>

  )
}

export default UsersAdmin