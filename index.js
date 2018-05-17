const from = document.querySelector('#playerForm')

const handleSubmit = (ev) => {
    ev.preventDefault();
    
    const data = {
        playerName: ev.target.playerName.value,
        position: ev.target.position.value,
    }

    renderList(data);
}

function renderList(data){
    const list = document.createItem('ul');
}

from.addEventListener('submit', handleSubmit);