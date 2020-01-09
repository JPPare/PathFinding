import PriorityQueue from "./priorityQueue";
import dijsktra from "./dijsktra";

export default class DFS extends dijsktra {

    constructor(board, searchMode) {
        super(board, searchMode);
        this.pQue.comparator = (a, b) => {
            return a.dist > b.dist;
        };
    }


    processNeighbors(neighborArr, aNode) {
        let neighbors = neighborArr.map(ele => { // Convert the array into nodes
            return {
                row: ele[0],
                col: ele[1],
                dist: this.grid[ele[0]][ele[1]]
            };
        });
        //Filters based on dijkstra grid
        neighbors = neighbors.filter((ele) => { // Get only the nodes whose who havent been seen yet.
            return (ele.dist === null)
        });
        for (let i of neighbors) { //Add neighbors to list.
            i.dist = aNode.dist + 1;
            this.grid[i.row][i.col] = i.dist;
            if(i.row === this.end.row && i.col === this.end.col){
                this.pQue.clearAll(); // If we see the goal node wipe the que to trigger path extraction.
            }
            else {
                this.board.highlightCell(i.row * this.board.gridSize, i.col * this.board.gridSize, '#ff0000');
            }
            this.pQue.insert(i);
        }
    }
}