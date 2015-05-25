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
						html += "<li>"+ sc[i].nombre +"</li>";
			}
		html += "</ul>";
	html += "</div>";
	
	$("body").append(html);
	
}

function menuAbajo(){
	
	var html = "";
	
	html += "<nav>";
		html += "<ul>";
			html += "<li data-cat='vendidos'><a>Más Vendidos</a></li>";
			html += "<li data-cat='bebida'><a>Bebida</a></li>";
			html += "<li data-cat='comida'><a>Comida</a></li>";
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
		var idMesa = mesas[i].idMesa;
		var numMesa = mesas[i].numMesa;

		html += "<p data-numero='"+ numMesa +"'>"+ numMesa +"</p>";
	}

	$("#configuracion").append(html);
	
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
			
		case "productos":
			cabecera();
			subcategorias();
			menuAbajo();
			var cat = "comida";
			mostrarProductos(cat);
			
			$("nav ul li").click(function(){
				cat = $(this).attr("data-cat");
				mostrarProductos(cat);
			});
			
			if(sessionStorage.getItem("carrito") == null){
				crearCarrito();
			}
			else{
				pintarCarrito();
			}
			
			break;
			
		case "configuracion":
			cabecera();
			mostrarMesas();
			
			$("#configuracion p").click(function(){
				var mesa = $(this).attr("data-numero");
				localStorage.setItem("mesa", mesa);
			});
			
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