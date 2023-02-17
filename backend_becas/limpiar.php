<?php 




	# Limpiar cadenas de texto #
	function limpiar_cadena_texto($cadena){
		$cadena=trim($cadena);
		$cadena=stripslashes($cadena);
		$cadena=str_ireplace("<script>", "", $cadena);
		$cadena=str_ireplace("</script>", "", $cadena);
		$cadena=str_ireplace("<script src", "", $cadena);
		$cadena=str_ireplace("<script type=", "", $cadena);
		$cadena=str_ireplace("SELECT * FROM", "", $cadena);
		$cadena=str_ireplace("DELETE FROM", "", $cadena);
		$cadena=str_ireplace("INSERT INTO", "", $cadena);
		$cadena=str_ireplace("DROP TABLE", "", $cadena);
		$cadena=str_ireplace("DROP DATABASE", "", $cadena);
		$cadena=str_ireplace("TRUNCATE TABLE", "", $cadena);
		$cadena=str_ireplace("SHOW TABLES;", "", $cadena);
		$cadena=str_ireplace("SHOW DATABASES;", "", $cadena);
		$cadena=str_ireplace("<?php", "", $cadena);
		$cadena=str_ireplace("?>", "", $cadena);
		$cadena=str_ireplace("--", "", $cadena);
		$cadena=str_ireplace("^", "", $cadena);
		$cadena=str_ireplace("<", "", $cadena);
		$cadena=str_ireplace("[", "", $cadena);
		$cadena=str_ireplace("]", "", $cadena);
		$cadena=str_ireplace("==", "", $cadena);
		$cadena=str_ireplace(";", "", $cadena);
		$cadena=str_ireplace("::", "", $cadena);
		$cadena=trim($cadena);
		$cadena=stripslashes($cadena);
		return $cadena;
	}
	function limpiar_cadena_Nombre($cadena){
		$cadena = limpiar_cadena_texto($cadena)
		$cadena= str_ireplace("0", "", $cadena);
		$cadena= str_ireplace("1", "", $cadena);
		$cadena= str_ireplace("2", "", $cadena);
		$cadena= str_ireplace("3", "", $cadena);
		$cadena= str_ireplace("4", "", $cadena);
		$cadena= str_ireplace("5", "", $cadena);
		$cadena= str_ireplace("6", "", $cadena);
		$cadena= str_ireplace("7", "", $cadena);
		$cadena= str_ireplace("8", "", $cadena);
		$cadena= str_ireplace("9", "", $cadena);
		$cadena= str_ireplace(".", "", $cadena);
		return $cadena;
	}
	function limpiar_cadena_telefono($cadena){
		$cadena = limpiar_cadena_texto($cadena)
		$cadena= str_ireplace("+58", "", $cadena);
		$cadena= str_ireplace("+", "", $cadena);
		
		return $cadena;
	}





?>