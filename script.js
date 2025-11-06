// add javascript here
let level, answer, score, loss, starttime, intervalId, timepassed;
loss=0;
let guesshistory=false;
const scoreArr=[];
const timeArr=[];
const levelArr=document.getElementsByName("level");
let nam;
setInterval(time,1000);
playBtn.addEventListener("click",play);
guessBtn.addEventListener("click",makeGuess);
giveUp.addEventListener("click",quit);
helpBtn.addEventListener("click",turnhelponoff);
sw.textContent="Timer: 00:00.00";
const guessesArr=[];
const distArr=[];
const bigsmallArr=[];
function play(){
    document.getElementById("userguesses").innerHTML=" ";
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
    helpBtn.disabled=false;
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
}
function makeGuess(){
    let userGuess=Number(guess.value);
    if(userGuess<=0||userGuess>level||isNaN(userGuess)){
        msg.textContent="Invalid entry. Please try again.";
        return;
    }
    score++;
    document.getElementById("userguesses").innerHTML=" ";
    if(userGuess<answer){
        bigsmallArr.push("too low");
        msg.textContent=nam+", you guessed too low!";
    }
    else if(userGuess>answer){
        bigsmallArr.push("too high");
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
        distArr.push("(Hot)");
    }
    else if(dist<=0.15){
        msg.textContent+=" (Warm)"
        distArr.push("(Warm)");
    }
    else if(dist<=0.6){
        msg.textContent+=" (Cold)"
        distArr.push("(Cold)");
    }
    else{
        msg.textContent+=" (Ice cold!)"
        distArr.push("(Ice cold)");
    }
    guessesArr.push(userGuess);
    for(let i=0;i<guessesArr.length;i++){
        let guesses=document.getElementById("userguesses");
        if(guesshistory){
            guesses.innerHTML+="<li>"+guessesArr[i]+", "+bigsmallArr[i]+" "+distArr[i]+"</li>"
        }
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
    helpBtn.disabled=true;
    guessesArr.length=0;
    distArr.length=0;
    bigsmallArr.length=0;
    document.getElementById("userguesses").innerHTML=" ";
    for(let i=0;i<levelArr.length;i++){
        levelArr[i].disabled=false;
    }
}
function updateScore(){
    scoreArr.push([score,nam]);
    timeArr.push(timepassed);
    scoreArr.sort((a,b)=>a[0]-b[0]);
    timeArr.sort((a,b)=>a-b);
    let lb=document.getElementsByName("leaderboard");
    wins.textContent="Total wins: "+(scoreArr.length-loss);
    let avgsum=0;
    let timesum=0;
    for(let i=0;i<scoreArr.length;i++){
        avgsum+=Number(scoreArr[i][0]);
        if(i<lb.length){
            lb[i].textContent=scoreArr[i][0]+" guesses, by "+scoreArr[i][1];
        }
    }
    for(let i=0;i<timeArr.length;i++){
        timesum+=Number(timeArr[i]);
    }
    let avgs=avgsum/scoreArr.length;
    let avgt=timesum/timeArr.length;
    avgScore.textContent="Average Score: "+avgs.toFixed(2)+" guesses";
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
    date.textContent=month+" "+day+" "+d.getFullYear()+"  "+addzero(d.getHours())+":"+addzero(d.getMinutes())+":"+addzero(d.getSeconds());
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
    let aaaa = addzero(minutes)+":"+addzero(seconds)+"."+Math.floor(milliseconds/10);
    return aaaa;
}
function addzero(aaa){
    if(aaa<=9){
        aaa="0"+aaa.toString();
    }
    return aaa;
}
function turnhelponoff(){
    if(!guesshistory){
        guesshistory=true;
        document.getElementById("ghtitle").innerHTML="Guess History"
        helpBtn.textContent="Show Previous Guesses: On"
        for(let i=0;i<guessesArr.length;i++){
            let guesses=document.getElementById("userguesses");
            guesses.innerHTML+="<li>"+guessesArr[i]+", "+bigsmallArr[i]+" "+distArr[i]+"</li>"
        }
    }
    else{
        helpBtn.textContent="Show Previous Guesses: Off"
        document.getElementById("userguesses").innerHTML=" ";
        document.getElementById("ghtitle").innerHTML=" "
        guesshistory=false;
    }
    
}