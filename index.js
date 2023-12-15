import express from 'express';
import * as dotenv from 'dotenv';
import PaLM from 'palm-api';
import admin from 'firebase-admin';
import puppeteer from 'puppeteer';
import fs from 'fs'
import path from 'path'
import axios from 'axios'
dotenv.config();
import { GoogleGenerativeAI, HarmCategory,
    HarmBlockThreshold, } from "@google/generative-ai";
console.log('1')
async function isImageUrl(url) {
    try {
      // Make a HEAD request to get the headers
      const response = await axios.head(url);
  
      // Check if the content type is an image
      return response.headers['content-type'].startsWith('image');
    } catch (error) {
      // Handle any errors, e.g., invalid URL
      console.error('Error:', error.message);
      return false;
    }
  }
  
  async function downloadAndDeleteImage(url, downloadPath) {
    if (await isImageUrl(url)) {
      try {
        // Make a GET request to get the image content
        const response = await axios.get(url, { responseType: 'arraybuffer' });
  
        // Extract the file extension from the content type
        const fileExtension = response.headers['content-type'].split('/')[1];
  
        // Build the file path
        const filePath = path.join(downloadPath, `image.${fileExtension}`);
  
        // Save the image
        fs.writeFileSync(filePath, response.data);
        return async function isImageUrl(url) {
  try {
    // Make a HEAD request to get the headers
    const response = await axios.head(url);

    // Check if the content type is an image
    return response.headers['content-type'].startsWith('image');
  } catch (error) {
    // Handle any errors, e.g., invalid URL
    console.error('Error:', error.message);
    return false;
  }
}

async function downloadAndDeleteImage(url, downloadPath) {
  if (await isImageUrl(url)) {
    try {
      // Make a GET request to get the image content
      const response = await axios.get(url, { responseType: 'arraybuffer' });

      // Extract the file extension from the content type
      const fileExtension = response.headers['content-type'].split('/')[1];

      // Build the file path
      const filePath = path.join(downloadPath, `image.${fileExtension}`);

      // Save the image
      fs.writeFileSync(filePath, response.data);
      console.log(`Image downloaded to ${filePath}`);
      return filePath;
    } catch (error) {
      console.error('Error:', error.message);
    }
  } else {
    console.log('The URL does not point to an image.');
  }
}
      } catch (error) {
        console.error('Error:', error.message);
      }
    } else {
      console.log('The URL does not point to an image.');
    }
  }
const config = {
    "type": "service_account",
    "project_id": "plam-97af6",
    "private_key_id": "4ea37e741821142659d569932e7807aaa50c71a1",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCmjHBK+Avwd+Zh\nmk8M3RDWb0O+eUeS2RiP7Y6kKGg4sFafu5WUyLlDRCWi2IwnNxiskp7wsUYTif2r\n7srqTgosGYnQmy0fXmfwrhyBJvkr37dMwjSSDKF7+D9jWx2i/XKb/KhuF72rrI8p\nHkBeUoakvTdhBDIonYct53owNJzYnv8y7EGVca2tjMG4EbGBp5kktGRfQ752f/3P\nNLwQjVzTmYu+4Y3W2xRz3mKEbw4dW0DptHVYD0MufK0S19ce4KuoZDS+MZpkdfz0\nXpreNIADKfY7IA3wyJ0CF0xx/ilw6hNGp1UwUs6xSnGUA8WzdWHychsC/nDVJMyJ\nIxiQ+L6RAgMBAAECggEACpESds8yArm4tiySI2DLNq+sfqM3NUvs0QTjberaYe5e\nMJg4L05k4q2qLaDLk5ldSWWsC91Tct3oaEYoPaFh59Ze9gtCW6EjuxNw34jXej8h\nZA9WQoXmoPTpIKahRLwLz3XCQenjsMar9pHix5k4za7rmo4nmIgWEYWELRbJdLzX\nT4KLcw4GPz3x1NWWr7zMdQx/w56XMgInMhBJDYqg02ntKuZRIuULkglO9KBJXsMh\nDnm1U5ej0/2JPYvT4WoAhJ7pAqmEuzY6AATT4T3seXizdkFOVnh6f74VWtlFaOkx\nH3RLcedP3x/QQ9WW53FaImEh1sDKDYp+LoLiGrlDIQKBgQDqJVakyk/Bxyb3+Szi\nFVTEJYbWhaE7uPgTgv70evCSUYSoryrPbXi5VoqE808zqZSvjwRc2w9Qj6G7AaCs\nUiuK9pXkYnULMtp2P+OQS8vbFpJwmi+3ctbOKZ2YbOuYlG0IOU50HqmJMFJTSSVr\n4sjsmvjVgbbzdRf0/jLFScQonQKBgQC2F+/P620zXTZQiCJI4Hj+ArCk3onVU+uU\n0/Ajk+h/RPWynjbNmx65vVm3B4FBFUysl3hTwoMfloVpz+M5QNUGLpP4V6P4LxX4\n1krHNlCmcGX2u12lb5xKtPnxh832j33HqCpHQn/pXwDGhKDcRp9PEBmUz80qe/ft\nB5wveECphQKBgDeLkglXwSHsF6992grsGobJjDo5yyz6zUb7rXXb8FQVqI3HuDUq\n+BenkwbFHYXY9d/L4rIQeYqX+Dr/wNkASToXEynxvWhhsPeaYmapxHt92FGEEkvH\nn3Oa5bryI9W3aEIqLhVX7MoRv4XodUspqpaOkPc9ZWRN49gHsY2h2Tn1AoGAdT2s\nNh7KzItzcR51lJ6SyFlLCpwN+sBxqf1bXEzbITZxS3P6rR73BXgYz3ORkSn5mBZe\nbu+KJUhw1dP35OENR1GuC/PBqwYGC5VNyD38Z21u+RFiFiZqZt9nHk/mGJ4Cyg5I\nSmFSoht9EFRMjgcag3lGPz4cRwJSetavhRDT8VECgYATTXdUW9/LUI7+TIR13rk2\nd9Kr3JFzTJlRdBaQGL4c2UFrIIu4J6Hx6H7GWc6JkkDhNRrGBvhfxrGBIrHte774\nzcASLY3YBMYjE6xZXwgAklea9439CP/8d4PbJRtZ1nbaQ85o0j6GemV2TwotH26p\nq7X8f5aUv6zZBJBApfRQHQ==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-o0xv5@plam-97af6.iam.gserviceaccount.com",
    "client_id": "104078289980871485358",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-o0xv5%40plam-97af6.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }
  async function scrape(text,n){
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
    const images = await page.$$eval('div.grid-cols-3 button img', imgs => {
      for(let i = 0; i <n || 9;i++){
        imgs.map(img => img.src)
      }
    },{timeout: 600000});
    await browser.close();
    return images;   
}

  console.log('2')
const app = express();
const port = process.env.PORT || 2000 ; // Define the port you want to use

console.log('3')
admin.initializeApp({
    credential: admin.credential.cert(config),
    databaseURL: 'https://plam-97af6-default-rtdb.firebaseio.com', // Replace with your Firestore database URL
});

const db = admin.firestore();
const collectionRef = db.collection('users');


// Establish the database connection using async/await
app.use(express.json()); // Middleware for parsing JSON request bodies

app.get('/', async (req, res) => {
    const headers = req.headers;
    if (!headers['userid']) return res.status(400).send('Userid is required.');
    if (!headers['key']) return res.status(400).send('Please enter your makersuite key');
    if (!headers['message']) return res.status(400).send('Please enter your message');
    if (headers['psid']) return res.status(400).send('Looks like you are using old version of the API. Please update to the latest version. Please read our docuentation for more information.');
    const documentRef = collectionRef.doc(headers['userid']);

    documentRef.get()
        .then(async (docSnapshot) => {
            if (docSnapshot.exists) {
                const data = docSnapshot.data();
                let arrayData;
                if(data.premium == true && headers['roomid']){
                    console.log("We are looking for your roomid")
                    console.log(data.room)
                    let yes;
                    for(let i=0;i<data.room.length;i++){
                        console.log(i)
                        console.log(data.room[i].roomid)
                        if(data.room[i].roomid == headers['roomid'].toString()){
                            yes = true
                            arrayData = data.room[i].chats

                            console.log("We found your roomid")
                        }
                        
                    }
                    if(!yes){
                        console.log("We did not find your roomid")
                        const newroom = req.headers.roomid;
                        const documentRef = collectionRef.doc(userid);
                        documentRef.get().then((docSnapshot) => {
                            if(docSnapshot.exists){
                                const data = docSnapshot.data();
                                if(data.premium == true){
                                   for(let i=0;i<data.room.length;i++){
                                       if(data.room[i].roomid == newroom){
                                       }
                                   }
                                   let array = [data.room] || [];
                                   const newd = {
                                       roomid:newroom,
                                       chats:[]
                                   }
                                   console.log(array)
                                   array.push(newd)
                                   collectionRef.doc(userid).update({
                                       room: array,
                                   }).then(() => {
                                       console.log('Created')
                                   }
                                   ).catch((error) => {
                                       console.error('Error updating document: ', error);
                                   });
                            }else{
                                let data = {response:'Looks like you are not a premium user. Please considure upgrading.', code:200}
                                       res.json(data)
                            }
                            }
                        });
                    }
                }else{
                    arrayData = data.chats
                }
                 // Replace with your actual field name
                const bot = new PaLM(headers['key']);
                let chat;
                if (data.premium == true) {
                    chat = bot.createChat({ messages: arrayData })
                } else {
                    chat = bot.createChat()
                }
                const toask = await chat.ask(headers['message']);
                let datsa = { response: toask, code: 200 }
                res.json(datsa)
                if(data.premium == true){
                    let doc1 = [{ content: headers['message'] }, { content: toask }]
                for (let i = 0; i < doc1.length; i++) {
                    arrayData.push(doc1[i])
                }
                if(data.premium == true){
                    if(headers['roomid']){
                        collectionRef.doc(headers['userid']).update({
                            ['room.' + headers['roomid'].toString() + '.chats']: arrayData,
                        }).then(() => {
                            console.log('Document successfully updated!');
                        }
                        ).catch((error) => {
                            console.error('Error updating document: ', error);
                        });
                    }
                }else{
                    collectionRef.doc(headers['userid']).update({
                        chats: arrayData,
                    }).then(() => {
                        console.log('Document successfully updated!');
                    }
                    ).catch((error) => {
                        console.error('Error updating document: ', error);
                    });
                }
                }



            } else {
                let data = { response: 'You are not registered', code: 503 }
                res.json(data)
                console.log('Document does not exist');
            }
        })
        .catch((error) => {
            let data = { response: 'Error getting document:'+error, code: 400 }
            res.json(data)
            console.error('Error getting document:', error);
        });


});

app.get('/register', async (req, res) => {
    //get all data length
    const headers = req.headers;
    const snapshot = await collectionRef.count().get();
    let newData ={}
if(snapshot.data().count<=120){
  newData = {
    chats: [],
    premium:true,
    room:[
        {
            roomid:12345,
            chats:[]
        },
        {
            roomid:123456,
            chats:[]
        }
    ]
};
}else{
  const currentDate = new Date();

// Set the date to the first day of the next month
currentDate.setMonth(currentDate.getMonth() + 1, 1);
  newData = {
    chats: [],
    premium:false,
    images:900,
    resetDate:currentDate.toDateString(),
    room:[
        {
            roomid:12345,
            chats:[]
        },
        {
            roomid:123456,
            chats:[]
        }
    ]
};
}

  collectionRef.add(newData)
      .then((docRef) => {
          let data = { response: 'User registered', code: 200 , newid: docRef.id}
          res.json(data)
      })
      .catch((error) => {
          console.error('Error adding document: ', error);
      });

})
app.get('/ping', async (req, res) => {
    //get actual ping
    let data = { response: 'pong', code: 200 }
    res.json(data)
})
app.get('/images', async (req, res) => {
    const text = req.headers.prompt;
    if(!text) return res.status(400).send('Text is required.');
    //check if the user is premium

    const documentRef = collectionRef.doc(req.headers['userid']);
    documentRef.get().then(async (docSnapshot) => {
        if(docSnapshot.exists){
            const data = docSnapshot.data();
            if(data.premium == true){
                const images = await scrape(text, req.headers['number'] | 9);
                let data = {response:images, code:200}
                res.json(data)
            }else{
              if(data.resetDate == new Date().getMonth().toString()){
                documentRef.get().then((docSnapshot) => {
                  if(docSnapshot.exists){
                      const data = docSnapshot.data();
                          collectionRef.doc(req.headers['userid']).update({
                              images: 600,
                              resetDate: new Date().getMonth().toDateString()
                          }).then(() => {
                              console.log('Document successfully updated!');
                          }
                          ).catch((error) => {
                              console.error('Error updating document: ', error);
                          });
                  }
              });
              }

              if(data.images>0){
                const images = await scrape(text);
              let data = {response:images, code:200}
              //update user
              const documentRef = collectionRef.doc(req.headers['userid']);
              documentRef.get().then((docSnapshot) => {
                  if(docSnapshot.exists){
                      const data = docSnapshot.data();
                          collectionRef.doc(req.headers['userid']).update({
                              images: data.images - headers['number'] | 9,
                          }).then(() => {
                            res.json(data);
                              console.log('Document successfully updated!');
                          }
                          ).catch((error) => {
                            res.json({response:'Error updating document: '+error, code:400});
                              console.error('Error updating document: ', error);
                          });
                  }
              });
              }else{
                res.json({response:'You have reached your limit. Please upgrade to premium to get unlimited images.', code:200});
              
              }
            }
        }
    });
});
app.get('/update', async (req,res) =>{
  const userid = req.headers.userid;
  //get every next moth date
// Get the current date
const currentDate = new Date();

// Set the date to the first day of the next month
currentDate.setMonth(currentDate.getMonth() + 1, 1);

// Display the result


  const newData = {
    images:900,
    resetDate:currentDate.toDateString()
  }
});
app.get("/v1/gemini/:model", async (req,res) =>{
    const model =  req.params.model;
    if(!model) return res.json({response:'Not a valid model'})
    const headers = req.headers;
    if(model == "gemini-pro"){
if(!headers['api_key']) return res.json({response:'Please enter a api key'})
if(!headers['text']) return res.json({response:'Pleae enter your question'})
        const genAI = new GoogleGenerativeAI(headers['api_key']);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro'});
  const generationConfig = {
    temperature: headers['temperature'] || 1,
    topK: headers['top-k'] || 1,
    topP: headers['top-p'] || 1,
    maxOutputTokens: headers['maxOutputTokens']|| 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];
  const parts = [
    {text: headers['text']},
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response;
  res.json({response:response.text(), code:200});
    }
    if(model == "gemini-pro-vision"){
       return res.json({response:"We are currently working on it"});
        const headers = req.headers;
        if(!headers['api-key']) return res.json({response:'Please enter a api key'})
if(!headers['text']) return res.json({response:'Pleae enter your question'})
if(!headers['image-url']) return res.json({response:"Please nter a image url"})
        const genAI = new GoogleGenerativeAI(headers['api-key']);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro'});

  const generationConfig = {
    temperature: headers['temperature'] || 1,
    topK: headers['top-k'] || 1,
    topP: headers['top-p'] || 1,
  };

        const safetySettings = [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
        ];
      
        if (!fs.existsSync(downloadAndDeleteImage(req.headers['image-url'], './tmp'))) {
          throw new Error("Could not find images in current directory.");
        }
      
        const parts = [
          {text: "Describe what the people are doing in this image:\n"},
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: Buffer.from(fs.readFileSync(downloadAndDeleteImage(req.headers['image-url'], './tmp'))).toString("base64")
            }
          },
        ];
      
        const result = await model.generateContent({
          contents: [{ role: "user", parts }],
          generationConfig,
          safetySettings,
        });
      
        const response = result.response;
        res.json({response:response.text(), code:200})
    }
})
app.listen(port, () => {
    console.log(`Server is running on port ${port} . you can now send requests.`);
});
