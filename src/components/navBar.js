import board from "./board";
import DSP from "../algorithms/dijsktra";
import dfsMaze from "../algorithms/dfsMaze";
export default class NavBar{
    static handleInput(event,board){
       let btn = event.target.id;
       if(btn === "dijkstra"){document.getElementById("infoBar").innerHTML =  event.target.text;}
       else if(btn === "dfsMaze"){document.getElementById("infoBar").innerHTML = event.target.text;}
       else if(btn === "clearAllBtn"){NavBar.clearAll(board);}
       else if(btn === "clearStartBtn"){NavBar.clearStart(board);}
       else if(btn === "clearEndBtn"){NavBar.clearEnd(board);}
       else if(btn === "runBtn"){NavBar.runBtn(board);}
    }
    static clearAll(board){
        console.log("clear");
        console.log(document.getElementById("infoBar"));
        document.getElementById("infoBar").innerHTML = "Please select an algorithm from the drop down above.";
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
        let toRun = document.getElementById("infoBar").innerHTML;
        if(toRun === document.getElementById("dijkstra").text) {
            if (board.isStartSet() && board.isEndSet()) {
                board.refreshBoard();
                let path = new DSP(board);
                path.rSearchGrid();
                console.log("Done");
            }
            else{
                window.alert("Either the start or end cell is not marked.");
            }
        }
        else if(toRun === document.getElementById("dfsMaze").text){
            board.drawInitBoard();
            let maze = new dfsMaze(board);
            maze.createMaze();
            console.log("Done");
        }else{
            window.alert("Please select an algorithm from the drop down.");
        }
    }
}