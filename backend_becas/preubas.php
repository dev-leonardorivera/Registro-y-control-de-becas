<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Content-Type: text/html; charset=utf-8");
$method = $_SERVER['REQUEST_METHOD'];
$datos = json_decode(file_get_contents("php://input"), true);


$strPrueba = ' 4123579763';

if(isset($strPrueba)){

    if(!str_contains($strPrueba, '+58' )){
       
        $strPrueba = '+58'.$strPrueba;
        $strPrueba = str_replace(' ','',$strPrueba);
        
    }
}


echo $strPrueba
        

?>