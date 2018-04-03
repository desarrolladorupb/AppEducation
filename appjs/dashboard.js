$(document).ready(function(){
    var imgPerfil = $("#imgPerfil");
    var txtEmail = $("#txtEmail");
    var divBody = $("#divBody");
    admin.validarDesconectado();
    admin.getPerfil(txtEmail, imgPerfil);



    function getStrPost(strTitulo, strImagen, strDescripcion, index){
      var   post ='<div class="cards">';
      post +='<div class="cards-img"><img src="'+strImagen+'" alt=""></div>';
      post +='<div class="cards-title">';
      post +='<h1>'+strTitulo+'</h1>';
      post +='</div>';
      post +='<div class="cards-content hidden-text">';
      post +='<p>'+strDescripcion+'</p>';
      post +='</div>';
      post +='<div class="cards-button">';
      post +='<a href="./verpost.html?id='+index+'">ver mas ...</a>';
      post +='</div>';
      post +='</div>';
        return $(post);
    }

    function consultarPost(){
        var starCountRef = firebase.database().ref('post');
        var storage = firebase.storage();
        starCountRef.on('value', function(snapshot) {
            $.each(snapshot.val(),function(index, value){
                var pathReference = storage.ref(value.imagen);
                pathReference.getDownloadURL().then(function(url) {
                   $("#divBody").append( getStrPost(value.titulo, url, value.descripcion, index));
                }).catch(function(error) {
                // Handle any errors
                });
            });
        });
    };

    $("#btnCerrarSesion").on("click", function(){
      admin.cerrarSesion();
    });

    consultarPost();
    admin.isAdmin();
});
