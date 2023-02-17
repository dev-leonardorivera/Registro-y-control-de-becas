<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");
$method = $_SERVER['REQUEST_METHOD'];
$datos = json_decode(file_get_contents("php://input"), true);
include "conectar.php"; // incluyendo la conexion a la base de datos

/*------------------------------------------------------------------------------------------ */
$idUser = $datos['id']; //id del usuario
//$idUser = 'usuario1';
$sql= "DELETE FROM `usersadmin` WHERE USER = '".$idUser."'"; // la consulta a la base de datos


/*------------------------------------------------------------------------------------------ */

function desconectar($conexion){

    $close = mysqli_close($conexion);

        if($close){
            echo '';
        }else{
            echo 'Ha sucedido un error inexperado en la conexión de la base de datos';
        }

    return $close;
}
/*------------------------------------------------------------------------------------------ */

function obtenerDatos($sql,$idUser){
    //Creamos la conexion con la funcion anterior
    $conexion = conectarDB();
    $respuesta='';
    //generamos la consulta

    mysqli_set_charset($conexion, "utf8"); //formato de datos utf8
    if($idUser !=''){

        if(!$resultado = mysqli_query($conexion, $sql)){
            
            $respuesta ='NO';
        }else{
            $respuesta ='SI';
        }
    }

    $respuestaToArray = array(); //creamos un array

    $respuestaToArray[0] = $respuesta;

    desconectar($conexion); //desconectamos la base de datos

    return $respuestaToArray; //devolvemos el array
}
     
        $r = obtenerDatos($sql,$idUser);
        
        echo json_encode($r);

?>