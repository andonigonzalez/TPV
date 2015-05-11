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
	
};