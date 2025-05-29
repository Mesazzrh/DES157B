const welcomeScreen = document.querySelector('#welcome-screen');
const introScreen = document.querySelector('#intro-screen');
const mainScreen = document.querySelector('#main-screen');
const startBtn = document.querySelector('#welcome-screen button');
const directionTip = document.querySelector('#direction-tip');
const promptBox = document.querySelector('#prompt-box');
const interactiveItems = document.querySelectorAll('.clickable-icon');

startBtn.addEventListener('click', function(){
    welcomeScreen.style.display = 'none';
    introScreen.style.display = 'block';
    setTimeout(function(){
        introScreen.style.display = 'none';
        mainScreen.style.display = 'block';
        document.querySelector('h1').style.display = 'block';

        directionTip.style.display = 'block';
    }, 1000); //8 seconds
    //1 second for now for me to get to the main screen faster
});

for (const item of interactiveItems) {
    item.addEventListener('click', function () {
        // Hide direction tip
        directionTip.style.animation = 'none';
        directionTip.style.opacity = 0;
        directionTip.style.display = 'none';

        for (let i = 0; i < interactiveItems.length; i++) {
            interactiveItems[i].style.filter = 'drop-shadow(10px 10px 0px rgba(0, 0, 0, 0.5))'
        }
        
        item.style.filter = 'drop-shadow(0 0 10px rgb(255, 255, 255))'

        if (item.id === 'notebook') {
            showPromptContent('#notebook-contents', {
                strings: [
                    "You have some rough ideas for a new client project, but you're short on time. You open your notebook to start organizing your thoughts. A prompt appears asking how you'd like to proceed..."
                ],
                typeSpeed: 10,
                showCursor: false
            })
        } else if (item.id === 'calendar') {
            showPromptContent('#calendar-contents', {
                strings: ["Still under construction!"],
                typeSpeed: 10,
                showCursor: false
            })
        } else if (item.id === 'phone') {
            showPromptContent('#phone-contents', {
                strings: ["Still under construction!"],
                typeSpeed: 10,
                showCursor: false
            })
        } else if (item.id === 'postit') {
            showPromptContent('#postit-contents', {
                strings: ["Still under construction!"],
                typeSpeed: 10,
                showCursor: false
            })
        }
    });
}

document.querySelector('#close-overlay-btn').addEventListener('click', function() {
    document.querySelector('#user-test-overlay').style.display = 'none';
});

let typedInstance = null;

function showPromptContent(contentId, typedOptions) {
    // Hide all prompt-content divs
    for (const div of document.querySelectorAll('.prompt-content')) {
        div.style.display = 'none';
        const p = div.querySelector('p');
        if (p) p.textContent = '';
    };

    const contentDiv = document.querySelector(contentId);
    if (contentDiv) {
        contentDiv.style.display = 'block';
        const p = contentDiv.querySelector('p');
        if (p) {
            if (typedInstance) {
                typedInstance.destroy();
            }
            typedInstance = new Typed(`#${p.id}`, typedOptions);
        }
    }
    // Show the prompt box
    promptBox.style.display = 'block';
}

function closePromptBox(){
    // document.addEventListener('click', function(e) {
    //     if (promptBox.style.display === 'block' && !promptBox.contains(e.target)){
    //         promptBox.style.display = 'none';
    //         if (typedInstance) {
    //             typedInstance.destroy();
    //             typedInstance = null;
    //         }
    //         for (let i = 0; i < interactiveItems.length; i++) {
    //             interactiveItems[i].style.filter = 'drop-shadow(10px 10px 0px rgba(0, 0, 0, 0.5))';
    //         }

            
    //         directionTip.style.display = 'block';
    //         directionTip.style.opacity = 1;
    //         directionTip.style.animation = '';
    //     }
    // });

    document.addEventListener('keydown', function(e){
        if (e.key === 'Escape'){
            promptBox.style.display = 'none';
            if (typedInstance) {
                typedInstance.destroy();
                typedInstance = null;
            }
            for (let i = 0; i < interactiveItems.length; i++) {
                interactiveItems[i].style.filter = 'drop-shadow(10px 10px 0px rgba(0, 0, 0, 0.5))';
            }
            
            directionTip.style.display = 'block';
            directionTip.style.opacity = 1;
            directionTip.style.animation = '';
        }        
    });
};

closePromptBox();