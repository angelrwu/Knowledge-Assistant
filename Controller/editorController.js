// function getTinyMCEVocabularySet(){

//     var temp =  tinymce.activeEditor.getContent({format:"html"});
//     lines = temp.split("\n");
//     var vocabularySet = new vocabularySet;
//     for(i = 0; i < lines.length; i++){
//         keyword = getStrong(lines[i]);
//         definition = getParagraph(lines[i]);
//         var vocabulary = new vocabulary;
//         vocabulary = {keyword,defintion};
//         vocabularySet.unknown.push(vocabulary);
//     }
//     return vocabularySet;
// }

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

function flashcardTemplate(flashcard){
    return `
    <div class="fc">
    <div class="fc-container">
        <div class="fc-front">
            <h1>${flashcard.keyword}</h1>
        </div>
        <div class="fc-back">
            <p>${flashcard.definition}</p>
                <button onclick = "javascript:good()">Good</button>
                <button onclick = "javascript:good()">Neutral</button>
                <button onclick = "javascript:bad()">Bad</button>
        </div>
    </div>
    </div>
    `
};

function fillInTheBlankTemplate(flashcard){
    return `
    <div class="fc">
    <div class="fc-container">
        <div class="fc-front">
            <h1>______${flashcard.definition}</h1>
        </div>
        <div class="fc-back">
            <p>${flashcard.keyword}</p>
                <button onclick = "javascript:good()">Good</button>
                <button onclick = "javascript:good()">Neutral</button>
                <button onclick = "javascript:bad()">Bad</button>
        </div>
    </div>
    </div>
    `
};

function fillTemplate(vocab,template){
    // document.getElementsByClassName("flashcard")[0].innerHTML += flashcardHTML;
    document.getElementsByClassName("flashcard")[0].innerHTML = vocab.map(template).join('');
};