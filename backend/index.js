const express = require('express');
const cheerio = require('cheerio');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Function to integrate content into template
function integrateContent(templateHtml, contentText) {
    const $ = cheerio.load(templateHtml);
    $('#content').text(contentText); // Assuming a <div id="content"></div> placeholder
    return $.html();
}

// Function to modify existing HTML
function modifyHtml(htmlCode, instructions) {
    const $ = cheerio.load(htmlCode);

    // Example: Parse instructions like "change title to 'New Title'"
    if (instructions.includes("change title to")) {
        const newTitle = instructions.split("change title to ")[1].trim();
        $('title').text(newTitle);
    }

    return $.html();
}

// Endpoint to generate HTML from template and content
app.post('/generate', (req, res) => {
    const { template, content } = req.body;

    if (!template || !content) {
        return res.status(400).json({ error: "Template or content missing" });
    }

    const resultHtml = integrateContent(template, content);
    res.json({ result: resultHtml });
});

// Endpoint to modify existing HTML based on instructions
app.post('/modify', (req, res) => {
    const { html_code, instructions } = req.body;

    if (!html_code || !instructions) {
        return res.status(400).json({ error: "HTML code or instructions missing" });
    }

    const resultHtml = modifyHtml(html_code, instructions);
    res.json({ result: resultHtml });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
