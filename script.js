let flashcards = [];
let folders = [];


function displayFolder()
{
    const folderList = document.getElementById('folderList')
    folderList.innerHTML = '';
    folders.forEach((folder,index)=>{
        const li = document.createElement('li');
        //create folder name element
        const folderNameSpan = document.createElement('span');
        folderNameSpan.textContent = folder;
        folderNameSpan.onclick = () => showFlashcardsView(index);
        //create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent ='Delete';
        deleteButton.style.marginLeft = '10px';
        deleteButton.onclick = () => deleteFolder(index);
        //append folder and button 
        li.appendChild(folderNameSpan);
        li.appendChild(deleteButton)
        //append the list item to the folder list
        folderList.append(li);
    });
}

function deleteFolder(index)
{
    folders.splice(index, 1);
    delete flashcards[folders[index]];
    displayFolder();
}

//function to add folder
document.getElementById('folderForm').addEventListener('submit',function(event){
    event.preventDefault();
    const folderName = document.getElementById('folderName').value;
    if(folderName)
    {
        folders.push(folderName);
        flashcards[folderName] = [] //creates an empty array for flashcards in this folder
        displayFolder();
        document.getElementById('folderName').value = '';
    }
});

//function to show flashcard view for folder 
function showFlashcardsView(index)
{
    const folderName = folders[index];
    document.getElementById('currentFolderTitle').textContent = folderName;
    document.getElementById('folderListView').style.display = 'none';
    document.getElementById('flashcardView').style.display = 'block';
    displayFlashcards(folderName);
}

//function to go back to folder view
document.getElementById('backToFolders').onclick = function(){
    document.getElementById('flashcardView').style.display = 'none';
    document.getElementById('folderListView').style.display = 'block';
}
//takes in two parameters the text front and back and then adds it to flashcard array
function addFlashcard(folderName, front, back)
{
    if(flashcards[folderName])
    {
        flashcards[folderName].push({front, back});
    }
    displayFlashcards(folderName);
}

function displayFlashcards(folderName)
{
    const flashcardList = document.getElementById('flashcardList');
    //clear contents
    flashcardList.innerHTML = '';
    const currentFlashCards = flashcards[folderName] || []; 
    const ul = document.createElement('ul');
    //iterates over each flashcard and creates a new list item and sets its text content to show the front and back 
    currentFlashCards.forEach((card, index)=>{
        const li = document.createElement('li');
        //create flashcard container
        li.className = 'flashcard';
        //create inner container for flip effect
        const flashcardInner = document.createElement('div');
        flashcardInner.className = 'flashcard-inner';
        //create front side
        const flashcardFront = document.createElement('div');
        flashcardFront.className = 'flashcard-front';
        flashcardFront.textContent = card.front;//show text
        //create back side
        const flashcardBack = document.createElement('div');
        flashcardBack.className = 'flashcard-back';
        flashcardBack.textContent = card.back;//show text
        //append front and back to inner container
        flashcardInner.appendChild(flashcardFront);
        flashcardInner.appendChild(flashcardBack);
        //add click event to flip card
        flashcardInner.onclick = () => {
            flashcardInner.style.transform = flashcardInner.style.transform === 'rotateY(180deg)' 
            ? 'rotateY(0deg)' : 'rotateY(180deg)';
        };
        
        li.appendChild(flashcardInner);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.marginLeft = '10px';
        deleteButton.onclick = () => deleteFlashcard(folderName, index);
        li.appendChild(deleteButton);
        ul.appendChild(li);
        
        
    });
    flashcardList.appendChild(ul);
}

document.getElementById('flashcardForm').addEventListener('submit', function(event){
    event.preventDefault();
    const front = document.getElementById('front').value;
    const back = document.getElementById('back').value;
    const folderName = document.getElementById('currentFolderTitle').textContent;
    if(front && back)
    {
        addFlashcard(folderName, front, back);
        document.getElementById('front').value = '';
        document.getElementById('back').value = '';
    }
});

function deleteFlashcard(folderName, index)
{
    flashcards[folderName].splice(index, 1);//remove flashcard from array
    displayFlashcards(folderName);//refresh display
}

