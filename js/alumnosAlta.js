const searchBox = document.getElementById('searchBox');
const searchButton = document.getElementById('searchButton');
const tablaAlumnos = document.getElementById('tabla-alumnos');
const filterType = document.getElementById('filterType');
const orderButton = document.getElementById('order');
const createGroupButton = document.getElementById('create');
const tablaGrupo = document.getElementById('tabla-grupos');
const quantityGroupInput = document.getElementById('quantityGroup');

let datosAlumnos = JSON.parse(localStorage.getItem('alumnosDB')) || [];
let alumnosFiltrados = [...datosAlumnos]; // Array para mantener el estado de la búsqueda
let grupos = []; // Array para almacenar grupos
let ordenAscendente = true; // Estado para controlar el orden

// Función para mostrar los alumnos en la tabla
const mostrarAlumnos = (alumnos) => {
    tablaAlumnos.innerHTML = '';
    alumnos.forEach((alumno, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${alumno.nombre}</td>
            <td>${alumno.apellidos}</td>
            <td>${alumno.edad}</td>
            <td>${alumno.materias}</td>
            <td>${alumno.calificaciones}</td>
            <td><button type="button" class="btn btn-danger eliminar" data-index="${index}">Eliminar</button></td>
        `;
        tablaAlumnos.appendChild(fila);
    });
};

// Mostrar todos los alumnos inicialmente
mostrarAlumnos(datosAlumnos);

// Evento de cuando el botón "Buscar" se presione, filtrar y mostrar los resultados
const search = (event) => {
    event.preventDefault();

    const query = searchBox.value.toLowerCase();
    const filtroSeleccionado = filterType.value;

    // Filtrar los alumnos en función del filtro seleccionado y la consulta de búsqueda
    alumnosFiltrados = datosAlumnos.filter((alumno, index) => {
        if (filtroSeleccionado === 'general') {
            return alumno.nombre.toLowerCase().includes(query) ||
                   alumno.apellidos.toLowerCase().includes(query) ||
                   alumno.edad.toLowerCase().includes(query) ||
                   alumno.materias.toLowerCase().includes(query) ||
                   alumno.calificaciones.toLowerCase().includes(query) ||
                   (index + 1).toString().includes(query);
        } else if (filtroSeleccionado === 'númeroDeLista') {
            return (index + 1).toString().includes(query);
        } else {
            return alumno[filtroSeleccionado].toLowerCase().includes(query);
        }
    });

    mostrarAlumnos(alumnosFiltrados);
};

searchButton.addEventListener('click', search);

// Evento para ordenar por calificaciones
orderButton.addEventListener('click', () => {
    ordenAscendente = !ordenAscendente; // Cambiar el estado del orden

    alumnosFiltrados.sort((a, b) => {
        if (ordenAscendente) {
            return a.calificaciones - b.calificaciones; // Orden ascendente
        } else {
            return b.calificaciones - a.calificaciones; // Orden descendente
        }
    });

    mostrarAlumnos(alumnosFiltrados);
});

// Función para crear y mostrar grupos según la cantidad especificada
const crearGrupos = () => {
    const cantidadGrupos = parseInt(quantityGroupInput.value);
    if (isNaN(cantidadGrupos) || cantidadGrupos <= 0) {
        alert("Por favor, ingrese un número válido de grupos.");
        return;
    }

    tablaGrupo.innerHTML = ''; // Limpiar la tabla de grupos antes de agregar nuevos
    grupos = []; // Resetear grupos

    // Calcular el tamaño de cada grupo
    const alumnosPorGrupo = Math.ceil(alumnosFiltrados.length / cantidadGrupos);

    // Dividir los alumnos en grupos
    for (let i = 0; i < cantidadGrupos; i++) {
        const grupo = alumnosFiltrados.slice(i * alumnosPorGrupo, (i + 1) * alumnosPorGrupo);

        // Guardar grupo
        grupos.push(grupo);

        // Calcular el promedio del grupo
        const promedioGrupo = calcularPromedio(grupo);

        // Crear el encabezado de grupo
        const encabezadoGrupo = document.createElement('tr');
        encabezadoGrupo.innerHTML = `<th colspan="6">Grupo ${i + 1} - Promedio grupal: ${promedioGrupo.toFixed(2)}</th>`;
        tablaGrupo.appendChild(encabezadoGrupo);

        // Añadir los alumnos del grupo a la tabla
        grupo.forEach((alumno, index) => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <th scope="row">${index + 1}</th>
                <td>${alumno.nombre}</td>
                <td>${alumno.apellidos}</td>
                <td>${alumno.edad}</td>
                <td>${alumno.materias}</td>
                <td>${alumno.calificaciones}</td>
            `;
            tablaGrupo.appendChild(fila);
        });
    }
    alert("Grupos creados exitosamente.");
};

// Función para calcular el promedio de un grupo
const calcularPromedio = (grupo) => {
    const suma = grupo.reduce((acc, alumno) => acc + parseFloat(alumno.calificaciones), 0);
    return suma / grupo.length;
};

// Evento para manejar el clic en "Crear grupo"
createGroupButton.addEventListener('click', crearGrupos);

// Manejar el clic en el botón "Eliminar" para borrar un alumno específico
tablaAlumnos.addEventListener('click', function(event) {
    if (event.target.classList.contains('eliminar')) {
        const index = event.target.getAttribute('data-index');
        const alumnoAEliminar = alumnosFiltrados[index];
        const indexReal = datosAlumnos.findIndex(alumno => 
            alumno.nombre === alumnoAEliminar.nombre && 
            alumno.apellidos === alumnoAEliminar.apellidos &&
            alumno.edad === alumnoAEliminar.edad &&
            alumno.materias === alumnoAEliminar.materias &&
            alumno.calificaciones === alumnoAEliminar.calificaciones
        );

        if (indexReal !== -1) {
            datosAlumnos.splice(indexReal, 1);
            localStorage.setItem('alumnosDB', JSON.stringify(datosAlumnos));
            alumnosFiltrados.splice(index, 1);
            mostrarAlumnos(alumnosFiltrados);
        }
        alert("Alumno elimido exitosamente de la base de datos.");
    }
});

// Botón para borrar todos los datos y recargar la página
const borrarTodo = () => {
    localStorage.clear();
    window.location.reload();
    alert("Toda la base de datos se ha borrado exitosamente.");
};
document.getElementById('erase').addEventListener('click', borrarTodo);

// Manejar el botón de "Regresar" para volver a la página anterior
document.getElementById('back').addEventListener('click', () => {
    window.history.back();
});