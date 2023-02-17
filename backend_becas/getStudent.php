<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");
$method = $_SERVER['REQUEST_METHOD'];
$datos = json_decode(file_get_contents("php://input"), true);

$cedula = $datos['cedula'];
//$cedula = 28316442;

$sql= "SELECT cedula, tipoCedula,nombreEstudiante,apellidoEstudiante,carreras.idCarrera, telefono, direccion,becado from estudiantes INNER JOIN carreras ON estudiantes.idCarrera = carreras.idCarrera where cedula = ".$cedula;
include "conectar.php";

//sleep(1);
function desconectar($conexion){

    $close = mysqli_close($conexion);

        if($close){
            echo '';
        }else{
            echo 'Ha sucedido un error inexperado en la conexión de la base de datos';
        }

    return $close;
}

function obtenerArreglo($sql,$cedula){
    //Creamos la conexion con la funcion anterior
    $conexion = conectarDB();
    $arreglo = array();

    //generamos la consulta
    if(isset($cedula) && $cedula!= '' && $cedula>1000000){

        mysqli_set_charset($conexion, "utf8"); //formato de datos utf8
    
        if(!$resultado = mysqli_query($conexion, $sql)) die(); //si la conexión cancelar programa
    
       //creamos un array 
        $row = mysqli_fetch_assoc($resultado);
        $arreglo[0] = $row;
        

        if($arreglo[0]==null){
            $arreglo[0] = 'No';
        }
    }else{
        $arreglo[0] = 'No1';

    }
        
    

    desconectar($conexion); //desconectamos la base de datos

    return $arreglo; //devolvemos el array
}

        $r = obtenerArreglo($sql, $cedula );
        echo json_encode($r);

?>