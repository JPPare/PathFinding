import board from "./board";
import DSP from "../algorithms/dijsktra";
import DFS from "../algorithms/dsfSearch";
import dfsMaze from "../algorithms/dfsMaze";

export default class NavBar{
    static handleInput(event,board){
       let btn = event.target;
       if(btn.id === "clearAllBtn"){NavBar.clearAll(board);}
       else if(btn.id === "clearStartBtn"){NavBar.clearStart(board);}
       else if(btn.id === "clearEndBtn"){NavBar.clearEnd(board);}
       else if(btn.id === "stopBtn"){board.running = false;}
       else if(btn.id === "refreshBtn"){
           board.running = false;
           board.refreshBoard();
       }
       else if((btn.id.slice(0,4)) === "algo"){NavBar.runAlgo(board, btn);}
       else if((btn.id.slice(0,3)) === "gen"){NavBar.genMaze(board,btn);}
    }

    static clearAll(board){
        console.log("clear");
        board.running = false;
        document.getElementById("infoBar").innerHTML = "Please select an algorithm from the drop down above.";
        board.drawInitBoard();
    }

    static clearStart(board){
        board.running = false;
       if(board.isStartSet()) {
           const x = board.startPos[0];
           const y = board.startPos[1];
           board.clearCell(x, y);
           board.startPos = [null, null];
       }
    }

    static clearEnd(board){
        board.running = false;
        if(board.isEndSet()) {
            const x = board.endPos[0];
            const y = board.endPos[1];
            board.clearCell(x, y);
            board.endPos = [null, null];
        }
    }

    static runAlgo(board, btn) {
        board.running = false;
        if (board.isStartSet() && board.isEndSet()) {
            board.running = true;
            document.getElementById("infoBar").innerHTML = btn.text;
            board.refreshBoard();
            let path = null;
            if (btn.id === "algo-dijkstra") {
                path = new DSP(board);
            } else {
                path = new DFS(board);
            }
            path.rSearchGrid();
        } else {
            window.alert("Either the start or end cell is not marked.");
        }
    }

    static genMaze(board,btn){
        board.running = false;
        if(btn.id === "gen-dfsMaze"){
            board.running = true;
            board.drawInitBoard();
            document.getElementById("infoBar").innerHTML = btn.text;
            let maze = new dfsMaze(board);
            maze.createMaze();
        }else{
            window.alert("Please select an algorithm from the drop down.");
        }
    }
}