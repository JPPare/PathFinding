import board from "./board";
import DSP from "../algorithms/dijsktra";
export default class NavBar{
    static handleInput(event,board){
       let btn = event.target.id;
       if(btn === "aStar"){console.log("Selected: ", event.target.text);}
       else if(btn === "clearAllBtn"){NavBar.clearAll(board);}
       else if(btn === "setStartBtn"){NavBar.setStart(board);}
       else if(btn === "setEndBtn"){NavBar.setEnd(board);}
       else if(btn === "runBtn"){NavBar.runBtn(board);}
       else{console.log(event.target);}
    }
    static clearAll(board){
        board.drawInitBoard();
    }
    static setStart(board){
        const x = board.startPos[0];
        const y = board.startPos[1];
        board.clearCell(x,y);
        board.startPos = [null,null];
    }
    static setEnd(board){
        const x = board.endPos[0];
        const y = board.endPos[1];
        board.clearCell(x,y);
        board.endPos = [null,null];
    }
    static runBtn(board){
       let path = new DSP(board);
       path.searchGrid();
       console.log("Done");
    }
}