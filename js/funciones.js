$(function(){
  $( window ).resize(function() {
   if($( window ).width() > 767){
         $('.movil-first,.fixed').css({"left":"0"});
   }else{
     $('.movil-first,.fixed').css({"left":"-100%"});
   }
});
  var contador = 1;
  $('#btn_menu').click(function(){
    if (contador == 1) {
      $('.movil-first,.fixed').animate({
        left: '0'
      });
      contador = 0;
    } else {
      contador = 1;
      $('.movil-first,.fixed').animate({
        left: '-100%'
      });
    }
  });
})
