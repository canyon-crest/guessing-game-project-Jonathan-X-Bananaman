// add javascript here
let level, answer, score;
const scoreArr=[];
const levelArr=document.getElementsByName("level");
date.textContent=time();

playBtn.addEventListener("click",play);
guessBtn.addEventListener("click",makeGuess);
giveUp.addEventListener("click",giveup)

function play(){
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
    msg.textContent="Guess a number from 1-"+level;
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
        msg.textContent="Too low!";
    }
    else if(userGuess>answer){
        msg.textContent="Too high!";
    }
    else{
        msg.textContent="Wow you got it right in "+score+" guess";
        if(score!=1){
            msg.textContent+="es";
        }
        msg.textContent+="! Press play to play again";
        reset();
        updateScore();
        return;
    }
    if(Math.abs(answer-userGuess)/level<=0.05){
        msg.textContent+=" (Hot)"
    }
    else if(Math.abs(answer-userGuess)/level<=0.15){
        msg.textContent+=" (Warm)"
    }
    else if(Math.abs(answer-userGuess)/level<=0.6){
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
    wins.textContent="Total wins: "+scoreArr.length;
    let sum=0
    for(let i=0;i<scoreArr.length;i++){
        sum+=scoreArr[i];
        if(i<lb.length){
            lb[i].textContent=scoreArr[i];
        }
    }
    let avg=sum/scoreArr.length;
    avgScore.textContent="Average Score: "+avg.toFixed(2);
}
function time(){
    let d = new Date();
    return d;
}