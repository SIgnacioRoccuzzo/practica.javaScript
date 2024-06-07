const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const input = document.querySelector('#input');
const botonEnter = document.querySelector('#boton-enter');
const tipoTarea = document.querySelector('#tipo-tarea');
const buscarTipoTarea = document.querySelector('#buscar-tipo-tarea');
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrough = 'line-through';
let LIST, id;

// Inicializar fecha y hora en formato europeo
const FECHA = new Date();
fecha.innerHTML = `${FECHA.toLocaleDateString('es-ES', { weekday: 'long', month: 'long', day: 'numeric' })} ${FECHA.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false })}`;

// Cargar datos desde localStorage
function cargarDatos() {
    try {
        let data = localStorage.getItem('TODO');
        if (data) {
            LIST = JSON.parse(data);
            id = LIST.length;
            cargarLista(LIST);
        } else {
            LIST = [];
            id = 0;
        }
    } catch (error) {
        console.error("Error al cargar los datos de localStorage:", error);
        LIST = [];
        id = 0;
    }
}

// Función para agregar tarea
function agregarTarea(tarea, id, realizado, eliminado, tipo) {
    if (eliminado) return;

    const REALIZADO = realizado ? check : uncheck;
    const LINE = realizado ? lineThrough : '';
    const tipoClase = `bg-${tipo}`;

    const elemento = `
        <li id="elemento" class="${tipoClase}">
            <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
            <p class="text ${LINE}">${tarea}</p>
            <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
        </li>
    `;
    lista.insertAdjacentHTML("beforeend", elemento);
}

// Función para marcar tarea como realizada
function tareaRealizada(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(lineThrough);
    LIST[element.id].realizado = !LIST[element.id].realizado;
    actualizarLocalStorage();
}

// Función para eliminar tarea
function tareaEliminada(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].eliminado = true;
    actualizarLocalStorage();
}

// Actualizar localStorage
function actualizarLocalStorage() {
    try {
        localStorage.setItem('TODO', JSON.stringify(LIST));
    } catch (error) {
        console.error("Error al actualizar localStorage:", error);
    }
}

// Cargar lista de tareas
function cargarLista(array) {
    array.forEach(function (item) {
        agregarTarea(item.nombre, item.id, item.realizado, item.eliminado, item.tipo);
    });
}

// Evento para agregar tarea con botón
botonEnter.addEventListener('click', () => {
    const tarea = input.value;
    const tipo = tipoTarea.value;
    if (tarea && tipo) {
        agregarTarea(tarea, id, false, false, tipo);
        LIST.push({
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false,
            tipo: tipo
        });
        actualizarLocalStorage();
        id++;
        input.value = ''; // Resetear input
        tipoTarea.value = ''; // Resetear selector tipoTarea a su valor inicial
    }
});

// Evento para agregar tarea con tecla Enter
document.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        const tarea = input.value;
        const tipo = tipoTarea.value;
        if (tarea && tipo) {
            agregarTarea(tarea, id, false, false, tipo);
            LIST.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false,
                tipo: tipo
            });
            actualizarLocalStorage();
            input.value = ''; // Resetear input
            tipoTarea.value = ''; // Resetear selector tipoTarea a su valor inicial
            id++;
        }
    }
});

// Evento para manejar acciones de lista
lista.addEventListener('click', function (event) {
    const element = event.target;
    const elementData = element.attributes.data.value;

    if (elementData === 'realizado') {
        tareaRealizada(element);
    } else if (elementData === 'eliminado') {
        tareaEliminada(element);
    }
    actualizarLocalStorage();
});

// Evento para buscar tareas por tipo
buscarTipoTarea.addEventListener('change', () => {
    const tipo = buscarTipoTarea.value;
    lista.innerHTML = ''; // Limpiar lista

    if (tipo === 'todas') {
        cargarLista(LIST);
    } else {
        const tareasFiltradas = LIST.filter(item => item.tipo === tipo && !item.eliminado);
        cargarLista(tareasFiltradas);
    }
    buscarTipoTarea.value = ''; // Resetear selector buscarTipoTarea a su valor inicial
});

// Inicializar datos
cargarDatos();
