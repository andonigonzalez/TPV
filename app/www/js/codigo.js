function cabecera(){
		
	var html = "";
	
	html += "<header>";
		html += "<h1>TPV</h1>";
		html += "<img id='burger' src='img/hamburger.png' alt='icono menu'>";
		html += "<div class='cierre'></div>";
	html += "</header>";
	
	$("body").prepend(html);
	
}

function menuAbajo(){
	
	var html = "";
	
	html += "<nav>";
		html += "<ul>";
			html += "<li><a>Bebida</a></li>";
			html += "<li><a>Comida</a></li>";
			html += "<li><a>Carrito</a></li>";
		html += "</ul>";
	html += "</nav>";
	
	$("body").append(html);
	
}

$(function(){
	recuperarProductos();
	mostrarProductos();
	
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
				html+= "<button class='btn'>Pedir</button>";
			html += "</article>";
			
		}
		
		$("section").html(html);
		
	}
	
});3