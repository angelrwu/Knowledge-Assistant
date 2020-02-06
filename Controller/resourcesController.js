function insertFolders(){
    //It a onload script that populates the page with a folder svg, and the FileName
    document.getElementsByClassName("folders")[0].innerHTML = getLocalStorage().foldersArray.map(folderTemplate).join('');
}

function setCurrentFolder(fileName){
    //Set the current folder being work on for the quizController script to be able to access, as i can't transfer function through links, so it stored in local storage. 
    var currentFile =  getLocalStorage().foldersArray.filter(function (i) {return i.fileName == fileName});
    localStorage.setItem("currentFile",JSON.stringify(currentFile));
}