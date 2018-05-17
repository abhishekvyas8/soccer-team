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

    const items = createList(data);
    players.appendChild(items[index]);
    index++;

    ev.target.reset();
    ev.target.playerName.focus();
}

function createList(data){
    const list = document.createElement('ul');
    const labels = Object.keys(data);
    labels.forEach((label) => {
        list.appendChild(createListItem(label, data[label]));
    });
    vals.push(list);
    return vals;
}

function createListItem(label, value){
    const item = document.createElement('li');
    item.textContent = `${label}: ${value}`;
    return item;
}

from.addEventListener('submit', handleSubmit);

deleteAll.addEventListener('click', ()=>{
    players.innerHTML = '';
    vals = [];
    index = 0;
});