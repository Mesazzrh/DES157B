const grid = document.querySelector('#grid');

function generateGrid() {
    const size = 50;
    const cols = Math.ceil(window.innerWidth / size);
    const rows = Math.ceil(window.innerHeight / size);
    const total = cols * rows;

    let html = '';
    for (let i = 0; i < total; i++) {
        html += '<div class="grid-cell"></div>';
    }
    grid.innerHTML = html;
}

generateGrid();

let resizeTimer;
window.addEventListener('resize', function(){
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(generateGrid, 100);
});
