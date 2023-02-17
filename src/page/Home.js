import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'universal-cookie';
import './Home.css'

const URL_API = 'http://localhost/backend_becas/login.php'


/*----------------------------------------------------------- */


function Home() {
  const cookies = new Cookies(); // instanciamos cookies
  const nextTo = useNavigate(); // funcion para navegar
  const [User, setUser] = useState(''); // datos usuario
  const [Pass, setPass] = useState(''); // datos usuario 


  async function validarUser(ev){ 
    ev.preventDefault(); // evitamos la redireccion de formulario 
    const obj = {User,Pass}; // armamos el objeto para la consulta al api
    const res = await axios.post(URL_API, obj); // consultamos al api
   
    if(res.data[0] == null){// si el usuario es incorrecto
      
      toast.error('El usuario introducido no existe',{
        duration: 2000,
        position: 'bottom-center'
      })
      
    }else{
      if(res.data[0].PASS ===Pass){ 
        // si es correcto procedemos llenar las cookies que se usaramas mas adelante.
        cookies.set('PermisoEntrar', true) // cookie permiso para  entrar al dasboard
        cookies.set('userName', res.data[0].NOMBRE)
        cookies.set('userLastName', res.data[0].APELLIDO)
        cookies.set('accesAdmin',res.data[0].ADMIN )
        nextTo('/Dashboard')
      }else{ // si la clave es incorrecta
        toast.error('Clave incorrecta.',{
          duration: 4000,
          position: 'bottom-center'
        })
      }
    }
    
    
    
    
  }



  return (
    
  <div className="modal modal-signin  d-block bg-carabobo" tabindex="-1" role="dialog" id="modalSignin">
  <div className="modal-dialog" role="document">
    <div className="modal-content rounded-4 shadow">
      <div className="modal-header p-5 pb-4 border-bottom-0">
        <h1 className="modal-title fs-5" >CONTROL DE BECAS UNEFA NUEVA ESPARTA.</h1>
      </div>

      <div className="modal-body p-5 pt-0">
        <h2 className="fw-bold mb-0 fs-2">Inicio de Sesion.</h2>
        <form onSubmit={validarUser} >
          <div className="form-floating mb-3">
            <input type="text" className="form-control rounded-3" name='nameUser' onChange={e => setUser(e.target.value)} placeholder="Usuario"/>
            <label for="floatingInput">Usuario </label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-control rounded-3" name='passUser' onChange={e => setPass(e.target.value)} placeholder="Contraseña"/>
            <label for="floatingPassword">Contraseña</label>
          </div>
          <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Entrar</button>
          <small className="text-muted">By Leonardo Rivera & Victoria Perez . Inventario de becas.</small>
          <hr className="my-4"/> 
          
        </form>
        <Toaster></Toaster>
      </div>
    </div>
  </div>
</div>

  )
}

export default Home