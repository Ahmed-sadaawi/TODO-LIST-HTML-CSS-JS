/* بسم الله الرحمن الرحيم */


const input = document.getElementById('input')
const menu = document.getElementById('todo_list')
const audio = document.getElementById('audio');

const getDataFromStorage = JSON.parse(localStorage.getItem('todosStorage'))

if (getDataFromStorage) {
    getDataFromStorage.forEach(FromStorage => {
        createInner(FromStorage.todoInner)
    })
}

window.addEventListener('keydown', enterClick);

function enterClick(e) {
    if (e.keyCode === 13 && input.value) {
        const list = document.createElement('li');
        list.innerHTML = input.value;
        menu.append(list);
        sentDataToStorage();
    }
}

function createInner(input) {
    const list = document.createElement('li');
    list.innerHTML = input;
    menu.append(list);
    sentDataToStorage();
}

function sentDataToStorage() {
    const unitedDataToSend = [];
    const lists = document.querySelectorAll('li');
    lists.forEach((li) => {
        const sendAsAnObject = { todoInner: li.innerText, complatedClass: li.classList.contains('conplated') }
        unitedDataToSend.push(sendAsAnObject)
        li.onclick = complatedFunction;
        li.addEventListener("contextmenu", removeFunction, false)
    })
    localStorage.setItem('todosStorage', JSON.stringify(unitedDataToSend));
}

function complatedFunction() {
    this.classList.toggle('complated')
    audio.play()
    sentDataToStorage()
}

function removeFunction() {
    this.remove()
    sentDataToStorage();
}