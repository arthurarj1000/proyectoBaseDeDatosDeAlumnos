const searchBox = document.getElementById('searchBox');
const searchButton = document.getElementById('searchButton');
const tablaAlumnos = document.getElementById('tabla-alumnos');

// Recuperar los datos del localStorage
let datosAlumnos = JSON.parse(localStorage.getItem('alumnosDB')) || [];
let alumnosFiltrados = [...datosAlumnos]; // Array para mantener el estado de la búsqueda

// Función para mostrar los alumnos en la tabla
const mostrarAlumnos = (alumnos) => {
    // Limpiar la tabla antes de agregar nuevos datos
    tablaAlumnos.innerHTML = '';

    // Añadir los datos a la tabla
    alumnos.forEach((alumno, index) => {
        const fila = document.createElement('tr');
        
        // Crear celdas para cada dato del alumno
        fila.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${alumno.nombre}</td>
            <td>${alumno.apellidos}</td>
            <td>${alumno.edad}</td>
            <td>${alumno.materias}</td>
            <td>${alumno.calificaciones}</td>
            <td><button type="button" class="btn btn-danger eliminar" data-index="${index}">Eliminar</button></td>
        `;
        
        // Añadir la fila a la tabla
        tablaAlumnos.appendChild(fila);
    });
};

// Mostrar todos los alumnos inicialmente
mostrarAlumnos(datosAlumnos);

// Evento de cuando el botón "Buscar" se presione, filtrar y mostrar los resultados
const search = (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe

    const query = searchBox.value.toLowerCase();

    // Filtrar los alumnos en función de la consulta de búsqueda
    alumnosFiltrados = datosAlumnos.filter(alumno => 
        alumno.nombre.toLowerCase().includes(query) ||
        alumno.apellidos.toLowerCase().includes(query) ||
        alumno.edad.toLowerCase().includes(query) ||
        alumno.materias.toLowerCase().includes(query) ||
        alumno.calificaciones.toLowerCase().includes(query)
    );

    // Mostrar los alumnos filtrados
    mostrarAlumnos(alumnosFiltrados);
};

searchButton.addEventListener('click', search);

// Manejar el clic en el botón "Eliminar" para borrar un alumno específico
tablaAlumnos.addEventListener('click', function(event) {
    if (event.target.classList.contains('eliminar')) {
        const index = event.target.getAttribute('data-index');

        // Obtener el alumno a eliminar desde los alumnos filtrados
        const alumnoAEliminar = alumnosFiltrados[index];

        // Encontrar el índice del alumno a eliminar en el array original
        const indexReal = datosAlumnos.findIndex(alumno => 
            alumno.nombre === alumnoAEliminar.nombre && 
            alumno.apellidos === alumnoAEliminar.apellidos &&
            alumno.edad === alumnoAEliminar.edad &&
            alumno.materias === alumnoAEliminar.materias &&
            alumno.calificaciones === alumnoAEliminar.calificaciones
        );

        // Eliminar el alumno del array original
        if (indexReal !== -1) {
            datosAlumnos.splice(indexReal, 1);

            // Actualizar el localStorage
            localStorage.setItem('alumnosDB', JSON.stringify(datosAlumnos));

            // Eliminar el alumno del array filtrado
            alumnosFiltrados.splice(index, 1);

            // Mostrar los alumnos filtrados actualizados
            mostrarAlumnos(alumnosFiltrados);
        }
    }
});

// Botón para borrar todos los datos y recargar la página
const borrarTodo = () => {
    localStorage.clear(); // Borra todos los datos en localStorage
    window.location.reload(); // Recarga la página
};
document.getElementById('erase').addEventListener('click', borrarTodo);

// Manejar el botón de "Regresar" para volver a la página anterior
document.getElementById('back').addEventListener('click', () => {
    window.history.back();
});