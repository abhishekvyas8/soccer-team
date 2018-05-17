const from = document.querySelector('#playerForm');
const delteAll = document.querySelector('#deleteAll');
const players = document.querySelector('#players');

let vals = [];
let index = 0;

const handleSubmit = (ev) => {
    ev.preventDefault();
    
    const data = {
        'Player Name': ev.target.playerName.value,
        'Position': ev.target.position.value,
    } 

    if(data['Player Name'] == ''){
        alert('Empty Field')
    }
    else{
        const items = createList(data);
        players.appendChild(items[index]);
        index++;
    }

    ev.target.reset();
    ev.target.playerName.focus();
}

function createList(data){
    const list = document.createElement('ul');
    const labels = Object.keys(data);
    labels.forEach((label) => {
        list.appendChild(createListItem(label, data[label]));
    });
    let btn = createButton();
    list.appendChild(btn);
    vals.push(list);
   
    btn.addEventListener('click', deleteItem);
    return vals;
}

function createListItem(label, value){
    const item = document.createElement('li');
    item.textContent = `${label}: ${value}`;
    return item;
}

function createButton(){
    const btn = document.createElement('button');
    btn.textContent = 'Delete Item';
    return btn;
}

from.addEventListener('submit', handleSubmit);

deleteAll.addEventListener('click', ()=>{
    players.innerHTML = '';
    vals = [];
    index = 0;
});

const deleteItem = (ev) => {
    players.removeChild(ev.target.parentElement);
    vals.splice(vals.indexOf(ev.target.parentElement),1);
}

