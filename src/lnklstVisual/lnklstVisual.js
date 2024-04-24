class ListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
  
function createLinkedList() {
    try {
        const inputText = document.getElementById('lnklstInput').value.trim();
        const inputArray = JSON.parse(inputText);
    
        const linkedListDiv = document.getElementById('lnklstContainer');
        linkedListDiv.innerHTML = ''; // Clear existing content

        for (let i = 0; i < inputArray.length; i++) {

            const node = new ListNode(inputArray[i]);
            const nodeDiv = document.createElement('div');
            nodeDiv.className = 'node';
            nodeDiv.textContent = node.value;
            nodeDiv.addEventListener('click', function() {
                nodeDiv.style.color = '#000';
                nodeDiv.style.backgroundColor = '#fff';
                document.getElementById('statusmsg').innerHTML = 'Selected Node: ' + i;
            });

            linkedListDiv.appendChild(nodeDiv);

            if (i+1<inputArray.length) { // if isnt last node
                const arrowDiv = document.createElement('div');
                arrowDiv.className = 'arrow';
                linkedListDiv.appendChild(arrowDiv);
            }
        }

        // (re)init
        document.getElementById("statusmsg").innerHTML = '';
    }
    catch {
        document.getElementById('statusmsg').innerHTML = 'Invalid Input!';
    }
}
  

document.addEventListener('DOMContentLoaded',  function () {
    // handles lnklst visualization logic upon click
    document.getElementById('lnklstVisualDoer')?.addEventListener('click',  createLinkedList);
    // same function as above bc redrawing completely gets rid of highlighted pieces
    document.getElementById('lnklstVisualReset')?.addEventListener('click', createLinkedList);
    // just clears everything
    document.getElementById('lnklstVisualClear')?.addEventListener('click', function() {
        document.getElementById('lnklstInput').value = '';
        document.getElementById('statusmsg').innerHTML = '';
        document.getElementById('lnklstContainer').innerHTML = '';
    });
});