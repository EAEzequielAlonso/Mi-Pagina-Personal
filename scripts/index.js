class Activity {
    constructor (id, title, description, imgUrl) {
        this.id=id;
        this.title=title;
        this.description=description;
        this.imgUrl=imgUrl;
    }
}

class Repository {
    constructor () {
        this.activities= [];
    }

    getAllActivities () {
        return this.activities;
    }

    createActivity (id, title, description, imgUrl) {
        const newActivity= new Activity (id, title, description, imgUrl);
        this.activities.push(newActivity);
    }

    deleteActivity (id) {
        const arrayFiltrado = this.activities.filter ((act) => act.id !== id);
        this.activities = arrayFiltrado;
    }
}
/*
PRUEBAS DEL CODIGO:

const repositorio= new Repository();

repositorio.createActivity(1, "Caminar", "Caminar es bueno para la salud", "http://Caminando...");
repositorio.createActivity(2, "Ir a la Iglesia", "Es necesario para adorar a Dios", "http://Caminando...");
repositorio.createActivity(3, "Leer", "Es bueno para conocer a Dios", "http://Caminando...");
repositorio.createActivity(4, "Paseo en Familia", "Recrea la comunion entre nosotros", "http://Caminando...");

console.log (repositorio.getAllActivities());

repositorio.deleteActivity(3);

console.log (repositorio.getAllActivities());

repositorio.deleteActivity(1);

console.log (repositorio.getAllActivities());
*/

/*
Respuesta de CHATGPT sobre la legibilidad del codigo:

Sí, el código es bastante comprensible. Te puedo explicar brevemente qué hace:

Se define una clase llamada Activity que representa una actividad con cuatro propiedades: id, title, description, imgUrl. Esta clase tiene un constructor que inicializa estas propiedades cuando se crea una nueva instancia de Activity.

Se define otra clase llamada Repository, que actúa como un repositorio para almacenar actividades. Tiene un array llamado activities para almacenar las instancias de Activity.

Repository tiene tres métodos:

getAllActivities(): Devuelve todas las actividades almacenadas en el repositorio.

createActivity(id, title, description, imgUrl): Crea una nueva instancia de Activity con los parámetros dados y la agrega al array activities del repositorio.

deleteActivity(id): Elimina la actividad con el ID dado del array activities.

En resumen, este código proporciona una manera de crear, almacenar, obtener y eliminar actividades mediante el uso de las clases Activity y Repository.
*/


/*
RESPUESTA DE CHATGPT A LA OPTIMIZACION DE CODIGO:

Sí, el código puede optimizarse y mejorarse en algunos aspectos. Aquí hay algunas sugerencias:

Usar un objeto literal para almacenar actividades en lugar de un array: En lugar de utilizar un array para almacenar las actividades en la clase Repository, podrías usar un objeto donde las claves sean los IDs de las actividades y los valores sean las instancias de las actividades. Esto puede mejorar el rendimiento en operaciones de búsqueda y eliminación.

Método deleteActivity más eficiente: En lugar de filtrar el array de actividades para eliminar una actividad específica, podrías eliminarla directamente utilizando el ID como clave en el objeto de actividades.

Validación de datos en el método createActivity: Podrías agregar validaciones para asegurarte de que los datos proporcionados al crear una nueva actividad sean válidos.

Aquí tienes una versión optimizada del código con estas mejoras:

javascript
Copy code
class Activity {
    constructor(id, title, description, imgUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
}

class Repository {
    constructor() {
        this.activities = {};
    }

    getAllActivities() {
        return Object.values(this.activities);
    }

    createActivity(id, title, description, imgUrl) {
        if (!id || !title || !description || !imgUrl) {
            throw new Error('Todos los campos son obligatorios');
        }
        if (this.activities[id]) {
            throw new Error('Ya existe una actividad con este ID');
        }

        const newActivity = new Activity(id, title, description, imgUrl);
        this.activities[id] = newActivity;
    }

    deleteActivity(id) {
        if (!this.activities[id]) {
            throw new Error('No se encontró ninguna actividad con este ID');
        }
        delete this.activities[id];
    }
}
Con estas optimizaciones, el código es más eficiente y robusto. Utiliza un objeto para almacenar actividades, lo que permite un acceso más rápido y una eliminación directa por ID. También se agregaron validaciones en el método createActivity para asegurarse de que los datos proporcionados sean válidos.
*/

