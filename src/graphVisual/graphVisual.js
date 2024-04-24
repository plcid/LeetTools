function drawGraph() {
    // Get the input value
    const edgeInput = document.getElementById('graphInput').value;
    
    // Parse the input value to extract edges
    const edges = JSON.parse(edgeInput);
  
    // Get the canvas element
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');
  
    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Function to perform breadth-first search (BFS)
    function bfs(startNode) {
      const visited = new Set();
      const queue = [startNode];
      const nodes = [startNode];
      while (queue.length > 0) {
        const currentNode = queue.shift();
        visited.add(currentNode);
        edges.forEach(edge => {
          if (edge.includes(currentNode)) {
            const neighbor = edge.find(node => node !== currentNode);
            if (!visited.has(neighbor)) {
              queue.push(neighbor);
              nodes.push(neighbor);
            }
          }
        });
      }
      return nodes;
    }
  
    // Function to draw a shape based on the number of nodes
    function drawShape(nodes, index) {
      const numNodes = nodes.length;
      const centerX = (index % 3) * (canvas.width / 4) + (canvas.width / 8);
      const centerY = Math.floor(index / 3) * (canvas.height / 4) + (canvas.height / 8);
      const radius = 50;
      const angleIncrement = (2 * Math.PI) / numNodes;
      ctx.beginPath();
      ctx.moveTo(centerX + radius * Math.cos(0), centerY + radius * Math.sin(0));
      for (let i = 1; i < numNodes; i++) {
        const angle = i * angleIncrement;
        ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
      }
      ctx.closePath();
      ctx.stroke();
      drawNodes(nodes, centerX, centerY, radius, angleIncrement);
    }
  
    // Function to draw nodes at the edges of the shape
    function drawNodes(nodes, centerX, centerY, radius, angleIncrement) {
      ctx.fillStyle = 'black';
      ctx.font = '12px Arial';
      nodes.forEach((node, index) => {
        const nextIndex = (index + 1) % nodes.length;
        const startX = centerX + radius * Math.cos(index * angleIncrement);
        const startY = centerY + radius * Math.sin(index * angleIncrement);
        const endX = centerX + radius * Math.cos(nextIndex * angleIncrement);
        const endY = centerY + radius * Math.sin(nextIndex * angleIncrement);
        // Calculate the coordinates of the node on the edge
        const nodeX = startX + (endX - startX) / 2;
        const nodeY = startY + (endY - startY) / 2;
        ctx.fillText(node, nodeX, nodeY);
      });
    }
  
    // Draw shapes for each connected component (graph)
    const visitedNodes = new Set();
    let index = 0;
    edges.forEach(edge => {
      edge.forEach(node => {
        if (!visitedNodes.has(node)) {
          const nodes = bfs(node);
          drawShape(nodes, index);
          nodes.forEach(node => visitedNodes.add(node));
          index++;
        }
      });
    });
  }

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('graphVisualDoer')?.addEventListener('click', function() {
        drawGraph();
    });
})