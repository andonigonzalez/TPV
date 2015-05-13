function crearCarrito(){
	
	var carrito = [];
	
	sessionStorage.setItem("carrito", JSON.stringify(carrito));
	
	pintarCarrito();
	
}

function pintarCarrito(){
	
	var carrito = JSON.parse(sessionStorage.getItem("carrito"));
	
	var total = 0;
	var html = "";
	
	html += "<button id='vaciarCarrito' class='btn' onclick='vaciarCarrito()'>VaciarCarrito</button>";
	html += "<button class='btn' onclick='esconderCarrito()'>Seguir Comprando</button>";
	html += "<ul>";
	
	if(carrito.length == 0){
		html += "<li>";
			html += "<p>EL CARRITO ESTA VACIO</p>";
		html += "</li>";
	}
	else{
		for(var i = 0; i < carrito.length; i++){
			
			var idProducto = carrito[i].idProducto;
			var nombre = carrito[i].nombreProducto;
			var precio = carrito[i].precio;
			var cantidad = carrito[i].cantidad;
			total += precio*cantidad;
			
			html += "<li>";
				html += "<h2>"+ idProducto + ". " + nombre +"</h2>";
				html += "<p>Precio: "+ precio*cantidad +" €</p>";
				html += "<p>x"+ cantidad +"</p>";
				html += "<button class='btn' onclick='modificarCarrito("+ 0 +", "+ [i] +")'>-</button>";
				html += "<button class='btn' onclick='modificarCarrito("+ 1 +", "+ [i] +")'>+</button>";
				html += "<button class='btn' onclick='modificarCarrito("+ 2 +", "+ [i] +")'>X</button>";
			html += "</li>";
			
		}

	}
	
	html += "</ul>";
	html += "<h2 id='total'>TOTAL: "+ total +" €</h2>";
	
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

function modificarCarrito(paccion, pposicion){
	
	var carrito = JSON.parse(sessionStorage.getItem("carrito"));
	var cantidad = carrito[pposicion].cantidad;
	
	switch(paccion){
		
		case 0:
			carrito[pposicion].cantidad = cantidad - 1;
			if(carrito[pposicion].cantidad == 0){
				carrito.splice(pposicion, 1);
			}
			break;
		
		case 1:
			carrito[pposicion].cantidad = cantidad + 1;
			break;
			
		case 2:
			carrito.splice(pposicion, 1);
			break;
		
	}
	
	sessionStorage.setItem("carrito", JSON.stringify(carrito));
	pintarCarrito();
	
}

function finalizarCompra(){
	
	var tag = "insertarPedido";
	var carrito = JSON.parse(sessionStorage.getItem("carrito"));
	var url = "";
	
	if(carrito.length > 0){
		$.ajax({
			type: "POST",
			datatype: "json",
			url: url,
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
				alert("Error de ajax");
			}
		});
	}
	else{
		alert("No tiene ningun producto en el carrito");
	}
	
};