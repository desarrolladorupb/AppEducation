var admin ={
	/*Verificar si el usuario se desconecta*/
	cambioUsaurio: function(){
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				
			} else {
				location.href ="./index.html";
			}
		});
	},
	/*Verificar si el usuario esta conectado*/
	validarUsuarioConectado: function(){
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
			 	location.href ="./dashboard.html";
			}
		});
	},
	/*Verificar si un usuario cerro sersion*/
	validarDesconectado: function(){
		firebase.auth().onAuthStateChanged(function(user) {
			var user = firebase.auth().currentUser;

			if (!user) {
			 	location.href ="./index.html";
			}
		});
	},
	/*obtiene los datos de perfil de la persona*/
	getPerfil: function(txtEmail, imgPerfil, txtNombre){
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				user.providerData.forEach(function (profile) {
                    /*console.log("  Provider-specific UID: "+profile.uid);
					console.log("  Name: "+profile.displayName);
					console.log("  Email: "+profile.email);
					console.log("  Photo URL: "+profile.photoURL);*/
                    if(txtEmail != undefined){
                        txtEmail.html(profile.email);
                    }
                    if(imgPerfil != undefined){
                        imgPerfil.attr('src', profile.photoURL);
                    }
                    else if(txtNombre != undefined){
                        txtNombre.html(profile.displayName);
                    }
				});
			} 
		});
	},
	/*Cerrar sesion*/
	cerrarSesion: function(){
		firebase.auth().signOut().then(function() {
		  location.href ="./index.html";
		}).catch(function(error) {
		  // An error happened.
		});
    },
    
    fileObtenerExtencion : function(file){
        var vecFile = file.name.split(".");
        
        return vecFile[vecFile.length - 1];
    },

    isAdmin: function(){
    	var starCountRef = firebase.database().ref('admin');
        var storage = firebase.storage();
        starCountRef.on('value', function(snapshot) {
            $.each(snapshot.val(),function(index, value){
            	console.log(firebase.auth().currentUser.uid);
            	console.log(index);
                if(firebase.auth().currentUser.uid == index){
                	$("#navAdministrar").show();
                }
            });
        });
    },

    getParameterByName: function (name) {
	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	    results = regex.exec(location.search);
	    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}



};