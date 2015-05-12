function crearCarrito(){
	
	var carrito = [];
	
	sessionStorage.setItem("carrito", JSON.stringify(carrito));
	
	pintarCarrito();
	
}

function pintarCarrito(){
	
	var carrito = JSON.parse(sessionStorage.getItem("carrito"));
	
	var html = "";
	
	if(carrito.length == 0){
		html += "<p>EL CARRITO ESTA VACIO</p>";
	}
	else{
		html += "<button id='vaciarCarrito' onclick='vaciarCarrito()'>VaciarCarrito</button>";
		for(var i = 0; i < carrito.length; i++){
			
			var idProducto = carrito[i].idProducto;
			var nombre = carrito[i].nombreProducto;
			var precio = carrito[i].precio;
			var cantidad = carrito[i].cantidad;
			
			html += "<h2>"+ idProducto + ". " + nombre +"</h2>";
			html += "<p>Precio: "+ precio*cantidad +" €</p>";
			html += "<p>Cantidad: "+ cantidad +"</p>";
			
		}

	}
	
	$("#carrito").html(html);
	
}

function addItem(pid, pnombre, pprecio, pcantidad){
	
	var duplicado = false;
	var nuevoObjeto = {
		"idProducto": pid,
		"nombreProducto": pnombre,
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
	
	pintarCarrito();
	
}

function vaciarCarrito(){
	var carrito = [];
	sessionStorage.setItem("carrito", JSON.stringify(carrito));
	pintarCarrito();
}

function finalizarCompra(purl){
	
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