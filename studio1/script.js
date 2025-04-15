(function(){
    'use strict';
    console.log('reading JS');

    // const fs = document.querySelector('.fa-expand-alt');
    // fs.addEventListener('click', function(){
    //     if (!document.fullscreenElement){
    //         document.documentElement.requestFullscreen();
    //     } else {
    //         document.exitFullscreen();
    //     }
    // });
    
    const video = document.querySelector('#myVideo');
    // const overlaySection = document.querySelector('#overlaySection');
    const overlayText = document.querySelector('#overlayText');
    // const overlayImage = document.querySelector('#overlayImage');
    const intervalID = setInterval(checkTime, 1000);

    function checkTime() {
        if (video.currentTime >= 1 && video.currentTime <= 8) {
            overlayText.className = 'showing';
        } else {
            overlayText.className = 'hidden';
        }
    }

    const loadingMsg = document.querySelector('#loading-msg');
    video.addEventListener('play', function(){
        loadingMsg.style.display = 'none';
    });

})();