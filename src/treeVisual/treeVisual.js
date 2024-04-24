function constructTree() {
    const treeInput = document.getElementById('treeInput').value;
    const binaryTreeData = JSON.parse(treeInput);

    // Clear existing tree
    document.getElementById('treeContainer').innerHTML = '';

    // Construct new tree
    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'treeCanvas');
    const bodyWidth = document.body.clientWidth;
    const bodyHeight = document.body.clientHeight;
    canvas.width = bodyWidth * 0.95;
    canvas.height = bodyHeight * 0.6;
    document.getElementById('treeContainer').appendChild(canvas);
    
    const ctx = canvas.getContext('2d');

    // Start drawing the tree from the center of the canvas
    const startX = canvas.width / 2;
    const startY = 20;

    // Draw the tree
    construct(binaryTreeData, 0, 1, startX, startY, null, null, ctx);
}

function construct(data, index, level, offsetX, offsetY, parentX, parentY, ctx) {
    if (index < data.length && data[index] !== null) {
        // Calculate node coordinates
        const nodeX = offsetX;
        const nodeY = offsetY;

        // Draw connection to parent node (must do first b/c dont want overlap)
        if (parentX !== null && parentY !== null) {
            drawLine(ctx, parentX, parentY, nodeX, nodeY);
        }
        // Draw node
        drawNode(ctx, nodeX, nodeY, data[index]);

        // Calculate offsets for child nodes
        const leftOffsetX = offsetX - (200 / Math.pow(2, level));
        const rightOffsetX = offsetX + (200 / Math.pow(2, level));
        const childOffsetY = offsetY + 40;

        // Draw left child node and connect it
        construct(data, 2 * index + 1, level + 1, leftOffsetX, childOffsetY, nodeX-15, nodeY+15, ctx);

        // Draw right child node and connect it
        construct(data, 2 * index + 2, level + 1, rightOffsetX, childOffsetY, nodeX+15, nodeY+15, ctx);
    }
}

function drawNode(ctx, x, y, value) {
    // Draw node as a circle
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fillStyle = '#282828';
    ctx.fill();
    ctx.stroke();

    // Draw node value
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px Segoe-UI';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(value, x, y);
}

function drawLine(ctx, startX, startY, endX, endY) {
    // Draw line between two points
    ctx.fillStyle='#3F4947';
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

document.addEventListener('DOMContentLoaded',  function () {

    // handles tree visualization logic upon click
    document.getElementById('treeVisualDoer')?.addEventListener('click',  constructTree);

    document.getElementById('treeVisualClear')?.addEventListener('click', function (){
        document.getElementById('treeInput').value = '';
        document.getElementById('treeContainer').innerHTML = '';
    });
});