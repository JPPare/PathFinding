import board from "./Board";
import BasicSearch from "../algorithms/BasicSearch";
import DepthFirstSearch from "../algorithms/DFSearch";
import DFSMaze from "../algorithms/DFSMaze";

export default class NavBar{
    constructor(board){
        this.board = board;
        this.maze = null;
        this.path = null;
    }

     handleInput(event){
       let btn = event.target;
       if(btn.id === "clearAllBtn"){this.clearAll();}
       else if(btn.id === "clearStartBtn"){this.clearStart();}
       else if(btn.id === "clearEndBtn"){this.clearEnd();}
       else if(btn.id === "stopBtn"){this.board.running = false;}
       else if(btn.id === "refreshBtn"){
           this.board.running = false;
           this.board.refreshBoard();
       }
       else if((btn.id.slice(0,4)) === "algo"){this.runAlgo(btn);}
       else if((btn.id.slice(0,3)) === "gen"){this.genMaze(btn);}
    }

     clearAll(board){
        console.log("clear");
        this.board.running = false;
        document.getElementById("infoBar").innerHTML = "Please select an algorithm from the drop down above.";
        this.board.drawInitBoard();
    }

     clearStart(){
        this.board.running = false;
       if(this.board.isStartSet()) {
           const x = this.board.startPos[0];
           const y = this.board.startPos[1];
           this.board.clearCell(x, y);
           this.board.startPos = [null, null];
       }
    }

     clearEnd(){
         this.board.running = false;
        if(this.board.isEndSet()) {
            const x = this.board.endPos[0];
            const y = this.board.endPos[1];
            this.board.clearCell(x, y);
            this.board.endPos = [null, null];
        }
    }

     runAlgo(btn) {
        this.board.running = false;
        if (this.board.isStartSet() && this.board.isEndSet()) {
            this.board.running = true;
            document.getElementById("infoBar").innerHTML = btn.text;
            this.board.refreshBoard();
            if (btn.id === "algo-dijkstra") {
                if(!(this.path instanceof BasicSearch)){
                    this.path = new BasicSearch(this.board);
                } else {

                }

            } else {
                this.path = new DepthFirstSearch(this.board);
            }
            this.path.rSearchGrid();
        } else {
            window.alert("Either the start or end cell is not marked.");
        }
    }

     genMaze(btn){
            if(btn.id === "gen-DFSMaze") {
                console.log("GenMaze");
                this.board.running = true;
                this.board.drawInitBoard();
                document.getElementById("infoBar").innerHTML = btn.text;
                if(!(this.maze instanceof DFSMaze)){
                    this.maze = new DFSMaze(this.board);
                }
                else{
                    this.maze.reset();
                }
                this.maze.createMaze();
            }
        }
  //  }
}