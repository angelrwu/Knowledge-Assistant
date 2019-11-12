function makeTemplate(template){

    var temp =  tinymce.activeEditor.getContent({format:"html"});
    lines = temp.split("\n");
    let json = setJSON(template,lines);

    fillTemplate(json.vocab, template);
    // setLocalStorage(json);
    let folder = setFoldersArray("tempFileName", json)
    setLocalStorage(folder);
    getLocalStorage();
}

function addTemplate(template){//TODO testing multifiles currently manual replace tempfilename2 with a var field
    //TODO simply this and the other add function at the button
    //TODO use the make function extract the JSON, hold the previous one prior to running, get the second then merge them into a single object then re upload to local storage

    var temp =  tinymce.activeEditor.getContent({format:"html"});
    lines = temp.split("\n");
    let json = setJSON(template,lines);

    let hold = getLocalStorage();
    makeTemplate(template);
    let newhold = getLocalStorage();
    newhold.foldersArray[0].fileName="tempFileName2";

    //merge them into one
    hold.foldersArray.push(newhold.foldersArray[0]);
    setLocalStorage(hold);

}

function getStrong(originalText){
    var start = originalText.search("<strong>") + 8;
    var end = originalText.search("</strong>");
    var finalText = originalText.substring(start,end );
    return String(finalText);
}

function getParagraph(originalText){
    var start = originalText.search("</strong>") + 9;
    var end = originalText.search("</p>");
    var finalText = originalText.substring(start,end);
    return finalText;
}

function fillTemplate(vocabset,template){
    // document.getElementsByClassName("flashcard")[0].innerHTML += flashcardHTML;
    document.getElementsByClassName("flashcard")[0].innerHTML = vocabset.map(template).join('');
};

function fillTemplateWithVocab(vocab,template){
    // document.getElementsByClassName("flashcard")[0].innerHTML += flashcardHTML;
    document.getElementsByClassName("flashcard")[0].innerHTML = (template(vocab));
};

function setJSON(template, splitText){
    if (template == flashcardTemplate){
        template = "flashcard";
    }else if(template == fillTheBlankTemplate){
        template = "fillTheBlank";
    }else if(template == dragTheWordTemplate){
        template = "dragTheWord";
    }
    
    let newJSON = new Object();
    newJSON.template = template;
    newJSON.vocab = new Array();

    for( let j = 0; j < splitText.length; j++){
        let newvocab = new Object();
        newvocab.keyword = getStrong(splitText[j]);;
        newvocab.definition = getParagraph(splitText[j]);
        newvocab.knows = 0;
        newJSON.vocab.push(newvocab);
    }
    return newJSON;
}

function setLocalStorage(json){
    // localStorage.clear;
    localStorage.setItem("json", JSON.stringify(json));
}

function getLocalStorage(){
    // console.log(JSON.parse(localStorage.getItem("json")));
    return JSON.parse(localStorage.getItem("json"));
}

// function jsonFolders(){
//     let foldersArray = new Array;
//         //folder
//         let folder = new Object;
//         folder.fileName = "testFIle";
//         folder.vocabularySet = new Object;
//             //vocavulary set
//             let vocabSet = new Object;
//             vocabSet.template = "flashcard";
//             vocabSet.vocab = Array;
//                 //vocavulary
//                 let vocab = new Object;
//                 vocab.keyword = "B";
//                 vocab.definition = "is for beta";
//                 vocab.knows = 0;
//             vocabSet.vocab = vocab;
//         folder.vocabularySet = vocabSet;
//     foldersArray.push(folder);

//     console.log(JSON.stringify(foldersArray));
// }

function setFoldersArray(fileName,vocabSet){
    let foldersArray = new Array;
        //folder
        let folder = new Object;
        folder.fileName = fileName;
        //vocavulary set
        folder.vocabularySet = new Object;
        folder.vocabularySet = vocabSet;
    foldersArray.push(folder);


    // console.log(JSON.stringify(foldersArray));
    return foldersArray;
}