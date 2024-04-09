const endpoint = "https://todo.hackrpi.com";

const API_KEY = "API_KEY_GOES_HERE";

//Get status with /status GET endpoint
async function getStatus() {

}

async function fetchLists() {
    
}

//Adds list through /AddList POST endpoint. 
async function addList() {
    const title = newListInputElement.value.trim();
    if (title) {
        
    }
}

//Deletes list through /DeleteList DELETE endpoint
async function deleteList(listIdParam) {
    
}

//Get all list items using GetListItems GET endpoint until next token is exhausted
async function getListItems(listIdParam) {
    
}

//Adds task through /AddListItem post endpoint
async function addTask(listIdParam) {
    const taskInput = document.getElementById(`task-input-${listIdParam}`);
    const description = taskInput.value.trim();
    if (description) {
        
    }
}


//Rename task through /RenameItem/ PATCH endpoint
async function renameTask(thisItemId, newName) {
    
}

//Set checked task through /SetChecked/ PATCH endpoint
async function setCheckedTask(thisItemId, newChecked) {

}

//Deletes task through /DeleteListItem/ DELETE endpoint
async function deleteTask(taskId) {
    
}


const addListElement = document.getElementById("add-list");
const listContainerElement = document.getElementById('list-container');
const newListInputElement = document.getElementById('new-list-input');

//Event listeners for menu
addListElement.addEventListener("click", function () {
    addList();
});

newListInputElement.onkeydown = function (e) {
    if (e.key === "Enter") {
        addList();
    }
};

//Renders each list given an array of list objects
async function renderLists(lists) {
    //To preserve the sequence of lists, use for loop instead of forEach (which would run functions in parallel)
    let listItems;
    for (const e of lists) {
        listItems = await getListItems(e.id);
        renderList({
            id: e.id,
            listName: e.listName,
            items: listItems
        });
    }
    let loadingEl = document.getElementById('loading');
    if (loadingEl !== null) loadingEl.remove();

}



const listHTML = `
<div class="list">
    <h2 class="list-header"></h2>
    <input type="text">
    <button>Add</button>
    <button>Delete List</button>
    <div class="item-list"></div>
</div>
`;

//Renders list
function renderList(list) {
    let tempHTML = `
    <div id="list-${list.id}" class="list">
        <h2 class="list-header">${list.listName}</h2>
        <input id="task-input-${list.id}" type="text" value="" class="text-input">
        <button id="add-items-${list.id}">Add</button>
        <button id="delete-list-${list.id}">Delete List</button>
        <div class="item-list"></div>
    </div>
    `;

    let loadingEl = document.getElementById('loading');
    if (loadingEl !== null) loadingEl.remove();

    document.getElementById("list-container").insertAdjacentHTML("afterbegin", tempHTML);
    document.getElementById(`delete-list-${list.id}`).onclick = () => deleteList(list.id);
    document.getElementById(`add-items-${list.id}`).onclick = () => addTask(list.id);
    document.getElementById(`task-input-${list.id}`).onkeydown = (e) => {
        if (e.key === "Enter") {
            addTask(list.id)
        }
    };

    list.items.forEach(task => {
        createTaskElement(task, list.id);
    });

}

//Renders each to-do task
function createTaskElement(task, listId) {
    let tempHTML = `
    <div id="task-${task.id}" class="item${task.checked ? " completed" : ""}">
        <label class="checkbox-label">
            <input id="checkbox-${task.id}" type="checkbox" ${task.checked ? "checked" : ""}>
            <div class="checkbox-display"></div>
        </label>
        <input id="input-${task.id}" "type="text" value="${task.itemName}" class="text-input task-input">
        <button id="delete-${task.id}">Delete Item</button>
    </div>
    `;

    document.getElementById("list-" + listId).querySelector(".item-list").insertAdjacentHTML("afterbegin", tempHTML);
    document.getElementById(`input-${task.id}`).onchange = (e) => {
        renameTask(task.id, document.getElementById(`input-${task.id}`).value);
    };
    document.getElementById(`checkbox-${task.id}`).onchange = function (e) {
        document.getElementById(`task-${task.id}`).classList.toggle('completed', e.target.checked);
        setCheckedTask(task.id, e.target.checked);
    };
    document.getElementById(`delete-${task.id}`).onclick = () => deleteTask(task.id);

}


fetchLists();
getStatus();