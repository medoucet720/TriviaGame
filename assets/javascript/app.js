



  var triviaQuestions = [
{
  question: "Which is the most abundant metal in the earth's crust?",
  answerList: ["Aluminum", "Gold", "Iron", "Silver", "Lead"],
  answer:0



},
{
  question: "What is the second most abundant element in the earth's atmosphere?",
  answerList: ["Helium", "Nitrogen", "Oxygen", "Argon", "Radon"],
  answer:2



},
{
  question: "What is the world's largest ocean?",
  answerList: ["Antartic Ocean", "Arctic Ocean", "Indian Ocean", "Atlantic Ocean", "Pacific Ocean"],
  answer:4



},
{
  question: "In what month is the Earth closest to the sun?",
  answerList: ["July", "January", "May", "March", "October"],
  answer:1


},

{
 question: "What is the only sea on Earth with no coastline?",
  answerList: ["Black Sea", "Adriatic Sea", "Sargasso Sea","Caribbean Sea","Mediterranean Sea"],
  answer:2



},
{ question: "What is the most abundant element in the earth's atmosphere?",
  answerList: ["Copper", "Iron", "Hydrogen", "Nitrogen", "Oxygen"],
  answer:3


}

];


var currentQuestion;
var incorrectAnswers;
var correctAnswers;
var unanswered;
var answered;
var userChoice;
var time ;
var seconds;
var intervalId;



var messages ={
  correct: "Yes, that's right!",
  incorrect: "No, that's not it.",
  endTime: "Out of time!",
  finished: "Alright! Lets see how you did!"
}

$("#startBtn").on("click", function(){
  $(this).hide();
  newGame();
});




function newGame(){
  $("#finalMessage").empty();
  $("#correctAnswers").empty();
  $("#incorrectAnswers").empty();
  $("#unanswered").empty();
  currentQuestion = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  unanswered = 0;
  newQuestion();
}

function newQuestion(){
  $("#message").empty();
  $("#correctedAnswer").empty();
  $("#instructions").empty();
  answered = true;



$("#currentQuestion").html("Question #" + (currentQuestion+1) + "/" + triviaQuestions.length);
$(".questions").html("<h2>" + triviaQuestions[currentQuestion].question + "</h2>");
for(var i = 0; i < 5; i++){
  var choices = $("<div>");
  choices.text(triviaQuestions[currentQuestion].answerList[i]);
  choices.attr({"data-index" : i});
  choices.addClass("thisChoice");
  $("thisChoice").html("<button>");
  $(".answerList").append(choices);
  
}
countdown();

$(".thisChoice").on("click",function(){
  userChoice = $(this).data("index");
  clearInterval(time);
  answerPage();
});

}

function countdown(){
  seconds = 20;
  $("#timer").html("<h3> Time Remaining: " + seconds + "</h3>");
  answered = true;
  time = setInterval(showCountdown, 1000);
}

function showCountdown(){
  seconds--;
  $("#timer").html("<h3> Time Remaining: " + seconds + "</h3>");
  if(seconds < 1){
    clearInterval(time);
    answered = false;
    answerPage();
  }
}

function answerPage(){
  $("#currentQuestion").empty();
  $(".thisChoice").empty();
  $(".questions").empty();

  var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
  var rightAnswerIndex = triviaQuestions[currentQuestion].answer;

  if((userChoice == rightAnswerIndex) && (answered == true)){
    correctAnswers++;
    $("#message").html(messages.correct);

  }else if ((userChoice != rightAnswerIndex) && (answered == true)){
    incorrectAnswers++;
    $("#message").html(messages.incorrect);
    $("#correctedAnswer").html("The correct answer was: " + rightAnswerText);
  }else{
    unanswered++;
    $("#message").html(messages.endTime);
    $("#correctedAnswer").html("The correct answer was: " + rightAnswerText);
    answered = true;
  }

  if(currentQuestion == (triviaQuestions.length-1)){
    setTimeout(scoreboard, 3000)
  } else{
    currentQuestion++;
    setTimeout(newQuestion, 2000);
  }
}

function scoreboard(){
  $("#timer").empty();
  $("#message").empty();
  $("#correctAnswers").empty();
  $("#correctedAnswer").empty();

  $("#finalMessage").html(messages.finished);
  $("#correctAnswers").html("Correct Answers: " + correctAnswers);
  $("#incorrectAnswers").html("Incorrect Answers: " + incorrectAnswers);
  $("#unanswered").html("Unanswered: " + unanswered);
 


};