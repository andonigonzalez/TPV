function cabecera(){
		
	var html = "";
	
	html += "<header>";
		html += "<h1>TPV</h1>";
		html += "<img id='burger' src='img/hamburger.png' alt='icono menu'>";
		html += "<div class='cierre'></div>";
	html += "</header>";
	html += "<div id='carrito'></div>";
	
	$("body").prepend(html);
	
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
			html += "<li><a id='btnCarrito'>Carrito</a></li>";
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
			html += "<button class='btn botonCompra' data-id='"+ idProducto +"' data-nombre='"+ nombre +"' data-precio='"+ (2*i+3) +"'>Pedir</button>";
		html += "</article>";
		
	}
	
	$("#productos").html(html);
	
}

function mostrarMenuArriba(){
	
}

$(function(){
	
	FastClick.attach(document.body);

	if($("#productos")){
		cabecera();
		recuperarProductos();
		menuAbajo();
		mostrarProductos();
		menuArriba();
	}
	else if($("#inicio")){
		cabecera();
	}	
	
	if(sessionStorage.getItem("carrito") == null){
		crearCarrito();
	}
	else{
		pintarCarrito();
	}

	$(".botonCompra").click(function(){

		var idProducto = $(this).attr("data-id");
		var nombre = $(this).attr("data-nombre");
		var precio = $(this).attr("data-precio");
		var cantidad = 1;

		addItem(idProducto, nombre, precio, cantidad);

	});

	$("#burger").click(function(){
		$("#carrito").hide();
		$("#menuArriba").slideToggle();
	});

	$("#btnCarrito").click(function(){
		$("#menuArriba").hide();
		$("#carrito").fadeToggle();
	});

});