<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");
$method = $_SERVER['REQUEST_METHOD'];
$datos = json_decode(file_get_contents("php://input"), true);


/*------------------------------------------------------------------------------------------ */
$idUser = $datos['User']; //id del usuario
//$idUser = 'usuario1';
$sql= "SELECT * FROM `usersadmin` WHERE USER ='".$idUser."'"; // la consulta a la base de datos
include "conectar.php"; // incluyendo la conexion a la base de datos

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

function obtenerDatos($sql){
    //Creamos la conexion con la funcion anterior
    $conexion = conectarDB();

    //generamos la consulta

    mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

    if(!$resultado = mysqli_query($conexion, $sql)){
        
        die(); //si la conexión cancelar programa
    } 

    $arreglo = array(); //creamos un array

    //guardamos en un array todos los datos de la consulta
    $i=0;
    
    while($row = mysqli_fetch_assoc($resultado))
    {
        
        $arreglo[$i] = $row;
        $i++;
    }

    desconectar($conexion); //desconectamos la base de datos

    return $arreglo; //devolvemos el array
}
     
        $r = obtenerDatos($sql);
        
        echo json_encode($r);

?>