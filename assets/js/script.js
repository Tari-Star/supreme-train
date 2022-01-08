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
  var questions = document.querySelector(".header");
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
  };

  function endQuiz(){
      questions.innerHTML = "";
      currentTime.innerHTML  = "";

      // Heading
      var createH1 = document.createElement("h1");
      createH1.setAttribute("id", "createH1");
      createH1.textContent = "All Done!";

      questions.appendChild(createH1);

      // paragraph
      var createP = document.createElement("p");
      createP.setAttribute("id", "createP");

      questions.appendChild(createP);

      // calculate remaining time and replace with score
      if(secLeft >= 0) {
          var timeScore = secLeft;
          var createP2 = document.createElement("p");
          clearInterval(holdInterval);
          createP.textContent = "Your final score is: " + timeScore;

          questions.appendChild(createP2);
      }

      // create label
      var createLabel = document.createElement("label");
      createLabel.setAttribute("id", "createLabel");
      createLabel.textContent = "Enter your initials: ";

      questions.appendChild(createLabel);

      // create input
      var createInput = document.createElement("input");
      createInput.setAttribute("type", "text");
      createInput.setAttribute("id", "createInput");
      createInput.textContent = "";

      questions.appendChild(createInput);

      // create submit
      var createSubmit = document.createElement("button");
      createSubmit.setAttribute("type", "submit");
      createSubmit.setAttribute("id", "submit");
      createSubmit.textContent = "Submit";

      questions.appendChild(createSubmit);

      // event listener  and local storage
      createSubmit.addEventListener("click", function (){
          var initials = createInput.value;
          if(!initials) {
              alert("Please enter your initials!");
          } else {
              var finalScore = {
                  initials: initials,
                  score: timeScore
              }
              console.log(finalScore);
              var allScores = localStorage.getItem("allScores");
              if(allScores === null){
                  allScores = [];
              } else {
                  allScores = JSON.parse(allScores);
              }
              allScores.push(finalScore);
              var newScore = JSON.stringify(allScores);
              localStorage.setItem("allScores", newScore);
              // going to final page
              window.location.replace("./highscores.html");
          }
      });

  };