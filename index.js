const express = require("express");
const { scrapeLogic } = require("./scrapeLogic");
const app = express();

const PORT = process.env.PORT || 1000;

app.get("/scrape", (req, res) => {
  if(!req.headers['text']){
                return res.json({response:"Text header is missing"});
            }
  scrapeLogic(res,req.headers['text'])
  
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
  res.send("Render Puppeteer server is up and running!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
