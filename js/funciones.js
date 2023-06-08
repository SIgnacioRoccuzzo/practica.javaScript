const sectAddTareas = document.querySelector('#addTareas');
const sectionTareas = document.querySelector('#printTareas')
let id = 3;


const inputTask = document.querySelector('#tareas-in')
const selectTask = document.querySelector('#select-tareas');
const saveTask = document.querySelector('#guardar');
saveTask.addEventListener('click', getDataTask)


function getDataTask(event) {
    event.preventDefault();
    let tarea = inputTask.value
    let prioridad = selectTask.value
    if (inputTask.value != "" && selectTask.value != "") {

        saveTarea(tarea, prioridad)

    } else {

        alert("Hay que rellenar todos los campos")
    }
}

function saveTarea(pTarea, pPrioridad) {

    const newTarea = {
        id: id,
        titulo: pTarea,
        prioridad: pPrioridad
    }
    let exist = false;
    exist = listaTareas.some(tarea => {
        return tarea.titulo.toLowerCase().includes(pTarea.toLowerCase()) && tarea.prioridad.toLowerCase().includes(pPrioridad.toLowerCase());

    })
    if (exist != true) {
        listaTareas.push(newTarea);
        printOneTarea(newTarea, sectionTareas)
        id++;
        inputTask.value = "";
    } else {
        alert("La tarea ya esta en la lista")
    }

}

//FUNCION BORRAR TAREAS
function deleteItemArray(pId, pList) {
    console.log(pId, pList)
    let posicionBorrar = pList.findIndex(tarea => tarea.id === pId);
    if (posicionBorrar !== -1) {
        pList.splice(posicionBorrar, 1);
    }

}

function deleteItem(event) {
    event.preventDefault()
    let id = parseInt(event.target.dataset.id)
    const articleDelete = event.target.parentNode.parentNode;
    articleDelete.parentNode.removeChild(articleDelete);
    deleteItemArray(id, listaTareas);
}


//SELECCION DE COLORES
function selectColor(pPrioridad) {
    switch (pPrioridad) {
        case 'urgente':
            return 'bg-danger';
        case 'diario':
            return 'bg-dark-subtle'
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
    button.className = "btn btn-outline-dark d-block";
    button.textContent = 'Eliminar';
    button.dataset.id = pTarea.id
    article.append(ul);
    li.append(button)
    ul.append(li)

    pDom.appendChild(article);

}

//PRINT TAREAS
function printTareas(pLista, pDom) {
    sectionTareas.innerHTML = "";
    pLista.forEach(tarea => printOneTarea(tarea, pDom));

}
printTareas(listaTareas, sectionTareas);

//FILTRAR POR PRIORIDAD

function filterByPriority(pList, pPrioridad) {
    const filterList = [];

    for (let tarea of pList) {
        if (tarea.prioridad.toLowerCase().includes(pPrioridad.toLowerCase())) {
            filterList[filterList.length] = tarea;
        }
    }
    return filterList;
}

//FILTRO BUSCADOR POR PRIORIDAD
const selectFilter = document.querySelector('#search-tareas');
selectFilter.addEventListener('change', searchPriority);

function searchPriority() {
    const filterList = filterByPriority(listaTareas, selectFilter.value);
    printTareas(filterList, sectionTareas);
    selectFilter.value = '';
}


//BUSCADOR POR INPUT
const inputFilter = document.querySelector('#find-tarea');
inputFilter.addEventListener('keypress', getSearch)

function getSearch(event) {
    let palabraBuscar = event.target.value;
    let listaFiltrada = filterByWord(listaTareas, palabraBuscar);
    printTareas(listaFiltrada, sectionTareas);
}

function filterByWord(pList, pWord) {
    sectionTareas.innerHTML = ''
    return pList.filter(tarea => tarea.titulo.toLowerCase().includes(pWord.toLowerCase()) || tarea.prioridad.toLowerCase().includes(pWord.toLowerCase()))
}


