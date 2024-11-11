import { Node } from "../model/Node";
export class BinaryHeap{
    heap: Node[];

    constructor(){
         this.heap = [];
    }

    getMin() {
        if(this.heap.length==0) return;
        return this.heap[1].distance;
    }
        
    insert (node:Node) { 
        /* Inserting the new node at the end of the heap array */
        this.heap.push(node);

        /* Finding the correct position for the new node */
        if (this.heap.length > 1) {
            let current = this.heap.length - 1
            
            /* Traversing up the parent node until the current node (current) is greater than the parent (current/2)*/
            while (current > 1 && this.heap[BinaryHeap.parent(current)].distance > this.heap[current].distance) {
            
                /* Swapping the two nodes by using the ES6 destructuring syntax*/
                [this.heap[BinaryHeap.parent(current)], this.heap[current]] = [this.heap[current], this.heap[BinaryHeap.parent(current)]]
                current = BinaryHeap.parent(current);
            }
        }
    }


    extractMin():Node {
        // if(this.heap.length == 0) return; //RETURN UNDEFINED
        /* min element is at the index 1 in the heap array */
        let min = this.heap[1];

        /* We swap the min with a leaf and remove the leaf
        */
        if (this.heap.length > 2) {
            this.heap[1] = this.heap[this.heap.length-1]
            this.heap.splice(this.heap.length - 1)

            if (this.heap.length === 3) {
                if (this.heap[1].distance > this.heap[2].distance) {
                    [this.heap[1], this.heap[2]] = [this.heap[2], this.heap[1]]
                }
                return min
            }
            //// PROCEDURA MIN HEAPIFY or // OPERATION OF HEAP BUBBLE DOWN
            let current = 1
            let left = BinaryHeap.left(current);
            let right = BinaryHeap.right(current);

            while (this.heap[left] && 
                    this.heap[right] &&
                    (this.heap[current].distance > this.heap[left].distance ||
                        this.heap[current].distance > this.heap[right].distance)) {
                if (this.heap[left].distance < this.heap[right].distance) {
                    [this.heap[current], this.heap[left]] = [this.heap[left], this.heap[current]]
                    current = left
                } else {
                    [this.heap[current], this.heap[right]] = [this.heap[right], this.heap[current]]
                    current = right
                }

                left = current * 2
                right = current * 2 + 1
            }
        }

        /* If there are only two elements in the array, we directly splice out the first element */

        else if (this.heap.length === 2) {
            this.heap.splice(1, 1)
        } 
        // else {
        //     return;
        // }

        return min
    }

//decrease key value of priority queque
    decreaseKey(index:number,key:number){ 
        //If the key is greater than prev 
        if(key > this.heap[index].distance) return;
        
        this.heap[index].distance = key; 

        //BUBBLE UP PROCEDURE (SAME AS INSERT)
        while(index>1 && this.heap[BinaryHeap.parent(index)].distance > this.heap[index].distance){
             /* Swapping the two nodes by using the ES6 destructuring syntax*/
             [this.heap[BinaryHeap.parent(index)], this.heap[index]] = [this.heap[index], this.heap[BinaryHeap.parent(index)]]
             index = BinaryHeap.parent(index);
        }

    }

    private static parent(i:number){
        return Math.floor(i/2);
    }
    private static left(i:number){
        return Math.floor(2*i);
    }
    private static right(i:number){
        return Math.floor(2*i+1);
    }

    
}
// EUCLIDEAN DISTANCE
// private getRemainingNodes(grid:Node[][],startNode:Node){ //With heap O(n) Insert
//     const nodes:Node[] = [];
//     for(let row of grid){
//         for(let node of row){
//     /* Inserting the new node at the end of the heap array */
//     nodes.push(node);

//             /* Finding the correct position for the new node */
//             if (nodes.length > 1) {
//                 let current = nodes.length - 1
//                 Math.abs(startNode.row - nodes[ Math.floor(current/2)].row) - Math.abs(startNode.col - nodes[ Math.floor(current/2)].col)
//                 > Math.abs(startNode.row - nodes[ current].row) - Math.abs(startNode.col - nodes[current].col)
//                 /* Traversing up the parent node until the current node (current) is greater than the parent (current/2)*/ 
//                 while (current > 1 &&
//                      (Math.abs(startNode.row - nodes[ Math.floor(current/2)].row) - Math.abs(startNode.col - nodes[ Math.floor(current/2)].col))
//                      > (Math.abs(startNode.row - nodes[ current].row) - Math.abs(startNode.col - nodes[current].col)) ) { //USING THE EUCIDEAN DISTANCE

//                     /* Swapping the two nodes by using the ES6 destructuring syntax*/
//                     [nodes[Math.floor(current/2)], nodes[current]] = [nodes[current], nodes[Math.floor(current/2)]];
//                     current = Math.floor(current/2);
//                 }
//             }


//         }
//     }
//     return nodes;
// }