
console.log(JSON.parse(localStorage.getItem("currentFile"))[0].vocabularySet.vocab);
console.log(JSON.parse(localStorage.getItem("currentFile"))[0].vocabularySet.template);
let template = templateTypeToTemplate(JSON.parse(localStorage.getItem("currentFile"))[0].vocabularySet.template); 
var unknown = JSON.parse(localStorage.getItem("currentFile"))[0].vocabularySet.vocab.filter(function (i) {return i.knows == 0})
var maybe = JSON.parse(localStorage.getItem("currentFile"))[0].vocabularySet.vocab.filter(function (i) {return i.knows == 1})
var wrong = JSON.parse(localStorage.getItem("currentFile"))[0].vocabularySet.vocab.filter(function (i) {return i.knows == 2})
var right = JSON.parse(localStorage.getItem("currentFile"))[0].vocabularySet.vocab.filter(function (i) {return i.knows == 3})

var position = 0;

//TODO do an import instead of copy 
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

function temporary(){
    fillTemplateWithVocab(unknown[position],template);
}

function quizSelector(list){
    if(list == 0){
        fillTemplateWithVocab(unknown[position],template);
    }else if(list == 1){
        fillTemplateWithVocab(wrong[position],template);
    }else if(list == 2){
        fillTemplateWithVocab(maybe[position],template);
    }else if(list == 3){
        fillTemplateWithVocab(right[position],template);
    }
}

function quizFeedbackArrayHandler(goodArray,badArray, currentArray,feedback){
    if(feedback == 2){//good
        goodArray.push(currentArray.shift());
    } else if(feedback == 1){//neutral
        badArray.push(currentArray.shift());
    } else if(feedback == 0){//bad
        badArray.push(currentArray.shift());
    }
}
//make a routing such that if current list isn't empty then route to the lowest list, else keep going linear
function quizFeedbackRouteHandler(unknown,wrong,maybe,right){
    if(unknown.length != 0){//good
        quizSelector(0);
    } else if(wrong.length != 0){//neutral
        quizSelector(1);
    } else if(maybe.length != 0){//neutral
        quizSelector(2);
    } else if(right.length != 0){//neutral
        quizSelector(3);
    } 
}

function tempfeedback(feedback){
    
    if(unknown.length != 0){
        quizFeedbackArrayHandler(maybe,wrong,unknown,feedback);
        quizFeedbackRouteHandler(unknown,wrong,maybe,right);
    } else if(wrong.length != 0){
        quizFeedbackArrayHandler(maybe,wrong,wrong,feedback);
        quizFeedbackRouteHandler(unknown,wrong,maybe,right);
    }else if(maybe.length != 0){
        quizFeedbackArrayHandler(right,wrong,maybe,feedback);
        quizFeedbackRouteHandler(unknown,wrong,maybe,right);
    }else if(right.length != 0){
        quizFeedbackArrayHandler(right,wrong,right,feedback);
        quizFeedbackRouteHandler(unknown,wrong,maybe,right);
    }

    console.log("Unknown " + unknown.length);
    console.log("wrong   " + wrong.length);
    console.log("maybe   " + maybe.length);
    console.log("right   " + right.length);
}