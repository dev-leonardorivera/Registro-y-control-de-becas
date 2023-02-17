<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");
$method = $_SERVER['REQUEST_METHOD'];




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

function obtenerArreglo(){
    $sql1= array("SELECT COUNT(estudiantes.cedula) from estudiantes",
"SELECT COUNT(estudiantes.cedula) from estudiantes WHERE estudiantes.becado = 'Si'",
"SELECT COUNT(estudiantes.cedula) from estudiantes WHERE estudiantes.becado = 'No'",
"SELECT COUNT(estudiantes.idCarrera) from estudiantes INNER JOIN carreras ON estudiantes.idCarrera = carreras.idCarrera WHERE estudiantes.idCarrera = 1",
"SELECT COUNT(estudiantes.idCarrera) from estudiantes INNER JOIN carreras ON estudiantes.idCarrera = carreras.idCarrera WHERE estudiantes.idCarrera = 2",
"SELECT COUNT(estudiantes.idCarrera) from estudiantes INNER JOIN carreras ON estudiantes.idCarrera = carreras.idCarrera WHERE estudiantes.idCarrera = 3",
"SELECT COUNT(estudiantes.idCarrera) from estudiantes INNER JOIN carreras ON estudiantes.idCarrera = carreras.idCarrera WHERE estudiantes.idCarrera = 4",
"SELECT COUNT(estudiantes.idCarrera) from estudiantes INNER JOIN carreras ON estudiantes.idCarrera = carreras.idCarrera WHERE estudiantes.idCarrera = 5",
"SELECT COUNT(estudiantes.idCarrera) from estudiantes INNER JOIN carreras ON estudiantes.idCarrera = carreras.idCarrera WHERE estudiantes.idCarrera = 6",
);
    //Creamos la conexion con la funcion anterior
    $conexion = conectarDB();
    $arreglo = array();


    mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

    for ($i=0; $i <9  ; $i++) { 
        $sql = $sql1[$i];
        $resultado = mysqli_query($conexion, $sql);//si la conexión cancelar programa
        $row = mysqli_fetch_assoc($resultado);
        
        $arreglo[$i] = $row;   
        if($arreglo[$i]==null){
                $arreglo[$i] = 'No';
        }
        
    }
    
    
        
    

    desconectar($conexion); //desconectamos la base de datos

    return $arreglo; //devolvemos el array
}

        $r = obtenerArreglo( );
        echo json_encode($r);

?>