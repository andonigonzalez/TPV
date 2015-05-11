function Productos(purl){
	this.url = purl;
};

Productos.prototype.recuperarProductos = function(){
	
	var tag = "recuperarProductos";
	
	$.ajax({
		type: "POST",
		datatype: "json",
		url : this.url,
		data: {'tag':tag},
		success: function(datos){
			if(datos != false){
				localStorage.setItem("productos", JSON.stringify(datos));
			}
		},
		error: function(){
			alert("Error al recuperar los productos");
		}
	});
	
};

Productos.prototype.actualizarProductos = function(){
	
	localStorage.removeItem("productos");
	
	this.recuperarProductos();
	
};