const from = document.querySelector('#playerForm');
const delteAll = document.querySelector('#deleteAll');
const attack = document.querySelector('#attackers');
const defense = document.querySelector('#defenders');
const midfield = document.querySelector('#midfielders');
const goalie = document.querySelector('#goalie');
const submitTeam = document.querySelector('#submitTeam');
const mainDiv = document.querySelector('#mainDiv');

let vals = [];
let team = [];

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

    let addTeam = createButton('Team');
    list.appendChild(addTeam);

    /*let moveUp = createButton('Move Up');
    list.appendChild(moveUp);

    let moveDown = createButton('Move Down');
    list.appendChild(moveDown);*/

    const value = {
        player: list,
        team : false,
    }
    
    vals.push(value);
   
    del.addEventListener('click', deleteItem);
    editName.addEventListener('click', editNameItem);
    editPos.addEventListener('click', editPosition);
    addTeam.addEventListener('click', addToTeam);
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
    btn.classList.add('button', 'secondary', 'tiny');
    return btn;
}

deleteAll.addEventListener('click', ()=>{
    attack.innerHTML = '';
    defense.innerHTML = '';
    midfield.innerHTML = '';
    goalie.innerHTML = '';
    vals = [];
    team = [];
});

const deleteItem = (ev) => {
    ev.target.parentElement.parentElement.removeChild(ev.target.parentElement);
    vals.splice(vals.indexOf(ev.target.parentElement),1);
}

const editNameItem = (ev) => {
    let prevName = ev.target.parentElement.children[0].textContent;
    
    let newName = prompt('Enter new name');
    if(newName == ''){
        alert('No Name Entered');
    }
    else if(newName == null){
    }
    else{
        ev.target.parentElement.children[0].textContent = `Player Name: ${newName}`;
        vals.forEach(value => {
            if(value.player.children[0].textContent == prevName){
                value.player.children[0].textContent = `Player Name: ${newName}`;
            }
        });
    }
}

const editPosition = (ev) => {
    let prevPos = ev.target.parentElement.children[1].textContent;
    
    let pos = ['attack', 'defense', 'midfield', 'goalkeeper'];
    let newPos1 = prompt('Enter Option 1-4: \n1. Attack \n2. Defense \n3. Midfield \n4. Goal keeper');
    let newPos = Number(newPos1);
    
    if(isNaN(newPos) || newPos < 1 || newPos > 4){
        alert('Enter valid position');
    }
    else if(newPos == null){
    }
    else{
        let posStr = `Position: ${pos[newPos-1]}`;
        if(prevPos != posStr){
            ev.target.parentElement.parentElement.removeChild(ev.target.parentElement);

            ev.target.parentElement.children[1].textContent = `Position: ${pos[newPos-1]}`

            if(newPos == 1){   
                attack.appendChild(ev.target.parentElement);
            }
            else if(newPos == 2){
                defense.appendChild(ev.target.parentElement);
            }
            else if(newPos == 3){
                midfield.appendChild(ev.target.parentElement);
            }
            else if(newPos == 4){
                goalie.appendChild(ev.target.parentElement);
            }

            vals.forEach(value => {
                if(value.player.children[1].textContent == prevPos){
                    value.player.children[1].textContent = `Position: ${pos[newPos-1]}`;
                }
            });
        }
       
    }
}

const addToTeam = (ev) => {
    vals.some((value) => {
        if(team.length < 11 || value.team == true){
            if(value.player == ev.target.parentElement){
                if(value.team == false){
                    ev.target.parentElement.classList.add('team');
                    team.push(ev.target.parentElement);
                    value.team = true;
                }
                else{
                    ev.target.parentElement.classList.remove('team');
                    team.splice(team.indexOf(ev.target.parentElement), 1);
                    value.team = false;
                }
            }
        }
        else{
            alert('You already have 11 players');
            return true;
        }
        
    });
}

const handleTeamSubmit = () => {
    mainDiv.classList.add('hide');

    const viewTeam = document.querySelector('#viewTeam');
    viewTeam.classList.remove('hide');

    const teamNumber = document.querySelector('#teamNumber');

    let output = '';

    if(team.length == 0){
        output += `Your team is empty`
    }
    else if(team.length != 11){
        output += `Your team is missing ${11-team.length} players\n`;
    }
    else{
        output += `Your team is ready\n`;   
    }

    teamNumber.textContent = output;

    const teamView = document.querySelector('#teamView');
    
    team.forEach((player) => {
        const divAll = document.createElement('span');
        divAll.classList.add('grid-x');

        const span1 = document.createElement('span');
        const str = document.createElement('h4');
        str.textContent += `${player.children[0].textContent}; ${player.children[1].textContent}`;
        span1.classList.add('cell');
        span1.classList.add('auto');
        span1.appendChild(str);
        divAll.appendChild(span1);

        const span2 = document.createElement('span');
        let up = createButton('Up');
        let down = createButton('Down');

        if(team.indexOf(player) == 0){
            up.disabled = true;
        }

        if(team.indexOf(player) == team.length - 1){
            down.disabled = true;
        }

        span2.classList.add('cell');
        span2.classList.add('shrink');

        span2.appendChild(up);
        span2.appendChild(down);
        divAll.appendChild(span2);

        teamView.appendChild(divAll);
        
        up.addEventListener('click', (ev) => {
            goUp(team.indexOf(player), ev);
        });
        down.addEventListener('click', (ev) => {
            goDown(team.indexOf(player), ev);
        });
        
    });

    const goBack = document.querySelector('#goBack');
    goBack.addEventListener('click', ()=>{
        mainDiv.classList.remove('hide');
        viewTeam.classList.add('hide');
        teamView.innerHTML = '';
    });
};

function goUp(idx, ev){
    const temp = ev.target.parentElement.parentElement;
    const prev = temp.previousSibling;
    teamView.insertBefore(temp, prev);

    const tempArr = team[idx];
    team[idx] = team[idx - 1];
    team[idx - 1] = tempArr;

    if(idx == 1){
        ev.target.disabled = true;
        prev.children[1].children[0].disabled = false;
    }

    if(idx == team.length - 1){
        prev.children[1].children[1].disabled = true;
        temp.children[1].children[1].disabled = false;
    }
}

function goDown(idx, ev){
    const temp = ev.target.parentElement.parentElement;
    const next = temp.nextSibling;
    teamView.insertBefore(next, temp);
    
    const tempArr = team[idx];
    team[idx] = team[idx + 1];
    team[idx + 1] = tempArr;

    if(idx == team.length - 2){
        ev.target.disabled = true;
        next.children[1].children[1].disabled = false;
    }

    if(idx == 0){
        next.children[1].children[0].disabled = true;
        temp.children[1].children[0].disabled = false;
    }
}

from.addEventListener('submit', handleSubmit);
submitTeam.addEventListener('click', handleTeamSubmit);
