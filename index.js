/**
 * Crear un to do list y realizar su respectivo
 * CRUD Create Read Update Delete, filtro por estado
 */

// array de tareas
let listaDeTareas = [];
let tareasFiltradas = [];

const editarEstado = (e, indice, estado) => {
  e.preventDefault();
  console.log("evento on change", e);
  const newEstado = e.target.value;
  cambiarEstadoPorPosicion(indice, newEstado);
  listarTareas();
};

const editarTarea = (e, indice, estado) => {
  e.preventDefault();
  console.log("estado", estado);
  const span = document.getElementById(`tarea${indice}`);
  span.innerHTML = `
    <select name="estado" onchange="editarEstado(event, ${indice}, '${estado}' )">
      <option value="pendiente" ${
        estado == "pendiente" ? "selected" : null
      }>Pendiente</option>
      <option value="ejecutando" ${
        estado == "ejecutando" ? "selected" : null
      }>Ejecutando</option>
      <option value="finalizado" ${
        estado == "finalizado" ? "selected" : null
      }>Finalizado</option>
    </select>`;
};

const listarTareas = () => {
  const section = document.getElementById("listaTareas");
  let htmLista = "";
  /**
   * [{tarea: lavar, estado: pendiente}, {tarea: barrer, estado:pendiente}]
   */
  listaDeTareas.forEach(
    (tarea, index) =>
      (htmLista += `<div class="listaItem"> 
                <span>${tarea.nombre}</span> 
                <span id="tarea${index}">${tarea.estado}</span>
                <button type="button" onclick="editarTarea(event, ${index}, '${tarea.estado}' )"> Editar</button>
                <button type="button" onclick="eliminarTareaPorPosicion(${index})">Eliminar</button>
              </div>`)
  );
  section.innerHTML = htmLista;
};

const recibirForm = (e) => {
  e.preventDefault();
  const form = document.getElementById("agregarTarea");
  const formData = new FormData(form); // ['nombre del campo del html', valor]
  const json = {};

  for (let [key, value] of formData.entries()) {
    json[key] = value;
  }
  form.reset();
  // {tarea: "", estado: ""}
  agregarTarea(json.tarea, json.estado);
  console.log("lita de tareas", listaDeTareas);
};

// declaracion de la funcion agregar tarea
const agregarTarea = (nombre, estado) => {
  const tarea = {
    nombre,
    estado,
  };
  
  //listaDeTareas.push(tarea);
  //listarTareas();
};

// declaracion de la funcion cambiar estado por el nombre de la tarea
const cambiarEstadoPorNombre = (nombre, estado) => {
  const tarea = listaDeTareas.find((item) => item.nombre === nombre);
  tarea.estado = estado;
  console.log("Lista de tareas actualizada", listaDeTareas);
};

// declaracion de la funcion cambiar estado por posicion
const cambiarEstadoPorPosicion = (posicion, estado) => {
  listaDeTareas[posicion].estado = estado;
  console.log("Lista de tareas actualizada", listaDeTareas);
};

//declaracion de la funcion de filtrar tareas por estado
const filtrarTareas = (e) => {
  //tareasFiltradas = listaDeTareas
  let estado = e.target.value;
  if (estado === "todos") {
    listaDeTareas = tareasFiltradas;
    listarTareas();
    return;
  }
  const tareasFiltradas = listaDeTareas.filter(
    (item) => item.estado === estado
  );
  listaDeTareas = tareasFiltradas;
  console.log("lista de tareas", listaDeTareas);
  listarTareas();
};

//declaracion de la funcion para eliminar tareas
const eliminarTareaPorPosicion = (posicion) => {
  listaDeTareas.splice(posicion, 1);
  listarTareas();
};

//declaracion de la funcion para eliminar la ultima tarea
const eliminarUltimaTarea = () => {
  listaDeTareas.pop();
};

listarTareas();
// http://api.com ->
const usuario = {
  nombre: "",
  edad: "",
  correo: "",
};
localStorage.setItem("user", JSON.stringify(usuario));

const user = JSON.parse(localStorage.getItem("user"));
user.nombre = "Ana Ramirez";
localStorage.setItem("user", JSON.stringify(user));
//sessionStorage.setItem("NombreSession", "Ana Ramirez");
//localStorage.clear();
//alert(`Hola usuario ${sessionStorage.getItem("NombreSession")}`);
/**                                                   305-338-4529
 * Para encontrar un número de teléfono en un texto: \d{3}-\d{3}-\d{4}

  Para validar una dirección de correo electrónico: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$

  Para encontrar todas las palabras que comienzan con "pre": \bpre\w*
 */
// https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0
/*
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((json) => console.log("respuesta", json));*/
/*
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: 'teste de creacion',
    body: 'teste body',
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));*/

const getData = async () => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  try {
    const respuesta = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        title: "teste de creacion",
        body: "teste body",
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const respuestaFinal = await respuesta.json();
    console.log("respuesta final", respuestaFinal);
  } catch (e) {
    console.error("Error", e);
  }
};

getData();
