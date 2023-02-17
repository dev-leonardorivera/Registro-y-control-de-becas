<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");
$method = $_SERVER['REQUEST_METHOD'];
$datos = json_decode(file_get_contents("php://input"), true);


$user = $datos['user'];
$userName = $datos['userName'];
$userLastName = $datos['userLastName'];
$userPass =  $datos['userPass'];
$adminPermit  = $datos['adminPermit'];

/*
$user = 'leonardo1004';
$userName = 'Leonardo';
$userLastName = 'Rivera';
$userPass =  '123456';
$adminPermit  = 1;
*/



$sql = "INSERT INTO `usersadmin` (`USER`, `NOMBRE`, `APELLIDO`, `PASS`, `ADMIN`) VALUES ('".$user."', '".$userName."', '".$userLastName."', '".$userPass."', '".$adminPermit."')";
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

function setNewUser($sql, $user,$userName,$userLastName,$userPass){
    //Creamos la conexion con la funcion anterior
  $conexion = conectarDB();
    $respuesta='';
    //generamos la consulta

        mysqli_set_charset($conexion, "utf8"); //formato de datos utf8
    if( $user== '' || $userName == '' || $userLastName =='' || $userPass == ''){   
        $Respuesta='NO1';
    }else{
        if(!$resultado = mysqli_query($conexion, $sql)){
            $respuesta ='NO';
            //die(); //si la conexión cancelar programa   
        }else{
            $respuesta ='SI';
        }
    }

    desconectar($conexion); //desconectamos la base de datos

    $respuestaArray = array();
    $respuestaArray[0] = $respuesta;
    return $respuestaArray;
    
}
     
    $res = setNewUser($sql, $user,$userName, $userLastName, $userPass);
    echo json_encode($res);

        

?>