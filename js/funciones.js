const sectAddTareas = document.querySelector('#addTareas');
const sectionTareas = document.querySelector('#printTareas')



let id = 3;

//GUARDAR TAREAS
/**function saveTareas(pList, pTareas) {
    let duplicado = pList.findIndex(tarea => tarea.id === pTareas.id)
    if (duplicado === -1) {
        pList.push(pTareas);
        return 'tarea guardada'
    }
    return 'tarea duplicada'
}*/

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

        alert("Hay que rellenar todos los campos, tanto la prioridad como el nombre de la tarea")
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
        printOneTarea(newTarea, sectAddTareas)
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
    console.log(pList);
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
            return 'bg-primary-subtle'
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

//PRINT TAREAS
function printTareas(pLista, pDom) {
    sectionTareas.innerHTML = "";
    pLista.forEach(tarea => printOneTarea(tarea, pDom));

}
//printTareas(listaTareas, sectionTareas);

//FILTRAR POR PRIORIDAD

function filterByPriority(pLista, pPrioridades) {
    return pLista.filter(tarea => {
        const prioridad = tarea.prioridad && tarea.prioridad.toString().toLowerCase();
        return prioridad && prioridad.includes(pPrioridades.toLowerCase());
    });
}

//FILTRO BUSCADOR POR PRIORIDAD
const selectFilter = document.querySelector('#search-tareas');
selectFilter.addEventListener('change', selectPriority);

function selectPriority(event) {

    let listaFiltrada = filterByPriority(listaTareas, selectFilter.value);
    printTareas(listaFiltrada, sectAddTareas);
}

//BUSCADOR POR INPUT
const inputFilter = document.querySelector('#find-tarea');
inputFilter.addEventListener('input', getSearch)

function getSearch(event) {
    let palabraBuscar = event.target.value;
    let listaFiltrada = filterByWord(listaTareas, palabraBuscar);
    printTareas(listaFiltrada, sectAddTareas);
}

function filterByWord(pList, pWord) {
    return pList.filter(tarea => tarea.titulo.toLowerCase().includes(pWord.toLowerCase()) || tarea.prioridad.toLowerCase().includes(pWord.toLowerCase()))
}


/**function filterByPriority(pLista, pPrioridades) {
    return pLista.filter(tarea => tarea.prioridad.toLowerCase().includes(pPrioridades.toLowerCase()));
}*/
