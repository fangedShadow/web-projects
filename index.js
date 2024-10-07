const section = document.getElementById('left')
const title = document.getElementById('title')
const description = document.getElementById('description')
const saveButton = document.getElementById('save');
var count = localStorage.length; 
let editingKey = null


const loadItemsFromLocalStorage = () => {
    const keys = Object.keys(localStorage);
    keys.sort((a,b)=> a-b);
    keys.forEach(key => {
        const value = JSON.parse(localStorage.getItem(key));
        displayItem(value, key);
    });
};

// Function to display an item in the section
const displayItem = (value, key) => {
    let newDiv = document.createElement('div');
    newDiv.classList.add('left-list-item');

    let titleSpan = document.createElement('span');
    titleSpan.textContent = value.title;
    titleSpan.classList.add('list-title');

    let delButton = document.createElement('button');
    delButton.textContent = 'delete';
    delButton.classList.add('del-button');

    let hidDec = document.createElement('p');
    hidDec.classList.add('hid-description');
    hidDec.textContent = value.description;

    newDiv.append(titleSpan);
    newDiv.append(hidDec);
    newDiv.append(delButton);
    section.append(newDiv);

    
    delButton.addEventListener('click', () => {
        newDiv.remove(); 
        localStorage.removeItem(key); 
        title.value = ''; 
        description.value = '';
    });

    
    newDiv.addEventListener('click', () => {
        title.value = value.title; 
        description.value = value.description; 
        editingKey = key; 
    });
};

loadItemsFromLocalStorage();

saveButton.addEventListener('click', () => {
    let item = {
        title: title.value,
        description: description.value
    };
    if (editingKey) {
        localStorage.removeItem(editingKey);
        count++;
    } else {
        count++;
    }


    localStorage.setItem(count, JSON.stringify(item));


    section.innerHTML = ''; 
    loadItemsFromLocalStorage(); 


    title.value = '';
    description.value = '';

    editingKey = null;
});









