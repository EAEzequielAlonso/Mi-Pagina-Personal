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
        this.id=0;
    }

    getAllActivities () {
        return this.activities;
    }

    createActivity (title, description, imgUrl) {
        const clave = this.id++;
        const newActivity = new Activity (clave, title, description, imgUrl);
        this.activities.push(newActivity);
    }

    deleteActivity (id) {
        const arrayFiltrado = this.activities.filter ((act) => act.id !== id);
        this.activities = arrayFiltrado;
    }
}

// Crear una instancia de Repository
const repositorio= new Repository();

/*
Implementar una función que tomará UNA instancia de Activity 
y la convertirá en elemento HTML. Esta función nos servirá más 
adelante. La función deberá:

1- Recibir por parámetro un objeto instancia de Activity.
2- Extraer sus propiedades en variables utilizando destructuring.
3-Crear los elementos HTML que formarán parte de la tarjeta. 
   Ej: <h3> para el título, <p> para la descripción, <img> para la imagen.
4-Asignar los valores a las propiedades correspondientes a cada uno de los 
   elementos. Ej: a la propiedad innerHTML del elemento del título, asignar 
   el valor correspondiente. A la propiedad src del elemento de la imagen, 
   asignar el valor correspondiente.
5- Agregar a los elementos las clases CSS correspondientes que hayas 
    implementado para darles estilos.
6- Crear un elemento <div> que será la tarjeta donde incluiremos todos los 
    demás elementos.
7- “Appendear” al nuevo <div> los elementos creados anteriormente .
8- Asignar al <div> la clase CSS que tengas implementada para darle estilos.
9- Retornar el <div> finalizado con todos los elementos correspondientes dentro.
*/

const activitytoHTML = (instAct) => {
    const {id, title, description, imgUrl} = instAct;
    const imagen= document.createElement("img");
    const titulo= document.createElement("h4");
    const descripcion= document.createElement("p");
    imagen.src = imgUrl;
    titulo.innerHTML = title;
    descripcion.innerHTML = description;
    imagen.classList.add("imgAct");
    titulo.classList.add("tituloAct");
    descripcion.classList.add("descAct");
    const tarjetaActividad = document.createElement("div");
    tarjetaActividad.addEventListener("click", (event) => {
        tarjetaActividad.remove();
        repositorio.deleteActivity(id);
    });
    tarjetaActividad.appendChild(titulo);
    tarjetaActividad.appendChild(imagen);
    tarjetaActividad.appendChild(descripcion);
    tarjetaActividad.classList.add("divTarjetas");
    return tarjetaActividad;
};
/*
Implementar una función que se encargará de “convertir” TODAS las instancias 
de Activity en elementos HTML para agregarlos al contenedor correspondiente. 
La función deberá:

1- Seleccionar el contenedor donde queremos agregar las actividades.
2- Vaciar el contenido actual del contenedor. Se puede hacer manipulando 
   la propiedad innerHTML.
3- Obtener el listado completo de actividades mediante el método 
   correspondiente de una instancia de Repository.
4- “Mapear” el listado de actividades para convertirlos todos en elementos 
    HTML. Para ello utilizar el método “map”, aprovechando como callback la 
    función que hicimos en el punto anterior. Guardar el resultado del mapeo 
    en una nueva variable.
5- “Appendear” todos los elementos HTML del nuevo array dentro del contenedor 
    seleccionado. Para ello puedes utilizar el método forEach.
*/

const activitiestoHTML = (repositorio) => {
    const contenedorAct = document.getElementById ("divActividades");
    contenedorAct.innerHTML = "";
    const actividades = repositorio.getAllActivities();
    const actHTML = actividades.map((actividad) => activitytoHTML (actividad));
    actHTML.forEach(contenido => {
        contenedorAct.appendChild(contenido);
    });
}

/*
Implementar la función handler que se ejecutará al disparar el evento del botón. La misma deberá:

1- Seleccionar los inputs de title, description e imgUrl.
2- Tomar los valores ingresados en los inputs y guardarlos en variables.
3- Validar que estos valores estén completos. De lo contrario deberá 
    cortar el proceso y mostrar un mensaje avisando al usuario de que hay 
    datos incompletos.
4- Llamar al método correspondiente de la instancia de Repository para 
    crear una nueva actividad.
5- Invocar la función que implementamos en el punto anterior para 
    “refrescar” el contenedor de actividades.
*/

const handler = () => {
    const title = document.getElementById("titulo");
    const description = document.getElementById("descripcion");
    const imgUrl = document.getElementById("imagen"); 
    if (title.value == "" || description.value == "" || imgUrl.value == "") {
        alert("Debe completar todos los campos");
    } else {
        if (repositorio.activities.length === 7) {
            alert("Demaciadas actividades para una semana. Necesita dormir mas");
        } else {
            repositorio.createActivity(title.value, description.value, imgUrl.value);
            title.value="";
            description.value="";
            imgUrl.value="";
            activitiestoHTML(repositorio);
        }
    }
};

/*
1. Seleccionar el botón que disparará el evento de agregar actividad 
    y agregar un Event Listener. El evento, al dispararse, debe ejecutar 
    la función que creamos en el punto anterior.
2. EXTRA CREDIT. Implementar la funcionalidad de eliminar tarjetas del 
    contenedor al hacer click sobre ellas o sobre algún nuevo botón que 
    podamos agregar a las mismas. Eres libre de encarar esta funcionalidad 
    de la manera que consideres adecuada. 🤖 Puedes apoyarte en la IA para 
    ayudarte a realizar este punto. 🤖
*/

const btnAgregar = document.getElementById("boton");
btnAgregar.addEventListener("click", handler);
