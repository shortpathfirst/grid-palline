import { GridNode } from "../model/GridNode";

export class Dijkstra {

    dijkstra(grid: GridNode[][], startNode: GridNode, finishNode: GridNode) {
        const visitedNodes: GridNode[] = [];
        startNode.distance = 0;
        const unvisitedNode = this.getRemainingNodes(grid);
        while (!!unvisitedNode.length) { //undefined is false
            this.sortNodesByDistance(unvisitedNode);
            const closestNode = unvisitedNode.shift();//get Min //EXTRACT KEY
            if (!closestNode) continue; //if undefined
            if (closestNode.isWall) continue; /// If wall
            // if(closestNode.value!='' && closestNode.value!=startNode.value) continue; //IF SAME COLOR IS WALL
            if (closestNode.distance === Infinity) return visitedNodes;
            closestNode.isVisited = true;
            visitedNodes.push(closestNode);
            if (closestNode === finishNode) return visitedNodes;
            this.updateVistedNeighbors(closestNode, grid);
        }
    }
    private getRemainingNodes(grid: GridNode[][]) { //With heap O(n) Insert
        const nodes: GridNode[] = [];

        for (let row of grid) {
            for (let node of row) {
                nodes.push(node);
            }
        }
        return nodes;
    }
    private sortNodesByDistance(unvisitedNodes: GridNode[]) { //NO NEED TO SORT
        unvisitedNodes.sort((a, b) => a.distance - b.distance);

    }
    private updateVistedNeighbors(node: GridNode, grid: GridNode[][]) { //RELAX
        const unvisitedNeighbors = this.getUnvisitedNeighbors(node, grid);
        for (const neighbor of unvisitedNeighbors) {
            neighbor.distance = node.distance;
            neighbor.previousNode = node;
        }
    }
    private getUnvisitedNeighbors(node: GridNode, grid: GridNode[][]) {
        const neighbors = [];
        const col = node.col;
        const row = node.row;
        if (row > 0) neighbors.push(grid[row - 1][col]);
        if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
        if (col > 0) neighbors.push(grid[row][col - 1]);
        if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
        return neighbors.filter(neighbor => !neighbor.isVisited);
    }

    getNodesInShortestPathOrder(finishNode: GridNode) {
        const nodesInShortestPath = [];
        let currentNode: GridNode | null = finishNode;
        while (currentNode) {
            nodesInShortestPath.unshift(currentNode);

            currentNode = currentNode.previousNode;
        }
        return nodesInShortestPath;
    }
}