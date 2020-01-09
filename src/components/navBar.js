import board from "./board";
import DSP from "../algorithms/dijsktra";
import DFS from "../algorithms/dsfSearch";

import dfsMaze from "../algorithms/dfsMaze";
export default class NavBar{
    static handleInput(event,board){
       let btn = event.target.id;
       if(btn === "dijkstra"){document.getElementById("infoBar").innerHTML =  event.target.text;}
       else if(btn === "dfsMaze"){document.getElementById("infoBar").innerHTML = event.target.text;}
       else if(btn === "dfsSearch"){document.getElementById("infoBar").innerHTML = event.target.text;}
       else if(btn === "clearAllBtn"){NavBar.clearAll(board);}
       else if(btn === "clearStartBtn"){NavBar.clearStart(board);}
       else if(btn === "clearEndBtn"){NavBar.clearEnd(board);}
       else if(btn === "runBtn"){NavBar.runBtn(board);}
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
    static runBtn(board){
        let toRun = document.getElementById("infoBar").innerHTML;
        if(toRun === document.getElementById("dijkstra").text || toRun === document.getElementById("dfsSearch").text) {
            if (board.isStartSet() && board.isEndSet()) {
                board.running = true;
                board.refreshBoard();
                let path = null;
                if (toRun === document.getElementById("dijkstra").text){path = new DSP(board);}
                else {path = new DFS(board);}
                path.rSearchGrid();
                console.log("Done");
            }
            else{
                window.alert("Either the start or end cell is not marked.");
            }
        }
        else if(toRun === document.getElementById("dfsMaze").text){
            board.running = true;
            board.drawInitBoard();
            let maze = new dfsMaze(board);
            maze.createMaze();
            console.log("Done");
        }else{
            window.alert("Please select an algorithm from the drop down.");
        }
    }
}