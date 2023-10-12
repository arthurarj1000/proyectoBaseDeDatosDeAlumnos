// Clase Alumno (código anterior)
class Alumno 
{
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

function Alumnos_Page()
{
    window.location.href = "alumnos.html";
}