/*BACKBUTTON*/
document.addEventListener("backbutton", botonAtras, false);

function botonAtras(){
	if($("section").attr("id") == "inicio"){
		alert("No puedes salir de la app");
	}
	else if($("#carrito").css("display") == "block"){
		$("#carrito").fadeOut();
	}
	else{
		window.history.back();
	}
}

/*MENUS*/
function cabecera(){
		
	var mesa = JSON.parse(localStorage.getItem("mesa"));
	var html = "";
	
	html += "<header>";
		html += "<h1>TPV - mesa: "+ mesa +"</h1>";
		html += "<img id='burger' src='img/hamburger.png' alt='icono menu'>";
		html += "<div class='cierre'></div>";
	html += "</header>";
	html += "<div id='carrito'></div>";
	
	$("body").prepend(html);
	
}

function subcategorias(){
	
	var sc = JSON.parse(localStorage.getItem("subcategorias"));
	var html = "";
	
	html += "<div id='menuArriba'>";
		html += "<ul>";
			for(var i = 0; i < sc.length; i++){
				html += "<li><a>"+ sc[i].nombre +"</a></li>";
			}
		html += "</ul>";
	html += "</div>";
	
	$("body").append(html);
	
}

function menuAbajo(){
	
	var html = "";
	
	html += "<nav>";
		html += "<ul>";
			html += "<li><a>Más Vendidos</a></li>";
			html += "<li><a href='bebida.html'>Bebida</a></li>";
			html += "<li><a href='comida.html'>Comida</a></li>";
			html += "<li><a id='btnCarrito'>Carrito</a></li>";
		html += "</ul>";
	html += "</nav>";
	
	$("body").append(html);
	
}

/*MESAS*/
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
		var idMesa = mesas[i].idMesa;
		var numMesa = mesas[i].numMesa;

		html += "<p data-numero='"+ numMesa +"'>"+ numMesa +"</p>";
	}

	$("#configuracion").append(html);
	
}

/*CARRITO*/
function esconderCarrito(){
	$("#carrito").fadeOut();
}

$(function(){
	
	FastClick.attach(document.body);
	
	/*INICIO DE PAGINAS*/
	switch($("section").attr("id")){
		
		case "inicio":
			cabecera();
			recuperarProductos();
			recuperarMesas();
			recuperarSubcategorias();
			
			$("#configEntrar").click(function(){
				if($("#configNombre").val() == "andoni" && $("#configPass").val() == "123"){
					window.location = "configuracion.html";
				}
			});
			
			break;
			
		case "configuracion":
			cabecera();
			mostrarMesas();
			
			$("#configuracion p").click(function(){
				var mesa = $(this).attr("data-numero");
				localStorage.setItem("mesa", mesa);
				alert("Mesa cambiada a "+ mesa);
			});
			
			break;
			
		case "comida":
			cabecera();
			subcategorias();
			menuAbajo();
			var cat = "comida";
			mostrarProductos(cat);
			
			if(sessionStorage.getItem("carrito") == null){
				crearCarrito();
			}
			else{
				pintarCarrito();
			}
			
			break;
			
		case "bebida":
			cabecera();
			subcategorias();
			menuAbajo();
			var cat = "bebida";
			mostrarProductos(cat);
			
			if(sessionStorage.getItem("carrito") == null){
				crearCarrito();
			}
			else{
				pintarCarrito();
			}
			
			break;
			
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