const sectionTareas = document.querySelector('#printTareas');
const inputTask = document.querySelector('#tareas-in')
const saveTask = document.querySelector('#guardar');
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



//fx pintarTareas

function printOneTarea(pTarea, pDom) {
    const article = document.createElement('article')
    const ul = document.createElement('ul');
    ul.className = "list-group"
    const li = document.createElement('li');
    li.className = "list-group-item d-flex justify-content-between"
    li.textContent = pTarea.titulo;
    const button = document.createElement('button');
    button.className = "btn btn-outline-danger";
    button.textContent = 'Eliminar';




    article.append(ul);
    ul.append(li, button)
    pDom.appendChild(article);



}


function getDataTask(event) {
    event.preventDefault();

    if (inputTask.value === "" || selectTask.value === "") {
        alert('quilombo')
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

        //   event.target.reset();
    } else {
        alert(guardado);
        //event.target.style.border = '3px solid tomato';
    }


}
//primera fx

function printTareas(pLista, pDom) {

    pLista.forEach(tarea => printOneTarea(tarea, pDom));

}
printTareas(listaTareas, sectionTareas);





