const fs = require('fs');
const path = require('path');
const {EventEmitter} = require('events');
const event = new EventEmitter();
const os = require('os');
const zlib = require("zlib");
const { pipeline } = require("stream");

//1
function dir_file_name(){
    console.log(__dirname);
    console.log(__filename);
}
dir_file_name();

//2
function name_file(pth){
    console.log(path.basename(pth));
}
name_file(__filename);

//3
function pth_conc(obj){
    let {dir,name,ext} = obj;
    let pth = path.posix.join(dir,name+ext);
    console.log(pth);
}
obj = {dir:"/folder", name:"app", ext:".js"}
pth_conc(obj);

//4
function ext(pth){
    console.log(path.extname(pth));
}
ext(__filename);

//5
function prs(pth){
    return {
        Name: path.basename(pth, path.extname(pth)),
        Ext: path.extname(pth)
    };
}
console.log(prs(__filename));

//6
function isabs(pth){
    return path.isAbsolute(pth);
}
console.log(isabs(__dirname));

//7
function pth_conc_2(...objs){
    let pth = path.posix.join(...objs);
    console.log(pth);
}
pth_conc_2("src","components", "App.js");

//8
function to_aps(pth){
    console.log(path.posix.join(__dirname,pth));
}
to_aps("./main.js");

//9
function two_pths(pth1,pth2){
    console.log(path.posix.join(pth1,pth2));
}
two_pths("./file1","/file2/file.txt");

//10
// function dlt_file(file){
//     fs.rm(file,{recursive:true}, (err)=>{
//         console.log("The file text is deleted");
//         err && console.log(err);
//     });
// }
// dlt_file('kofta.txt')

//11
function crt_folder(name){
    fs.mkdirSync(name,{recursive:true});
    console.log("Success");
}
crt_folder("kofta1");

//12
event.on("start",function(){
    console.log("Welcome event triggered!")
});
event.emit("start");

//13
event.on("login",function(name){
    console.log("User logged in: "+name)
});
event.emit("login","ali");

//14
const data= fs.readFileSync("kabab.txt","utf-8");
console.log(data);

//15
fs.writeFileSync("kabab.txt"," Hello from SuperMan",{flag: 'a'});

//16
let x= "./kabab.txt";
console.log(fs.existsSync(x));

//17
function specs(){
    return {
        platform: os.platform(), 
        architecture: os.arch()
    };
}
console.log(specs());

//18
let cnt =0;
const readStream= fs.createReadStream('rysh.txt',{});
readStream.on('data',(chunk)=>{
    console.log(++cnt);
    console.log(chunk);
    console.log("==========================================================")
});

//19
// const readStream2= fs.createReadStream('src.txt',{});
// const writeStream= fs.createWriteStream('dst.txt',{})

// readStream2.on('data',(chunk)=>{
//     writeStream.write(chunk);
// });

// readStream2.on('end',()=>{
//     console.log("READING FINISHED");

//     writeStream.end();

//     console.log("File copied using streams");
// })
//orrrrrr
const readStream2 = fs.createReadStream("src.txt");
const writeStream = fs.createWriteStream("dst.txt");

readStream.pipe(writeStream);

writeStream.on("finish", () => {
    console.log("File copied using streams");
});

//20
pipeline(
  fs.createReadStream("./data.txt"),
  zlib.createGzip(),
  fs.createWriteStream("./data.txt.gz"),
  (err) => {
    if (err) {
      console.log("Error:", err);
    } else {
      console.log("File compressed successfully!");
    }
  }
);