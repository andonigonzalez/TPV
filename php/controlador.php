<?php
error_reporting(-1);
ini_set('display_errors', 'On');
header("Access-Control-Allow-Origin: *");

include("clases.php");

if(isset($_POST["tag"]) || $_POST["tag"] != ""){
	
	$tag = $_POST["tag"];
	
	switch($tag){
		
		case "recuperarProductos":
			$obj = new Producto();
			$datos = $obj->getProductos();

			echo json_encode($datos);
			
			break;
			
		case "recuperarMesas":
			$obj = new Mesa();
			$datos = $obj->getMesas();
			
			echo json_encode($datos);
			
			break;
			
	}
	
}

?>