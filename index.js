const express = require("express");
const fs = require('fs')
const hero = require("./scrapeLogic");
const app = express();
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const PORT = process.env.PORT || 1000;

app.get("/scrape", async (req, res) => {
  if(!req.headers['text']){
                return res.json({response:"Text header is missing"});
            }
  puppeteer.use(StealthPlugin());
let prompt = req.headers['text']
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

  // Create a new page
  const page = await browser.newPage();

  // Go to the Cloudflare-protected website
  await page.goto('https://www.craiyon.com/');

  // Wait for the page to load
  await page.waitForNavigation();

  const text = '#prompt';
try{
await page.waitForSelector(text);
}catch(err){
    console.log(err);
}
await page.type(text, prompt);
await page.click('#generateButton');
await page.waitForTimeout(90000);
  const selector = `img[alt="${prompt}"]`;
  await page.waitForSelector(selector, {
    timeout: 12e4
  });
  const imgs = await page.$$eval(selector, (imgs2) => imgs2.map((img) => img.getAttribute("src")));
  await browser.close();
  res.json({ response: imgs });
  
});
app.get('/images/:image', (req, res) => {
  // Get the image name from the request
  const imageName = req.params.image;

  // Create the path to the image file
  const imagePath = `./${imageName}`;

  // Send the image file to the client
  res.sendFile(__dirname+`/${imageName}`);
});
app.get("/", (req, res) => {
  let directoryPath = __dirname
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    files.forEach(file => {
        console.log(file);
    });
});
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
