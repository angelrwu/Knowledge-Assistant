// import { html, render } from './lit-html.js';
    // import { html, render } from './lit-html.js';
    // const markup = `
    // <h1>test</h1>
    // <p>test2</p>
    // `;
    // render(markup, document.body);
    
function getTinyMCEVocabularySet(){

    var temp =  tinymce.activeEditor.getContent({format:"html"});
    lines = temp.split("\n");
    var vocabularySet = new vocabularySet;
    for(i = 0; i < lines.length; i++){
        keyword = getStrong(lines[i]);
        definition = getParagraph(lines[i]);
        var vocabulary = new vocabulary;
        vocabulary = {keyword,defintion};
        vocabularySet.unknown.push(vocabulary);
    }
    return vocabularySet;
}

function flashcard(){

    var temp =  tinymce.activeEditor.getContent({format:"html"});
    lines = temp.split("\n");
    
    for(i = 0; i < lines.length; i++){
        keyword = getStrong(lines[i]);
        definition = getParagraph(lines[i]);

        var keywordEntry = document.getElementsByClassName("flashcard")[0];
        var definitionEntry = document.getElementsByClassName("flashcard")[0];
        keywordEntry = keywordEntry.getElementsByTagName("h1");
        definitionEntry = definitionEntry.getElementsByTagName("p");
        keywordEntry[i].innerHTML = keyword;
        definitionEntry[i].innerHTML = definition;
    }
}

function fillInTheBlank(){
  var temp =  tinymce.activeEditor.getContent({format:"html"});
    lines = temp.split("\n");
    
    for(i = 0; i < lines.length ; i++){
        keyword = getStrong(lines[i]);
        definition = getParagraph(lines[i]);

        var keywordEntry = document.getElementsByClassName("flashcard")[0];
        var definitionEntry = document.getElementsByClassName("flashcard")[0];
        keywordEntry = keywordEntry.getElementsByTagName("h1");
        definitionEntry = definitionEntry.getElementsByTagName("p");
        keywordEntry[i].innerHTML = "______" + definition;
        //todo add a textfield with almost no formatting lower border
        //todo make a function to check lower case string no spaces to match
        definitionEntry[i].innerHTML = keyword;
    }
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

function feedback(feedback){
    var vocabularySet;

    if(feedback == 2){//good


    } else if(feedback == 1){//neutral
        

    } else if(feedback == 0){//bad
        

    }

}

var vocabularySet = {
    unknown:[],
    wrong:[],
    maybe:[],
    right:[],
    writeJSON: function(object, fileName){
        json = JSON.stringify(object);
        localStorage.setItem(fileName, json);
    },
    readJSON: function(jsonName){
        jsonText = localStorage.getItem(jsonName);
        vocabularySet = JSON.parse(jsonText);//check
        return vocabularySet;
    }
}

var vocabulary = {
    keyword: " ",
    defintion: " "
}

function loadFiles(){//DEPRECATED: impossible to get data from local files
    //TODO implement with an online service like firebase
    var jsonText = "{\"fileNames\": [\"test1\",\"test2\",\"test3\",\"test4\"]}";
    var json = {"fileNames": ["test1","test2","test3","test4"]};
    var object = JSON.parse(jsonText);
    console.log(json);
    for(i = 0 ; i < 4; i++){
        console.log(json["fileNames"][i]);
    }
}


var unknown = [["a","is alpha"],["b","is beta"],["c","is charly"],["d","is delta"]];
var wrong = [];
var maybe = [];
var right = [];
var position = 0;
function temporary(){
    
    var keywordEntry = document.getElementsByClassName("fc-front")[0];
    var definitionEntry = document.getElementsByClassName("fc-back")[0];
    keywordEntry = keywordEntry.getElementsByTagName("h1");
    definitionEntry = definitionEntry.getElementsByTagName("p");
    keywordEntry[0].innerHTML = unknown[position][0];
    definitionEntry[0].innerHTML = unknown[position][1];
}

function temporaryb(list){
    
    var keywordEntry = document.getElementsByClassName("fc-front")[0];
    var definitionEntry = document.getElementsByClassName("fc-back")[0];
    keywordEntry = keywordEntry.getElementsByTagName("h1");
    definitionEntry = definitionEntry.getElementsByTagName("p");
    if(list == 0){
        keywordEntry[0].innerHTML = unknown[position][0];
        definitionEntry[0].innerHTML = unknown[position][1];
    }else if(list == 1){
        keywordEntry[0].innerHTML = wrong[position][0];
        definitionEntry[0].innerHTML = wrong[position][1];
    }else if(list == 2){
        keywordEntry[0].innerHTML = maybe[position][0];
        definitionEntry[0].innerHTML = maybe[position][1];
    }else if(list == 3){
        keywordEntry[0].innerHTML = right[position][0];
        definitionEntry[0].innerHTML = right[position][1];
    }
}

function tempfeedback(feedback){
    
    if(unknown.length != 0){
        if(feedback == 2){//good
            maybe.push(unknown.shift());
        } else if(feedback == 1){//neutral
            wrong.push(unknown.shift());

        } else if(feedback == 0){//bad
            wrong.push(unknown.shift());
        }
        temporaryb(0);
    } else if(wrong.length != 0){
        if(feedback == 2){//good
            maybe.push(wrong.shift());
        } else if(feedback == 1){//neutral
            wrong.push(wrong.shift());

        } else if(feedback == 0){//bad
            wrong.push(wrong.shift());
        }
        temporaryb(1);
    }else if(maybe.length != 0){
        if(feedback == 2){//good
            right.push(maybe.shift());
        } else if(feedback == 1){//neutral
            wrong.push(maybe.shift());

        } else if(feedback == 0){//bad
            wrong.push(maybe.shift());
        }
        temporaryb(2);
    }else if(right.length != 0){
        if(feedback == 2){//good
            right.push(right.shift());
        } else if(feedback == 1){//neutral
            wrong.push(right.shift());

        } else if(feedback == 0){//bad
            wrong.push(right.shift());
        }
        temporaryb(3);
    }
    console.log("Unknown " + unknown.length);
    console.log("wrong   " + wrong.length);
    console.log("maybe   " + maybe.length);
    console.log("right   " + right.length);
}


function serverCall(){
    const Http = new XMLHttpRequest();
    const url = 'http://127.0.0.1:8080/';
    Http.open("GET",url);
    Http.send;

    Http.onreadystatechange = (e) => {
        console.log(Http.responseText);
    }
    console.log(Http.status);

    console.log("sup");

}


