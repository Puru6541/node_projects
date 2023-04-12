let fs = require("fs");
let path = require("path");
let types ={
    media:["mp4","mkv"],
    archives:["zip","7z","rar","tar","gz","ar","iso","xz"],
    documents: ["docx","doc","pdf","xlsx","xls","odt","ods","odp","odg","odf","txt","ps","txt"],
    app:["exe","dmg","pkg","deb"]
}
function organiseFn(dirPath){
    // console.log("organise command implement for " , dirPath);
    let destPath;
    if(dirPath == undefined){
        destPath = process.cwd();
        return;
    } else {
         let doesExist = fs.existsSync(dirPath);
         if(doesExist){
             destPath = path.join(dirPath,"organised_files");
             if(fs.existsSync(destPath)== false){

                 fs.mkdirSync(destPath);
            }
         } else {
            console.log("kindly enter the correct  path");
            return;
         }
    }
    organiseHelper(dirPath,destPath);
}
function organiseHelper(src,dest){
    let childNames = fs.readdirSync(src);
    for(let i=0;i<childNames.length;i++){
        let childAddress = path.join(src,childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if(isFile){
            // console.log(childNames[i]);
            let category = getCategory(childNames[i]);
            console.log(childNames[i],"belongs to --> ",category);
            sendFiles(childAddress,dest,category);
        }
    }

}
function sendFiles(srcFilePath,dest,category){
    let categoryPath = path.join(dest,category);
    if(fs.existsSync(categoryPath)== false){
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath,fileName);
    fs.copyFileSync(srcFilePath,destFilePath);
    fs.unlinkSync(srcFilePath);
    console.log(fileName,"copied to" , category);
}
function getCategory(name){
    let ext = path.extname(name);
    ext = ext.slice(1);
    for(let type in types){
        let cTypesArray = types[type];
        for(let i=0;i<cTypesArray.length; i++){
            if(ext == cTypesArray[i]){
                return type;
            }
        }
    }
    return "others";
}
module.exports = {
    organiseKey : organiseFn
}