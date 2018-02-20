$(document).ready(function(){
    var imgPerfil = $("#imgPerfil");
    var txtEmail = $("#txtEmail");
    var divBody = $("#divBody");
    admin.validarDesconectado();
    admin.getPerfil(txtEmail, imgPerfil);

    function getStrPost(strTitulo, strImagen, strDescripcion, index){
      var post ='<div class="post post-dash p-3 box-shadow mb-5 ">';
      post +='<div class="title">';
      post +='<h4>'+strTitulo+'</h4> ';
      post +='</div>';
      post +='<div class="img-post">';
      post +='<img src="'+strImagen+'" class="img-fluid" alt=""> ';
      post +='</div>';
      post +='<div class="descripcion">';
      post +='<p>'+strDescripcion+'</p> ';
      post +='</div>';
      post +='<div class="ver_mas box">';
      post +='<a href="./verpost.html?id='+index+'" class="box-shadow">ver mas ..</a> ';
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

    consultarPost();
    admin.isAdmin();
});
