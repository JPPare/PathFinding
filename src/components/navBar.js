import board from "./board";
export default class NavBar{
    static handleInput(event,board){
       let btn = event.target.id;
       if(btn === "aStar"){console.log("Selected: ", event.target.text);}
       else if(btn === "clearAllBtn"){NavBar.clearAll(board); }
       else{console.log(event.target);}
    }
    static clearAll(board){
        board.drawInitBoard();
    }
}