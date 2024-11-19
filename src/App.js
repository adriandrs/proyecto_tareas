import "./App.css"; // Importamos el archivo de estilos CSS para la app
import { useState, useEffect } from "react"; // Importamos los hooks de React: useState y useEffect

function App() {
  // useState para manejar las tareas, las cuales se obtienen del localStorage si es que existen
  const [tareas, setTareas] = useState(() => {
    const tareasGuardadas = localStorage.getItem("tareas"); // Verificamos si ya existen tareas guardadas
    if (tareasGuardadas) {
      // Si ya existen, las usamos; de lo contrario, asignamos tareas predeterminadas (ejemplo de programación)
      return [
        {
          id: 1,
          nombre: "Desarrollar una API RESTful",
          descripcion:
            "Crear una API RESTful que permita manejar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para gestionar usuarios en un sistema. Utiliza Node.js con Express y MongoDB.",
          estatus: "Pendiente",
          archivos: [], // Empezamos sin archivos adjuntos
        },
        {
          id: 3,
          nombre: "Desarrollo de Aplicación Web con React",
          descripcion:
            "Crear una aplicación web de lista de tareas (To-Do List) utilizando React. La aplicación debe permitir agregar, editar, eliminar y marcar tareas como completadas, y almacenar los datos en el almacenamiento local del navegador.",
          estatus: "Pendiente",
          archivos: [],
        },
        {
          id: 4,
          nombre: "Proyecto de Programación Orientada a Objetos",
          descripcion:
            "Diseñar un programa en Java que implemente un sistema de gestión de inventario utilizando principios de programación orientada a objetos (POO). Debe incluir clases para productos, clientes y pedidos.",
          estatus: "Pendiente",
          archivos: [],
        },
      ];
    } else {
      // Si no hay tareas guardadas, devolvemos un array vacío
      return [];
    }
  });

  // useState para manejar las tareas filtradas según el estatus
  const [tareasFiltradas, setTareasFiltradas] = useState([]);

  // useState para manejar el filtro de tareas: 'Todas', 'Pendiente' o 'Hecha'
  const [filtro, setFiltro] = useState("Todas");

  // useState para manejar la tarea nueva que vamos a agregar
  const [nuevaTarea, setNuevaTarea] = useState({ nombre: "", descripcion: "" });

  // Estado para saber si estamos editando los detalles de una tarea
  const [editandoDetalles, setEditandoDetalles] = useState(null);

  // Estado para saber si estamos editando los archivos adjuntos de una tarea
  const [editandoArchivos, setEditandoArchivos] = useState(null);

  // useEffect para filtrar las tareas según el estatus seleccionado
  useEffect(() => {
    if (filtro === "Todas") {
      setTareasFiltradas(tareas); // Si el filtro es "Todas", mostramos todas las tareas
    } else {
      setTareasFiltradas(tareas.filter((tarea) => tarea.estatus === filtro)); // Filtramos las tareas por el estatus
    }
  }, [filtro, tareas]);

  // useEffect para guardar las tareas en el localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  // Función para agregar una nueva tarea
  const agregarTarea = () => {
    if (nuevaTarea.nombre && nuevaTarea.descripcion) {
      const nueva = {
        id: Date.now(), // Usamos el timestamp como ID único
        nombre: nuevaTarea.nombre,
        descripcion: nuevaTarea.descripcion,
        estatus: "Pendiente", // Por defecto, la tarea está pendiente
        archivos: [], // Inicialmente no tiene archivos adjuntos
      };
      setTareas([...tareas, nueva]); // Agregamos la nueva tarea al estado de tareas
      setNuevaTarea({ nombre: "", descripcion: "" }); // Limpiamos los campos del formulario
    }
  };

  // Función para modificar una tarea existente
  const modificarTarea = (id) => {
    if (nuevaTarea.nombre && nuevaTarea.descripcion) {
      setTareas(
        tareas.map((tarea) =>
          tarea.id === id
            ? {
                ...tarea, // Mantenemos el resto de las propiedades de la tarea
                nombre: nuevaTarea.nombre,
                descripcion: nuevaTarea.descripcion,
              }
            : tarea
        )
      );
      setEditandoDetalles(null); // Salimos del modo de edición
      setNuevaTarea({ nombre: "", descripcion: "" }); // Limpiamos los campos
    }
  };

  // Función para eliminar una tarea
  const eliminarTarea = (id) => {
    if (window.confirm("¿Seguro que quieres eliminar esta tarea?")) {
      setTareas(tareas.filter((tarea) => tarea.id !== id)); // Eliminamos la tarea del estado
    }
  };

  // Función para agregar archivos a una tarea
  const agregarArchivo = (id, archivo) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id
          ? { ...tarea, archivos: [...tarea.archivos, archivo] } // Añadimos el archivo a la tarea
          : tarea
      )
    );
  };

  // Función para eliminar un archivo de una tarea
  const eliminarArchivo = (id, archivoIndex) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id
          ? {
              ...tarea,
              archivos: tarea.archivos.filter(
                (_, index) => index !== archivoIndex // Eliminamos el archivo por índice
              ),
            }
          : tarea
      )
    );
  };

  // Función para enviar los archivos de una tarea
  const enviarArchivos = (id) => {
    setTareas(
      tareas.map(
        (tarea) => (tarea.id === id ? { ...tarea, estatus: "Hecha" } : tarea) // Cambiamos el estatus a "Hecha"
      )
    );
    setEditandoArchivos(null); // Salimos del modo de edición de archivos
  };

  // Función para cambiar el estatus de una tarea (de Pendiente a Hecha o viceversa)
  const cambiarEstatus = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id
          ? {
              ...tarea,
              estatus: tarea.estatus === "Hecha" ? "Pendiente" : "Hecha", // Alternamos entre los estatus
            }
          : tarea
      )
    );
  };

  return (
    <main>
      <header>
        <h1 className="header">Gestor de Tareas</h1>
      </header>
      <section className="app">
        <div className="filtros">
          <h5>Filtros</h5>
          <button onClick={() => setFiltro("Todas")}>Todas</button>
          <button onClick={() => setFiltro("Pendiente")}>Pendientes</button>
          <button onClick={() => setFiltro("Hecha")}>Hechas</button>
        </div>
        <div className="contenedor">
          <ul className="contenedor-tareas">
            {tareasFiltradas.map((tarea) => (
              <li className="tarea" key={tarea.id}>
                <p className="nombre">{tarea.nombre}</p>
                <p className="descripcion">{tarea.descripcion}</p>

                <button
                  onClick={() => cambiarEstatus(tarea.id)}
                  className="btn-estatus"
                  style={{
                    backgroundColor:
                      editandoArchivos === tarea.id
                        ? "#f8d7da" // Si está editando archivos, color diferente
                        : tarea.estatus === "Hecha"
                        ? "#d4edda" // Si la tarea está hecha, color verde
                        : "#f8d7da", // Si está pendiente, color rojo
                  }}
                  disabled={
                    tarea.estatus === "Hecha" && tarea.archivos.length > 0
                  }
                >
                  {editandoArchivos === tarea.id ? "Pendiente" : tarea.estatus}
                </button>

                {/* Sección para archivos */}
                {editandoArchivos === tarea.id ? (
                  <>
                    <ul>
                      {(Array.isArray(tarea.archivos)
                        ? tarea.archivos
                        : []
                      ).map((archivo, index) => (
                        <li key={index}>
                          {archivo.name}{" "}
                          <button
                            onClick={() => eliminarArchivo(tarea.id, index)}
                          >
                            Eliminar
                          </button>
                        </li>
                      ))}
                    </ul>
                    <input
                      type="file"
                      onChange={(e) => {
                        const archivo = e.target.files[0];
                        if (archivo) agregarArchivo(tarea.id, archivo);
                      }}
                    />
                    <button onClick={() => enviarArchivos(tarea.id)}>
                      Guardar y Enviar
                    </button>
                    <button onClick={() => setEditandoArchivos(null)}>
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button onClick={() => setEditandoArchivos(tarea.id)}>
                    Subir Archivos
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

export default App;
