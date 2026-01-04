# Text2Scribble

<div align="center">

**Transform your typed text into authentic handwritten pages — instantly, privately, beautifully.**

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Made with ❤️](https://img.shields.io/badge/Made_with-❤️-red.svg)](https://github.com/RishiBuilds)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/RishiBuilds/text2scribble/graphs/commit-activity)
[![GitHub issues](https://img.shields.io/github/issues/RishiBuilds/text2scribble)](https://github.com/RishiBuilds/text2scribble/issues)

[View Demo](#) · [Report Bug](https://github.com/RishiBuilds/text2scribble/issues) · [Request Feature](https://github.com/RishiBuilds/text2scribble/issues)

</div>

<p align="center">
  <img src="text2scribble-output.png" alt="Text2Scribble Output Preview" width="400px" />
</p>

---

**Text2Scribble** is a browser-based application that converts digital text into realistic handwritten documents. It creates high-quality output that looks like it was written with a pen on paper, perfect for assignments, notes, or creative projects.

> **Privacy First:** 100% client-side. Your text never leaves your browser.

## Key Features

### Handwriting & Typography
*   **Multiple Styles**: Choose from 4 curated handwriting fonts (Homemade Apple, Liu Jian Mao Cao, Long Cang, Caveat).
*   **Custom Fonts**: Upload your own `.ttf` or `.otf` font for a truly personalized touch.
*   **Typography Control**: Fine-tune font size, word spacing, letter spacing, and vertical alignment to match specific ruling styles.
*   **Custom Ink**: Select from preset ink colors (Blue, Black, Dark Blue, Red) or pick **any custom color**.

### Paper & Effects
*   **Paper Styles**: Toggle between standard ruled paper, blank sheets, or upload your own background texture.
*   **Margin Control**: Show or hide the red left margin line.
*   **Realism Effects**: 
    *   **Shadows**: Adds subtle depth to ink strokes.
    *   **Ink Bleed**: Simulates pen ink slightly absorbing into the paper.
    *   **Text Variation**: Randomizes slight positioning for a more natural look.

### Productivity Tools
*   **Live Preview**: Real-time rendering as you type.
*   **Auto-Save**: Drafts are automatically saved to local storage so you never lose work.
*   **Undo/Redo**: Full history support with standard shortcut keys.
*   **Export Options**: Generate high-resolution PNG images.
*   **Batch Actions**: Copy generated images to clipboard or download all pages at once.

## UI Showcase

<p align="center">
  <strong>Light Mode</strong><br>
  <img src="images/app_ui_light.png" alt="Light Mode Interface" width="90%" style="border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
</p>

<p align="center">
  <strong>Dark Mode</strong><br>
  <img src="images/app_ui_dark.png" alt="Dark Mode Interface" width="90%" style="border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
</p>

## Getting Started

### Prerequisites
You need a modern web browser (Chrome, Firefox, Safari, Edge). No complex backend or database is required.

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/RishiBuilds/text2scribble.git
    cd text2scribble
    ```

2.  **Run the application**
    
    Since this is a static web application, you can open `index.html` directly in your browser. However, for the best experience (and to avoid local CORS issues with some assets), we recommend using a simple local server.

    **Using npx:**
    ```bash
    npx serve
    ```

    **Using Python:**
    ```bash
    # Python 3
    python -m http.server 8000
    ```

    **Using VS Code:**
    Install the "Live Server" extension and click "Go Live".

3.  **Access the App**
    Open your browser and navigate to `http://localhost:8000` (or the port shown in your terminal).

## Usage Guide

### 1. Entering Text
*   Click anywhere on the virtual paper to focus the input.
*   Type or paste your text. The application supports multi-page content automatically splitting logic is essentially visual (manual page management is recommended for long texts).
*   Keep an eye on the **real-time stats** (characters, words, lines) at the bottom of the input area.

### 2. Customizing Appearance
Use the controls in the sidebar/options panel:
*   **Handwriting Options**: Change the font family or upload a custom font file.
*   **Page & Text Options**: Adjust `Font Size` (8-30pt) and `Ink Color`.
*   **Spacing Options**: Use `Vertical Position` to align text perfectly with the ruled lines. Adjust `Word Spacing` and `Letter Spacing` to fix density.

### 3. Exporting
1.  Click the huge **Generate Image** button.
2.  Review the generated page(s) in the Output section below.
3.  Click the **Download** icon (⬇️) to save as PNG, or the **Copy** icon (📋) to paste it directly into another app.

## Keyboard Shortcuts

Maximize your efficiency with these shortcuts:

| Shortcut | Action |
|----------|--------|
| `Ctrl` + `Enter` | **Generate Image** |
| `Ctrl` + `S` | **Download All / Save** |
| `Ctrl` + `Z` | **Undo** last change |
| `Ctrl` + `Y` / `Ctrl` + `Shift` + `Z` | **Redo** change |

## Creating Custom Fonts

To use your own handwriting:
1.  Go to [Calligraphr](https://www.calligraphr.com).
2.  Download their template and fill it out with your handwriting.
3.  Scan/upload the template to generate a `.ttf` file.
4.  In Text2Scribble, select **Upload your handwriting font** and choose your new file.

## Technology Stack

*   **Core**: HTML5, CSS3, Vanilla JavaScript (ES6+)
*   **Styling**: Modern CSS Variables, Flexbox/Grid, Glassmorphism effects
*   **Library**: `html2canvas` for DOM-to-Image rendering
*   **Storage**: Browser `localStorage` for state persistence

## Project Structure

```
text2scribble/
├── css/
│   ├── main.css            # Base layout and typography
│   └── ui-controls.css     # Components, buttons, and switches
├── images/
│   ├── app_ui_dark.png     # Dark theme interface
│   └── app_ui_light.png    # Light theme interface
├── index.html              # Main application structure
├── script.js               # Core logic, event handling, and rendering
├── favicon.ico             # Application icon
└── text2scribble-output    # Sample output image
```

## Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  **Fork** the project.
2.  Create your **Feature Branch** (`git checkout -b feature/AmazingFeature`).
3.  **Commit** your changes (`git commit -m 'Add some AmazingFeature'`).
4.  **Push** to the branch (`git push origin feature/AmazingFeature`).
5.  Open a **Pull Request**.

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Created with ❤️ by <a href="https://github.com/RishiBuilds">Text2Scribble</a>

  ⭐ Star the repo if it helps you!
</p>
