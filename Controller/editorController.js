function makeTemplate(template){

    var temp =  tinymce.activeEditor.getContent({format:"html"});
    lines = temp.split("\n");
    let json = setJSON(template,lines);
    
    fillTemplate(json.vocab, template);
    setLocalStorage(json);
    getLocalStorage();
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
    localStorage.clear;
    localStorage.setItem("json", JSON.stringify(json));
}

function getLocalStorage(){
    console.log(JSON.parse(localStorage.getItem("json")));
}