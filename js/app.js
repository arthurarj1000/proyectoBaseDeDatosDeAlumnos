//clase para hacer estudiantes
class estudiante{
    constructor (nombre, apellidos, edad, materias, calificaciones){
        this.nombre= nombre;
        this.apellidos= apellidos;
        this.edad= edad;
        this.materias= materias;
        this.calificaciones= calificaciones;
    }

    //método para que se pase a la otra página y guarde los datos con LocalStorage
    paginaAlumnos(){
        return `Alumno ${this.nombre} ${this.apellidos}, tiene la edad de ${this.edad} y cursa ${this.materias} y tiene una calificación de ${this.calificaciones}.`; 
    }
}

const nombreAlumno = document.getElementById('nombre');
const apellidosAlumno = document.getElementById('apellidos');
const edadAlumno = document.getElementById('edad');
const materiasAlumno = document.getElementById('materias');
const calificacionAlumno = document.getElementById('calificaciones');

const button = document.getElementById('button');
const buttonAlta = document.getElementById('button-alta');


const mostrarLista = document.getElementById('lista');


function validar(){
    const alumno = new estudiante(nombreAlumno.value, apellidosAlumno.value, edadAlumno.value, materiasAlumno.value, calificacionAlumno.value);
    if(nombreAlumno && apellidosAlumno && edadAlumno !== ''){
        //aqui va el código para que se ejecute lo del LocalStorage y se guarde en la maquina
        console.log(alumno.paginaAlumnos());
    }
}

function alumnosAlta(){
    //aqui va el código para que nos mande a la otra página y la información del LocalStorage se abrá allá
    
}

button.addEventListener('click', validar);
buttonAlta.addEventListener('click', alumnosAlta);