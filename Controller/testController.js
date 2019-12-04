function server(){
    return "";
}

function jsonFolders(){
    let json = new Object;
    let foldersArray = new Array;
    json.foldersArray = foldersArray;
    
        //folder
        let folder = new Object;
        folder.fileName = "testFile";
        folder.vocabularySet = new Object;
            //vocavulary set
            let vocabSet = new Object;
            vocabSet.template = "flashcard";
            vocabSet.vocab = Array;
                //vocavulary
                let vocab = new Object;
                vocab.keyword = "B";
                vocab.definition = "is for beta";
                vocab.knows = 0;
            vocabSet.vocab = vocab;
        folder.vocabularySet = vocabSet;
    foldersArray.push(folder);
    folder.fileName = "testfile2"
    foldersArray.push(folder);
    json.foldersArray = foldersArray;

    console.log(JSON.stringify(json));
    console.log(JSON.parse(JSON.stringify(json)));
}

function setFoldersArray(fileName,vocabSet){
    let foldersArray = new Array;
        //folder
        let folder = new Object;
        folder.fileName = fileName;
        //vocavulary set
        folder.vocabularySet = new Object;
        folder.vocabularySet = vocabSet;
    foldersArray.push(folder);

    console.log(JSON.stringify(foldersArray));
}