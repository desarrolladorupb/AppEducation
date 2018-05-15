$(document).ready(function () {
    /*Variables*/ 
    var txtTitulo = $("#txtTitulo");
    var txtDescripcion = $("#txtDescripcion");
    var txtFoto = $("#txtFoto");
    var txtRutaVideo = $("#txtRutaVideo");
    var txtArvhivo = $("#txtArvhivo");
    var txtContenido = $("#txtContenido");
    var txtNombreUsuario = $("#txtNombreUsuario");
    var accion = null;
    var lstAcciones = {
        nueva: "nueva",
        modificar: "modificar"
    }
    var postGlobal = null;

    var dtPost = $('#example').DataTable({
        "scrollX": true
    });

    var numeroEnviado = 0;

    /*Metodos*/ 
    function limpiarCampos(){
        txtTitulo.val("");
        txtDescripcion.val("");
        txtFoto.val("");
        txtRutaVideo.val("");
        txtArvhivo.val("");
        txtContenido.val("");
    };

    function validarCampos(img){
        var validate = true;
        $(".errors").remove();
        console.log(img);

        if(img == true ){
            if (!$("#txtFoto").val()){
                $("#txtFoto").after('<span class="errors"><li class="fa fa-warning"></li> El campo es obligatorio</span>');
                validate = false;
            }
        }

        $("#txtTitulo,#txtDescripcion,#txtContenido").each(function(i,item){
            if(!$(this).val()){
                $(this).after('<span class="errors"><li class="fa fa-warning"></li> El campo es obligatorio</span>');
                validate = false;
            }
        });
        return validate;
    };


    function guardarArchivo(htmlFile, carpeta, index, tipo){
        var fileImagenes = document.getElementById(htmlFile).files[0];
        var nombreArchivo = carpeta+index+"."+ admin.fileObtenerExtencion(fileImagenes);
        var storageRef=firebase.storage().ref(nombreArchivo);
        var task=storageRef.put(fileImagenes);
        task.on("state_changed"
            ,function(snapshot){
                var porcentaje=(snapshot.bytesTransferred/snapshot.totalBytes)*100;							
                if(porcentaje>98){
                    --numeroEnviado;
                    firebase.database().ref().child('post').child(index).child(tipo).set(nombreArchivo);
                    if(numeroEnviado == 0){
                        swal(
                          'Correcto',
                          'Post guardado correctamente',
                          'success'
                        );
                        $("#add_post").modal("toggle");
                    }
                }					
            }
        );
    }

    function guardar(){
        var dat=new Date();
        numeroEnviado = 0;
        var lstArchivo = document.getElementById('txtArvhivo').files;
        var lstFoto = document.getElementById('txtFoto').files;
        var objPost = {
            titulo: txtTitulo.val(),
            descripcion: txtDescripcion.val(),
            rutaVideo: txtRutaVideo.val(),
            contenido: txtContenido.val(),
            fecha : dat.toUTCString()
        } 
        var newLugarKey = firebase.database().ref().child('post').push(objPost).key;

        if (lstArchivo.length > 0 || lstFoto.length > 0){
            swal({
                title: 'Guardado..',
                allowOutsideClick: false,
                onOpen: function () {
                swal.showLoading()
                }   
            });
        }

        if(lstArchivo.length > 0){
            numeroEnviado++;
            guardarArchivo('txtArvhivo', "archivo/", newLugarKey, 'archivo');
        }
        if (lstFoto.length > 0){
            numeroEnviado++;
            guardarArchivo('txtFoto', "imagen/", newLugarKey, 'imagen');
        }
        if(numeroEnviado == 0){
            swal(
                  'Correcto',
                  'Post guardado correctamente',
                  'success'
                );
            $("#add_post").modal("toggle");
        }
    }

    function modificar(){
        
        numeroEnviado = 0;
        var lstArchivo = document.getElementById('txtArvhivo').files;
        var lstFoto = document.getElementById('txtFoto').files;
        var objPost = {
            titulo: txtTitulo.val(),
            descripcion: txtDescripcion.val(),
            rutaVideo: txtRutaVideo.val(),
            contenido: txtContenido.val(),
            fecha: postGlobal.fecha,
            
            
        } 
        if(postGlobal.imagen != undefined){
            objPost.imagen =postGlobal.imagen;
        }

        if(postGlobal.archivo =! undefined){
            objPost.archivo = postGlobal.archivo;
        }

        firebase.database().ref().child('post').child(postGlobal.index).set(objPost);
        if (lstArchivo.length > 0 || lstFoto.length > 0){
            swal({
                title: 'Guardado..',
                allowOutsideClick: false,
                onOpen: function () {
                swal.showLoading()
                }   
            });
        }
        if(lstArchivo.length > 0){
            numeroEnviado = numeroEnviado + 1;
            guardarArchivo('txtArvhivo', "archivo/", postGlobal.index, 'archivo');
        }
        if (lstFoto.length > 0){
            numeroEnviado = numeroEnviado + 1;
            guardarArchivo('txtFoto', "imagen/", postGlobal.index, 'imagen');
        }
        if(numeroEnviado == 0){
            swal(
                  'Correcto',
                  'Post guardado correctamente',
                  'success'
                );
            $("#add_post").modal("toggle");
        }
    }

    

    function consultarPost(){
        var starCountRef = firebase.database().ref('post');
        var editar = '<a class="btn-editar">Editar</a>';
        var eliminar = '<a  class="btn-eliminar">Eliminar</a>';
        starCountRef.on('value', function(snapshot) {
            dtPost.clear().draw();
            $.each(snapshot.val(),function(index, value){
               
                var rowNode = dtPost.row.add(
                    [
                        value.titulo
                        ,value.fecha
                        ,editar
                        ,eliminar
                    ]).draw().node();;
                value["index"]=index;
                $(rowNode).data("data",value);

            });
        });
    }

    /*Eventos */
    $("#new_post").click(function () {
        limpiarCampos();
        $(".errors").remove();
        accion = lstAcciones.nueva;
        $("#add_post").modal("show");
    });

    $("#btnGuardar").on("click", function(){

            if(accion == lstAcciones.nueva){
                if (validarCampos(true)){
                    guardar();
                    accion = null;
                }
               
            }else if (accion == lstAcciones.modificar){
                if (validarCampos(false)) {
                    modificar();
                    accion = null;
                    postGlobal = null;
                }
                
            }
    });

    $(document).on("click",".btn-editar",function(){
        limpiarCampos();
        $(".errors").remove();
        
        var $this = $(this);
        var $tr = $($this.parent().parent());
        postGlobal = $tr.data("data");
        txtTitulo.val(postGlobal.titulo);
        txtDescripcion.val(postGlobal.descripcion);
        txtRutaVideo.val(postGlobal.rutaVideo);
        txtContenido.val(postGlobal.contenido);
        accion = lstAcciones.modificar;
        $("#add_post").modal("show");
    });

    $(document).on("click",".btn-eliminar",function(){
        var $this = $(this);
        var $tr = $($this.parent().parent());
        var index = $tr.data("data").index;

        swal({
            title: 'Estas seguro?',
            text: "Realmente desea eliminar este post!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminarlo!'
        }).then(function () {
            firebase.database().ref().child('post').child(index).remove();
            swal(
            'Eliminado!',
            'Post Eliminado correctamente',
            'success'
            )
        });       

    });

    function ValidarImagen(obj){
    var uploadFile = obj.files[0];
    if (!window.FileReader) {
        swal('','El navegador no soporta la lectura de archivos','info');
        return;
    }

    if (!(/\.(jpg|png|gif)$/i).test(uploadFile.name)) {
        swal('','El archivo a adjuntar no es una imagen','info');
    }
    else {
        var img = new Image();
        img.onload = function () {
            if (this.width.toFixed(0) != 960 && this.height.toFixed(0) != 640) {
                swal('','Las medidas deben ser: 960 * 640','info');
            }
            else if (uploadFile.size > 200000)
            {
                swal('','El peso de la imagen no puede exceder los 200kb','info')
            }
            else {
                $("#txtFoto + span.errors").remove();               
            }
        };
        img.src = URL.createObjectURL(uploadFile);
    }                 
}

    txtFoto.on('change', (e) => {
        if ($(e.currentTarget).val()) {
            var lstFoto = document.getElementById('txtFoto');
            console.log(lstFoto);
            ValidarImagen(lstFoto);
        }
    })

    /*Inicio*/ 
    consultarPost();
    admin.validarDesconectado();
    admin.getPerfil(txtNombreUsuario);

});
