/**
 * Crear un to do list y realizar su respectivo
 * CRUD Create Read Update Delete, filtro por estado
 */

// array de tareas
const URL = "http://localhost:3000/tareas";
let listaDeTareas = [];
let tareasFiltradas = [];

const editarEstado = async (e, id, nombreTarea) => {
  e.preventDefault();
  const newEstado = e.target.value;
  const promesa = fetch(`${URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      nombre: nombreTarea,
      estado: newEstado,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const resolver = await promesa.json;
  const respuesta = await resolver.json();

  //cambiarEstadoPorPosicion(indice, newEstado);
  listarTareas();
};

const editarTarea = (e, id, estado, nombreTarea) => {
  e.preventDefault();
  const span = document.getElementById(`tarea${id}`);
  span.innerHTML = `
    <select name="estado" onchange="editarEstado(event, '${id}', '${nombreTarea}')">
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

const listarTareas = async () => {
  const promesa = await fetch(URL);
  const respuesta = await promesa.json();
  const section = document.getElementById("listaTareas");
  let htmLista = "";
  /**
   * [{tarea: lavar, estado: pendiente}, {tarea: barrer, estado:pendiente}]
   */
  respuesta.forEach(
    (tarea, index) =>
      (htmLista += `<div class="listaItem"> 
                <span>${tarea.nombre}</span> 
                <span id="tarea${tarea.id}">${tarea.estado}</span>
                <button type="button" onclick="editarTarea(event, '${tarea.id}', '${tarea.estado}', '${tarea.nombre}' )"> Editar</button>
                <button type="button" onclick="eliminarTareaPorId('${tarea.id}')">Eliminar</button>
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
};

// declaracion de la funcion agregar tarea
const agregarTarea = async (nombre, estado) => {
  const tarea = {
    nombre,
    estado,
  };
  const promesa = fetch(URL, {
    method: "POST",
    body: JSON.stringify(tarea),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const resolver = await promesa.json;
  const respuesta = await resolver.json();
  console.log("respuesta", respuesta);
  //listaDeTareas.push(tarea);
  listarTareas();
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
const eliminarTareaPorId = async (id) => {
  //alert("entré")
  //listaDeTareas.splice(posicion, 1);
  const promesa = fetch(`${URL}/${id}`, {
    method: "DELETE",
  });

  const resolver = await promesa.json;
  const respuesta = await resolver.json();
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
