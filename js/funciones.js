const addTareas = document.querySelector('#addTareas');
const sectionTareas = document.querySelector('#printTareas')
const inputTask = document.querySelector('#tareas-in')
const saveTask = document.querySelector('#guardar')
const selectTask = document.querySelector('#select-tareas')
let id = 3;

saveTask.addEventListener('click', getDataTask);


function saveTareas(pList, pTareas) {

    let duplicado = pList.findIndex(tarea => tarea.titulo === pTareas.titulo)
    if (duplicado === -1) {

        pList.push(pTareas);
        return 'tarea guardada'
    }
    return 'tarea duplicada'
}
function deleteItemArray(pId, pList) {
    console.log(pId, pList)
    let posicionBorrar = pList.findIndex(tarea => tarea.id === pId);
    if (posicionBorrar !== -1) {
        pList.splice(posicionBorrar, 1);
    }
    console.log(pList);
}

function deleteItem(event) {
    event.preventDefault()
    let id = parseInt(event.target.dataset.id)
    const articleDelete = event.target.parentNode.parentNode;
    articleDelete.parentNode.removeChild(articleDelete);
    deleteItemArray(id, listaTareas);
}


//fx pintarTareas
function selectColor(pPrioridades) {
    switch (pPrioridades) {
        case 'urgente':
            return 'bg-danger';
        case 'diario':
            return 'bg-info'
        case 'mensual':
            return 'bg-secondary'
    }
}


function printOneTarea(pTarea, pDom) {
    const article = document.createElement('article')
    const ul = document.createElement('ul');
    ul.className = "list-group"
    const li = document.createElement('li');
    li.classList.add("list-group-item", selectColor(pTarea.prioridad))
    li.textContent = pTarea.titulo;
    const button = document.createElement('button');
    button.addEventListener('click', deleteItem)
    button.className = "btn btn-outline-danger";
    button.textContent = 'Eliminar';
    button.dataset.id = pTarea.id
    article.append(ul);
    li.append(button)
    ul.append(li)

    pDom.appendChild(article);

}

function getDataTask(event) {
    event.preventDefault();

    if (inputTask.value === "" || selectTask.value === "") {
        alert('debes introducir una tarea')
    }
    const newTarea = {
        id: id,
        titulo: inputTask.value,
        priorirdad: selectTask.value
    }

    let guardado = saveTareas(listaTareas, newTarea)

    if (guardado === 'tarea guardada') {
        printOneTarea(newTarea, sectionTareas)
        id++;

        inputTask.value = "";
    } else {
        alert(guardado);
    }
}
//primera fx


function printTareas(pLista, pDom) {
    pLista.forEach(tarea => printOneTarea(tarea, pDom));

}
printTareas(listaTareas, sectionTareas);




//filtrar por prioridad

function filterTareasbyPrioridades(pTareas, pPrioridades) {
    return pTareas.filter(tarea => tarea.prioridad.toLowerCase()).includes(pPrioridades.toLowerCase());
}

const selectFilter = document.querySelector('#filter-tareas');
selectFilter.addEventListener('change', getPrioridades);


function getPrioridades(event) {
    let listaFiltrada = filterTareasbyPrioridades(listaTareas, event.target.value);
    printTareas(listaFiltrada, sectionTareas);
}


//const inputFilter = document.querySelector('#find-tarea');
//inputFilter.addEventListener('keypress', getSearch);*/


