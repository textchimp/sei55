
// console.log(`Events ready!`, jQuery);
const leftPosition = 100;

// Vanilla 
document.addEventListener('DOMContentLoaded', function(){
  // DOM-query stuff here
});



// $( function(){
//
// });

$(document).ready( function(){


  console.log(`#toggle`,  $('#toggle') );

  $('#toggle').on('click', function(){
    // console.log(`toggle clicked`);
    $('.triple-kitty1').toggle();
  });

  $('#fade').on('click', function(){
    $('.triple-kitty2').slideToggle();
  });


  $('#show h2').on('click', function(){
    $('.triple-kitty3').toggle();
  });


  $(window).on('resize', function(){
    console.log(`window resizing!`);
  });


  $(document).on('scroll', function(){
    // console.log(`mouse entered image`);
  });


  $('#kitty').on( 'click', function( event ){
    console.log(`event object:`, event);
  });


  $('input[type="text"]').on('keydown', function( event ){
    console.log(`key down!`, event.target.value);  
  });

  $('input[type="text"]').on('focus', function(){
    console.log(`focused!`);  
    $(this).css('border', '2px solid orange');
  });

  $('input[type="text"]').on('blur', function(){
    console.log(`unfocused!`);  
    $(this).css('border', 'none');
  });

  $('select').on('change', function( event ){
    console.log(`dropdown changed`, event.target.value);
  });

  $('form').on('submit', function(){
    console.log(`Form submitted!`);
    return false; // prevents form from sending to server
  });

}); // ready() handler

