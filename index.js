const puppeteer = require('puppeteer');
const express = require('express');

async function scrape(text){
    const browser = await puppeteer.launch({ 
        headless:true,
        args: [
          "--disable-setuid-sandbox",
          "--no-sandbox",
          "--single-process",
          "--no-zygote",
        ],
        executablePath:
          process.env.NODE_ENV === "production"
            ? process.env.PUPPETEER_EXECUTABLE_PATH
            : puppeteer.executablePath(),
    });
    const page = await browser.newPage();
    
    // Navigate to the page that will perform the tests.
    await page.goto('https://dalle-mini-dalle-mini.static.hf.space/index.html');
    
   //type
    await page.waitForSelector('input[type="text"]',{timeout: 600000});
    await page.type('input[type="text"]', text);
    await page.click('.gr-button')
    //get all images from a div named "images"
    await page.waitForSelector('div.grid-cols-3 button img',{timeout: 600000});
    const images = await page.$$eval('div.grid-cols-3 button img', imgs => imgs.map(img => img.src),{timeout: 600000});
    await browser.close();
    return images;   
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    const text = req.headers.text;
        if(!text) return res.json({error:"No prompt found"})
    const images = await scrape(text);
    res.json({images_response:images});
}
);

app.listen(1000, () => console.log('Server ready'))
