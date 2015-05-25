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

function mostrarProductos(sc){
		
	var productos = JSON.parse(localStorage.getItem("productos"));
	
	var html = "";
	
	for(var i = 0; i < productos.length; i++){
		
		var idProducto = productos[i].idProducto;
		var nombre = productos[i].nombre;
		var precio = productos[i].precio;
		var categoria = productos[i].categoria;
		var subcategoria = productos[i].subcategoria;
		
		if(subcategoria == sc){
			html += "<article>";
				html += "<h2>"+ nombre +"</h2>";
				html += "<p>Precio: "+ precio +" €</p>";
				html += "<button class='btnOscuro botonCompra' data-id='"+ idProducto +"' data-nombre='"+ nombre +"' data-precio='"+ precio +"'>Pedir</button>";
			html += "</article>";
		}
		
	}
	
	$(".productos").html(html);
	
}

function mostrarSubcategorias(c){
		
	var subcategorias = JSON.parse(localStorage.getItem("subcategorias"));
	
	var html = "";
	
	for(var i = 0; i < subcategorias.length; i++){
		
		var nombre = subcategorias[i].nombre;
		var categoria = subcategorias[i].categoria;
		
		if(categoria == c){
			html += "<div>";
				html += "<h2><a href='productos.html?sc="+ nombre +"'>"+ nombre +"</a></h2>";
			html += "</div>";
		}
		
	}
	
	$(".subCat").html(html);
	
}