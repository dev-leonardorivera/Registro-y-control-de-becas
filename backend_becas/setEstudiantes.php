<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");
$method = $_SERVER['REQUEST_METHOD'];
$datos = json_decode(file_get_contents("php://input"), true);


$cedula = $datos['cedula'];
$tipoCedula = $datos['tipoCI'];
$nombreEstudiante = $datos['nombre'];
$apeliidoEstudiante =  $datos['apellido'];
$idCarrera  = $datos['carrera'];
$telefono  = $datos['telefono'];
$direccion  = $datos['direccion'];
$becado  = $datos['becado'];




$sql = "INSERT INTO `estudiantes` (`cedula`, `tipoCedula`, `nombreEstudiante`, `apellidoEstudiante`, `idCarrera`, `telefono`, `direccion`, `becado`) VALUES ('".$cedula."', '".$tipoCedula."', '".$nombreEstudiante."', '".$apeliidoEstudiante ."', '".$idCarrera."', '".$telefono."', '".$direccion."', '".$becado."');";
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

function setNewUser($sql, $cedula, $tipoCedula, $nombreEstudiante, $apeliidoEstudiante, $idCarrera, $telefono, $direccion, $becado ){
    //Creamos la conexion con la funcion anterior
    $conexion = conectarDB();
    $respuesta='';
    //generamos la consulta

        mysqli_set_charset($conexion, "utf8"); //formato de datos utf8
    if( $cedula !='' && $tipoCedula !='' && $nombreEstudiante !='' && $apeliidoEstudiante !='' && $idCarrera !='' && $telefono !='' && $direccion !='' && $becado !=''  ){
        try{

            if(!$resultado = mysqli_query($conexion, $sql)){
           
                $respuesta ='NO';
                
                
            }else{
                $respuesta ='SI';
            }
        }catch(Exception $e){
           
            $respuesta ='NO';
        }
        
    }
    desconectar($conexion); //desconectamos la base de datos

    $respuestaArray = array();
    $respuestaArray[0] = $respuesta;
    return $respuestaArray;
    
}
     
    $res = setNewUser($sql, $cedula, $tipoCedula, $nombreEstudiante, $apeliidoEstudiante, $idCarrera, $telefono, $direccion, $becado );
    echo json_encode($res);

        

?>