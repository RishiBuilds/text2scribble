## Text2Scribble

**Text2Scribble** is a lightweight, browser-based web app that converts typed text into realistic handwritten-style pages.

Built for **students, creators**, and **developers** who want the look of handwriting—without the pain of actually writing it.

### Why I Built This

Let's be honest—**writing long assignments by hand is exhausting, time-consuming, and repetitive.**

I created Text2Scribble because:

- I hate rewriting the same content again and again for handwritten submissions
- Writing by hand wastes hours that could be spent learning or building
- Many schools still require handwritten assignments—even in a digital world
- Digital notes don't always "look" personal or authentic
- I wanted a clean, frontend-only project that solves a real, everyday problem

### How to Add Your Own Handwriting

Want the output to look exactly like **your** handwriting? You can do that in just a few steps.

#### Create a handwriting font

1. Visit **Calligraphr**: [https://calligraphr.com](https://calligraphr.com)
2. Write the characters on their template and upload it
3. Export your handwriting as a `.ttf` font file

#### Upload your font

1. Click the **Upload Handwriting** button in Text2Scribble
2. Select your generated `.ttf` file
3. Done!

Your personal handwriting instantly appears as a selectable font. Generate the image and export it like any other style.

**Tip:** The cleaner you write on Calligraphr's template, the more realistic your final handwriting will look.


### How Image Generation Works

Text2Scribble uses **html2canvas** to capture the handwritten page and export it as an image.

**Flow:**
- Type or paste your text
- Choose a handwriting font
- Click Generate Image
- Right-click → Save image as…

### Sample Output

![Text2Scribble](text2scribble-output.png)

<div align="center">

**Text → Scribble → Image**

*Built to save time*

</div>
