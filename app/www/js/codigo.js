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
function cabecera(titulo){
		
	var mesa = JSON.parse(localStorage.getItem("mesa"));
	var html = "";
	
	if(mesa == null){
		mesa = "Sin mesa";
	}
	
	html += "<div>";
		html += "<h1>"+ mesa +" | "+ titulo +"</h1>";
		html += "<img id='burger' src='img/hamburger.png' alt='icono menu'>";
		html += "<div class='cierre'></div>";
	html += "</div>";
	
	$("header").html(html);
	
}

function subcategorias(){
	
	var sc = JSON.parse(localStorage.getItem("subcategorias"));
	var html = "";
	
	html += "<div id='menuArriba'>";
		html += "<ul>";
			for(var i = 0; i < sc.length; i++){
				html += "<li><a href='productos.html?sc="+ sc[i].nombre +"'>"+ sc[i].nombre +"</a></li>";
			}
		html += "</ul>";
	html += "</div>";
	
	$("body").append(html);
	
}

function menuAbajo(){
	
	var html = "";
	
	html += "<nav>";
		html += "<ul>";
			html += "<li><a href='masVendidos.html'>+ Vendidos</a></li>";
			html += "<li><a href='subcategorias.html?c=bebida'>Bebida</a></li>";
			html += "<li><a href='subcategorias.html?c=comida'>Comida</a></li>";
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

/*PARAMETROS URL*/
function getGET(){
	var loc = document.location.href;
	
	if(loc.indexOf('?')>0){
		var getString = loc.split('?')[1];
		var GET = getString.split('&');
		var get = {};

		for(var i = 0, l = GET.length; i < l; i++){
			var tmp = GET[i].split('=');
			get[tmp[0]] = unescape(decodeURI(tmp[1]));
		}
		
		return get;
	}
}

$(function(){
	
	FastClick.attach(document.body);
	
	/*INICIO DE PAGINAS*/
	switch($("section").attr("id")){
		
		case "inicio":
			titulo = "TPV";
			cabecera(titulo);
			recuperarProductos();
			recuperarMesas();
			recuperarSubcategorias();
			
			$("#configEntrar").click(function(){
				if($("#configNombre").val() == "andoni" && $("#configPass").val() == "123"){
					window.location = "configuracion.html";
				}
			});
			
			if($("#login").css("display") == "block"){
				$("#comenzarPedido").css("box-shadow", "none");
			}
			else{
				$("#comenzarPedido").css("box-shadow", "0 0 15px black");
			}
			
			break;
			
		case "configuracion":
			titulo = "Configuracion";
			cabecera(titulo);
			mostrarMesas();
			
			$("#configuracion p").click(function(){
				var mesa = $(this).attr("data-numero");
				localStorage.setItem("mesa", mesa);
				cabecera(titulo);
			});
			
			break;
			
		case "masVendidos":
			titulo = "Más vendidos";
			cabecera(titulo);
			subcategorias();
			menuAbajo();
			var cat = "masVendidos";
			mostrarProductos(cat);
			
			if(sessionStorage.getItem("carrito") == null){
				crearCarrito();
			}
			else{
				pintarCarrito();
			}
			
			$("nav ul li").removeClass();
			$("nav ul li:nth-child(1)").addClass("activo");
			
			break;
			
		case "subcategorias":
			var parametros = getGET();
			for(var index in parametros){
				var c = parametros[index];
			}
			titulo = c;
			cabecera(titulo);
			subcategorias();
			menuAbajo();
			mostrarSubcategorias(c);
			
			if(sessionStorage.getItem("carrito") == null){
				crearCarrito();
			}
			else{
				pintarCarrito();
			}
			
			if(titulo == "comida"){
				$("nav ul li").removeClass();
				$("nav ul li:nth-child(3)").addClass("activo");
			}
			else if(titulo == "bebida"){
				$("nav ul li").removeClass();
				$("nav ul li:nth-child(2)").addClass("activo");
			}
			
			break;
			
		case "productos":
			var parametros = getGET();
			for(var index in parametros){
				var sc = parametros[index];
			}

			titulo = sc;
			cabecera(titulo);
			subcategorias();
			menuAbajo();
			mostrarProductos(sc);
			
			if(sessionStorage.getItem("carrito") == null){
				crearCarrito();
			}
			else{
				pintarCarrito();
			}

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