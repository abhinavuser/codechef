const express = require('express');
const bodyParser = require('body-parser');
const { JSDOM } = require('jsdom');

const app = express();
app.use(bodyParser.json());

// Endpoint to generate HTML based on a theme
app.post('/generate', (req, res) => {
    const { themeHtml, content } = req.body;

    if (!themeHtml || !content) {
        return res.status(400).json({ error: 'Both themeHtml and content are required.' });
    }

    const dom = new JSDOM(themeHtml);
    const document = dom.window.document;

    const contentContainer = document.querySelector('#content');
    if (contentContainer) {
        contentContainer.innerHTML = content;
    } else {
        return res.status(400).json({ error: 'Theme HTML must contain an element with id "content".' });
    }

    res.status(200).send(dom.serialize());
});

// Endpoint to modify existing HTML based on user instructions
app.post('/modify', (req, res) => {
    const { htmlCode, instructions } = req.body;

    if (!htmlCode || !instructions) {
        return res.status(400).json({ error: 'Both htmlCode and instructions are required.' });
    }

    const dom = new JSDOM(htmlCode);
    const document = dom.window.document;

    instructions.forEach(instruction => {
        const { selector, action, value } = instruction;
        const element = document.querySelector(selector);

        if (element) {
            if (action === 'updateText') {
                element.textContent = value;
            } else if (action === 'updateHtml') {
                element.innerHTML = value;
            } else if (action === 'addClass') {
                element.classList.add(value);
            }
            // Add more actions as needed
        }
    });

    res.status(200).send(dom.serialize());
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
