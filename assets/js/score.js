//declare variable
var highscore = document.querySelector(".highscore");
var clear = document.querySelector(".clear");
var goBack = document.querySelector(".return");

//event listener to clear scores
clear.addEventListener("click", function (){
    localStorage.clear();
    location.reload();
});
//retrive local storage
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if(allScores !== null) {
    for(var i = 0; i < allScores.length; i++){
        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highscore.appendChild(createLi);
    }
}
// event listener to return to main page
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});