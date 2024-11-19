import "./App.css";
import { useState, useEffect } from "react";

function App() {
  // Se iincializan las tareas con el localStorage
  const [tareas, setTareas] = useState(() => {
    const tareasGuardadas = localStorage.getItem("tareas");
    if (tareasGuardadas) {
      return JSON.parse(tareasGuardadas); // Si ya hay tareas guardadas se cargan
    } else {
      // Si no hay tareas guardadas, se muestran las tareas predeterminadas
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
    }
  });

  const [tareasFiltradas, setTareasFiltradas] = useState([]); // Estado para almacenar las tareas filtradas
  const [filtro, setFiltro] = useState("Todas"); // Estado para almacenar el filtro seleccionado
  const [nuevaTarea, setNuevaTarea] = useState({ nombre: "", descripcion: "" }); // Estado para almacenar los datos de la nueva tarea
  const [editandoDetalles, setEditandoDetalles] = useState(null); // Estado para almacenar el ID de la tarea que se está editando
  const [editandoArchivos, setEditandoArchivos] = useState(null); // Estado para almacenar el ID de la tarea que se está editando

  // Efecto que aplica el filtro seleccionado a las tareas
  useEffect(() => {
    if (filtro === "Todas") {
      setTareasFiltradas(tareas); // Si el filtro es "Todas", mostramos todas las tareas
    } else {
      setTareasFiltradas(tareas.filter((tarea) => tarea.estatus === filtro)); // Si no, solo las tareas que coincidan con el filtro
    }
  }, [filtro, tareas]);

  // Efecto para guardar las tareas en el localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas)); // Guardamos las tareas en el localStorage
  }, [tareas]);

  // Función para agregar una nueva tarea
  const agregarTarea = () => {
    if (nuevaTarea.nombre && nuevaTarea.descripcion) {
      const nueva = {
        id: Date.now(),
        nombre: nuevaTarea.nombre,
        descripcion: nuevaTarea.descripcion,
        estatus: "Pendiente",
        archivos: [], // Inicialización de archivos como arreglo vacío
      };
      setTareas([...tareas, nueva]); // Se agrega la nueva tarea al estado
      setNuevaTarea({ nombre: "", descripcion: "" });
    }
  };

  // Función para modificar una tarea
  const modificarTarea = (id) => {
    if (nuevaTarea.nombre && nuevaTarea.descripcion) {
      // Se verifica que los campos no estén vacíos
      setTareas(
        tareas.map((tarea) =>
          tarea.id === id
            ? {
                ...tarea,
                nombre: nuevaTarea.nombre,
                descripcion: nuevaTarea.descripcion,
              }
            : tarea
        ) // Se reemplaza la tarea con los nuevos datos
      );
      setEditandoDetalles(null); // Se quita el modo de edición
      setNuevaTarea({ nombre: "", descripcion: "" }); // Se limpian los campos
    }
  };

  // Función para eliminar una tarea
  const eliminarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id)); // Se filtran las tareas para quitar la tarea con el ID especificado
  };

  // Función para agregar un archivo a una tarea
  const agregarArchivo = (id, archivo) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id
          ? { ...tarea, archivos: [...tarea.archivos, archivo] }
          : tarea
      )
    ); // Se agrega el archivo a la tarea especificada
  };

  // Función para eliminar un archivo de una tarea
  const eliminarArchivo = (id, archivoIndex) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id
          ? {
              ...tarea,
              archivos: tarea.archivos.filter(
                (_, index) => index !== archivoIndex
              ),
            }
          : tarea
      )
    ); // Se filtran los archivos para quitar el archivo con el ID especificado
  };

  // Función para enviar los archivos de una tarea
  const enviarArchivos = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, estatus: "Hecha" } : tarea
      )
    ); // Se cambia el estatus de la tarea a "Hecha"
    setEditandoArchivos(null); // Se quita el modo de edición
  };

  // Función para cambiar el estatus de una tarea
  const cambiarEstatus = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id
          ? {
              ...tarea,
              estatus: tarea.estatus === "Hecha" ? "Pendiente" : "Hecha",
            }
          : tarea
      )
    ); // Se cambia el estatus de la tarea
  };

  return (
    <main>
      <header>
        <h1 className="header">Gestor de Tareas</h1>
        <p>Sistemas de gestion de tareas.</p>
      </header>{" "}
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
                        ? "#ff6b6b" // Color cuando está editando archivos
                        : tarea.estatus === "Hecha"
                        ? "#6bff8f" // Color cuando está hecha
                        : "#ff6b6b", // Color por defecto (cuando está pendiente)
                  }}
                >
                  {editandoArchivos === tarea.id ? "Pendiente" : tarea.estatus}
                </button>

                {/* Archivos */}
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
                    Editar envio
                  </button>
                )}

                {/* Botón para editar detalles */}
                {editandoDetalles === tarea.id ? (
                  <>
                    <input
                      type="text"
                      placeholder="Nombre"
                      value={nuevaTarea.nombre}
                      onChange={(e) =>
                        setNuevaTarea({ ...nuevaTarea, nombre: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      placeholder="Descripción"
                      value={nuevaTarea.descripcion}
                      onChange={(e) =>
                        setNuevaTarea({
                          ...nuevaTarea,
                          descripcion: e.target.value,
                        })
                      }
                    />
                    <button onClick={() => modificarTarea(tarea.id)}>
                      Guardar
                    </button>
                    <button onClick={() => setEditandoDetalles(null)}>
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setEditandoDetalles(tarea.id);
                      setNuevaTarea({
                        nombre: tarea.nombre,
                        descripcion: tarea.descripcion,
                      });
                    }}
                  >
                    Editar Detalles
                  </button>
                )}

                <button onClick={() => eliminarTarea(tarea.id)}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <div>
            <h2>Agregar Nueva Tarea</h2>
            <input
              type="text"
              placeholder="Nombre"
              value={nuevaTarea.nombre}
              onChange={(e) =>
                setNuevaTarea({ ...nuevaTarea, nombre: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Descripción"
              value={nuevaTarea.descripcion}
              onChange={(e) =>
                setNuevaTarea({ ...nuevaTarea, descripcion: e.target.value })
              }
            />
            <button className="btn-agregar" onClick={agregarTarea}>
              Agregar Tarea
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
