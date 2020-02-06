function saveTemplate(){
    //get all of the data
    let hold = getLocalStorage();
    let templateType = document.getElementsByName("templateType");
    //parsing through the radio buttons to get the selected item
    for(let i = 0;i< templateType.length;i++){
        if(templateType[i].checked){
            templateType = templateType[i].value;
            break;
        }
    }
    let template = templateTypeToTemplate(templateType);
    
    let fileName = document.getElementById("formFileName").value;
    document.getElementById("formFileName").innerText="";
    let vocavulary =  tinymce.activeEditor.getContent({format:"html"});

    //Write the first folder structure
    lines = vocavulary.split("\n");
    let json = setJSON(templateType,lines);
    fillTemplate(json.vocab, template);
    let folder = setFoldersArray(fileName, json)
    setLocalStorage(folder);
    getLocalStorage();

    //Adds items when storage is filled
    if(window.localStorage.length > 0){
        let newhold = getLocalStorage();
        newhold.foldersArray[0].fileName= fileName;
        hold.foldersArray.push(newhold.foldersArray[0]);
        setLocalStorage(hold);
    }
}

function templateTypeToTemplate(templateType){
    let template = flashcardTemplate;
    if (templateType == "flashcard"){
        template = flashcardTemplate;
    }else if(templateType == "fillTheBlank"){
        template = fillTheBlankTemplate;
    }else if(templateType == "dragTheWord"){
        template = dragTheWordTemplate;
    }
    return template;
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
    console.log(JSON.stringify(template));
    console.log(newJSON.template);
    return newJSON;
}

function setLocalStorage(json){
    // localStorage.clear;
    localStorage.setItem("json", JSON.stringify(json));
}

function getLocalStorage(){
    return JSON.parse(localStorage.getItem("json"));
}

function setFoldersArray(fileName,vocabSet){
    let json = new Object;
    let foldersArray = new Array();
    json.foldersArray = foldersArray;
        //folder
        let folder = new Object;
        folder.fileName = fileName;
        //vocavulary set
        folder.vocabularySet = new Object;
        folder.vocabularySet = vocabSet;
    foldersArray.push(folder);
    return json;
}