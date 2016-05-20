$(document).ready(function(){
  var allowed = true;
  var GameStatus = 'active';
  $(window).keydown(function(event){
    if (event.repeat != undefined) {
      allowed = !event.repeat;
    }
    if (!allowed) return;
    allowed = false;
    switch(event.which) {
      case 38:
        if(GameStatus === 'active'){
          $('.avatar-container').animate({
              top: '-200px'
          }, 400, "easeOutQuad");
          $('.avatar-container').animate({
              top: '0px'
          }, 400, "easeInQuad");
        }else if (GameStatus === 'gameOver' || GameStatus === 'ready'){
          startNewGame();
        }
        break;
    }
  });

  function startNewGame(){
    $('.gameOverScreen').css('display', 'none');
    for(var i = 1; i <= $(".obstacle-holder").children().length; i++){
        $('.obstacle-holder div:nth-child('+i+')').remove();
    }
    resetScoreCount();
    gameStatus = 'active';
    scoreCountFunction = setInterval(scoreCountFunction, scoreCountInterval);
    // setInterval(obstacleInterval);
  }

  $(document).keyup(function(e) {
    allowed = true;
  });
  $(document).focus(function(e) {
    allowed = true;
  });

var scoreCount = 0;

function resetScoreCount(){
  scoreCount = 0;
}

var scoreCountInterval = 100;
var scoreCountFunction = setInterval(function(){
    scoreCount++;
    $('.score-counter h3').text("Score: " + scoreCount);
  }, scoreCountInterval);

  setInterval(function(){
    if($(".obstacle-holder").children().length > 0){
      if($(".obstacle-holder div:first-child").offset().left < 0){
        $(".obstacle-holder div:first-child").remove();
      }
    }
  }, 300);


var obstacleInterval = 1500;
  obstacleInterval = setInterval(function(){//CREATE OBSTACLES AT RANDOM INTERVALS
    var randomInterval = Math.floor(Math.random() * 1000);
    setTimeout(function(){
      createObstacle();
    }, randomInterval);
  }, obstacleInterval)

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
    GameStatus = 'gameOver';
    // $('.scrolling-background').append($("<div>", {class: "gameOverScreen"}));
    $('.gameOverScreen').css('display', 'inline');
    $('.obstacle').stop();
    clearInterval(obstacleInterval);
    clearInterval(scoreCountFunction);
  };

  var createObstacle = function(){
    var obstacle = $("<div>", {class: "obstacle"});
    $('.obstacle-holder').append(obstacle);
    // obstacle.append("<img>", {src: "img/walking-zombie.gif"});
    moveObstacleAcrossScreen(obstacle);
  };
  function moveObstacleAcrossScreen(obstacle){
    obstacle.animate({right: '1200px'}, 3600, "linear");
  }
})
