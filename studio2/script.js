async function fetchJson() {
    const response = await fetch('data.json');
    const data = await response.json();
    const overlay = document.querySelector('#detail-overlay');
    const dots = document.querySelectorAll('.dot');

    for (let i = 0; i < dots.length; i++){
        const dot = dots[i];
        if (dot.id === `dot${i+1}`){
            dot.addEventListener('click', function(){
                const entry = data[i];

                document.querySelector('#overlay-time').textContent = entry.time + ' PM';
                document.querySelector('#overlay-score').textContent = entry['mood-score'];
                document.querySelector('#overlay-mood').textContent = entry.mood;
                document.querySelector('#overlay-reason').textContent = entry.reason;

                const dotRect = dot.getBoundingClientRect();
                const overlayRect = overlay.getBoundingClientRect();
                console.log(dotRect, overlayRect);
        
                const margin = 10;
                overlay.style.top = `${dotRect.top - overlayRect.height - margin}px`;
                overlay.style.left = `${dotRect.left + dotRect.width/2 - overlayRect.width/2}px`;
                console.log(overlay.style.top, overlay.style.left);

                overlay.style.opacity = '1';
                overlay.style.transform = 'scale(1)';
            });
        }
    }
}

fetchJson();

const closeBtn = document.querySelector('#detail-overlay .close-btn');
if (closeBtn){
    closeBtn.addEventListener('click', function(){
        document.querySelector('#detail-overlay').style.opacity = '0';
        document.querySelector('#detail-overlay').style.transform = 'scale(0)';
    });
}

