<?php

class Conexion{

	private $conexion;

	function __construct(){

		$host = "localhost";
		$user = "comanda";
		$pass = "12345678";
		$bd = "comanda";

		$conect = new mysqli($host, $user, $pass, $bd);

		if($conect->connect_error){
			die("Error al conectar con la BD");
		}
		else{
			$this->conexion = $conect;
			$this->conexion->query("set names 'utf8'");
		}

	}

	public function getConexion(){
		return $this->conexion;
	}

}

class App{

	private $sql;

	function __construct(){

		$obj = new Conexion();
		$this->sql = $obj->getConexion();

	}

	public function getProductos(){

		$consulta = $this->sql->query("
			select p.*, c.nombre as categoria, sc.nombre as subcategoria
			from productos p
			left join subcategorias sc on sc.id = p.id_subcategoria
			inner join categorias c on c.id = sc.id_categoria
			order by p.nombre
		");

		if($consulta->num_rows > 0){
			$datos = array();
			while($fila = $consulta->fetch_object()){
				$aux = array(
					"idProducto"  => $fila->id,
					"nombre" => $fila->nombre,
					"precio" => $fila->precio,
					"categoria" => $fila->categoria,
					"subcategoria" => $fila->subcategoria,
				);
				
				array_push($datos, $aux);
			}
		}
		else{
			$datos = false;
		}

		return $datos;
		
		$this->sql->close();

	}
	
	public function getMesas(){
		
		$consulta = $this->sql->query("select * from mesas");

		if($consulta->num_rows > 0){
			$datos = array();
			while($fila = $consulta->fetch_object()){
				$aux = array(
					"idMesa"  => $fila->id,
					"numMesa" => $fila->num_mesa,
				);
				
				array_push($datos, $aux);
			}
		}
		else{
			$datos = false;
		}

		return $datos;
		
		$this->sql->close();
		
	}
	
	public function getSubcategorias(){
		
		$consulta = $this->sql->query("select * from subcategorias");

		if($consulta->num_rows > 0){
			$datos = array();
			while($fila = $consulta->fetch_object()){
				$aux = array(
					"idSc"  => $fila->id,
					"nombre" => $fila->nombre,
					"idCat" => $fila->id_categoria,
					"modificadores" => $fila->id_modificadores,
				);
				
				array_push($datos, $aux);
			}
		}
		else{
			$datos = false;
		}

		return $datos;
		
		$this->sql->close();
		
	}

}

?>