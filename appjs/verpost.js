$(document).ready(function(){
    var imgPerfil = $("#imgPerfil");
    var txtEmail = $("#txtEmail");
    var txtImagenPost = $("#txtImagenPost");
    var txtTituloPost = $("#txtTituloPost");
    var txtContenidoPost = $("#txtContenidoPost");
    var txtDescargaDocumento = $("#txtDescargaDocumento");
    var idPost = admin.getParameterByName("id");
    var ifVideo = $("#ifVideo");
    var ifVideoTwo = $("#ifVideoTwo");
    var ifVideoThree = $("#ifVideoThree");
    var ifVideoFour = $("#ifVideoFour");
    var txtDocumentoOne = $("#txtDocumentoOne");
    var txtDocumentoTwo = $("#txtDocumentoTwo");
    var txtDocumentoThree = $("#txtDocumentoThree");
    var txtDocumentoFour = $("#txtDocumentoFour");

    function init(){
    	var storage = firebase.storage();
		var storageRef = storage.ref();
    	var starCountRef = firebase.database().ref('post/' + idPost);
		starCountRef.on('value', function(snapshot) {
			var data = snapshot.val();
			console.log(data);
		  	txtTituloPost.html(data.titulo);
		  	txtContenidoPost.html(data.contenido);
		  	txtDocumentoOne.html(data.documentoOne);
		  	txtDocumentoTwo.html(data.documentoTwo);
		  	txtDocumentoThree.html(data.documentoThree);
		  	txtDocumentoFour.html(data.documentoFour);
		  	if(data.imagen != undefined){
		  		storageRef.child(data.imagen).getDownloadURL().then(function(url) {
				  var img = document.getElementById('txtImagenPost');
				  console.log(url);
          		
				  img.src = url;
				}).catch(function(error) {
				  // Handle any errors
				});
		  	}
		  	if(data.rutaVideo != undefined && data.rutaVideo != null && data.rutaVideo != ""){
					var video = data.rutaVideo.replace('watch?v=','embed/');
					ifVideo.attr("src", video);	
					ifVideoTwo.attr("src", video);
					ifVideoThree.attr("src", video);
					ifVideoFour.attr("src", video);				
		  	}else{
		  		$("#divIframeVideo").remove();
		  	}
		  	if(data.archivo != undefined && data.archivo != null && data.archivo != ""){
		  		storageRef.child(data.archivo).getDownloadURL().then(function(url) {
		  			
				  txtDescargaDocumento.attr("href",url);
				  txtDescargaDocumento.attr("download","download");
				}).catch(function(error) {
				  // Handle any errors
				});
		  	}else{
		  		$("#divArchivo").remove();
		  	}


		});
    }

    admin.validarDesconectado();
    admin.getPerfil(txtEmail, imgPerfil);
	admin.isAdmin();
	init();



});
