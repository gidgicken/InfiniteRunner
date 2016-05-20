$(document).ready(function(){
  var allowed = true;
  var GameStatus = 'ready';
  $(window).keydown(function(event){
    if (event.repeat != undefined) {
      allowed = !event.repeat;
    }
    if (!allowed) return;
    allowed = false;
    switch(event.which) {
      case 38:
        $('.avatar-container').animate({
            top: '-200px'
        }, 400, "easeOutQuad");
        $('.avatar-container').animate({
            top: '0px'
        }, 400, "easeInQuad");
        break;
      case 37:
        createObstacle();
    }
  });

  $(document).keyup(function(e) {
    allowed = true;
  });
  $(document).focus(function(e) {
    allowed = true;
  });

var scoreCount = 0;
  setInterval(function(){
    scoreCount++;
    $('.score-counter h3').text("Score: " + scoreCount);
  }, 100);

  setInterval(function(){
    if($(".obstacle-holder").children().length > 0){
      if($(".obstacle-holder div:first-child").offset().left < 0){
        $(".obstacle-holder div:first-child").remove();
      }
    }
  }, 300);

  setInterval(function(){
    var randomInterval = Math.floor(Math.random() * 1000);
    setTimeout(function(){
      createObstacle();
    }, randomInterval);
  }, 1500)
  setInterval(function($div2){   //CHECK FOR COLLISIONS
    if($(".obstacle-holder").children().length > 0){
      var $div1 = $('.avatar-container');
      var x1Left = $div1.offset().left;
      var x1Right = $div1.offset().left + $div1.width();
      var y1Bottom = $div1.offset().top + $div1.height();

      for(var i = 1; i <= $(".obstacle-holder").children().length; i++){
        var $div2 = $('.obstacle-holder div:nth-child('+i+')');
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;

        if(x2 < x1Right && x2 > x1Left && y1Bottom > y2){
          gameOver();
        }
      }
    }
  }, 50);

  function gameOver(){

  };

  var createObstacle = function(){
    var obstacle = $("<div>", {class: "obstacle"});
    $('.obstacle-holder').append(obstacle);
    moveObstacleAcrossScreen(obstacle);
  };
  function moveObstacleAcrossScreen(obstacle){
    obstacle.animate({right: '1200px'}, 3600, "linear");
  }
})
