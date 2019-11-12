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