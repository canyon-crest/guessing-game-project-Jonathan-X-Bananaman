// add javascript here
let level, answer, score, loss;
loss=0;
const scoreArr=[];
const levelArr=document.getElementsByName("level");
date.textContent=time();
let nam;

playBtn.addEventListener("click",play);
guessBtn.addEventListener("click",makeGuess);
giveUp.addEventListener("click",quit);

function play(){
    nam = document.getElementById("yourname").value
    if(nam==""){
        msg.textContent="Please enter your name"
        return;
    }
    else{
        nam=nam.toLowerCase();
        nam=nam.charAt(0).toUpperCase()+nam.slice(1);
    }
    score=0;
    playBtn.disabled=true;
    guessBtn.disabled=false;
    giveUp.disabled=false;
    guess.disabled=false;
    guess.placeholder="";
    for(let i=0;i<levelArr.length;i++){
        if(levelArr[i].checked){
            level=levelArr[i].value;
        }
        levelArr[i].disabled=true;
    }
    msg.textContent=nam+", please guess a number from 1-"+level;
    answer = Math.floor(Math.random()*level+1);
    guess.placeholder=answer;
}
function makeGuess(){
    let userGuess=Number(guess.value);
    if(userGuess<=0||userGuess>level||isNaN(userGuess)){
        msg.textContent="Invalid entry. Please try again.";
        return;
    }
    score++;
    if(userGuess<answer){
        msg.textContent=nam+", you guessed too low!";
    }
    else if(userGuess>answer){
        msg.textContent=nam+", you guessed too high!";
    }
    else{
        msg.textContent=nam+", you got it right in "+score+" guess";
        if(score!=1){
            msg.textContent+="es! ";
            if(score<=(Math.ceil(Math.log2(level)))){
                msg.textContent+="That was really good! You optimized your guesses!"
            }
            else if(score<=(Math.ceil(Math.log2(level))*2)-1){
                msg.textContent+="That was good! Try and optimize your guesses better next time!"
            }
            else{
                msg.textContent+="You're bad at guessing."
            }
        }
        else{
            msg.textContent+="! You got so lucky!"
        }
        msg.textContent+=" Press play to play again";
        reset();
        updateScore();
        return;
    }
    let dist = Math.abs(answer-userGuess)/level
    if(dist<=0.05){
        msg.textContent+=" (Hot)"
    }
    else if(dist<=0.15){
        msg.textContent+=" (Warm)"
    }
    else if(dist<=0.6){
        msg.textContent+=" (Cold)"
    }
    else{
        msg.textContent+=" (Ice cold!)"
    }
}
function reset(){
    guessBtn.disabled=true;
    guess.disabled=true;
    guess.value="";
    guess.placeholder="";
    giveUp.disabled=true;
    playBtn.disabled=false;
    for(let i=0;i<levelArr.length;i++){
        levelArr[i].disabled=false;
    }
}
function updateScore(){
    scoreArr.push(score);
    scoreArr.sort((a,b)=>a-b);
    let lb=document.getElementsByName("leaderboard");
    wins.textContent="Total wins: "+(scoreArr.length-loss);
    let sum=0
    for(let i=0;i<scoreArr.length;i++){
        sum+=Number(scoreArr[i]);
        if(i<lb.length){
            lb[i].textContent=scoreArr[i];
        }
    }
    let avg=sum/scoreArr.length;
    avgScore.textContent="Average Score: "+avg.toFixed(2);
}
function quit(){
    loss++;
    score=level;
    updateScore();
    reset();
}
function time(){
    let d = new Date();
    return d;
}