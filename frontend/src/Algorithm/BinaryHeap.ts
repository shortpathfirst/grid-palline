import { Node } from "../model/Node";
// Correct Version.
export class BinaryHeap {
    heap: Node[];

    constructor() {
        this.heap = [];
    }

    getMin() {
        if (this.heap.length === 0) return;
        return this.heap[0].distance;
    }

    insert(node: Node) {
        this.heap.push(node);

        let current = this.heap.length - 1;
        while (current > 0 && this.heap[BinaryHeap.parent(current)].distance > this.heap[current].distance) {
            [this.heap[BinaryHeap.parent(current)], this.heap[current]] = [this.heap[current], this.heap[BinaryHeap.parent(current)]];
            current = BinaryHeap.parent(current);
        }
    }

    extractMin(): Node | undefined {
        if (this.heap.length === 0) return undefined;
        if (this.heap.length === 1) return this.heap.pop();

        let min = this.heap[0];
        this.heap[0] = this.heap.pop()!;

        let current = 0;
        let left = BinaryHeap.left(current);
        let right = BinaryHeap.right(current);

        while (this.heap[left] && 
               (this.heap[current].distance > this.heap[left].distance ||
                (this.heap[right] && this.heap[current].distance > this.heap[right].distance))) {
            if (this.heap[right] === undefined || this.heap[left].distance < this.heap[right].distance) {
                [this.heap[current], this.heap[left]] = [this.heap[left], this.heap[current]];
                current = left;
            } else {
                [this.heap[current], this.heap[right]] = [this.heap[right], this.heap[current]];
                current = right;
            }

            left = BinaryHeap.left(current);
            right = BinaryHeap.right(current);
        }

        return min;
    }

    decreaseKey(index: number, key: number) {
        if (key > this.heap[index].distance) return;

        this.heap[index].distance = key;
        while (index > 0 && this.heap[BinaryHeap.parent(index)].distance > this.heap[index].distance) {
            [this.heap[BinaryHeap.parent(index)], this.heap[index]] = [this.heap[index], this.heap[BinaryHeap.parent(index)]];
            index = BinaryHeap.parent(index);
        }
    }

    private static parent(i: number) {
        return Math.floor((i - 1) / 2);
    }

    private static left(i: number) {
        return 2 * i + 1;
    }

    private static right(i: number) {
        return 2 * i + 2;
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