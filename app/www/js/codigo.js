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

function esconderCarrito(){
	$("#carrito").fadeOut();
}

$(function(){
	
	FastClick.attach(document.body);

	
	if($("section").attr("id") == "inicio"){
		cabecera();
	}
	else if($("section").attr("id") == "productos"){
		
		cabecera();
		recuperarProductos();
		menuAbajo();
		mostrarProductos();
		menuArriba();
		
		if(sessionStorage.getItem("carrito") == null){
			crearCarrito();
		}
		else{
			pintarCarrito();
		}
		
	}

	$(".botonCompra").click(function(){

		var idProducto = $(this).attr("data-id");
		var nombre = $(this).attr("data-nombre");
		var precio = $(this).attr("data-precio");
		var cantidad = 1;

		addItem(idProducto, nombre, precio, cantidad);
		
		$("#menuArriba").hide();
		$("#carrito").fadeIn();

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