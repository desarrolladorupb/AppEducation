$(document).ready(function() {
  $('#example').DataTable( {
      "scrollX": true
  } );

  $("#new_post").click(function(){
      $("#add_post").modal("show");
  })

	admin.validarDesconectado();
	admin.getPerfil();
});
