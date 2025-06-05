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

let typedInstance = null;

// Function to show prompt content (the short intro) with typing effect
function showPromptContent(contentId, typedOptions) {
    // Hide all prompt-content divs
    for (const div of document.querySelectorAll('.prompt-content')) {
        div.style.display = 'none';
        for (const p of document.querySelectorAll('.short-intro')) {
            
        }
        if (p) p.textContent = '';
    };

    const contentDiv = document.querySelector(contentId);
    if (contentDiv) {
        contentDiv.style.display = 'flex';
        const p = contentDiv.querySelector('.short-intro');
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

// Function to hide prompt content and reset the text
function hidePromptContent(contentId) {
    const contentDiv = document.querySelector(contentId);
    const p = contentDiv.querySelector('.short-intro');
    if (p) p.textContent = '';
    
    if (typedInstance) {
        typedInstance.destroy();
        typedInstance = null;
    }
}

// Function to show options after the short intro
function showOptions(contentId) {
    const contentDiv = document.querySelector(contentId);
    const optionsPrompt = document.querySelector('.options');
    const option1 = contentDiv.querySelector('.option1');
    const option2 = document.querySelector('.option2');

    optionsPrompt.style.display = 'block';

    option1.addEventListener('click', function() {
        
    });
    option2.addEventListener('click', function() {

    });
}

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
            setTimeout(function(){
                hidePromptContent('#notebook-contents');
                showOptions('#notebook-contents');
            }, 5000)
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

// Close prompt box when pressing Escape
document.querySelector('#close-overlay-btn').addEventListener('click', function() {
    document.querySelector('#user-test-overlay').style.display = 'none';
});

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

// Prompt box close button functionality
document.querySelector('#prompt-close-btn').addEventListener('click', function() {
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
});