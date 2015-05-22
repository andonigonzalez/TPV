function cabecera(){
		
	var mesa = JSON.parse(localStorage.getItem("mesa"));
	var html = "";
	
	html += "<header>";
		html += "<h1>TPV - mesa: </h1>";
		html += "<img id='burger' src='img/hamburger.png' alt='icono menu'>";
		html += "<div class='cierre'></div>";
	html += "</header>";
	html += "<div id='carrito'></div>";
	
	$("body").prepend(html);
	
}

function subcategorias(){
	
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

function recuperarMesas(){
	
	var tag = "recuperarMesas";
	
	$.ajax({
		type: "POST",
		datatype: "json",
		url: "http://andonigonzalez.ikasle.aeg.es/php/controlador.php",
		data: {'tag':tag},
		success: function(data){
			if(data != false && data != null){
				var datos = JSON.parse(data);
				localStorage.setItem("listadoMesas", JSON.stringify(datos));
			}
			else{
				alert("Error al recuperar mesas");
			}
		},
		error: function(){
			alert("Error de ajax");
		}
	});
	
}

function mostrarMesas(){
	
	var mesas = JSON.parse(localStorage.getItem("listadoMesas"));
	var html = "";
	
	for(var i = 0; i < mesas.length; i++){
		html += "<p>"+ mesas.numMesa +"</p>";
	}
	
}

$(function(){
	
	FastClick.attach(document.body);
	
	/*INICIO DE PAGINAS*/
	switch($("section").attr("id")){
		
		case "inicio":
			cabecera();
			recuperarProductos();
			
			$("#configEntrar").click(function(){
				if($("#configNombre").val() == "andoni" && $("#configPass").val() == "123"){
					window.location = "configuracion.html";
				}
			});
			
			break;
			
		case "productos":
			cabecera();
			menuAbajo();
			mostrarProductos();
			subcategorias();
			
			if(sessionStorage.getItem("carrito") == null){
				crearCarrito();
			}
			else{
				pintarCarrito();
			}
			
			break;
			
		case "configuracion":
			cabecera();
			recuperarMesas();
			
			break;
			
	}

	/*CARRITO*/
	$(".botonCompra").click(function(){

		var idProducto = $(this).attr("data-id");
		var nombre = $(this).attr("data-nombre");
		var precio = $(this).attr("data-precio");
		var cantidad = 1;

		addItem(idProducto, nombre, precio, cantidad);
		
		$("#menuArriba").hide();
		$("#carrito").fadeIn();

	});

	/*EFECTOS*/
	$("#burger").click(function(){
		$("#carrito").hide();
		$("#menuArriba").slideToggle();
	});

	$("#btnCarrito").click(function(){
		$("#menuArriba").hide();
		$("#carrito").fadeToggle();
	});
	
	$("#btnConfig").click(function(){
		$("#login").fadeToggle();
	});

});