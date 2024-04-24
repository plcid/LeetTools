document.addEventListener('DOMContentLoaded', function () {

    // common child page func
    document.getElementById('backToHome')?.addEventListener('click', function () {
        window.location.href = '../main.html'
    });

    // enter graph visualizer
    document.getElementById('graphVisualizer')?.addEventListener('click', function() {
        window.location.href = 'graphVisual/graphVisual.html'
    })

    // enter matrix visualizer
    document.getElementById('matrixVisualizer')?.addEventListener('click', function () {
        window.location.href = 'matrixVisual/matrixVisual.html';
    });

    // enter linked list visualizer
    document.getElementById("lnklstVisualizer")?.addEventListener('click', function () {
        window.location.href = 'lnklstVisual/lnklstVisual.html';
    });

    // enter tree visualizer
    document.getElementById('treeVisualizer')?.addEventListener('click', function () {
        window.location.href = 'treeVisual/treeVisual.html';
        window.resizeBy(100,100);
    });
});