const from = document.querySelector('#playerForm');
const delteAll = document.querySelector('#deleteAll');
const attack = document.querySelector('#attackers');
const defense = document.querySelector('#defenders');
const midfield = document.querySelector('#midfielders');
const goalie = document.querySelector('#golaie');

let vals = [];

const handleSubmit = (ev) => {
    ev.preventDefault();
    
    const data = {
        'Player Name': ev.target.playerName.value,
        'Position': ev.target.position.value,
    } 

    if(data['Player Name'] == ''){
        alert('Enter Name');
    }
    else if(data['Position'] == 'error'){
        alert('Select Position');
    }
    else{
        if(data['Position'] == 'attack'){
            attack.appendChild(createList(data));
        }
        else if(data['Position'] == 'defense'){
            defense.appendChild(createList(data));
        }
        else if(data['Position'] == 'midfield'){
            midfield.appendChild(createList(data));
        }
        else if(data['Position'] == 'goalkeeper'){
            goalie.appendChild(createList(data));
        }
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
    let del = createButton('Delete Item');
    list.appendChild(del);

    let editName = createButton('Edit Name');
    list.appendChild(editName);

    let editPos = createButton('Edit Position');
    list.appendChild(editPos);
    
    vals.push(list);
   
    del.addEventListener('click', deleteItem);
    editName.addEventListener('click', editNameItem);
    editPos.addEventListener('click', editPosition);
    return list;
}

function createListItem(label, value){
    const item = document.createElement('li');
    item.textContent = `${label}: ${value}`;
    return item;
}

function createButton(value){
    const btn = document.createElement('button');
    btn.textContent = `${value}`;
    return btn;
}

from.addEventListener('submit', handleSubmit);

deleteAll.addEventListener('click', ()=>{
    players.innerHTML = '';
    vals = [];
});

const deleteItem = (ev) => {
    ev.target.parentElement.parentElement.removeChild(ev.target.parentElement);
    vals.splice(vals.indexOf(ev.target.parentElement),1);
}

const editNameItem = (ev) => {
    let newName = prompt('Enter new name');
    if(newName == ''){
        alert('No Name Entered');
    }
    else if(newName == null){
    }
    else{
        ev.target.parentElement.children[0].textContent = `Player Name: ${newName}`
    }
    //edit array
}

const editPosition = (ev) => {
    let pos = ['attack', 'defense', 'midfield', 'goal keeper'];
    let newPos = prompt('Enter Option 1-4: \n1. Attack \n2. Defense \n3. Midfield \n4. Goal keeper');
    if(newPos < 1 || newPos > 4){
        alert('Enter valid position');
    }
    else if(newPos == null){
    }
    else{
        ev.target.parentElement.children[1].textContent = `Position: ${pos[newPos-1]}`
    }
    //edit array
}

