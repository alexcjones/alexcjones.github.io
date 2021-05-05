//alex connor jones





function addtoboard(row,column,team){
    let r = row.toString(10);
    let c= column.toString(10);
    let address = "r"+r+"c"+c;
        
    if (document.getElementById("turn").innerHTML!="RESET TO PLAY AGAIN"){
        if (team=='R')
        {
            document.getElementById(address).style.backgroundColor='#ff0000'
        }
        else{
            document.getElementById(address).style.backgroundColor = '#ffff00'
        }
    }
        
}


function drop(column){
    //create board
    let board = Array.from(Array(6), () => new Array(7));
   
    let address="";
    let istring="";
    let jstring="";
    
    //determine whos turn
    let turn=0;
    for (let i = 0;i<6;i++){
        for (let j = 0 ; j<7; j++){
            istring=i.toString(10);
                       
            jstring=j.toString(10);

            address="r"+istring+"c"+jstring;
            let elem = document.getElementById(address);
            //console.log(address);

            if (window.getComputedStyle(elem, null).getPropertyValue("background-color")== "rgb(255, 0, 0)"){
                board[i][j]="R";
                turn+=1;
            }
            else if (document.getElementById(address).style.backgroundColor== "rgb(255, 255, 0)"){
                board[i][j]="Y";
                turn+=1;
            }
            else{
                board[i][j]="E";
            }
            
        } 
    }
    let team="";
    if (turn%2==0){
        team = "R";
        
    }
    else{
        team = "Y";
        
    }
    

    //find row to place in
    //color the board
    let r=-1;
    for (let i = 0 ; i < 6 ; i++){
        if (board[i][column]=="E"){
            addtoboard(i,column,team);
            board[i][column]=team;
            r=i;
            i=100;
        }
       
    }
    turn+=1;
    if (r!=-1){
        
        if (document.getElementById("turn").innerHTML!="RESET TO PLAY AGAIN"){
            if (team=="R"){
            
                document.getElementById("turn").style.color="rgb(255, 255, 0)";
                document.getElementById("turn").innerHTML="YELLOW PLAYER 2";
            }
            else{
            
                document.getElementById("turn").style.color="rgb(255, 0, 0)";
                document.getElementById("turn").innerHTML="RED PLAYER 1";
            }
        }
    }
    let win = checkforwin(r,column,team,board);
    console.log("----------------TEST CONCLUDE--------------")
    let str="";
    
    if (win && document.getElementById("turn").innerHTML!="RESET TO PLAY AGAIN"){
        if (team=='R'){
            document.getElementById("alert").style.color="rgb(255, 0, 0)";
            str= "PLAYER 1 WINS!!!";
        }
        else{
            document.getElementById("alert").style.color="rgb(255, 255, 0)";
            str= "PLAYER 2 WINS!!!";
        }
        document.getElementById("reset").disabled=true;
        document.getElementById("start").disabled=true;
        for (let i =0; i<5;i++){
            setTimeout(function(){
                console.log("no show function");
                document.getElementById("alert").innerHTML = "";
                for (let j=0; j<6; j++){
                    for (let k=0; k<7; k++){
                        if (board[j][k]=="W"){
                            istring=j.toString(10);
                            jstring=k.toString(10);
                            address="r"+istring+"c"+jstring;
                            document.getElementById(address).style.backgroundColor="rgb(0, 255, 255)";
                        }
                    }
                }
            }, i*1000);
            setTimeout(function(){
                console.log("show function");
                document.getElementById("alert").innerHTML = str;
                for (let j=0; j<6; j++){
                    for (let k=0; k<7; k++){
                        if (board[j][k]=="W"){
                            istring=j.toString(10);
                            jstring=k.toString(10);
                            address="r"+istring+"c"+jstring;
                            if (team=="R"){
                                document.getElementById(address).style.backgroundColor="rgb(255, 0, 0)";
                            }
                            else{
                                document.getElementById(address).style.backgroundColor="rgb(255, 255, 0)";
                            }
                        }
                    }
                }
                if (i==4){
                    document.getElementById("reset").disabled=false;
                    document.getElementById("start").disabled=false;
                }
            }, ((i*1000)+500));
        }
        document.getElementById("turn").style.color="rgb(0, 255, 255)";
        document.getElementById("turn").innerHTML="RESET TO PLAY AGAIN";
    }
    else if(turn==42){
        document.getElementById("alert").style.color="rgb(0, 255, 255)";
        document.getElementById("alert").innerHTML = "DRAW!!! NO IDEA HOW YOU DID THAT";
        document.getElementById("turn").style.color="rgb(0, 255, 255)";
        document.getElementById("turn").innerHTML="RESET TO PLAY AGAIN";
    }
    
}
function checkforwin(row,col,team,board){
    let checkur= recursivecheck("UR",0,row,col,0,board,team,row,col);
    let checkul= recursivecheck("UL",0,row,col,0,board,team,row,col);
    let checkr= recursivecheck("R",0,row,col,0,board,team,row,col);
    let checkd= recursivecheck("D",0,row,col,0,board,team,row,col);
    if (checkur || checkul || checkr || checkd){
        return true;
    }
    else{
        console.log(board[0][0]);
        console.log(team);
        return false;
    }

}
function recursivecheck(direction,flip,row,col,counter,board,team, origrow,origcol){
    let win= false;
    //checks boundary conditions
    if (row>=6 || col >=7 || col<=-1 || row<=-1){
        //if direction has not flipped yet check other side, else no victory in this direction
        if (flip==0){
            if (direction=="UR"){
                return (recursivecheck(direction,1,origrow-1,origcol-1,counter, board,team,origrow,origcol));
            }
            else if (direction=="UL"){
                return (recursivecheck(direction,1,origrow-1,origcol+1, counter, board, team,origrow,origcol));
            }
            else if (direction=="R"){
                return (recursivecheck(direction,1,origrow,origcol-1,counter,board,team,origrow,origcol));
            }
            else if (direction=="D"){
                console.log("EXIT1")
                return false;
            }
        }
        else{
            console.log("EXIT4");
            return false;
        }
    } //if 3 already in a row and current coordinates are correct team, victory has occured
    else if (board[row][col]==team && counter==3){
        counter+=1;
        board[row][col]="W";
        return true;
    }//if current coordinates are not correct team, and the flip has already been tested, no victory in this direction
    else if (board[row][col]!=team && flip==1){
        console.log("EXIT2")
        return false;
    }// if current coordinates are not correct team, but the flip has not yet occured. Flips based off direction and original coordinates
    else if (board[row][col]!=team){
        if (direction=="UR"){
            return (recursivecheck(direction,1,origrow-1,origcol-1,counter, board,team,origrow,origcol));
        }
        else if (direction=="UL"){
            return (recursivecheck(direction,1,origrow-1,origcol+1, counter, board, team,origrow,origcol));
        }
        else if (direction=="R"){
            return (recursivecheck(direction,1,origrow,origcol-1,counter,board,team,origrow,origcol));
        }
        else if (direction=="D"){
            console.log("EXIT3")
            return false;
        }
    }//current coordinates are correct team, but counter!=4. Calls recursivecheck with new coordinates based off current coordiantes and direction
    else if (board[row][col]==team && flip == 0){
        counter+=1;
        
        if (direction=="UR"){
            win = recursivecheck(direction,0,row+1,col+1,counter, board,team,origrow,origcol);
            if (win==true){
                board[row][col]="W";
            }
            return win;
        }
        else if (direction=="UL"){
            win = recursivecheck(direction,0,row+1,col-1, counter, board, team,origrow,origcol);
            if (win==true){
                board[row][col]="W";
            }
            return win;
        }
        else if (direction=="R"){
            win = recursivecheck(direction,0,row,col+1,counter,board,team,origrow,origcol);
            if (win==true){
                board[row][col]="W";
            }
            return win;
        }
        else if (direction=="D"){
            win = recursivecheck(direction,0,row-1,col,counter,board,team,origrow,origcol);
            if (win==true){
                board[row][col]="W";
            }
            return win;
        }
    }//current coordinates are correct team. flip is active so goes opposite direction key when calling recursive check on current coordinates
    else if (board[row][col]==team && flip == 1){
        counter+=1;
        if (direction=="UR"){
            win = recursivecheck(direction,1,row-1,col-1,counter, board,team,origrow,origcol);
            if (win==true){
                board[row][col]="W";
            }
            return win;
        }
        else if (direction=="UL"){
            win = recursivecheck(direction,1,row-1,col+1, counter, board, team,origrow,origcol)
            if (win==true){
                board[row][col]="W";
            }
            return win;
        }
        else if (direction=="R"){
            win = recursivecheck(direction,1,row,col-1,counter,board,team,origrow,origcol);
            if (win==true){
                board[row][col]="W";
            }
            return win;
        }
        
    }
    console.log("uh oh spagetti o");

}

document.getElementById("b1").addEventListener("click", function() {
    drop(0);
});
document.getElementById("b2").addEventListener("click", function() {
    drop(1);
});
document.getElementById("b3").addEventListener("click", function() {
    drop(2);
});
document.getElementById("b4").addEventListener("click", function() {
    drop(3);
});
document.getElementById("b5").addEventListener("click", function() {
    drop(4);
});
document.getElementById("b6").addEventListener("click", function() {
    drop(5);
});
document.getElementById("b7").addEventListener("click", function() {
    drop(6);
});
document.getElementById("start").addEventListener("click", function() {
    reset();
    document.getElementById("turn").style.color="rgb(255, 0, 0)";
    document.getElementById("turn").innerHTML = "RED PLAYER 1";
});
document.getElementById("reset").addEventListener("click", function() {
    reset();
});
function reset(){
    document.getElementById("turn").innerHTML = "";
    document.getElementById("alert").innerHTML = "";
    let jstring="";
    let istring="";
    for (let i = 0;i<6;i++){
        for (let j = 0 ; j<7; j++){
            istring=i.toString(10);
                       
            jstring=j.toString(10);

            address="r"+istring+"c"+jstring;
            document.getElementById(address).style.backgroundColor="rgb(0, 0, 0)";
        }
    }
}



