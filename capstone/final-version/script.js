// ========== DOM Elements ==========
const welcomeScreen = document.querySelector('#welcome-screen');
const introScreen = document.querySelector('#intro-screen');
const mainScreen = document.querySelector('#main-screen');
const startBtn = document.querySelector('#welcome-screen button');
const directionTip = document.querySelector('#direction-tip');
const promptBox = document.querySelector('#prompt-box');
const interactiveItems = document.querySelectorAll('.clickable-icon');

// ========== Global Variables ==========
let typedInstance = null;
let optionsTimeoutId = null;

// ========== Welcome Screen Functionality ==========
startBtn.addEventListener('click', function(){
    welcomeScreen.style.display = 'none';
    introScreen.style.display = 'block';
    setTimeout(function(){
        introScreen.style.display = 'none';
        mainScreen.style.display = 'block';
        document.querySelector('h1').style.display = 'block';
        directionTip.style.display = 'block';
    }, 8000); //8 seconds
    //1 second for now for me to get to the main screen faster
});

// ========== Prompt Content Management ==========
function showPromptContent(contentId, typedOptions) {
    // Clear any existing timeouts
    if (optionsTimeoutId) {
        clearTimeout(optionsTimeoutId);
        optionsTimeoutId = null;
    }

    // Hide all existing content
    for (const div of document.querySelectorAll('.prompt-content')) {
        div.style.display = 'none';
    }
    
    for (const shortIntroP of document.querySelectorAll('.short-intro')) {
        if (shortIntroP){
            shortIntroP.textContent = '';
        }
    }

    for (const optionsContainer of document.querySelectorAll('.options')) {
        if (optionsContainer) {
            optionsContainer.style.display = 'none';
        }
    }

    for (const contentBubble of document.querySelectorAll('.content-bubble')) {
        if (contentBubble) {
            contentBubble.style.display = 'none';
        }
    }

    // Show new content
    const contentDiv = document.querySelector(contentId);
    if (contentDiv) {
        contentDiv.style.display = 'flex';
        const shortIntroP = contentDiv.querySelector('.short-intro');
        if (shortIntroP) {
            if (typedInstance) {
                typedInstance.destroy();
            }
            typedInstance = new Typed(`#${shortIntroP.id}`, typedOptions);
        }
    }
    promptBox.style.display = 'block';
}

function hidePromptContent(contentId) {
    const contentDiv = document.querySelector(contentId);
    const shortIntroP = contentDiv.querySelector('.short-intro');
    if (shortIntroP) {
        shortIntroP.textContent = ''
    };
    
    if (typedInstance) {
        typedInstance.destroy();
        typedInstance = null;
    }
    if (optionsTimeoutId) {
        clearTimeout(optionsTimeoutId);
        optionsTimeoutId = null;
    }
}

// ========== Options Management ==========
function showOptions(contentId) {
    const contentDiv = document.querySelector(contentId);
    const optionsContainer = contentDiv.querySelector('.options');
    if (optionsContainer) {
        optionsContainer.style.display = 'flex';
    }    
}

function showFutureContent(contentId) {
    const contentDiv = document.querySelector(contentId);
    const option1 = contentDiv.querySelector('.option1');
    const option2 = contentDiv.querySelector('.option2');
    const bubbleAndContent = document.querySelector('.content-bubble-and-contents');
    const contentBubble = document.querySelector('.content-bubble');
    
    // Get the object name directly from the contentId ('#notebook-contents' to 'notebook')
    const objectName = contentId.replace('#', '').replace('-contents', '');
    
    const utopiaFuture = bubbleAndContent.querySelector(`#${objectName}-utopia`);
    const dystopiaFuture = bubbleAndContent.querySelector(`#${objectName}-dystopia`);
    const utopiaFutureImg = bubbleAndContent.querySelector(`#${objectName}-utopia img`);
    const dystopiaFutureImg = bubbleAndContent.querySelector(`#${objectName}-dystopia img`);

    // Hide all futures first
    if (bubbleAndContent) {
        bubbleAndContent.style.display = 'none';
    }
    if (utopiaFuture) {
        utopiaFuture.style.display = 'none';
    }
    if (dystopiaFuture) {
        dystopiaFuture.style.display = 'none';
    }

    // Utopia option handler
    option1.addEventListener('click', function() {
        if (utopiaFuture) {
            utopiaFuture.style.display = 'none';
        }
        if (dystopiaFuture) {
            dystopiaFuture.style.display = 'none';
        }
        bubbleAndContent.style.display = 'block';
        contentBubble.style.display = 'block';
        if (utopiaFuture) {
            utopiaFuture.style.display = 'block';
        }
        if (utopiaFutureImg) {
            utopiaFutureImg.style.display = 'block';
        }
    });

    // Dystopia option handler
    option2.addEventListener('click', function() {
        if (utopiaFuture) {
            utopiaFuture.style.display = 'none';
        }
        if (dystopiaFuture) {
            dystopiaFuture.style.display = 'none';
        }
        bubbleAndContent.style.display = 'block';
        contentBubble.style.display = 'block';
        if (dystopiaFuture) {
            dystopiaFuture.style.display = 'block';
        }
        if (dystopiaFutureImg) {
            dystopiaFutureImg.style.display = 'block';
        }
    });
}

// ========== Interactive Items Event Handlers ==========
for (const item of interactiveItems) {
    item.addEventListener('click', function () {
        // Hide direction tip
        directionTip.style.animation = 'none';
        directionTip.style.opacity = 0;
        directionTip.style.display = 'none';

        // Reset all items to default state
        for (const otherItem of interactiveItems) {
            otherItem.className = 'clickable-icon icon';
        }
        
        // Set clicked item to active state
        this.className = 'clickable-icon icon active';

        if (this.id === 'notebook') {
            showPromptContent('#notebook-contents', {
                strings: [
                    "You have some rough ideas for a new client project, but you're short on time. You open your notebook to start organizing your thoughts. A prompt appears asking how you'd like to proceed..."
                ],
                typeSpeed: 10,
                showCursor: false
            })
            optionsTimeoutId = setTimeout(function(){
                hidePromptContent('#notebook-contents');
                showOptions('#notebook-contents');
                showFutureContent('#notebook-contents');
            }, 5000)
            
        } else if (this.id === 'calendar') {
            showPromptContent('#calendar-contents', {
                strings: ["You've been meaning to build your skills, but you can't decide how to spend your time next month. Your calendar's open. A reminder pings..."],
                typeSpeed: 10,
                showCursor: false
            })
            optionsTimeoutId = setTimeout(function(){
                hidePromptContent('#calendar-contents');
                showOptions('#calendar-contents');
                showFutureContent('#calendar-contents');
            }, 5000)

        } else if (this.id === 'phone') {
            showPromptContent('#phone-contents', {
                strings: ["You just got a message from a new client. It's vague, rushed, and includes an AI-generated project brief. You're tempted to just say yes and move on, but..."],
                typeSpeed: 10,
                showCursor: false
            })
            optionsTimeoutId = setTimeout(function(){
                hidePromptContent('#phone-contents');
                showOptions('#phone-contents');
                showFutureContent('#phone-contents');
            }, 5000)
            
        } else if (this.id === 'postit') {
            showPromptContent('#postit-contents', {
                strings: ["You sit down to write some career goals. Your AI assistant suggests starting with templates based on market demand. You hesitate — do you let it help?"],
                typeSpeed: 10,
                showCursor: false
            })
            optionsTimeoutId = setTimeout(function(){
                hidePromptContent('#postit-contents');
                showOptions('#postit-contents');
                showFutureContent('#postit-contents');
            }, 5000)
        }
    });
}

// ========== Close Functionality ==========
function closePromptBox(){
    document.addEventListener('keydown', function(e){
        if (e.key === 'Escape'){
            promptBox.style.display = 'none';
            if (typedInstance) {
                typedInstance.destroy();
                typedInstance = null;
            }
            if (optionsTimeoutId) {
                clearTimeout(optionsTimeoutId);
                optionsTimeoutId = null;
            }
            
            // Reset all items to default state
            for (const item of interactiveItems) {
                item.className = 'clickable-icon icon';
            }
            
            // Hide all content inside content-bubble-and-contents
            const bubbleAndContent = document.querySelector('.content-bubble-and-contents');
            if (bubbleAndContent) {
                bubbleAndContent.style.display = 'none';
            }
            
            directionTip.style.display = 'block';
            directionTip.style.opacity = 1;
            directionTip.style.animation = '';
        }        
    });
}

closePromptBox();

// Close button functionality
document.querySelector('#prompt-close-btn').addEventListener('click', function() {
    promptBox.style.display = 'none';
    if (typedInstance) {
        typedInstance.destroy();
        typedInstance = null;
    }
    
    // Reset all items to default state
    for (const item of interactiveItems) {
        item.className = 'clickable-icon icon';
    }
    
    directionTip.style.display = 'block';
    directionTip.style.opacity = 1;
    directionTip.style.animation = '';

    // Hide all content inside content-bubble-and-contents
    const bubbleAndContent = document.querySelector('.content-bubble-and-contents');
    if (bubbleAndContent) {
        bubbleAndContent.style.display = 'none';
    }
});