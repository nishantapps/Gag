const puppeteer = require('puppeteer');
const fs = require('fs');
(async () => {
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
    
    // Save a screenshot of the results.
    await page.screenshot({ path: 'example.png' });

    //type
    await page.waitForSelector('input[type="text"]',{timeout: 600000});
    await page.type('input[type="text"]', 'Dalle');
    await page.click('.gr-button')
    await page.screenshot({ path: 'example.png' });
    //get all images from a div named "images"
    await page.waitForSelector('div.grid-cols-3 button img',{timeout: 600000});
    const images = await page.$$eval('div.grid-cols-3 button img', imgs => imgs.map(img => img.src),{timeout: 600000});
    await browser.close();
    }
)();
