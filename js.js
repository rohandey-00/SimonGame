
let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "blue", "green"];

let start = false;
let level = 0;
let score = [];


let h2 = document.querySelector("h2");
let h4 = document.querySelector("h4");



document.addEventListener("keypress", function(){   // function to decatct any key press

    if(start==false){
        console.log("game start");
        start = true;

        levelUp();
    }   
    
    
});






//FLASH FUNCTION---------->

function gameFlash(btn){   // when we press a  key it first add flash class and then remove that.
    btn.classList.add("gameFlash");
    setTimeout(function(){
        btn.classList.remove("gameFlash");
    },250);
}

function userFlash(btn){   // when we press a  key it first add flash class and then remove that.
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },180);
}





function levelUp(){    
    userSeq=[];  //HEART OF THE GAME   
    level++;
    score.push(level);
    console.log(score);
    h2.innerText =`Level ${level}`;

let randIdx = Math.floor(Math.random()*3);      //generate random number
let randColor = btns[randIdx];                  //choose random color from the 'btns' array
let randBtn = document.querySelector(`.${randColor}`);   //finally  we find random button

    gameSeq.push(randColor);   // push the color in the array
    console.log(gameSeq); 

    gameFlash(randBtn);  
}


//USER PRESS BUTTON---------->
function btnPress (){
    let btn =this;   //here 'this' refer to this particular button which was press
//  console.log(this);
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);
    checkAns(userSeq.length -1);                                                              
}

let btnsAll = document.querySelectorAll(".btn");
for(btn of btnsAll){
    btn.addEventListener("click", btnPress);
}



// MAIN GAME LOGIC..............

function checkAns(indx){
    
    if(gameSeq[indx] === userSeq[indx]){
        // console.log("same value");
        if(userSeq.length == gameSeq.length){ // user press all the key rightly then he reach the next level....    
          setTimeout(levelUp, 1500);
        }  
    }else{
        h2.innerHTML =`Game over! Your score was <b> ${level} </b> <br> press any key to start a new game`;
      
        let highS = HighScore();
        h4.innerText=`Highest Score = ${highS}`;         
           
  
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(reset, 1500);
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";  
        }, 150);
    }
}


function reset(){
    start =false;
    gameSeq=[];
    userSeq=[];
    level=0;
}

function HighScore(){      /* VVVVVVVVVVVVVVVVVVI  it is the logic of insertion sort kind of */
    let max= score[0];
    for(let i=1; i<score.length; i++){
        if(score[i] > max){
            max = score[i];
        }
    }
    return max;
}