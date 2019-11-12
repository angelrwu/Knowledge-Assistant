function folderTemplate(jsonFile){//Todo replace the path with an relative path based on the fileName
    return `
    <figure onclick = setCurrentFolder(${jsonFile.fileName})>
        <a href = "../View/Quizing.html"><img src = "../res/folder.svg" height="100px" weight = "100px"></a>
        <figcaption>${jsonFile.fileName}</figcaption>
    </figure>
    `;
};

function insertFolders(){
    document.getElementsByClassName("folders")[0].innerHTML = jsonFile.map(folderTemplate).join('');
}