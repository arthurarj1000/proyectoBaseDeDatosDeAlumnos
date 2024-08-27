const searchBox = document.getElementById('searchBox');
const searchButton = document.getElementById('searchButton');
const tablaAlumnos = document.getElementById('tabla-alumnos');
const filter = document.getElementById('filterType'); // Obtener el filtro seleccionado

let datosAlumnos = JSON.parse(localStorage.getItem('alumnosDB')) || [];
let alumnosFiltrados = [...datosAlumnos]; // Array para mantener el estado de la búsqueda

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
    const filtroSeleccionado = filter.value; // Obtener el filtro seleccionado

    // Filtrar los alumnos en función del filtro seleccionado y la consulta de búsqueda
    alumnosFiltrados = datosAlumnos.filter((alumno, index) => {
        if (filtroSeleccionado === 'general') {
            // Búsqueda general en todos los campos
            return alumno.nombre.toLowerCase().includes(query) ||
                   alumno.apellidos.toLowerCase().includes(query) ||
                   alumno.edad.toLowerCase().includes(query) ||
                   alumno.materias.toLowerCase().includes(query) ||
                   alumno.calificaciones.toLowerCase().includes(query) ||
                   (index + 1).toString().includes(query);
        } else if (filtroSeleccionado === 'númeroDeLista') {
            // Búsqueda específica por número de lista
            return (index + 1).toString().includes(query);
        } else {
            // Búsqueda específica por el campo seleccionado
            return alumno[filtroSeleccionado].toLowerCase().includes(query);
        }
    });

    // Mostrar los alumnos filtrados
    mostrarAlumnos(alumnosFiltrados);
};

searchButton.addEventListener('click', search);

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
    }
});

// Botón para borrar todos los datos y recargar la página
const borrarTodo = () => {
    localStorage.clear();
    window.location.reload();
};
document.getElementById('erase').addEventListener('click', borrarTodo);

// Manejar el botón de "Regresar" para volver a la página anterior
document.getElementById('back').addEventListener('click', () => {
    window.history.back();
});