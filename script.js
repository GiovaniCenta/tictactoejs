let x = document.querySelector(".x");
let o = document.querySelector(".o");
let boxes = document.querySelectorAll(".box");
let buttons= document.querySelectorAll("#container-buttons");
let messageContainer = document.querySelector("#message")
let messageText = document.querySelector("#message p");
let SecondPlayer;
let xScore = document.querySelector("#scoreboard-1");
let oScore = document.querySelector("#scoreboard-2");
let p1w=0;
let p2w=0;

function playFunction(){ //who's going to play and draw X or O in the boxes
    let player1=0;
    let player2=0;
    let counterFail=0;
    let win=-1; 
    let res=-1;
    
    let r=-1;
    for(let i=0;i<boxes.length;i++){
        //when someone click inside the box
        boxes[i].addEventListener("click",function(){
            let play;
            if (this.childNodes.length==0){ //if this box isnt occupied
                if (player1==player2){ //player1 starts playing
                    play=x;
                    player1++;
                }else{
                    play=o;
                    player2++;
                }
                let clonePlay = play.cloneNode(true); //save "play" to posterious use;
                this.appendChild(clonePlay);//drawning play to the box
                let win=0;
                win = roundVictoryCheck();
                console.log("win: " + win);
                if ( win == 1){
                    //p1w=p1w+1;
                    console.log("player 1 wins: ");
                    scoreBoard(1);
                    counterFail=0;
                }
                else if (win == 2 ){
                    //p2w=p2w+1;
                    console.log("player 2 wins: ");
                    
                    scoreBoard(2);
                    counterFail=0;
                    
                }
                 counterFail++;
                 if (counterFail>8 && win ==0){
                        scoreBoard(0);
                        counterFail=0;
                     }

                }
                if (r!=-1)
                    return r;
            });
       
        }
    
}

function roundVictoryCheck(){
    
    
    
    let b0=document.getElementById("block-1");
    let b1=document.getElementById("block-2");
    let b2=document.getElementById("block-3");
    let b3=document.getElementById("block-4");
    let b4=document.getElementById("block-5");
    let b5=document.getElementById("block-6");
    let b6=document.getElementById("block-7");
    let b7=document.getElementById("block-8");
    let b8=document.getElementById("block-9");

    //check horizontal lines
    if (check(b0,b1,b2) != 0)
    {
        return check(b0,b1,b2);
    }
    else if (check(b3,b4,b5) != 0)
    {
        return check(b3,b4,b5);
    }
    else if (check(b6,b7,b8) != 0)
    {
        return check(b6,b7,b8);
    }

    //check vertical lines
    else if (check(b0,b3,b6) != 0)
    {
        return check(b0,b3,b6);
    }
    else if (check(b1,b4,b7) != 0)
    {
        return check(b1,b4,b7);
    }
    else if  (check(b2,b5,b8) != 0)
    {
        return check(b2,b5,b8);
    }
    //check diagonal lines
    else if(check(b0,b4,b8)!=0)
    {
        return check(b0,b4,b8);
    }
    else if(check(b2,b4,b6)!=0){
        return check(b2,b4,b6);
    }
    else 
        return 0;
    
        
}

function check(...args){
    if(args[0].childNodes.length>0 && args[1].childNodes.length>0 && args[2].childNodes.length>0){ //verify if the blocks contains any play
        let getA = args[0].childNodes[0].className; //getA,B,C receives the classname of the play
        let getB = args[1].childNodes[0].className;
        let getC = args[2].childNodes[0].className;
        let res = roundWin(getA,getB,getC);
        if (res==1){
            return 1;
        }
        else if(res==2){
            return 2;
        }
        else if(res==0){
            return 0;
        }
    }else
    return 0;
}

function roundWin(a,b,c) { //verifies if someone wons the round;
    if (a==b && b==c){
        //console.log("dsdasdas");
        if (a =='x'){
            return 1;
        }
        else if (a =='o'){
           //console.log("player2");
            return 2;
        }
    }
    else
        return 0;

}

function scoreBoard(r){
    if (r==1) //means player1 won
    {
        p1w++;
        console.log("p1w: " + p1w);
        xScore.textContent = p1w;
        msg = "Player 1 wins!";
        messageContainer.classList.remove("hide"); //remove hide to show the msg
        messageText.innerHTML=msg;
        setTimeout(function (){ //add class hide to hide the msg again after 3 seconds
            messageContainer.classList.add("hide");
            removeBoxes();
        },3000);
        
        //clear screen
    }
    else if(r==2)
    {
        p2w++;
        console.log("p2w: " + p2w);
        oScore.textContent = p2w;
        msg = "Player 2 wins!";
        messageContainer.classList.remove("hide");//remove hide to show the msg
        messageText.innerHTML=msg;
        setTimeout(function (){ //add class hide to hide the msg again after 3 seconds
            messageContainer.classList.add("hide");
            removeBoxes();
        },3000);
        
        //clear screen

    }
    else if(r==0){
        msg = "Round ended w/o winner!";
        messageContainer.classList.remove("hide");//remove hide to show the msg
        messageText.innerHTML=msg;
        setTimeout(function (){ //add class hide to hide the msg again after 3 seconds
            messageContainer.classList.add("hide");
            removeBoxes();
        },3000);

    }



}



function removeBoxes(){ //function to remove x's and o's from the boxes
    let boxesToRemove=document.querySelectorAll(".box div");
    for(let i=0;i<boxesToRemove.length;i++){
        boxesToRemove[i].parentNode.removeChild(boxesToRemove[i]);
    }
}


let player1=0;
let player2=0;
playFunction();