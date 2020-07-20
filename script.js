//=========================HTML selectors=========================
let x = document.querySelector(".x");
let o = document.querySelector(".o");
let boxes = document.querySelectorAll(".box");
let buttons= document.querySelectorAll("#container-buttons button");
let messageContainer = document.querySelector("#message")
let messageText = document.querySelector("#message p");
let SecondPlayer;
let xScore = document.querySelector("#scoreboard-1");
let oScore = document.querySelector("#scoreboard-2");
//===================================================================
let p1w=0; //number of wins to update the scoreboard
let p2w=0;


function playFunction(mode){ //who's going to play and draw X or O in the boxes
                    //mode: against the cpu or against another player? 
    let player1=0;   //number of plays of player 1
    let player2=0;  ///number of plays of player 2
    let counterFail=0; //counter to check if the round resulted in a tie
    let win=-1; 
    
    for(let i=0;i<boxes.length;i++){
        //when someone click inside the box
        boxes[i].addEventListener("click",function(){
            let play =checkPlay(player1,player2); //check if draw X or O
            if (this.childNodes.length==0){ //if this box isnt occupied
                let clonePlay = play.cloneNode(true); //save "play" to posterious use;
                this.appendChild(clonePlay);//drawning play to the box
                
                if (player1==player2){ //player1 starts playing
                    
                    player1++;
                    if(mode=="sp"){  //if the mode selected is single player the program will execute the recursive function cpuPlay to generate random numbers and draw O's
                        
                        cpuPlay();
                        player2++;
                        counterFail++;
                        console.log(counterFail);
                    }


                }else{
                    
                    player2++;
                }
                
                let win=0;
                win = roundVictoryCheck();
                console.log("win: " + win);
                if ( win == 1){
                    console.log("player 1 wins: ");
                    scoreBoard(1);
                    counterFail=0;
                }
                else if (win == 2 ){
                    console.log("player 2 wins: ");
                    scoreBoard(2);
                    counterFail=0;
                    
                }
                 counterFail++;
                 if (counterFail>8 && win ==0){ //counterfail counts the numbers of plays to determine if there are plays left, if doesnt, will return 0 to scoreboard,equals tie 
                        scoreBoard(0);
                        counterFail=0;
                     }

                }
                
            });
       
        }
    
}

//whos going to be draw,X or O
function checkPlay(player1,player2){
    if(player1 == player2) {
        play = x;
      } else {
        play = o;
      }
    
      return play;

}

//check line by line
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

//generic function to determine if there are boxes filled to check a possible win
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

//verifies if someone won the round;
function roundWin(a,b,c) { 
    if (a==b && b==c){
        
        if (a =='x'){
            return 1;
        }
        else if (a =='o'){
          return 2;
        }
    }
    else
        return 0;

}

//Update scoreboard after a round win
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

//2 players or against the cpu?
function spOr2p(){
    for(let i=0; i<buttons.length;i++){
        buttons[i].addEventListener("click",function(){
            SecondPlayer = this.getAttribute("id");
            console.log(SecondPlayer);
            for(let j=0;j<buttons.length;j++){
                buttons[j].style.display='none'; //hide buttons
            };
            setTimeout(function(){
                let container = document.querySelector("#container");
                container.classList.remove("hide");
                playFunction(SecondPlayer);
            })
        })

    }
}


//function to make cpu play
function cpuPlay(){
    let cloneO = o.cloneNode(true);
    let counter=0;
  
    
    let filled=0;
    //only fill boxes without child
    for(let i=0;i<boxes.length;i++){
        let randomNumber = Math.floor(Math.random()*5); //generate one random number, the box to be filled number;
        if (boxes[i].childNodes[0]== undefined){
            if(randomNumber<=1){
                boxes[i].appendChild(cloneO);
                counter++;
                break;}
            //check how many are filled;
            }else{
                filled++;
            }

        }

    
    
    if(counter==0 && filled<9){
       
        cpuPlay();
    }
}


// =========================================================================== PROGRAM MAIN ======================================================================================================

spOr2p(); //first thing to do is to check game mode
