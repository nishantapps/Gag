const express = require('express');
const puppeter = require('puppeteer');
const app = express();

app.get('/', async (req, res) => {
    try{
        if (!req.headers.prompt) return res.status(400).json({ error: 'Prompt not found' });
    const browser = await puppeter.launch({ headless:true,
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),});
    const page = await browser.newPage();
    await page.goto('https://deepai.org/machine-learning-model/text2img', { waitUntil: 'networkidle2' });
    const textbox = 'textarea[class="model-input-text-input"]';
    await page.waitForSelector(textbox);
    await page.type(textbox, req.headers.prompt);
    await page.click('button[id="modelSubmitButton"]');
    await page.waitForTimeout(10000);
    const img = await page.$eval('div[class="try-it-result-area"]', el => el.querySelector('img').src);
    res.json({ img: img });
    browser.close();
    }catch(err){
        res.json({error:err})
        console.log(err)
    }
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
        console.log(err)
        res.json({error:err})
    }
});
app.listen(1000, () => {
    console.log('Server started on port 1000');
});
