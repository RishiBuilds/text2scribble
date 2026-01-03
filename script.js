const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

function applyPaperStyles() {
    if (isMobile) {
        document.querySelector('.page').style.transform = 'scale(1)';
    }
}

function removePaperStyles() {
    document.querySelector('.overlay').style.display = 'none';
    if (isMobile) {
        document.querySelector('.page').style.transform = 'scale(0.6)';
    }
}

function smoothlyScrollTo(hashval) {
    let target = document.querySelector(hashval);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        history.pushState(null, null, hashval);
    }
}

document.querySelector('#handwriting-font').addEventListener('change', e => {
    document.querySelector('.text-area').style.fontFamily = e.target.value;
});

document.querySelector('#ink-color').addEventListener('change', e => {
    document.querySelector('.text-area').style.color = e.target.value;
});

document.querySelector('.generate-image').addEventListener('click', e => {
    const button = e.target;
    button.disabled = true;
    button.textContent = 'Generating...';
    
    applyPaperStyles();
    document.querySelector('.overlay').style.display = 'block';
    
    html2canvas(document.querySelector(".page"), {
        scale: 2,
        useCORS: true
    }).then(canvas => {
        document.querySelector('.output').innerHTML = '';
        const img = document.createElement('img');
        img.src = canvas.toDataURL("image/png");
        img.alt = "Generated handwriting image";
        document.querySelector('.output').appendChild(img);
        
        removePaperStyles();
        button.disabled = false;
        button.textContent = 'Generate Handwriting Image';
        smoothlyScrollTo('#output');
    }).catch(err => {
        alert("Something went wrong :(");
        console.error(err);
        removePaperStyles();
        button.disabled = false;
        button.textContent = 'Generate Handwriting Image';
    });
});

const anchorlinks = document.querySelectorAll('a[href^="#"]');
for (let item of anchorlinks) {
    item.addEventListener('click', (e) => {
        let hashval = item.getAttribute('href');
        smoothlyScrollTo(hashval);
        e.preventDefault();
    });
}
