const http = require('http');

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(`You requested: ${req.url.substring(1)}`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

server.on("GET",(req)=>{
  console.log(req.url);
});

// function helloworld(){
//  let text = "hellow world";
//  console.log(`test1:   ${text}`);
// };
// helloworld();



// const fs = require("fs");
// fs.readFile("./json/flashCard00.json","UTF-8",(err,jsonFile)=>{
//     if (err){
//         throw err;
//     }else{
//         console.log(jsonFile);
//     }
// });

// let fileName = "flashCard01"
// let fileText = `
// {
//     "vocabularySet": [
        
//     ]
// }
// `;
// fs.writeFile(`./json/${fileName}.json`, fileText.trim(), err=>{
//     if(err){
//         throw err;
//     }else{
//         console.log("File saved!");
//     }
// });



//note make a file creation system to make sure that the structure is set up.
//if(fs.existsSync())
//else{fs.mkdir("helloworld",err=>{if(err){throw err;}else{console.log("directory created")}})}