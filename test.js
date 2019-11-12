function server(){
    return "";
}
//I gave up with the server stuff, imma just go with local storage and hope it never reaches 5MB
const testJson = {
    template: "flashcard",
    vocab:
    [
        {
            keyword:"A",
            definition:"is for Alpha",
            knows:0
        },
        {
            keyword:"B",
            definition:"is for Beta",
            knows:1
        },
        {
            keyword:"C",
            definition:"is for Charley",
            knows:0
        },
        {
            keyword:"D",
            definition:"is for Delta",
            knows:0
        }
    ]
};

function setLocalStorage(){
    localStorage.clear;
    localStorage.setItem("json", JSON.stringify(testJson));
}

function getLocalStorage(){
    console.log(JSON.parse(localStorage.getItem("json")));
}

// function testSetJSON(){
//     let testJSON = setJSON(flashcardTemplate,[`<strong>B</strong> is the beta`,`<strong>A</strong> is the alpha`,]);
//     console.log(JSON.stringify(setJSON(flashcardTemplate,[`<strong>B</strong> is the beta`,`<strong>A</strong> is the alpha`])));
//     console.log(testJSON.vocab[1].keyword);
//     console.log(testJSON.vocab[1].definition);
//     console.log(testJSON.vocab[1].knows);
//     console.log(testJSON.vocab[0].keyword);
//     console.log(testJSON.vocab[0].definition);
//     console.log(testJSON.vocab[0].knows);
// }

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

    let newvocab = new Object();
    for(let i = 0; i < splitText.length; i++){
        newvocab.keyword = getStrong(splitText[i]);;
        newvocab.definition = getParagraph(splitText[i]);
        newvocab.knows = 0;
        newJSON.vocab.push(newvocab);
        console.log(i);
    }
    return newJSON;
}