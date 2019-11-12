console.log(JSON.parse(localStorage.getItem("currentFile"))[0].vocabularySet.vocab);
var unknown = JSON.parse(localStorage.getItem("currentFile"))[0].vocabularySet.vocab.filter(function (i) {return i.knows == 0})
var maybe = JSON.parse(localStorage.getItem("currentFile"))[0].vocabularySet.vocab.filter(function (i) {return i.knows == 1})
var wrong = JSON.parse(localStorage.getItem("currentFile"))[0].vocabularySet.vocab.filter(function (i) {return i.knows == 2})
var right = JSON.parse(localStorage.getItem("currentFile"))[0].vocabularySet.vocab.filter(function (i) {return i.knows == 3})

var position = 0;

function temporary(){
    fillTemplateWithVocab(unknown[position],fillTheBlankTemplate);
}

function quizSelector(list){
    if(list == 0){
        fillTemplateWithVocab(unknown[position],fillTheBlankTemplate);
    }else if(list == 1){
        fillTemplateWithVocab(wrong[position],fillTheBlankTemplate);
    }else if(list == 2){
        fillTemplateWithVocab(maybe[position],fillTheBlankTemplate);
    }else if(list == 3){
        fillTemplateWithVocab(right[position],fillTheBlankTemplate);
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