const express = require('express');
const cheerio = require('cheerio');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

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

// Function to call Gemini API
async function callGeminiApi(data, endpoint) {
    try {
        const response = await axios.post(`https://api.gemini.com/v1/${endpoint}`, data, {
            headers: {
                'Authorization': `Bearer ${GEMINI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error calling Gemini API:', error.response.data);
        throw error;
    }
}

// Endpoint to generate HTML from template and content using Gemini API
app.post('/generate', async (req, res) => {
    const { template, content } = req.body;

    if (!template || !content) {
        return res.status(400).json({ error: "Template or content missing" });
    }

    try {
        const resultHtml = integrateContent(template, content);
        // Call Gemini API if needed, for example, to perform further processing:
        // const geminiResult = await callGeminiApi({ template, content }, 'generate-endpoint');

        res.json({ result: resultHtml });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate content" });
    }
});

// Endpoint to modify existing HTML based on instructions using Gemini API
app.post('/modify', async (req, res) => {
    const { html_code, instructions } = req.body;

    if (!html_code || !instructions) {
        return res.status(400).json({ error: "HTML code or instructions missing" });
    }

    try {
        const resultHtml = modifyHtml(html_code, instructions);
        // Call Gemini API if needed, for example, to perform further processing:
        // const geminiResult = await callGeminiApi({ html_code, instructions }, 'modify-endpoint');

        res.json({ result: resultHtml });
    } catch (error) {
        res.status(500).json({ error: "Failed to modify content" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
