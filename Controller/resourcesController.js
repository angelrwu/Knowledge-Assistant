function insertFolders(){
    // let tempfileName = getLocalStorage(); 
    console.log(getLocalStorage());
    console.log("testing");
    document.getElementsByClassName("folders")[0].innerHTML = getLocalStorage().map(folderTemplate).join('');
    // document.getElementsByClassName("folders")[0].innerHTML = jsonFile.map(folderTemplate).join('');
}

function setCurrentFolder(fileName){
    console.log(`${fileName} is current`);
    // var lcstrorage = getLocalStorage();
    var currentFile =  getLocalStorage().filter(function (i) {return i.fileName == fileName});
    localStorage.setItem("currentFile",JSON.stringify(currentFile));
    // set(500);
    // console.log(localStorage.getItem("currentFile") );
}