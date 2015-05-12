<?php
error_reporting(-1);
ini_set('display_errors', 'On');
header("Access-Control-Allow-Origin: *");

include("clases.php");

if(isset($_POST["tag"]) || $_POST["tag"] != ""){
	
	$tag = $_POST["tag"];
	
	switch($tag){
		
		case "recuperarProductos":
			$obj = new Productos();
			$datos = $obj->getProductos();

			echo json_encode($datos);
			
			break;
		
	}
	
}

?>