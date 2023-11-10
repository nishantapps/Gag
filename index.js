const express = require('express');
const puppeter = require('puppeteer');
const app = express();

app.get('/', async (req, res) => {
        if (!req.headers.prompt) return res.status(400).json({ error: 'Prompt not found' });
    const browser = await puppeter.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://deepai.org/machine-learning-model/text2img', { waitUntil: 'networkidle2' ,timeout:60000000});
    const textbox = 'textarea[class="model-input-text-input"]';
    await page.waitForSelector(textbox, {timeout:60000000});
    await page.type(textbox, req.headers.prompt, );
    await page.click('button[id="modelSubmitButton"]', {timeout:60000000});
    await page.waitForTimeout(10000);
    const img = await page.$eval('div[class="try-it-result-area"]', el => el.querySelector('img').src);
    res.json({ img: img });
    browser.close();
});
app.get('/preview/:prompt', async (req, res) => {
    try{
        const browser = await puppeter.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://deepai.org/machine-learning-model/text2img', { waitUntil: 'networkidle2' });
    const textbox = 'textarea[class="model-input-text-input"]';
    await page.waitForSelector(textbox);
    await page.type(textbox, req.params.prompt);
    await page.click('button[id="modelSubmitButton"]');
    await page.waitForTimeout(10000);
    const img = await page.$eval('div[class="try-it-result-area"]', el => el.querySelector('img').src);
    //download image in temp
    const viewSource = await page.goto(img);
    const buffer = await viewSource.buffer();
    res.set('Content-Type', 'image/png');
    res.send(buffer);
    browser.close();
    }catch(err){
        res.json({error:err})
    }
});
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
