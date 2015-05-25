function recuperarProductos(){
	
	var tag = "recuperarProductos";
	
	$.ajax({
		type: "POST",
		datatype: "json",
		url: "http://andonigonzalez.ikasle.aeg.es/php/controlador.php",
		data: {'tag':tag},
		success: function(data){
			if(data != false && data != null){
				var datos = JSON.parse(data);
				localStorage.setItem("productos", JSON.stringify(datos));
			}
			else{
				alert("Error al recuperar productos");
			}
		},
		error: function(){
			alert("Error de ajax");
		}
	});
	
}

function recuperarSubcategorias(){
	
	var tag = "subcategorias";
	
	$.ajax({
		type: "POST",
		datatype: "json",
		url: "http://andonigonzalez.ikasle.aeg.es/php/controlador.php",
		data: {'tag':tag},
		success: function(data){
			if(data != false && data != null){
				var datos = JSON.parse(data);
				localStorage.setItem("subcategorias", JSON.stringify(datos));
			}
			else{
				alert("Error al recuperar subcategorias");
			}
		},
		error: function(){
			alert("Error de ajax");
		}
	});
	
}

function mostrarProductos(c){
		
	var productos = JSON.parse(localStorage.getItem("productos"));
	
	var html = "";
	
	for(var i = 0; i < productos.length; i++){
		
		var idProducto = productos[i].idProducto;
		var nombre = productos[i].nombre;
		var precio = productos[i].precio;
		var categoria = productos[i].categoria;
		
		if(categoria == c){
			html += "<article>";
				html += "<h2>"+ nombre +"</h2>";
				html += "<p>Precio: "+ precio +" €</p>";
				html += "<button class='btnOscuro botonCompra' data-id='"+ idProducto +"' data-nombre='"+ nombre +"' data-precio='"+ precio +"'>Pedir</button>";
			html += "</article>";
		}
		
	}
	
	$("#productos").html(html);
	
}