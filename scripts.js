$(document).ready(function(){

  var scoreCount = 0;
  var scoreCountID = setInterval(function(){
    if(GameStatus === 'active'){
        scoreCount++;
        $('.score-counter h3').text("Score: " + scoreCount);
      }
    }, 100);
  var obstacleID = setInterval(function(){//CREATE OBSTACLES AT RANDOM INTERVALS
      if(GameStatus === 'active'){
        var randomInterval = Math.floor(Math.random() * 1000);
        setTimeout(function(){
          createObstacle();
        }, randomInterval);
      }
    }, 1500)

  var allowed = true;
  var GameStatus = 'ready';
  //deactivateScoreAndObstacles();
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
        }
        break;
      case 32:
        if(GameStatus === 'gameOver'){
          location.reload();
        }else if (GameStatus === 'ready') {
          startNewGame();
        }
        break;
      }
  });

  $(document).keyup(function(e) {
    allowed = true;
  });
  $(document).focus(function(e) {
    allowed = true;
  });

  $('#pick-avatar-pikachu').click(function(){
     $('.active-avatar-image').attr("src", "img/running-pikachu.gif");
  })
  $('#pick-avatar-sonic').click(function(){
     $('.active-avatar-image').attr("src", "img/running-sonic-right.gif");
  })
  $('#pick-avatar-gold').click(function(){
     $('.active-avatar-image').attr("src", "img/running-gold-man.gif");
  })
  $('.pick-avatar-container').dblclick(function(){
     startNewGame();
  })

function resetScoreCount(){
  scoreCount = 0;
}

var scoreCountInterval = 100;

function startNewGame(){
  GameStatus='active';
  $('.startGameScreen').css('display', 'none');
}

  var collisionID = setInterval(function($div2){   //CHECK FOR COLLISIONS
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
          clearInterval(collisionID);
          gameOver();
        }
      }
    }
  }, 50);

  function gameOver(){
    GameStatus = 'gameOver';
    $('.gameOverScreen').css('display', 'flex');
    $('.gameOverScreen').css('align-items', 'center');
    $('.gameOverScreen').css('flex-direction', 'column');
    $('.obstacle').stop();
    clearInterval(obstacleID);
    clearInterval(scoreCountID);
    $('.score-counter').css("background","black");
    $('.score-counter').css("display","absolute");
    $('.score-counter').css("z-index",9999);
    $('.score-counter').animate({
      right: '400px',
      top: '170px',
      fontSize: '40px',
    });
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
