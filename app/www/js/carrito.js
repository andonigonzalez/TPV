function Carrito(){
	
	var carrito = [];
	
	sessionStorage.setItem("carrito", JSON.stringify(carrito));
	
}

Carrito.prototype.recuperarCarrito = function(){
	
	var carrito = JSON.parse(sessionStorage.getItem("carrito"));
	
};

Carrito.prototype.addItem = function(pidProducto, pnombreProducto, pprecio, pcantidad){
	
	var duplicado = false;
	var nuevoObjeto = {
		"idProducto": pidProducto,
		"nombreProducto": pnombreProducto,
		"precio": pprecio,
		"cantidad": pcantidad
	};
	var carrito = JSON.parse(sessionStorage.getItem("carrito"));
	
	for(var i = 0; i <carrito.length; i++){
		if(carrito[i].idProducto == nuevoObjeto.idProducto){
			carrito[i].cantidad += nuevoObjeto.cantidad;
			duplicado = true;
		}
	}
	
	if(!duplicado){
		carrito.push(nuevoObjeto);
	}
	
	sessionStorage.setItem("carrito", JSON.stringify(carrito));
	
};

Carrito.prototype.finalizarCompra = function(purl){
	
	var tag = "insertarPedido";
	var carrito = JSON.parse(sessionStorage.getItem("carrito"));
	
	if(carrito.length > 0){
		$.ajax({
			type: "POST",
			datatype: "json",
			url: purl,
			data: {"tag": tag, "carrito": carrito},
			success: function(){
				if(datos != false){
					if(datos == 1){
						sessionStorage.removeItem("carrito");
					}
					else{
						alert("Error al finalizar la compra");
					}
				}
				else{
					alert("Error al finalizar la compra");
				}
			},
			error: function(){
				alert("Error al finalizar la compra");
			}
		});
	}
	else{
		alert("No tiene ningun producto en el carrito");
	}
	
};