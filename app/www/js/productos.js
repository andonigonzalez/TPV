function recuperarProductos(){
	
	var tag = "recuperarProductos";
	
	$.ajax({
		type: "POST",
		datatype: "json",
		url : "http://andonigonzalez.ikasle.aeg.es/php/controlador.php",
		data: {'tag':tag},
		success: function(data){
			if(data != false){
				var datos = JSON.parse(data);
				localStorage.setItem("productos", JSON.stringify(datos));
			}
		},
		error: function(){
			alert("Error de ajax");
		}
	});
	
}

function mostrarProductos(){
		
	var productos = JSON.parse(localStorage.getItem("productos"));
	
	var html = "";
	
	for(var i = 0; i < productos.length; i++){
		
		var idProducto = productos[i].idProducto;
		var nombre = productos[i].nombre;
		var descripcion = productos[i].descripcion;
		var img = productos[i].img;
		
		html += "<article>";
			html += "<h2>"+ idProducto + ". " + nombre +"</h2>";
			html += "<img src='http://andonigonzalez.ikasle.aeg.es/milart/img/"+ img +"' alt='"+ nombre +"'>";
			html += "<p>Precio: "+ (2*i+3) +" €</p>";
			html += "<button class='btn botonCompra' data-id='"+ idProducto +"' data-nombre='"+ nombre +"' data-precio='"+ (2*i+3) +"'>Pedir</button>";
		html += "</article>";
		
	}
	
	$("#productos").html(html);
	
}