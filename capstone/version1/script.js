const welcomeScreen = document.querySelector('#welcome-screen');
const introScreen = document.querySelector('#intro-screen');
const mainScreen = document.querySelector('#main-screen');
const startBtn = document.querySelector('#welcome-screen button');

startBtn.addEventListener('click', function(){
    welcomeScreen.style.display = 'none';
    introScreen.style.display = 'block';
    setTimeout(function(){
        introScreen.style.display = 'none';
        mainScreen.style.display = 'block';
        document.querySelector('h1').style.display = 'block';
    }, 8000); // 8 seconds
});