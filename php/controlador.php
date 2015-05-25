<?php
error_reporting(-1);
ini_set('display_errors', 'On');
header("Access-Control-Allow-Origin: *");

include("clases.php");

if(isset($_POST["tag"]) || $_POST["tag"] != ""){
	
	$tag = $_POST["tag"];
	$obj = new App();
	
	switch($tag){
		
		case "recuperarProductos":
			$datos = $obj->getProductos();

			echo json_encode($datos);
			
			break;
			
		case "recuperarMesas":
			$datos = $obj->getMesas();

			echo json_encode($datos);
			
			break;
			
		case "subcategorias":
			$datos = $obj->getSubcategorias();
			
			echo json_encode($datos);
			
			break;
			
	}
	
}

?>