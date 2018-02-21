$(document).ready(function(){
    var imgPerfil = $("#imgPerfil");
    var txtEmail = $("#txtEmail");
    var txtImagenPost = $("#txtImagenPost");
    var txtTituloPost = $("#txtTituloPost");
    var txtContenidoPost = $("#txtContenidoPost");
    var txtDescargaDocumento = $("#txtDescargaDocumento");
    var idPost = admin.getParameterByName("id");

    function init(){
    	var starCountRef = firebase.database().ref('post/' + idPost);
		starCountRef.on('value', function(snapshot) {
			var data = snapshot.val();
		  	txtTituloPost.html(data.titulo);
		  	txtContenidoPost.html(data.contenido);
		  	if(data.archivo != undefined){
		  		var storage = firebase.storage();
		  		var storageRef = storage.ref();
		  		storageRef.child(data.imagen).getDownloadURL().then(function(url) {
				  var img = document.getElementById('txtImagenPost');
          console.log(url);
				  img.src = url;
				}).catch(function(error) {
				  // Handle any errors
				});
		  	}else{
		  		txtDescargaDocumento.remove();
		  	}
		  	if(data.imagen != undefined){

		  	}else{
		  		txtImagenPost.remove();
		  	}

		});
    }

    admin.validarDesconectado();
    admin.getPerfil(txtEmail, imgPerfil);
	admin.isAdmin();
	init();



});
