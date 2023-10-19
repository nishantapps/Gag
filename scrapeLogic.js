const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

async function getImages(prompt, res) {
  // Create a new Puppeteer instance with the stealth plugin
  puppeteer.use(StealthPlugin());

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
}

module.exports = { getImages }
