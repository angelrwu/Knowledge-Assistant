function server(){
    return "";
}

const vocabularySet2 = {
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

function fillTemplate2(vocab,template){
    // document.getElementsByClassName("flashcard")[0].innerHTML += flashcardHTML;
    document.getElementsByClassName("flashcard")[0].innerHTML = (template(vocab));
};


var unknown = vocabularySet2.vocab.filter(function (i) {return i.knows == 0})
var maybe = vocabularySet2.vocab.filter(function (i) {return i.knows == 1})
var wrong = vocabularySet2.vocab.filter(function (i) {return i.knows == 2})
var right = vocabularySet2.vocab.filter(function (i) {return i.knows == 3})

var position = 0;

function temporary(){
    fillTemplate2(unknown[position],fillTheBlankTemplate);
}

function quizSelector(list){
    
    var keywordEntry = document.getElementsByClassName("fc-front")[0];
    var definitionEntry = document.getElementsByClassName("fc-back")[0];
    keywordEntry = keywordEntry.getElementsByTagName("h1");
    definitionEntry = definitionEntry.getElementsByTagName("p");
    if(list == 0){
        fillTemplate2(unknown[position],fillTheBlankTemplate);
    }else if(list == 1){
        fillTemplate2(wrong[position],fillTheBlankTemplate);
    }else if(list == 2){
        fillTemplate2(maybe[position],fillTheBlankTemplate);
    }else if(list == 3){
        fillTemplate2(right[position],fillTheBlankTemplate);
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