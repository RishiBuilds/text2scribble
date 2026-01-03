const CONFIG = {
    MOBILE_SCALE: 1,
    DESKTOP_SCALE: 0.6,
    CANVAS_SCALE: 2,
    DEBOUNCE_DELAY: 300,
    MIN_FONT_SIZE: 8,
    MAX_FONT_SIZE: 24
};

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const elements = {
    fontSelect: null,
    inkColor: null,
    fontSize: null,
    topPadding: null,
    wordSpacing: null,
    fontFile: null,
    generateBtn: null,
    textArea: null,
    page: null,
    overlay: null,
    output: null
};

let loadedCustomFont = null;

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function validateNumberInput(value, min, max, defaultValue) {
    const num = parseInt(value, 10);
    if (isNaN(num)) return defaultValue;
    return Math.max(min, Math.min(max, num));
}

function smoothlyScrollTo(hashval) {
    const target = document.querySelector(hashval);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        history.pushState(null, null, hashval);
    }
}

function showError(message) {
    alert(message);
    console.error(message);
}

function readFile(fileObj) {
    if (!fileObj) {
        showError('No file selected');
        return;
    }

    const validTypes = ['font/ttf', 'font/otf', 'font/woff', 'font/woff2', 
                        'application/x-font-ttf', 'application/x-font-otf',
                        'application/font-woff', 'application/font-woff2'];

    const fileName = fileObj.name.toLowerCase();
    const validExtensions = ['.ttf', '.otf', '.woff', '.woff2'];
    const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));
    
    if (!validTypes.includes(fileObj.type) && !hasValidExtension) {
        showError('Invalid file type. Please upload a valid font file (.ttf, .otf, .woff, .woff2)');
        return;
    }

    const reader = new FileReader();
    
    reader.onerror = () => {
        showError('Failed to read font file. Please try again.');
    };
    
    reader.onload = e => {

        if (loadedCustomFont) {
            try {
                document.fonts.delete(loadedCustomFont);
            } catch (err) {
                console.warn('Could not delete previous font:', err);
            }
        }

        const newFont = new FontFace('custom-handwriting-font', `url(${e.target.result})`);
        
        newFont.load()
            .then(loadedFace => {
                document.fonts.add(loadedFace);
                loadedCustomFont = loadedFace;
                
                if (elements.textArea) {
                    elements.textArea.style.fontFamily = 'custom-handwriting-font';
                }
            })
            .catch(err => {
                console.error('Font loading failed:', err);
                showError('Failed to load font file. Please make sure it\'s a valid font file.');
            });
    };
    
    reader.readAsDataURL(fileObj);
}

function applyPaperStyles() {
    if (!elements.page) return;
    
    if (isMobile) {
        elements.page.style.transform = `scale(${CONFIG.MOBILE_SCALE})`;
    }
}

function removePaperStyles() {
    if (!elements.overlay || !elements.page) return;
    
    elements.overlay.style.display = 'none';
    
    if (isMobile) {
        elements.page.style.transform = `scale(${CONFIG.DESKTOP_SCALE})`;
    }
}

const handleFontChange = debounce((e) => {
    if (elements.textArea && e.target.value) {
        elements.textArea.style.fontFamily = e.target.value;
    }
}, CONFIG.DEBOUNCE_DELAY);

const handleInkColorChange = debounce((e) => {
    if (elements.textArea && e.target.value) {
        elements.textArea.style.color = e.target.value;
    }
}, CONFIG.DEBOUNCE_DELAY);

const handleFontSizeChange = debounce((e) => {
    if (!elements.textArea) return;
    
    const value = validateNumberInput(
        e.target.value, 
        CONFIG.MIN_FONT_SIZE, 
        CONFIG.MAX_FONT_SIZE, 
        12
    );
    
    e.target.value = value; 
    elements.textArea.style.fontSize = value + 'pt';
}, CONFIG.DEBOUNCE_DELAY);

const handleTopPaddingChange = debounce((e) => {
    if (!elements.textArea) return;
    
    const value = validateNumberInput(e.target.value, 0, 50, 0);
    e.target.value = value;
    elements.textArea.style.paddingTop = value + 'px';
}, CONFIG.DEBOUNCE_DELAY);

const handleWordSpacingChange = debounce((e) => {
    if (!elements.textArea) return;
    
    const value = validateNumberInput(e.target.value, 0, 20, 3);
    e.target.value = value;
    elements.textArea.style.wordSpacing = value + 'px';
}, CONFIG.DEBOUNCE_DELAY);

function handleFontFileChange(e) {
    const file = e.target.files && e.target.files[0];
    if (file) {
        readFile(file);
    }
}

function handleGenerateImage(e) {
    const button = e.target;
    
    if (!elements.page || !elements.output) {
        showError('Required elements not found. Please refresh the page.');
        return;
    }

    if (typeof html2canvas === 'undefined') {
        showError('Image generation library not loaded. Please refresh the page.');
        return;
    }

    button.disabled = true;
    button.textContent = 'Generating...';
    button.setAttribute('aria-busy', 'true');

    applyPaperStyles();
    if (elements.overlay) {
        elements.overlay.style.display = 'block';
    }
    
    html2canvas(elements.page, {
        scale: CONFIG.CANVAS_SCALE,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
    })
    .then(canvas => {

        elements.output.innerHTML = '';

        const img = document.createElement('img');
        img.src = canvas.toDataURL("image/png");
        img.alt = "Generated handwriting image";
        img.loading = "eager";
        
        elements.output.appendChild(img);

        removePaperStyles();
        button.disabled = false;
        button.textContent = 'Generate Handwriting Image';
        button.removeAttribute('aria-busy');
        smoothlyScrollTo('#output');
    })
    .catch(err => {
        console.error('Image generation error:', err);
        showError("Something went wrong. Please try again.");

        removePaperStyles();
        button.disabled = false;
        button.textContent = 'Generate Handwriting Image';
        button.removeAttribute('aria-busy');
    });
}

function cacheElements() {
    elements.fontSelect = document.querySelector('#handwriting-font');
    elements.inkColor = document.querySelector('#ink-color');
    elements.fontSize = document.querySelector('#font-size');
    elements.topPadding = document.querySelector('#top-padding');
    elements.wordSpacing = document.querySelector('#word-spacing');
    elements.fontFile = document.querySelector('#font-file');
    elements.generateBtn = document.querySelector('.generate-image');
    elements.textArea = document.querySelector('.text-area');
    elements.page = document.querySelector('.page');
    elements.overlay = document.querySelector('.overlay');
    elements.output = document.querySelector('.output');
}

function attachEventListeners() {
    if (elements.fontSelect) {
        elements.fontSelect.addEventListener('change', handleFontChange);
    }
    
    if (elements.inkColor) {
        elements.inkColor.addEventListener('change', handleInkColorChange);
    }
    
    if (elements.fontSize) {
        elements.fontSize.addEventListener('input', handleFontSizeChange);
    }
    
    if (elements.topPadding) {
        elements.topPadding.addEventListener('input', handleTopPaddingChange);
    }
    
    if (elements.wordSpacing) {
        elements.wordSpacing.addEventListener('input', handleWordSpacingChange);
    }
    
    if (elements.fontFile) {
        elements.fontFile.addEventListener('change', handleFontFileChange);
    }
    
    if (elements.generateBtn) {
        elements.generateBtn.addEventListener('click', handleGenerateImage);
    }

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const hashval = link.getAttribute('href');
            if (hashval) {
                smoothlyScrollTo(hashval);
            }
        });
    });
}

function init() {

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
        return;
    }
    
    cacheElements();
    attachEventListeners();
    
    console.log('initialized successfully');
}

init();