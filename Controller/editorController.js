function makeTemplate(template){

    var temp =  tinymce.activeEditor.getContent({format:"html"});
    lines = temp.split("\n");
    let newVocab = new Object();
    newVocab.vocabularySet = new Array();;
    for(i = 0; i < lines.length; i++){
        let newobj = new Object();
        newobj.keyword = getStrong(lines[i]);
        newobj.definition = getParagraph(lines[i]);
        newVocab.vocabularySet.push( newobj);
        console.log(newVocab.vocabularySet[0]);
    }
    fillTemplate(newVocab.vocabularySet, template)
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