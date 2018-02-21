$(document).ready(function(){
	var btnInicioSesion = $("#btnInicioSesion");
	admin.validarUsuarioConectado();
	btnInicioSesion.on("click",function(){
		var provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider).then(function(result) {
			location.href ="./dashboard.html";
		}).catch(function(error) {
			
			var errorCode = error.code;
			var errorMessage = error.message;
			
			var email = error.email;
			var credential = error.credential;
		
		});
	});

});
