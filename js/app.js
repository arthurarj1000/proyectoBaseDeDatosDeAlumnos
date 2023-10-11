class Alumno {
    constructor(nombre, apellidos, edad) 
    {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.materias = [];
        this.calificaciones = {};
    }

    inscribirMateria(materia) 
    {
        this.materias.push(materia);
        this.calificaciones[materia] = [];
    }

    registrarCalificacion(materia, calificacion) 
    {
        if (this.materias.includes(materia)) {
            this.calificaciones[materia].push(calificacion);
        } else {
            console.log(`${this.nombre} no está inscrito en la materia ${materia}.`);
        }
    }

    promedioGeneral() 
    {
        let totalCalificaciones = 0;
        let totalMaterias = 0;

        for (const materia in this.calificaciones) {
            if (this.calificaciones[materia].length > 0) {
                totalCalificaciones += this.calificaciones[materia].reduce((a, b) => a + b, 0);
                totalMaterias++;
            }
        }

        return totalMaterias > 0 ? totalCalificaciones / totalMaterias : 0;
    }
}

// Clase Alumno (código anterior)

// Función para dar de alta un nuevo alumno
function darDeAltaAlumno() {
    const nombre = prompt("Ingrese el nombre del alumno:");
    const apellidos = prompt("Ingrese los apellidos del alumno:");
    const edad = parseInt(prompt("Ingrese la edad del alumno:"));

    const nuevoAlumno = new Alumno(nombre, apellidos, edad);
    return nuevoAlumno;
}

// Ejemplo de alta de alumnos
const listaDeAlumnos = [];

// Pedir al usuario que ingrese nuevos alumnos
while (true) {
    const nuevoAlumno = darDeAltaAlumno();
    listaDeAlumnos.push(nuevoAlumno);

    const continuar = confirm("¿Desea dar de alta otro alumno?");
    if (!continuar) {
        break;
    }
}

// Mostrar la lista de alumnos
console.log("Lista de Alumnos:");
for (const alumno of listaDeAlumnos) {
    console.log(`Nombre: ${alumno.nombre} ${alumno.apellidos}, Edad: ${alumno.edad}`);
}
