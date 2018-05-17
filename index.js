const from = document.querySelector('#playerForm')

const handleSubmit = (ev) => {
    ev.preventDefault();
    
    const data = {
        'Player Name': ev.target.playerName.value,
        'Position': ev.target.position.value,
    }

    const players = document.querySelector('#players');
    players.appendChild(createList(data));
    
    ev.target.reset();
    ev.target.playerName.focus();
}

function createList(data){
    const list = document.createElement('ul');
    const labels = Object.keys(data);
    labels.forEach((label) => {
        list.appendChild(createListItem(label, data[label]));
    })
    return list;
}

function createListItem(label, value){
    const item = document.createElement('li');
    item.textContent = `${label}: ${value}`
    return item;
}

from.addEventListener('submit', handleSubmit);