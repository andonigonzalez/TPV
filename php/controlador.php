<?php

require_once("clases.php");

if(isset($_POST["tag"]) || $_POST["tag"] != ""){

	$tag = $_POST["tag"];

	switch($tag){

		case "recuperarProdutos":

			$obj = new Productos();
			$datos = $obj->recuperarProdutos();

			break;

	}

	echo json_encode($datos);

}

?>