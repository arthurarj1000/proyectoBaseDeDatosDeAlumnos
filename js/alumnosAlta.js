        //Accedemos a la sección de Tabla del HTML
        const tablaAlumnos = document.getElementById('tabla-alumnos');

        // Recuperar los datos del localStorage
        const datosAlumnos = JSON.parse(localStorage.getItem('alumnosDB')) || [];
        
        // Limpiar la tabla antes de agregar nuevos datos
        tablaAlumnos.innerHTML = '';
        
        // Añadir los datos a la tabla
        datosAlumnos.forEach((alumno, index) => {
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
        
        // Manejar el clic en el botón "Eliminar" para borrar un alumno específico
        tablaAlumnos.addEventListener('click', function(event) {
            if (event.target.classList.contains('eliminar')) {
                const index = event.target.getAttribute('data-index');
                
                // Eliminar el alumno del array
                datosAlumnos.splice(index, 1);
        
                // Actualizar el localStorage
                localStorage.setItem('alumnosDB', JSON.stringify(datosAlumnos));
                
                // Recargar la página para reflejar los cambios
                window.location.reload();
            }
        });
        
        // Botón para borrar todos los datos y recargar la página
        const borrarTodo = () => {
            localStorage.clear(); // Borra todos los datos en localStorage
            window.location.reload(); // Recarga la página
        };
        erase.addEventListener('click', borrarTodo); //Acceder al input del botón Borrar todo del HTML
        


        const regresar = () => {
            window.location.href= "index.html"; //aqui va el código para que me regrese a la página main 
        }
        back.addEventListener('click', regresar); //Acceder al input del botón Regresar todo del HTML