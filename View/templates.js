function flashcardTemplate(flashcard){
    return `
    <div class="fc">
        <div class="fc-container">
                <div class="fc-front">
                    <h1>${flashcard.keyword}</h1>
                </div>
                <div class="fc-back">
                    <p>${flashcard.definition}</p>
                    ${feedbackTemplate()}
                </div>
        </div>
    </div>
    `
};

function fillTheBlankTemplate(flashcard){
    return `
    <div class="fc">
    <div class="fc-container">
        <div class="fc-front">
            <h1>______${flashcard.definition}</h1>
        </div>
        <div class="fc-back">
            <p>${flashcard.keyword}</p>
            ${feedbackTemplate()}
        </div>
    </div>
    </div>
    `
};

function feedbackTemplate(){
    return `
    <button class = "good" onclick = "javascript:tempfeedback(2)">Got It!</button>
    <button class = "neutral" onclick = "javascript:tempfeedback(1)">Almost got it.</button>
    <button class = "bad" onclick = "javascript:tempfeedback(0)">I'll get it next time</button>
    `
}

//testing w3 school https://www.w3schools.com/html/html5_draganddrop.asp
//todo use grids
//use 1fr to maintain hieght consistency
//use a querry to get the biggest length of the keyword as the length of the draggable zone
//define data prevention logic. rn if you drag over existing items they will be overwritten and stop existing
//fix the issue with repeating id as this causes for similar keywords to drag the first and never the second, thus add some number
// make a randomize function for this 
function dragTheWordTemplate(flashcard){
    return `
    <div class = "dragTheWord">
        <div><p id = "${flashcard.keyword}" draggable = "true"  ondragstart="drag(event)" >${flashcard.keyword}</p></div>
        <div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
        <p>${flashcard.definition}</p>
    </div>
    `
}

function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }

function folderTemplate(jsonFile){//Todo replace the path with an relative path based on the fileName
    // console.log(jsonFile.fileName)
    return `
    <figure onclick= "setCurrentFolder('${jsonFile.fileName}')">
        <a href = "../View/Quizing.html"><img src = "../res/folder.svg" height="100px" weight = "100px"></a>
        <figcaption>${jsonFile.fileName}</figcaption>
    </figure>
    `;
};