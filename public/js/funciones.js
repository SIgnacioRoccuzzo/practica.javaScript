const sectAddTareas = document.querySelector('#addTareas');
const sectionTareas = document.querySelector('#printTareas');
const fecha = document.querySelector('#fecha')
let id = 4;


const inputTask = document.querySelector('#tareas-in')
const selectTask = document.querySelector('#select-tareas');
const saveTask = document.querySelector('#guardar');
saveTask.addEventListener('click', getDataTask)


const FECHA = new Date()
fecha.innerHTML = FECHA.toLocaleDateString('es-MX', { weekday: 'long', month: 'short', day: 'numeric' })


function isValidTaskFormat(task) {
    const taskFormat = /^[a-zA-Z0-9\s]+$/;
    return taskFormat.test(task);
}

function getDataTask(event) {
    event.preventDefault();
    let tarea = inputTask.value.trim();
    let prioridad = selectTask.value;

    if (isValidTaskFormat(tarea) && tarea !== "" && prioridad !== "") {
        saveTarea(tarea, prioridad);
    } else {
        alert("El formato de la tarea es inválido o faltan campos por completar.");
    }
}


function saveTarea(pTarea, pPrioridad) {
    const newTarea = {
        id: +id,
        titulo: pTarea,
        prioridad: pPrioridad
    };
    let exist = listaTareas.some((tarea) => {
        return (
            tarea.titulo.toLowerCase().includes(pTarea.toLowerCase()) &&
            tarea.prioridad.toLowerCase().includes(pPrioridad.toLowerCase())
        );
    });

    if (!exist) {
        listaTareas.push(newTarea);
        printOneTarea(newTarea, sectionTareas);
        id++;
        inputTask.value = "";
        selectTask.value = "";
    } else {
        showCustomAlert("La tarea ya está en la lista");
        inputTask.value = "";
        selectTask.value = "";
    }
}

function showCustomAlert(message) {
    const customAlert = document.getElementById("customAlert");
    const alertMessage = document.getElementById("alertMessage");
    alertMessage.textContent = message;
    customAlert.style.display = "block";
    setTimeout(() => {
        customAlert.style.display = "none";
    }, 3000);
}

function closeCustomAlert() {
    document.getElementById("customAlert").style.display = "none";
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
    event.preventDefault();
    let id = parseInt(event.target.dataset.id);
    const articleDelete = event.target.closest('article');
    deleteItemArray(id, listaTareas);
    sectionTareas.removeChild(articleDelete);
}



//SELECCION DE COLORES
function selectColor(pPrioridad) {
    switch (pPrioridad) {
        case 'urgente':
            return 'bg-urgente';
        case 'diario':
            return 'bg-diario';
        case 'mensual':
            return 'bg-mensual';
        default:
            return 'bg-default';
    }
}



function printOneTarea(pTarea, pDom) {
    const article = document.createElement('article');
    article.classList.add('tarea-item');
    const ul = document.createElement('ul');
    ul.className = "list-group";
    const li = document.createElement('li');
    li.classList.add("list-group-item", selectColor(pTarea.prioridad));
    li.textContent = pTarea.titulo;

    const trashIcon = document.createElement('i');
    trashIcon.className = 'fas fa-trash';


    const button = document.createElement('button');
    button.addEventListener('click', deleteItem);
    button.className = "btn btn-outline-dark d-block";
    button.style.backgroundColor = 'transparent';
    button.style.border = 'none';
    button.style.cursor = 'pointer';
    button.setAttribute('data-id', pTarea.id);
    button.appendChild(trashIcon);
    article.append(ul);
    li.append(button);
    ul.append(li);

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
    const selectedPriority = selectFilter.value;

    switch (selectedPriority) {
        case 'todas':
            printTareas(listaTareas, sectionTareas);
            break;
        case 'limpiar':
            sectionTareas.innerHTML = '';
            break;
        case 'seleccionar':

            break;
        default:
            const filterList = filterByPriority(listaTareas, selectedPriority);
            printTareas(filterList, sectionTareas);
            break;
    }

    selectFilter.value = '';
}





//BUSCADOR POR INPUT
const inputFilter = document.querySelector('#find-tarea');
inputFilter.addEventListener('input', function (event) {
    let palabraBuscar = event.target.value;
    let listaFiltrada = filterByWord(listaTareas, palabraBuscar);
    printTareas(listaFiltrada, sectionTareas);

    selectFilter.value = '';
});

function filterByWord(pList, pWord) {
    sectionTareas.innerHTML = '';
    if (pWord.trim() === '') {

        return [];
    }
    return pList.filter(tarea => tarea.titulo.toLowerCase().startsWith(pWord.toLowerCase()));
}





