let currentFolder = "Default";

const vocabularySet2 = [
    {
        keyword:"A",
        definition:"is for Alpha"
    },
    {
        keyword:"B",
        definition:"is for Beta"
    },
    {
        keyword:"C",
        definition:"is for Charley"
    },
    {
        keyword:"D",
        definition:"is for Delta"
    }
];

const jsonFile = [
    {
        fileName:"alphabetCodenames",
        vocabularySet:[
            {
                keyword:"A",
                definition:"is for Alpha"
            },
            {
                keyword:"B",
                definition:"is for Beta"
            },
            {
                keyword:"C",
                definition:"is for Charley"
            },
            {
                keyword:"D",
                definition:"is for Delta"
            }
        ]
    },
    {
        fileName:"random",
        vocabularySet:[
            {
                keyword:"Pi",
                definition:"is 3.14"
            },
            {
                keyword:"Tao",
                definition:"is 6.28"
            },
            {
                keyword:"Astrology",
                definition:"the believe that the stars can determine one's life properties or story"
            },
            {
                keyword:"Astronomy",
                definition:"is science that study the stars"
            }
        ]
    },
    {
        fileName:"test42",
        vocabularySet:[
            {
                keyword:"Pi",
                definition:"is 3.14"
            },
            {
                keyword:"Tao",
                definition:"is 6.28"
            },
            {
                keyword:"Astrology",
                definition:"the believe that the stars can determine one's life properties or story"
            },
            {
                keyword:"Astronomy",
                definition:"is science that study the stars"
            }
        ]
    }
];

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

function folderTemplate(jsonFile){
    return `
    <figure onclick = setCurrentFolder(${jsonFile.fileName})>
        <a href = "http://localhost:52330/Quizing.html"><img src = "../res/folder.svg" height="100px" weight = "100px"></a>
        <figcaption>${jsonFile.fileName}</figcaption>
    </figure>
    `;
};

function insertFlashcard(){
    // document.getElementsByClassName("flashcard")[0].innerHTML += flashcardHTML;
    document.getElementsByClassName("flashcard")[0].innerHTML = vocabularySet2.map(flashcardTemplate).join('');
};

function insertFolders(){
    document.getElementsByClassName("folders")[0].innerHTML = jsonFile.map(folderTemplate).join('');
}

function setCurrentFolder(fileName){
    currentFolder = fileName;
}