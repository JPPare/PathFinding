import board from "./board";
import DSP from "../algorithms/dijsktra";
export default class NavBar{
    static handleInput(event,board){
       let btn = event.target.id;
       if(btn === "aStar"){console.log("Selected: ", event.target.text);}
       else if(btn === "clearAllBtn"){NavBar.clearAll(board);}
       else if(btn === "clearStartBtn"){NavBar.clearStart(board);}
       else if(btn === "clearEndBtn"){NavBar.clearEnd(board);}
       else if(btn === "runBtn"){NavBar.runBtn(board);}
       else{console.log(event.target);}
    }
    static clearAll(board){
        board.drawInitBoard();
    }
    static clearStart(board){
       if(board.isStartSet()) {
           const x = board.startPos[0];
           const y = board.startPos[1];
           board.clearCell(x, y);
           board.startPos = [null, null];
       }
    }
    static clearEnd(board){
        if(board.isEndSet()) {
            const x = board.endPos[0];
            const y = board.endPos[1];
            board.clearCell(x, y);
            board.endPos = [null, null];
        }
    }
    static runBtn(board){
        if(board.isStartSet() && board.isEndSet()) {
            board.refreshBoard();
            let path = new DSP(board);
            path.rSearchGrid();
            console.log("Done");
        }
    }
}