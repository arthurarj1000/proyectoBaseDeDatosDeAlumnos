//superclase para hacer estudiantes
class estudiante{
    constructor (nombre, apellidos, edad, materias, calificaciones){
        this.nombre= nombre;
        this.apellidos= apellidos;
        this.edad= edad;
        this.materias= materias;
        this.calificaciones= calificaciones;
    }
}

const nombreAlumno = document.getElementById('name'); //acceder al input del nombre del HTML
const apellidosAlumno = document.getElementById('surname'); //acceder al input del apellido del HTML
const edadAlumno = document.getElementById('age'); //acceder al input del edad del HTML
const materiasAlumno = document.getElementById('classes'); //acceder al input de materias del HTML
const calificacionAlumno = document.getElementById('grades'); //acceder al input del calificaciones del HTML

let datosAlumnos = JSON.parse(localStorage.getItem('alumnosDB')) || [];

const validar = () => {
    if (nombreAlumno.value !== '' && apellidosAlumno.value !== '' && edadAlumno.value !== '') {
        const alumno = new estudiante(nombreAlumno.value, apellidosAlumno.value, edadAlumno.value, materiasAlumno.value, calificacionAlumno.value);
        datosAlumnos.push(alumno); // Se guardan en el array el nuevo alumno
        localStorage.setItem('alumnosDB', JSON.stringify(datosAlumnos)); // Se guarda en LocalStorage
        console.log(datosAlumnos);
    }
};

validation.addEventListener('click', validar); //acceder al input del botón Validar del HTML

const alumnosAlta = () => {
    //aqui va el código para que nos mande a la otra página
    window.location.href = 'alumnosAlta.html';
}

dataBase.addEventListener('click', alumnosAlta); //acceder al input del botón Alumnos Alta del HTML