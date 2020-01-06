export default class PriorityQueue{
    constructor(comparator = (a,b)=>{return a < b;}){
        this.heap = [null];
        this.comparator = comparator;
    }
    isEmpty(){
        return this.heap.length <= 1;
    }
    insert(obj){
        this.heap.push(obj);
        if (this.heap.length > 2) { //null takes up 1 place
            let objIdx = this.heap.length - 1;
            while(this.comparator(this.heap[objIdx], this.heap[Math.floor(objIdx/2)])){
                [this.heap[objIdx], this.heap[Math.floor(objIdx/2)]] = [this.heap[Math.floor(objIdx/2)],this.heap[objIdx]]; //Swap
                objIdx = Math.floor(objIdx/2);
                if(objIdx <= 1){break;}
            }
        }
    }//End Insert

    remove(){
        if(this.isEmpty()){console.log("Queue is Empty")}
        else{
            if(this.heap.length === 2){return this.heap.pop();} //Just the root node

            let val = this.heap[1];
            this.heap[1] = this.heap.pop();
            if(this.heap.length === 2){return val;} //case where there was only 2 elements

            let currNode = 1;
            let leftChild = currNode * 2;
            let rightChild = currNode * 2 + 1;

            if(this.heap.length === 3){             //case where there was 3 elements
                if(this.comparator(this.heap[leftChild], this.heap[currNode]) ){
                    [this.heap[leftChild], this.heap[currNode]] = [this.heap[currNode], this.heap[leftChild]];
                }
                return val;
            }

            while(this.comparator(this.heap[leftChild], this.heap[currNode]) || this.comparator(this.heap[rightChild],this.heap[currNode])){
                if(this.heap[rightChild]===undefined || this.comparator(this.heap[leftChild], this.heap[rightChild]) ){
                    [this.heap[leftChild], this.heap[currNode]] = [this.heap[currNode], this.heap[leftChild]];
                    currNode = leftChild;
                }
                else{
                    [this.heap[rightChild], this.heap[currNode]] = [this.heap[currNode], this.heap[rightChild]];
                    currNode = rightChild;
                }

                leftChild = currNode * 2;
                rightChild = currNode * 2 + 1;
                if(this.heap[leftChild] ===undefined || this.heap[rightChild] ===undefined){ break;}
            }
            return val;
        }
    }
    peak(){
        return this.heap[1];
    }
}//End PriorityQueue



