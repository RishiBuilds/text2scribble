const CONFIG = {
    CANVAS_SCALE: 2,
    DEBOUNCE_DELAY: 200,
    MIN_FONT_SIZE: 8,
    MAX_FONT_SIZE: 30,
    DEFAULT_FONT_SIZE: 10,
    DEFAULT_LINE_HEIGHT: 24,
    DEFAULT_WORD_SPACING: 0,
    DEFAULT_LETTER_SPACING: 0,
    DEFAULT_VERTICAL_POSITION: 12,
    DEFAULT_INK_COLOR: '#000F55',
    DEFAULT_FONT: "'Homemade Apple', cursive",
    TOAST_DURATION: 3000,
    MAX_UNDO_HISTORY: 50,
    MAX_PREVIEW_CHARS: 8000,
    VARIATION_SEED_LENGTH: 50
};

// Font-specific configurations
const FONT_CONFIGS = {
    "'Homemade Apple', cursive": { fontSize: 10, verticalPosition: 12, baselineAdjust: 0 },
    "'Liu Jian Mao Cao', cursive": { fontSize: 14, verticalPosition: 8, baselineAdjust: 2 },
    "'Long Cang', cursive": { fontSize: 15, verticalPosition: 10, baselineAdjust: 1 },
    "'Caveat', cursive": { fontSize: 15, verticalPosition: 10, baselineAdjust: 0 }
};

// Scribble style presets with variation parameters
const SCRIBBLE_STYLES = {
    'clean-doodle': {
        name: 'Clean Doodle',
        description: 'Neat and legible handwriting with minimal variation',
        rotation: { min: -0.3, max: 0.3 },
        translateY: { min: -0.5, max: 0.5 },
        translateX: { min: -0.2, max: 0.2 },
        scale: { min: 0.99, max: 1.01 },
        letterSpacingBonus: 0,
        inkIntensity: 1.0,
        textShadow: 'none',
        characterWobble: false,
        pressureVariation: { min: 0.95, max: 1.05 }
    },
    'rough-sketch': {
        name: 'Rough Sketch',
        description: 'Quick, energetic strokes with visible imperfections',
        rotation: { min: -2, max: 2 },
        translateY: { min: -2, max: 2 },
        translateX: { min: -1, max: 1 },
        scale: { min: 0.95, max: 1.05 },
        letterSpacingBonus: -0.3,
        inkIntensity: 0.85,
        textShadow: '1px 1px 2px rgba(0,0,0,0.15)',
        characterWobble: true,
        pressureVariation: { min: 0.8, max: 1.2 }
    },
    'artistic': {
        name: 'Artistic Scribble',
        description: 'Elegant, flowing handwriting with artistic flair',
        rotation: { min: -1, max: 1 },
        translateY: { min: -1.2, max: 1.2 },
        translateX: { min: -0.5, max: 0.5 },
        scale: { min: 0.97, max: 1.03 },
        letterSpacingBonus: 0.3,
        inkIntensity: 1.1,
        textShadow: '0.5px 0.5px 1px rgba(0,15,85,0.25)',
        characterWobble: false,
        pressureVariation: { min: 0.85, max: 1.15 }
    },
    'childlike': {
        name: 'Child-like Scribble',
        description: 'Playful, irregular handwriting with larger variations',
        rotation: { min: -4, max: 4 },
        translateY: { min: -3, max: 3 },
        translateX: { min: -2, max: 2 },
        scale: { min: 0.9, max: 1.1 },
        letterSpacingBonus: 1.5,
        inkIntensity: 0.9,
        textShadow: '1px 1px 0px rgba(0,0,0,0.08)',
        characterWobble: true,
        pressureVariation: { min: 0.7, max: 1.3 }
    }
};

// Stroke density configurations
const STROKE_DENSITIES = {
    'light': {
        inkOpacity: 0.75,
        strokeWidth: 0.9,
        shadowIntensity: 0.5
    },
    'medium': {
        inkOpacity: 1.0,
        strokeWidth: 1.0,
        shadowIntensity: 1.0
    },
    'heavy': {
        inkOpacity: 1.0,
        strokeWidth: 1.15,
        shadowIntensity: 1.5
    }
};

// Language detection patterns and configurations
const LANGUAGE_CONFIGS = {
    'en': { direction: 'ltr', fontFallback: 'cursive' },
    'zh': { direction: 'ltr', fontFallback: '"Noto Sans SC", sans-serif' },
    'ar': { direction: 'rtl', fontFallback: '"Noto Sans Arabic", sans-serif' },
    'he': { direction: 'rtl', fontFallback: '"Noto Sans Hebrew", sans-serif' },
    'hi': { direction: 'ltr', fontFallback: '"Noto Sans Devanagari", sans-serif' },
    'ja': { direction: 'ltr', fontFallback: '"Noto Serif JP", serif' },
    'ko': { direction: 'ltr', fontFallback: '"Noto Sans KR", sans-serif' }
};

// Application state
const state = {
    currentFont: CONFIG.DEFAULT_FONT,
    customFontLoaded: null,
    inkColor: CONFIG.DEFAULT_INK_COLOR,
    customInkColor: CONFIG.DEFAULT_INK_COLOR,
    fontSize: CONFIG.DEFAULT_FONT_SIZE,
    lineHeight: CONFIG.DEFAULT_LINE_HEIGHT,
    wordSpacing: CONFIG.DEFAULT_WORD_SPACING,
    letterSpacing: CONFIG.DEFAULT_LETTER_SPACING,
    verticalPosition: CONFIG.DEFAULT_VERTICAL_POSITION,
    paperStyle: 'ruled',
    showLeftMargin: true,
    showLines: true,
    textVariation: true,
    inkEffect: true,
    resolution: 'normal',
    effect: 'shadows',
    pageSize: 'a4',
    customPaperImage: null,
    generatedPages: [],
    nextPageId: 1,

    scribbleStyle: 'clean-doodle',
    strokeDensity: 'medium',
    randomnessLevel: 50,
    adaptiveMode: true,
    detectedLanguage: 'en',

    undoHistory: [],
    redoHistory: [],
    lastSavedText: '',

    lastRenderTime: 0,
    isRendering: false
};

const elements = {
    fontSelect: null,
    fontFile: null,
    fontFileName: null,
    inkColorSelect: null,
    customInkColor: null,
    customColorGroup: null,
    fontSize: null,
    verticalPosition: null,
    wordSpacing: null,
    letterSpacing: null,
    marginToggle: null,
    marginStatus: null,
    linesToggle: null,
    linesStatus: null,
    pageSize: null,
    effectsSelect: null,
    resolution: null,
    paperImage: null,
    paperImageName: null,
    scribbleStyle: null,
    strokeDensity: null,
    randomnessLevel: null,
    randomnessValue: null,
    adaptiveMode: null,
    styleDescription: null,

    textInput: null,
    paper: null,
    paperContent: null,
    paperMarginLeft: null,
    contentRuledLines: null,

    charCount: null,
    wordCount: null,
    lineCount: null,

    generateBtn: null,
    downloadBtn: null,
    clearAllBtn: null,

    outputSection: null,
    outputPages: null,
    pageCount: null,

    toastContainer: null
};

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

function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function validateNumber(value, min, max, defaultValue) {
    const num = parseFloat(value);
    if (isNaN(num)) return defaultValue;
    return Math.max(min, Math.min(max, num));
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash);
}

function seededRandom(seed) {
    let currentSeed = seed;
    return function () {
        currentSeed = (currentSeed * 1103515245 + 12345) & 0x7fffffff;
        return currentSeed / 0x7fffffff;
    };
}

function getVariation(rng, intensity, min, max) {
    const normalizedIntensity = intensity / 100; // Convert 0-100 to 0-1
    const midpoint = (min + max) / 2;
    const range = (max - min) / 2;
    const variation = (rng() - 0.5) * 2 * normalizedIntensity * range;
    return midpoint + variation;
}

function detectLanguage(text) {
    if (!text || text.length === 0) return 'en';

    if (/[\u4e00-\u9fff]/.test(text)) return 'zh'; // Chinese
    if (/[\u0600-\u06FF\u0750-\u077F]/.test(text)) return 'ar'; // Arabic
    if (/[\u0590-\u05FF]/.test(text)) return 'he'; // Hebrew
    if (/[\u0900-\u097F]/.test(text)) return 'hi'; // Hindi/Devanagari
    if (/[\u3040-\u309F\u30A0-\u30FF]/.test(text)) return 'ja'; // Japanese
    if (/[\uAC00-\uD7AF]/.test(text)) return 'ko'; // Korean

    return 'en';
}

function getTextDirection(text) {
    const lang = detectLanguage(text);
    return LANGUAGE_CONFIGS[lang]?.direction || 'ltr';
}

function calculateTextComplexity(text) {
    if (!text || !text.trim()) {
        return { wordCount: 0, avgWordLength: 0, paragraphCount: 0, complexity: 'empty' };
    }

    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    const totalLength = words.reduce((sum, w) => sum + w.length, 0);
    const avgWordLength = wordCount > 0 ? totalLength / wordCount : 0;
    const paragraphCount = text.split(/\n\n+/).filter(p => p.trim()).length;

    let complexity;
    if (wordCount === 0) complexity = 'empty';
    else if (wordCount < 15) complexity = 'simple';
    else if (wordCount < 80) complexity = 'moderate';
    else if (wordCount < 300) complexity = 'detailed';
    else complexity = 'complex';

    return { wordCount, avgWordLength, paragraphCount, complexity };
}

function getAdaptiveSettings(complexity) {
    if (!state.adaptiveMode) {
        return { variationMultiplier: 1.0, letterSpacingBonus: 0, lineHeightMultiplier: 1.0 };
    }

    switch (complexity.complexity) {
        case 'empty':
        case 'simple':
            return {
                variationMultiplier: 1.4,
                letterSpacingBonus: 0.8,
                lineHeightMultiplier: 1.05
            };
        case 'moderate':
            return {
                variationMultiplier: 1.0,
                letterSpacingBonus: 0,
                lineHeightMultiplier: 1.0
            };
        case 'detailed':
            return {
                variationMultiplier: 0.7,
                letterSpacingBonus: -0.2,
                lineHeightMultiplier: 0.98
            };
        case 'complex':
            return {
                variationMultiplier: 0.5,
                letterSpacingBonus: -0.3,
                lineHeightMultiplier: 0.95
            };
        default:
            return { variationMultiplier: 1.0, letterSpacingBonus: 0, lineHeightMultiplier: 1.0 };
    }
}

function normalizeWhitespace(text) {
    return text.replace(/\t/g, '    ');
}

function hasEmojis(text) {
    const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F1E0}-\u{1F1FF}]/gu;
    return emojiRegex.test(text);
}

function getEmojiFallbackFont() {
    return '"Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif';
}

function textToHandwriting(text) {
    if (!text || !text.trim()) {
        return '<span class="handwriting-placeholder">Your handwritten text will appear here...</span>';
    }

    const normalizedText = normalizeWhitespace(text);
    const complexity = calculateTextComplexity(normalizedText);
    const adaptiveSettings = getAdaptiveSettings(complexity);
    const style = SCRIBBLE_STYLES[state.scribbleStyle] || SCRIBBLE_STYLES['clean-doodle'];
    const density = STROKE_DENSITIES[state.strokeDensity] || STROKE_DENSITIES['medium'];
    const seed = hashString(normalizedText.substring(0, CONFIG.VARIATION_SEED_LENGTH));
    const rng = seededRandom(seed);

    const effectiveRandomness = state.randomnessLevel * adaptiveSettings.variationMultiplier;

    const paragraphs = normalizedText.split(/\n\n+/);

    return paragraphs.map((para, pIndex) => {
        const lines = para.split(/\n/);

        const processedLines = lines.map((line, lIndex) => {
            const words = line.split(/(\s+)/);

            return words.map((word, wIndex) => {
                if (word.match(/^\s+$/)) {
                    return word;
                }

                if (word.length === 0) return '';

                const rotation = getVariation(rng, effectiveRandomness, style.rotation.min, style.rotation.max);
                const translateY = getVariation(rng, effectiveRandomness, style.translateY.min, style.translateY.max);
                const translateX = getVariation(rng, effectiveRandomness, style.translateX.min, style.translateX.max);
                const scale = getVariation(rng, effectiveRandomness, style.scale.min, style.scale.max);

                const pressure = getVariation(rng, effectiveRandomness,
                    style.pressureVariation.min, style.pressureVariation.max);
                const opacity = Math.min(1, density.inkOpacity * pressure * style.inkIntensity);

                const transform = `rotate(${rotation.toFixed(3)}deg) translate(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px) scale(${scale.toFixed(4)})`;

                let wordStyle = `transform: ${transform}; opacity: ${opacity.toFixed(3)};`;

                if (style.textShadow && style.textShadow !== 'none') {
                    wordStyle += ` text-shadow: ${style.textShadow};`;
                }

                if (style.characterWobble && effectiveRandomness > 30) {
                    return renderWobblyWord(word, wIndex, rng, effectiveRandomness, style, opacity);
                }

                return `<span class="handwriting-word" style="${wordStyle}" data-index="${wIndex}">${escapeHtml(word)}</span>`;
            }).join('');
        }).join('<br>');

        return `<p class="handwriting-para" data-para="${pIndex}">${processedLines}</p>`;
    }).join('');
}

function renderWobblyWord(word, wordIndex, rng, randomness, style, baseOpacity) {
    const chars = word.split('');
    const wobbledChars = chars.map((char, cIndex) => {
        const charRotation = getVariation(rng, randomness * 0.7, style.rotation.min * 0.5, style.rotation.max * 0.5);
        const charTranslateY = getVariation(rng, randomness * 0.5, -1, 1);
        const charScale = getVariation(rng, randomness * 0.3, 0.95, 1.05);

        const transform = `rotate(${charRotation.toFixed(2)}deg) translateY(${charTranslateY.toFixed(2)}px) scale(${charScale.toFixed(3)})`;

        return `<span class="handwriting-char" style="display:inline-block; transform:${transform};">${escapeHtml(char)}</span>`;
    }).join('');

    const wordRotation = getVariation(rng, randomness * 0.5, style.rotation.min * 0.3, style.rotation.max * 0.3);
    const wordStyle = `transform: rotate(${wordRotation.toFixed(2)}deg); opacity: ${baseOpacity.toFixed(3)};`;

    return `<span class="handwriting-word wobbled" style="${wordStyle}" data-index="${wordIndex}">${wobbledChars}</span>`;
}

function showToast(message, type = 'success') {
    if (!elements.toastContainer) {
        elements.toastContainer = document.getElementById('toast-container');
    }

    const existingToast = elements.toastContainer?.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    if (elements.toastContainer) {
        elements.toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, CONFIG.TOAST_DURATION);
    } else {
        console.log(`[${type.toUpperCase()}] ${message}`);
    }
}

function updateStats() {
    const text = elements.textInput?.value || '';

    const charCount = text.length;
    if (elements.charCount) {
        elements.charCount.textContent = charCount.toLocaleString();
    }

    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    if (elements.wordCount) {
        elements.wordCount.textContent = wordCount.toLocaleString();
    }

    const lineCount = text ? text.split('\n').length : 0;
    if (elements.lineCount) {
        elements.lineCount.textContent = lineCount.toLocaleString();
    }
}

function updatePreview() {
    if (!elements.paperContent || !elements.textInput) return;

    if (state.isRendering) return;
    state.isRendering = true;

    const text = elements.textInput.value;

    let previewText = text;
    let isTruncated = false;

    if (text.length > CONFIG.MAX_PREVIEW_CHARS) {
        previewText = text.substring(0, CONFIG.MAX_PREVIEW_CHARS);
        isTruncated = true;
    }

    const direction = getTextDirection(text);
    elements.paperContent.setAttribute('dir', direction);
    elements.paperContent.style.textAlign = direction === 'rtl' ? 'right' : 'left';

    state.detectedLanguage = detectLanguage(text);

    if (hasEmojis(text)) {
        const currentFont = state.currentFont;
        elements.paperContent.style.fontFamily = `${currentFont}, ${getEmojiFallbackFont()}`;
    }

    let renderedContent = textToHandwriting(previewText);

    if (isTruncated) {
        renderedContent += '<p class="truncation-notice">... [Preview truncated for performance. Full content will appear in generated image]</p>';
    }

    elements.paperContent.innerHTML = renderedContent;

    state.isRendering = false;
    state.lastRenderTime = Date.now();
}

const updatePreviewRAF = debounce(() => {
    requestAnimationFrame(() => {
        updatePreview();
        updateStats();
    });
}, CONFIG.DEBOUNCE_DELAY);

function saveToUndoHistory() {
    const currentText = elements.textInput?.value || '';

    if (currentText === state.lastSavedText) return;

    state.undoHistory.push(state.lastSavedText);

    if (state.undoHistory.length > CONFIG.MAX_UNDO_HISTORY) {
        state.undoHistory.shift();
    }

    state.redoHistory = [];
    state.lastSavedText = currentText;
}

function undo() {
    if (state.undoHistory.length === 0) {
        showToast('Nothing to undo', 'error');
        return;
    }

    const currentText = elements.textInput?.value || '';
    state.redoHistory.push(currentText);

    const previousText = state.undoHistory.pop();
    if (elements.textInput) {
        elements.textInput.value = previousText;
        state.lastSavedText = previousText;
        updatePreview();
        updateStats();
    }

    showToast('Undo successful');
}

function redo() {
    if (state.redoHistory.length === 0) {
        showToast('Nothing to redo', 'error');
        return;
    }

    const currentText = elements.textInput?.value || '';
    state.undoHistory.push(currentText);

    const nextText = state.redoHistory.pop();
    if (elements.textInput) {
        elements.textInput.value = nextText;
        state.lastSavedText = nextText;
        updatePreview();
        updateStats();
    }

    showToast('Redo successful');
}

function saveDraft() {
    const text = elements.textInput?.value || '';
    const draft = {
        text,
        timestamp: Date.now(),
        settings: {
            font: state.currentFont,
            inkColor: state.inkColor,
            fontSize: state.fontSize,
            wordSpacing: state.wordSpacing,
            letterSpacing: state.letterSpacing,
            showLeftMargin: state.showLeftMargin,
            showLines: state.showLines,
            scribbleStyle: state.scribbleStyle,
            strokeDensity: state.strokeDensity,
            randomnessLevel: state.randomnessLevel,
            adaptiveMode: state.adaptiveMode
        }
    };

    try {
        localStorage.setItem('text2scribble_draft', JSON.stringify(draft));
        showToast('Draft saved!');
    } catch (err) {
        console.error('Failed to save draft:', err);
        showToast('Failed to save draft', 'error');
    }
}

function loadDraft() {
    try {
        const saved = localStorage.getItem('text2scribble_draft');
        if (!saved) return false;

        const draft = JSON.parse(saved);

        if (elements.textInput && draft.text) {
            elements.textInput.value = draft.text;
            state.lastSavedText = draft.text;
        }

        if (draft.settings) {
            if (draft.settings.font && elements.fontSelect) {
                elements.fontSelect.value = draft.settings.font;
                state.currentFont = draft.settings.font;
            }
            if (draft.settings.inkColor) {
                state.inkColor = draft.settings.inkColor;
            }
            if (draft.settings.fontSize && elements.fontSize) {
                elements.fontSize.value = draft.settings.fontSize;
                state.fontSize = draft.settings.fontSize;
            }

            if (draft.settings.scribbleStyle && elements.scribbleStyle) {
                elements.scribbleStyle.value = draft.settings.scribbleStyle;
                state.scribbleStyle = draft.settings.scribbleStyle;
            }
            if (draft.settings.strokeDensity && elements.strokeDensity) {
                elements.strokeDensity.value = draft.settings.strokeDensity;
                state.strokeDensity = draft.settings.strokeDensity;
            }
            if (typeof draft.settings.randomnessLevel === 'number' && elements.randomnessLevel) {
                elements.randomnessLevel.value = draft.settings.randomnessLevel;
                state.randomnessLevel = draft.settings.randomnessLevel;
                updateRandomnessDisplay();
            }
            if (typeof draft.settings.adaptiveMode === 'boolean' && elements.adaptiveMode) {
                elements.adaptiveMode.checked = draft.settings.adaptiveMode;
                state.adaptiveMode = draft.settings.adaptiveMode;
            }
        }

        applyStyles();
        updatePreview();
        updateStats();
        return true;
    } catch (err) {
        console.error('Failed to load draft:', err);
        return false;
    }
}

async function copyImageToClipboard(pageId) {
    const page = state.generatedPages.find(p => p.id === pageId);
    if (!page) {
        showToast('Page not found', 'error');
        return;
    }

    try {
        const response = await fetch(page.imageUrl);
        const blob = await response.blob();

        await navigator.clipboard.write([
            new ClipboardItem({
                [blob.type]: blob
            })
        ]);

        showToast('Image copied to clipboard!');
    } catch (err) {
        console.error('Failed to copy image:', err);
        showToast('Failed to copy image. Try downloading instead.', 'error');
    }
}

function cacheElements() {
    elements.fontSelect = document.getElementById('handwriting-font');
    elements.fontFile = document.getElementById('font-file');
    elements.fontFileName = document.getElementById('font-file-name');
    elements.inkColorSelect = document.getElementById('ink-color-select');
    elements.customInkColor = document.getElementById('custom-ink-color');
    elements.customColorGroup = document.getElementById('custom-color-group');
    elements.fontSize = document.getElementById('font-size');
    elements.verticalPosition = document.getElementById('vertical-position');
    elements.wordSpacing = document.getElementById('word-spacing');
    elements.letterSpacing = document.getElementById('letter-spacing');
    elements.marginToggle = document.getElementById('margin-toggle');
    elements.marginStatus = document.getElementById('margin-status');
    elements.linesToggle = document.getElementById('lines-toggle');
    elements.linesStatus = document.getElementById('lines-status');
    elements.pageSize = document.getElementById('page-size');
    elements.effectsSelect = document.getElementById('effects-select');
    elements.resolution = document.getElementById('resolution');
    elements.paperImage = document.getElementById('paper-image');
    elements.paperImageName = document.getElementById('paper-image-name');

    elements.scribbleStyle = document.getElementById('scribble-style');
    elements.strokeDensity = document.getElementById('stroke-density');
    elements.randomnessLevel = document.getElementById('randomness-level');
    elements.randomnessValue = document.getElementById('randomness-value');
    elements.adaptiveMode = document.getElementById('adaptive-mode');
    elements.styleDescription = document.getElementById('style-description');

    elements.textInput = document.getElementById('text-input');
    elements.paper = document.getElementById('paper');
    elements.paperContent = document.getElementById('paper-content');
    elements.paperMarginLeft = document.getElementById('paper-margin-left');
    elements.contentRuledLines = document.getElementById('content-ruled-lines');

    elements.charCount = document.getElementById('char-count');
    elements.wordCount = document.getElementById('word-count');
    elements.lineCount = document.getElementById('line-count');

    elements.generateBtn = document.getElementById('generate-btn');
    elements.downloadBtn = document.getElementById('download-btn');
    elements.clearAllBtn = document.getElementById('clear-all-btn');

    elements.outputSection = document.getElementById('output-section');
    elements.outputPages = document.getElementById('output-pages');
    elements.pageCount = document.getElementById('page-count');

    elements.toastContainer = document.getElementById('toast-container');
}

function generateRuledLines() {
    const lineHeight = state.lineHeight;
    const numberOfLines = 70;

    if (elements.contentRuledLines) {
        elements.contentRuledLines.innerHTML = '';
    }

    if (elements.contentRuledLines && state.showLines) {
        for (let i = 1; i <= numberOfLines; i++) {
            const line = document.createElement('div');
            line.className = 'ruled-line';
            line.style.top = `${(i * lineHeight) + 6}px`;
            elements.contentRuledLines.appendChild(line);
        }
    }
}

function applyStyles() {
    if (!elements.paper || !elements.paperContent) return;

    const style = SCRIBBLE_STYLES[state.scribbleStyle] || SCRIBBLE_STYLES['clean-doodle'];
    const density = STROKE_DENSITIES[state.strokeDensity] || STROKE_DENSITIES['medium'];
    const complexity = calculateTextComplexity(elements.textInput?.value || '');
    const adaptiveSettings = getAdaptiveSettings(complexity);

    elements.paperContent.style.fontFamily = state.currentFont;
    elements.paperContent.style.color = state.inkColor;

    const effectiveLetterSpacing = state.letterSpacing + style.letterSpacingBonus + adaptiveSettings.letterSpacingBonus;
    const effectiveLineHeight = state.lineHeight * adaptiveSettings.lineHeightMultiplier;

    elements.paperContent.style.fontSize = `${state.fontSize}pt`;
    elements.paperContent.style.lineHeight = `${effectiveLineHeight}px`;
    elements.paperContent.style.wordSpacing = `${state.wordSpacing}px`;
    elements.paperContent.style.letterSpacing = `${effectiveLetterSpacing}px`;
    elements.paperContent.style.paddingTop = `${state.verticalPosition}px`;

    elements.paperContent.style.setProperty('--stroke-density', density.strokeWidth);

    const lineSize = `${effectiveLineHeight}px`;
    if (state.showLines) {
        elements.paperContent.style.backgroundSize = `100% ${lineSize}`;
        elements.paperContent.style.backgroundPosition = `0 0`;
        elements.paper.setAttribute('data-paper', 'ruled');

        if (elements.paperMarginLeft) {
            elements.paperMarginLeft.style.backgroundSize = `100% ${lineSize}`;
            elements.paperMarginLeft.style.backgroundPosition = `0 0`;
        }
    } else {
        elements.paper.setAttribute('data-paper', 'blank');
    }

    elements.paper.classList.toggle('show-left-margin', state.showLeftMargin);

    if (state.effect === 'shadows') {
        elements.paper.classList.add('ink-effect');
        elements.paper.classList.add('text-variation');
    } else if (state.effect === 'ink-bleed') {
        elements.paper.classList.add('ink-effect');
        elements.paper.classList.remove('text-variation');
    } else {
        elements.paper.classList.remove('ink-effect');
        elements.paper.classList.remove('text-variation');
    }

    elements.paper.setAttribute('data-scribble-style', state.scribbleStyle);
    if (state.customPaperImage) {
        elements.paper.style.backgroundImage = `url(${state.customPaperImage})`;
        elements.paper.style.backgroundSize = 'cover';
    } else {
        elements.paper.style.backgroundImage = '';
    }
    generateRuledLines();
}

function loadCustomFont(file) {
    if (!file) {
        showToast('No file selected', 'error');
        return;
    }

    const validExtensions = ['.ttf', '.otf', '.woff', '.woff2'];
    const fileName = file.name.toLowerCase();
    const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));

    if (!hasValidExtension) {
        showToast('Invalid file type. Please upload a valid font file (.ttf, .otf, .woff, .woff2)', 'error');
        return;
    }

    const reader = new FileReader();

    reader.onerror = () => {
        showToast('Failed to read font file. Please try again.', 'error');
    };

    reader.onload = (e) => {
        if (state.customFontLoaded) {
            try {
                document.fonts.delete(state.customFontLoaded);
            } catch (err) {
                console.warn('Could not delete previous font:', err);
            }
        }

        const newFont = new FontFace('custom-handwriting-font', `url(${e.target.result})`);

        newFont.load()
            .then(loadedFace => {
                document.fonts.add(loadedFace);
                state.customFontLoaded = loadedFace;
                state.currentFont = 'custom-handwriting-font';

                if (elements.fontFileName) {
                    elements.fontFileName.textContent = file.name;
                    elements.fontFileName.classList.add('has-file');
                }

                if (elements.fontSelect) {
                    elements.fontSelect.value = '';
                }

                applyStyles();
                updatePreview();
                showToast('Custom font loaded successfully!');
            })
            .catch(err => {
                console.error('Font loading failed:', err);
                showToast('Failed to load font file. Please ensure it\'s a valid font file.', 'error');
            });
    };

    reader.readAsDataURL(file);
}

function loadPaperImage(file) {
    if (!file) return;

    const reader = new FileReader();

    reader.onerror = () => {
        showToast('Failed to read image file.', 'error');
    };

    reader.onload = (e) => {
        state.customPaperImage = e.target.result;

        if (elements.paperImageName) {
            elements.paperImageName.textContent = file.name;
            elements.paperImageName.classList.add('has-file');
        }

        applyStyles();
        showToast('Paper background applied!');
    };

    reader.readAsDataURL(file);
}

async function generateImage() {
    if (!elements.paper || !elements.outputPages) {
        showToast('Required elements not found. Please refresh the page.', 'error');
        return;
    }

    if (typeof html2canvas === 'undefined') {
        showToast('Image generation library not loaded. Please refresh the page.', 'error');
        return;
    }

    const text = elements.textInput?.value || '';
    if (!text.trim()) {
        const generateBlank = confirm('No text entered. Generate a blank page?');
        if (!generateBlank) {
            return;
        }
    }
    validateResolutionForContent(text);

    elements.generateBtn.classList.add('loading');
    elements.generateBtn.disabled = true;

    try {
        const wasPreviewTruncated = text.length > CONFIG.MAX_PREVIEW_CHARS;
        if (wasPreviewTruncated) {
            elements.paperContent.innerHTML = textToHandwriting(text);
        }

        let scale = CONFIG.CANVAS_SCALE;
        if (state.resolution === 'high') scale = 3;
        if (state.resolution === 'ultra') scale = 4;

        const originalTransform = elements.paper.style.transform;
        elements.paper.style.transform = 'none';
        elements.paper.classList.add('generating');

        const canvas = await html2canvas(elements.paper, {
            scale: scale,
            useCORS: true,
            logging: false,
            backgroundColor: '#fffef5',
            allowTaint: true
        });

        elements.paper.style.transform = originalTransform;
        elements.paper.classList.remove('generating');
        if (wasPreviewTruncated) {
            updatePreview();
        }

        const imageUrl = canvas.toDataURL('image/png');
        const pageId = state.nextPageId++;
        const newPage = {
            id: pageId,
            imageUrl: imageUrl,
            timestamp: Date.now(),
            textLength: text.length,
            scribbleStyle: state.scribbleStyle
        };
        state.generatedPages.push(newPage);
        addPageToOutput(newPage);
        updatePageCount();
        elements.outputSection.style.display = 'block';
        elements.downloadBtn.disabled = false;

        elements.outputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        showToast('Image generated successfully!');

    } catch (err) {
        console.error('Image generation error:', err);
        showToast('Something went wrong. Please try again.', 'error');
    } finally {
        elements.paper.classList.remove('generating');
        elements.generateBtn.classList.remove('loading');
        elements.generateBtn.disabled = false;
    }
}

function validateResolutionForContent(text) {
    const textLength = text.length;

    if (state.resolution === 'ultra' && textLength > 15000) {
        showToast('Ultra resolution may cause memory issues. Consider using High resolution.', 'warning');
    }
}

function addPageToOutput(page) {
    const pageCard = document.createElement('div');
    pageCard.className = 'page-card';
    pageCard.dataset.pageId = page.id;

    const pageIndex = state.generatedPages.findIndex(p => p.id === page.id) + 1;
    const styleName = SCRIBBLE_STYLES[page.scribbleStyle]?.name || 'Unknown';

    pageCard.innerHTML = `
        <img src="${page.imageUrl}" alt="Page ${pageIndex}" loading="lazy">
        <div class="page-card-actions">
            <button class="page-action-btn copy-btn" title="Copy to Clipboard" onclick="copyImageToClipboard(${page.id})">📋</button>
            <button class="page-action-btn download-btn" title="Download" onclick="downloadPage(${page.id})">⬇️</button>
            <button class="page-action-btn delete-btn" title="Delete" onclick="deletePage(${page.id})">🗑️</button>
        </div>
        <div class="page-info">
            <span class="page-number">Page ${pageIndex}</span>
            <span class="page-style">${styleName}</span>
        </div>
    `;

    elements.outputPages.appendChild(pageCard);
}

function updatePageCount() {
    const count = state.generatedPages.length;
    if (elements.pageCount) {
        elements.pageCount.textContent = `${count} page${count !== 1 ? 's' : ''}`;
    }

    if (elements.downloadBtn) {
        elements.downloadBtn.disabled = count === 0;
    }
}

function deletePage(pageId) {
    state.generatedPages = state.generatedPages.filter(p => p.id !== pageId);

    const pageCard = document.querySelector(`.page-card[data-page-id="${pageId}"]`);
    if (pageCard) {
        pageCard.remove();
    }

    refreshPageNumbers();
    updatePageCount();

    if (state.generatedPages.length === 0) {
        elements.outputSection.style.display = 'none';
    }

    showToast('Page deleted');
}

function refreshPageNumbers() {
    const pageCards = document.querySelectorAll('.page-card');
    pageCards.forEach((card, index) => {
        const pageNumber = card.querySelector('.page-number');
        if (pageNumber) {
            pageNumber.textContent = `Page ${index + 1}`;
        }
    });
}

function downloadPage(pageId) {
    const page = state.generatedPages.find(p => p.id === pageId);
    if (!page) {
        showToast('Page not found.', 'error');
        return;
    }

    const link = document.createElement('a');
    link.href = page.imageUrl;
    link.download = `text2scribble-page-${pageId}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Download started');
}

function downloadAllPages() {
    if (state.generatedPages.length === 0) {
        showToast('No pages to download.', 'error');
        return;
    }

    showToast(`Downloading ${state.generatedPages.length} page(s)...`);

    state.generatedPages.forEach((page, index) => {
        setTimeout(() => {
            downloadPage(page.id);
        }, index * 500);
    });
}

function clearAllPages() {
    if (state.generatedPages.length === 0) return;

    state.generatedPages = [];
    state.nextPageId = 1;

    if (elements.outputPages) {
        elements.outputPages.innerHTML = '';
    }

    updatePageCount();
    elements.outputSection.style.display = 'none';

    showToast('All pages cleared');
}

function setupPaperEditing() {
    if (!elements.paperContent || !elements.textInput) return;

    const paperContainer = document.getElementById('paper-container');
    const paper = document.getElementById('paper');

    if (paperContainer) {
        paperContainer.addEventListener('click', () => {
            elements.textInput.focus({ preventScroll: true });
        });
    }

    if (paper) {
        paper.addEventListener('click', (e) => {
            e.stopPropagation();
            elements.textInput.focus({ preventScroll: true });
        });
    }

    elements.paperContent.addEventListener('click', (e) => {
        e.stopPropagation();
        elements.textInput.focus({ preventScroll: true });
    });

    elements.textInput.addEventListener('input', updatePreviewRAF);

    elements.textInput.addEventListener('blur', () => {
        saveToUndoHistory();
    });

    updatePreview();
    updateStats();
}

window.downloadPage = downloadPage;
window.deletePage = deletePage;
window.copyImageToClipboard = copyImageToClipboard;

function handleFontChange(e) {
    const font = e.target.value;
    state.currentFont = font;

    if (FONT_CONFIGS[font]) {
        const config = FONT_CONFIGS[font];
        state.fontSize = config.fontSize;
        state.verticalPosition = config.verticalPosition;

        if (elements.fontSize) elements.fontSize.value = config.fontSize;
        if (elements.verticalPosition) elements.verticalPosition.value = config.verticalPosition;
    }

    if (elements.fontFileName) {
        elements.fontFileName.textContent = 'No file chosen';
        elements.fontFileName.classList.remove('has-file');
    }
    if (elements.fontFile) {
        elements.fontFile.value = '';
    }

    applyStyles();
    updatePreview();
}

function handleFontFileChange(e) {
    const file = e.target.files && e.target.files[0];
    if (file) {
        loadCustomFont(file);
    }
}

function handleInkColorChange(e) {
    const value = e.target.value;

    if (value === 'custom') {
        if (elements.customColorGroup) {
            elements.customColorGroup.style.display = 'flex';
        }
        state.inkColor = state.customInkColor;
    } else {
        if (elements.customColorGroup) {
            elements.customColorGroup.style.display = 'none';
        }
        state.inkColor = value;
    }

    applyStyles();
    updatePreview();
}

function handleCustomInkColorChange(e) {
    state.customInkColor = e.target.value;
    state.inkColor = e.target.value;
    applyStyles();
    updatePreview();
}

const handleFontSizeChange = debounce((e) => {
    state.fontSize = validateNumber(e.target.value, CONFIG.MIN_FONT_SIZE, CONFIG.MAX_FONT_SIZE, CONFIG.DEFAULT_FONT_SIZE);
    applyStyles();
    updatePreview();
}, CONFIG.DEBOUNCE_DELAY);

const handleVerticalPositionChange = debounce((e) => {
    state.verticalPosition = validateNumber(e.target.value, 0, 50, CONFIG.DEFAULT_VERTICAL_POSITION);
    e.target.value = state.verticalPosition;
    applyStyles();
}, CONFIG.DEBOUNCE_DELAY);

const handleWordSpacingChange = debounce((e) => {
    state.wordSpacing = validateNumber(e.target.value, 0, 20, CONFIG.DEFAULT_WORD_SPACING);
    e.target.value = state.wordSpacing;
    applyStyles();
    updatePreview();
}, CONFIG.DEBOUNCE_DELAY);

const handleLetterSpacingChange = debounce((e) => {
    state.letterSpacing = validateNumber(e.target.value, 0, 5, CONFIG.DEFAULT_LETTER_SPACING);
    e.target.value = state.letterSpacing;
    applyStyles();
    updatePreview();
}, CONFIG.DEBOUNCE_DELAY);

function handleMarginToggle(e) {
    state.showLeftMargin = e.target.checked;
    if (elements.marginStatus) {
        elements.marginStatus.textContent = e.target.checked ? 'ON' : 'OFF';
    }
    applyStyles();
}

function handleLinesToggle(e) {
    state.showLines = e.target.checked;
    if (elements.linesStatus) {
        elements.linesStatus.textContent = e.target.checked ? 'ON' : 'OFF';
    }
    applyStyles();
}

function handlePageSizeChange(e) {
    state.pageSize = e.target.value;
}

function handleEffectsChange(e) {
    state.effect = e.target.value;
    applyStyles();
}

function handleResolutionChange(e) {
    state.resolution = e.target.value;
}

function handlePaperImageChange(e) {
    const file = e.target.files && e.target.files[0];
    if (file) {
        loadPaperImage(file);
    }
}

function handleScribbleStyleChange(e) {
    state.scribbleStyle = e.target.value;
    updateStyleDescription();
    applyStyles();
    updatePreview();
}

function handleStrokeDensityChange(e) {
    state.strokeDensity = e.target.value;
    applyStyles();
    updatePreview();
}

function handleRandomnessChange(e) {
    state.randomnessLevel = parseInt(e.target.value, 10);
    updateRandomnessDisplay();
    updatePreview();
}

function handleAdaptiveModeChange(e) {
    state.adaptiveMode = e.target.checked;
    updateAdaptiveStatus();
    applyStyles();
    updatePreview();
}

function updateRandomnessDisplay() {
    if (elements.randomnessValue) {
        elements.randomnessValue.textContent = `${state.randomnessLevel}%`;
    }
}

function updateStyleDescription() {
    if (elements.styleDescription) {
        const style = SCRIBBLE_STYLES[state.scribbleStyle];
        elements.styleDescription.textContent = style?.description || '';
    }
}

function updateAdaptiveStatus() {
    const adaptiveStatus = document.getElementById('adaptive-status');
    if (adaptiveStatus) {
        adaptiveStatus.textContent = state.adaptiveMode ? 'ON' : 'OFF';
    }
}

function attachEventListeners() {
    const addListener = (el, event, handler) => el?.addEventListener(event, handler);

    addListener(elements.fontSelect, 'change', handleFontChange);
    addListener(elements.fontFile, 'change', handleFontFileChange);
    addListener(elements.inkColorSelect, 'change', handleInkColorChange);
    addListener(elements.customInkColor, 'input', handleCustomInkColorChange);
    addListener(elements.fontSize, 'input', handleFontSizeChange);
    addListener(elements.verticalPosition, 'input', handleVerticalPositionChange);
    addListener(elements.wordSpacing, 'input', handleWordSpacingChange);
    addListener(elements.letterSpacing, 'input', handleLetterSpacingChange);
    addListener(elements.marginToggle, 'change', handleMarginToggle);
    addListener(elements.linesToggle, 'change', handleLinesToggle);
    addListener(elements.pageSize, 'change', handlePageSizeChange);
    addListener(elements.effectsSelect, 'change', handleEffectsChange);
    addListener(elements.resolution, 'change', handleResolutionChange);
    addListener(elements.paperImage, 'change', handlePaperImageChange);

    addListener(elements.scribbleStyle, 'change', handleScribbleStyleChange);
    addListener(elements.strokeDensity, 'change', handleStrokeDensityChange);
    addListener(elements.randomnessLevel, 'input', handleRandomnessChange);
    addListener(elements.adaptiveMode, 'change', handleAdaptiveModeChange);

    document.querySelectorAll('.file-input-wrapper').forEach(wrapper => {
        const fileBtn = wrapper.querySelector('.file-btn');
        const fileInput = wrapper.querySelector('input[type="file"]');
        if (fileBtn && fileInput) {
            fileBtn.addEventListener('click', () => fileInput.click());
        }
    });

    addListener(elements.generateBtn, 'click', generateImage);
    addListener(elements.downloadBtn, 'click', downloadAllPages);
    addListener(elements.clearAllBtn, 'click', clearAllPages);

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            generateImage();
        }

        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            if (elements.downloadBtn && !elements.downloadBtn.disabled) {
                downloadAllPages();
            } else {
                saveDraft();
            }
        }

        if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
            if (document.activeElement !== elements.textInput) {
                e.preventDefault();
                undo();
            }
        }

        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') {
            if (document.activeElement !== elements.textInput) {
                e.preventDefault();
                redo();
            }
        }

        if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
            if (document.activeElement !== elements.textInput) {
                e.preventDefault();
                redo();
            }
        }
    });

    window.addEventListener('beforeunload', () => {
        const text = elements.textInput?.value?.trim();
        if (text) {
            saveDraft();
        }
    });
}

function setupDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (!darkModeToggle) return;

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme !== 'light') {
        document.body.classList.add('dark');
        document.documentElement.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
        document.documentElement.classList.remove('dark');
    }

    darkModeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark');

        document.body.classList.toggle('dark', !isDark);
        document.documentElement.classList.toggle('dark', !isDark);

        localStorage.setItem('theme', !isDark ? 'dark' : 'light');

        showToast(!isDark ? 'Dark mode enabled' : 'Light mode enabled');
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            document.body.classList.toggle('dark', e.matches);
            document.documentElement.classList.toggle('dark', e.matches);
        }
    });
}

function init() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
        return;
    }

    console.log('Initializing...');

    cacheElements();
    attachEventListeners();
    setupDarkMode();
    setupPaperEditing();
    updateRandomnessDisplay();
    updateStyleDescription();
    applyStyles();
    updatePreview();
    updateStats();

    const hasDraft = loadDraft();
    if (hasDraft) {
        showToast('Previous draft restored');
    }

    console.log('initialized successfully!');
}

init();