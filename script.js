(function() {
    'use strict';

    const button = document.querySelector('button');
    const body = document.querySelector('body');
    const banner = document.querySelector('#banner');
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    let mode = 'dark';

    button.addEventListener('click', function() {
        if (mode === 'dark') {
            body.className = 'switch';
            banner.className = 'switch';
            header.className = 'switch';
            main.className = 'switch';
            banner.innerHTML = '<img src="images/city-skyline-banner.png" alt="city skyline banner for mode 2">';
            button.className = 'switch';
            for (const section of sections) {
                section.className = 'switch';
            }
            mode = 'light';
        } else {
            body.removeAttribute('class');
            banner.removeAttribute('class');
            header.removeAttribute('class');
            main.removeAttribute('class');
            banner.innerHTML = '<img src="images/sunset-banner.png" alt="sunset banner for mode 1">';
            button.removeAttribute('class');
            for (const section of sections) {
                section.removeAttribute('class');
            }
            mode = 'dark'
        }
    })
})()