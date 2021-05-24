var buttonColours = ['red','blue','green','yellow'];
var gamePattern=[];
var userClickedPattern=[];
var level =0;
var started = false;


function nextSequence(){
  userClickedPattern=[];

  level++;
  $('h1').text('Level '+level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $('#'+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour)
}


$('.btn').click(function(){
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

});

$(document).keydown(function(){
  if(!started){

    nextSequence();
    started=true;
  }
});


function playSound(name){
  var sound = new Audio('sounds/'+name+'.mp3');
  sound.play();
}


function animatePress(currentColour){
  $('#'+currentColour).addClass('pressed');
  setTimeout(function(){
    $('#'+currentColour).removeClass('pressed');

  },100)
}

function checkAnswer(currentLevel){

  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log('success');
    if (gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }else{
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(function(){
      $('body').removeClass('game-over');
    },200)
    $('h1').text('Game Over.. Press any key to restart');
    startOver();
  }


}


function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
