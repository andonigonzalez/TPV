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
			html += "<p>"+ descripcion +"</p>";
			html += "<img src='http://andonigonzalez.ikasle.aeg.es/milart/img/"+ img +"' alt='"+ nombre +"'>";
			html += "</article>";
			
		}
		
		$("section").html(html);
		
	}
	
});