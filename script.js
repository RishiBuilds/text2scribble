document.querySelector('#handwriting-font').addEventListener('change', e => {
    document.querySelector('.paper').style.fontFamily = e.target.value;
});

document.querySelector('#ink-color').addEventListener('change', e => {
    document.querySelector('.paper').style.color = e.target.value;
});

document.querySelector('.generate-image').addEventListener('click', e => {
    const button = e.target;
    button.disabled = true;
    button.textContent = 'Generating...';
    
    document.querySelector('.overlay').style.display = 'block';
    document.querySelector('.paper').classList.remove('paper-holder');
    
    html2canvas(document.querySelector(".page"), {
        scale: 2,
        useCORS: true
    }).then(canvas => {
        document.querySelector('.output').innerHTML = '';
        const img = document.createElement('img');
        img.src = canvas.toDataURL("image/png");
        img.alt = "Generated handwriting image";
        document.querySelector('.output').appendChild(img);
        document.querySelector('.paper').classList.add('paper-holder');
        document.querySelector('.overlay').style.display = 'none';
        button.disabled = false;
        button.textContent = 'Generate Handwriting Image';
        location.href = '#output';
    });
});
