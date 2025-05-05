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

const quotes = Array.from(document.querySelectorAll('#quotes span'));
const quote = document.querySelector('#quote');
const generateButton = document.querySelector('#btn');

function generateRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex].textContent;
    quote.innerHTML = '';

    new Typed(quote, {
        strings: [randomQuote],
        typeSpeed: 30,
        showCursor: false
    });
};

generateButton.addEventListener('click', generateRandomQuote);

