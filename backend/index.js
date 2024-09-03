import express from 'express';
import * as cheerio from 'cheerio';
import bodyParser from 'body-parser';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(bodyParser.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

function integrateContent(templateHtml, contentText) {
    const $ = cheerio.load(templateHtml);
    $('#content').text(contentText); 
    return $.html();
}

function modifyHtml(htmlCode, instructions) {
    const $ = cheerio.load(htmlCode);

    if (instructions.includes("change title to")) {
        const newTitle = instructions.split("change title to ")[1].trim();
        $('title').text(newTitle);
    }

    return $.html();
}

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

app.post('/generate', async (req, res) => {
    const { template, content } = req.body;

    if (!template || !content) {
        return res.status(400).json({ error: "Template or content missing" });
    }

    try {
        const resultHtml = integrateContent(template, content);

        res.json({ result: resultHtml });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate content" });
    }
});

app.post('/modify', async (req, res) => {
    const { html_code, instructions } = req.body;

    if (!html_code || !instructions) {
        return res.status(400).json({ error: "HTML code or instructions missing" });
    }

    try {
        const resultHtml = modifyHtml(html_code, instructions);

        res.json({ result: resultHtml });
    } catch (error) {
        res.status(500).json({ error: "Failed to modify content" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
