function drawMatrixByInput() {
    try {
        var matrixInput = document.getElementById('matrixInput').value.trim();
        var matrixData = JSON.parse(matrixInput); // Parse the input string to a JavaScript array

        var matrixContainer = document.getElementById('matrixContainer');
        matrixContainer.innerHTML = ''; // Clear previous matrix

        for (let i = 0; i < matrixData.length; i++) {
            const row = matrixData[i];
            for (let j = 0; j < row.length; j++) {
                const cell = row[j];
                const node = document.createElement('div');
                node.classList.add('node');
                node.textContent = cell;
                node.addEventListener('click', function() {
                    document.getElementById("statusmsg").innerHTML = "Selected: Row " + (i) + ", Column " + (j);
                                
                    node.style.color = '#000';
                    node.style.backgroundColor = '#fff';
                })
                matrixContainer.appendChild(node);
            }
            matrixContainer.appendChild(document.createElement('br')); // Add line break after each row
        }

        // (re)init
        document.getElementById("statusmsg").innerHTML = '';
    }
    catch {
        document.getElementById('statusmsg').innerHTML = 'Invalid Input!';
    }
}

document.addEventListener('DOMContentLoaded',  function () {

    // handles matrix visualization logic upon click
    document.getElementById('matrixVisualDoer')?.addEventListener('click',  drawMatrixByInput);

    // same function as above bc redrawing completely gets rid of highlighted pieces
    document.getElementById('matrixVisualReset')?.addEventListener('click', drawMatrixByInput);

    // just clears everything
    document.getElementById('matrixVisualClear')?.addEventListener('click', function() {
        document.getElementById('matrixInput').value = '';
        document.getElementById('statusmsg').innerHTML = '';
        document.getElementById('matrixContainer').innerHTML = '';
    });
});