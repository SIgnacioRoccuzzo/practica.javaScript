const ulTareas = document.querySelector('#lista-tareas');
const liTareas = document.querySelectorAll('li')


//fx pintarTareas

function printOneTarea(pTarea, pDom) {
    const ul = document.createElement('ul');
    ul.className = "list-group col-xl-8"
    const li = document.createElement('li');
    li.className = "list-group-item"
    li.textContent = pTarea.value;
    const button = document.createElement('button');
    button.className = "btn btn-outline-danger";
    button.textContent = 'Eliminar';


    ul.append(li, button);

    pDom.appendChild(ul);
}




function printTareas(pLista, pDom) {
    pDom.innerHTML = "";
    pLista.forEach(tarea => printOneTarea(tarea, pDom));

}
printTareas(listaTareas, ulTareas)