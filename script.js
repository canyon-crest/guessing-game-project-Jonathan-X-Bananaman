// add javascript here
let level, answer, score, loss, starttime, intervalId, timepassed;
loss=0;
const scoreArr=[];
const timeArr=[];
const levelArr=document.getElementsByName("level");
let nam;
setInterval(time,1000);
playBtn.addEventListener("click",play);
guessBtn.addEventListener("click",makeGuess);
giveUp.addEventListener("click",quit);
sw.textContent="Timer: 00:00.00";

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
    st=Date.now();
    intervalId = setInterval(() => {
        timepassed = Date.now() - st;
        sw.textContent="Timer: "+formattime(timepassed);
    }, 10);
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
    clearInterval(intervalId);
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
    timeArr.push(timepassed);
    scoreArr.sort((a,b)=>a-b);
    timeArr.sort((a,b)=>a-b);
    let lb=document.getElementsByName("leaderboard");
    wins.textContent="Total wins: "+(scoreArr.length-loss);
    let avgsum=0;
    let timesum=0;
    for(let i=0;i<scoreArr.length;i++){
        avgsum+=Number(scoreArr[i]);
        if(i<lb.length){
            lb[i].textContent=scoreArr[i];
        }
    }
    for(let i=0;i<timeArr.length;i++){
        timesum+=Number(timeArr[i]);
    }
    let avgs=avgsum/scoreArr.length;
    let avgt=timesum/timeArr.length;
    avgScore.textContent="Average Score: "+avgs.toFixed(2);
    avgstopwatch.textContent="Average Time: "+formattime(avgt);
    besttime.textContent="Best time: "+formattime(timeArr[0]);
    timepassed=0;
}
function quit(){
    loss++;
    score=level;
    sw.textContent="Timer: 00:00.00";
    reset();
    updateScore();
}
function time(){
    let d = new Date();
    let month= d.getMonth()+1;
    let day=d.getDate();
    if(month==1){
        month="January"
    }
    else if(month==2){
        month="Feburary"
    }
    else if(month==3){
        month="March"
    }
    else if(month==4){
        month="April"
    }
    else if(month==5){
        month="May"
    }
    else if(month==6){
        month="June"
    }
    else if(month==7){
        month="July"
    }
    else if(month==8){
        month="August"
    }
    else if(month==9){
        month="September"
    }
    else if(month==10){
        month="October"
    }
    else if(month==11){
        month="November"
    }
    else{
        month="December"
    }
    if(day==1||day==21||day==31){
        day+="st";
    }
    else if(day==2||day==22){
        day+="nd"
    }
    else if(day==3||day==23){
        day+="rd"
    }
    else{
        day+="th"
    }
    date.textContent=month+" "+day+" "+d.getFullYear()+"  "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
}
function formattime(t){
    milliseconds=t%1000;
    seconds=Math.floor((t/1000)%60);
    minutes=Math.floor((t/1000)/60%60);
    if(minutes>=60){
        msg.textContent=nam+", stop being AFK, i'm quitting the game"
        reset();
        return;
    }
    let aaaa = String(minutes).padStart(2,"0")+":"+String(seconds).padStart(2,"0")+"."+Math.floor(milliseconds/10);
    return aaaa;
}