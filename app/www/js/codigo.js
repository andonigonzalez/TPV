function cabecera(){
		
	var html = "";
	
	html += "<header>";
		html += "<h1>TPV</h1>";
		html += "<img id='burger' src='img/hamburger.png' alt='icono menu' onclick='mostrarMenuArriba()'>";
		html += "<div class='cierre'></div>";
	html += "</header>";
	
	$("body").append(html);
	
}

function menuArriba(){
	
	var html = "";
	
	html += "<div id='menuArriba'>";
		html += "<ul>";
			html += "<li>Cervezas</li>";
			html += "<li>Vinos</li>";
			html += "<li>Raciones</li>";
			html += "<li>Tostas</li>";
			html += "<li>Bocadillos</li>";
			html += "<li>Hamburguesas</li>";
			html += "<li>Postres</li>";
		html += "</ul>";
	html += "</div>";
	
	$("body").append(html);
	
}

function menuAbajo(){
	
	var html = "";
	
	html += "<nav>";
		html += "<ul>";
			html += "<li><a>Más Vendidos</a></li>";
			html += "<li><a>Bebida</a></li>";
			html += "<li><a>Comida</a></li>";
			html += "<li><a>Carrito</a></li>";
		html += "</ul>";
	html += "</nav>";
	
	$("body").append(html);
	
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
			html += "<button class='btn'>Pedir</button>";
		html += "</article>";
		
	}
	
	$("section").html(html);
	
}

function mostrarMenuArriba(){
	$("#menuArriba").slideToggle();
}

$(function(){
	
	FastClick.attach(document.body);
	
	recuperarProductos();

});