// Var with array and object for questions
var myQue = [
    {
      que: "Which of the following options does NOT define an opening tag of an HTML element?",
      opt: ["</div>", "<body>", "<span>", "<p>"],
      ans: "</div>",
    },
    {
      que: "Which og the following HTML tags is used to divide a page into sections?",
      opt: ["<p>", "<br>", "<body>", "<div>"],
      ans: "<div>",
    },
    {
      que: "Which of the following elements cannot be contained inside of a <div> element?",
      opt: ["<img>", "<title>", "<p>", "<button>"],
      ans: "<title>",
    },
    {
      que: "What HTML code will most web browsers display as italics?",
      opt: [
        "<em>Hello</em>",
        "<strong>Hello</strong>",
        "<div>Hello</div>",
        "<p>Hello</p>",
      ],
      ans: "<em>Hello</em>",
    },
    {
      que: "Which element is considered the 'root' HTML element?",
      opt: ["<html>", "<head>", "<!DOCTYPE html>", "<body>"],
      ans: "<html>",
    },
  ];

  // Declared variables
  var score = 0;
  var questionIndex = 0;

  var currentTime = document.querySelector(".timer");
  var timer = document.querySelector("#start-btn");
  var questions = document.querySelector(".question-header");
  var infoBox = document.querySelector(".info-box");

  // Seconds left is 15 second per question
  var secLeft = 76;
  var holdInterval = 0;
  var penalty = 10;
  // create new element
  var createEl = document.createElement("ul");


  // Triggers timer on button, shows user a display on the screen
  timer.addEventListener("click", function(){
      if(holdInterval === 0){
          holdInterval = setInterval(function (){
              secLeft--;
              currentTime.textContent = "Time: " + secLeft;
              if(secLeft <= 0){
                  clearInterval(holdInterval);
                  endQuiz();
                  currentTime.textContent = "Time's up!";
              }
          }, 1000);
      }
      buildQuiz(questionIndex);
  })
 
  // Render questions and choices to page
  function buildQuiz(questionIndex) {
      //clears existing data
      questions.innerHTML ="";
      createEl.innerHTML = "";
      // for loops for all info in array
      for(var i = 0; i < myQue.length; i++) {
          // appends question title only
          var userQue = myQue[questionIndex].que;
          var userOpt = myQue[questionIndex].opt;
          questions.textContent = userQue;
      }
      // new for esch for question choices
      userOpt.forEach(function (newItem) {
          var listItem = document.createElement("li");
          listItem.textContent = newItem;
          questions.appendChild(createEl);
          createEl.appendChild(listItem);
          listItem.addEventListener("click", (pickChoices));
      })

  };
  function pickChoices(e) {
      var element = e.target;

      if (element.matches("li")){
          var createDiv = document.createElement("div");
          createDiv.setAttribute("id","createDiv");
          // if correct
          if (element.textContent == myQue[questionIndex].ans){
          score++;
          createDiv.textContent = "Correct! The answer is: " + myQue[questionIndex].ans;
          //if wrong
      } else {
          // will deduct -5 seconds ogg secLeft for wrong answer
          secLeft = secLeft - penalty;
          createDiv.textContent = "Wrong! The correct answer is: " + myQue[questionIndex].ans;
      }
  }
  // question index determines number question user is on
  questionIndex++;

  if (questionIndex >= myQue.length){
      //endQuiz will append last page with user stats
      endQuiz();
      createDiv.textContent = "End of Quiz!" + " " + "You got " + score + "/" + myQue.length + " Correct!";
  } else {
      buildQuiz(questionIndex);
  }
  questions.appendChild(createDiv);
  }
  
  function endQuiz();