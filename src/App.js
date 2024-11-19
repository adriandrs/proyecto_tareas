import "./App.css";
import { useState, useEffect } from "react";

function App() {
  // Usamos useState para inicializar las tareas con el localStorage, o con tareas predeterminadas si no hay datos
  const [tareas, setTareas] = useState(() => {
    const tareasGuardadas = localStorage.getItem("tareas");
    if (tareasGuardadas) {
      return JSON.parse(tareasGuardadas); // Si ya hay tareas guardadas, las cargamos
    } else {
      // Si no hay tareas guardadas, cargamos las tareas predeterminadas
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

  const [tareasFiltradas, setTareasFiltradas] = useState([]);
  const [filtro, setFiltro] = useState("Todas");
  const [nuevaTarea, setNuevaTarea] = useState({ nombre: "", descripcion: "" });
  const [editandoDetalles, setEditandoDetalles] = useState(null);
  const [editandoArchivos, setEditandoArchivos] = useState(null);

  useEffect(() => {
    if (filtro === "Todas") {
      setTareasFiltradas(tareas);
    } else {
      setTareasFiltradas(tareas.filter((tarea) => tarea.estatus === filtro));
    }
  }, [filtro, tareas]);

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  const agregarTarea = () => {
    if (nuevaTarea.nombre && nuevaTarea.descripcion) {
      const nueva = {
        id: Date.now(),
        nombre: nuevaTarea.nombre,
        descripcion: nuevaTarea.descripcion,
        estatus: "Pendiente",
        archivos: [], // Inicialización segura de archivos como arreglo vacío
      };
      setTareas([...tareas, nueva]);
      setNuevaTarea({ nombre: "", descripcion: "" });
    }
  };

  const modificarTarea = (id) => {
    if (nuevaTarea.nombre && nuevaTarea.descripcion) {
      setTareas(
        tareas.map((tarea) =>
          tarea.id === id
            ? {
                ...tarea,
                nombre: nuevaTarea.nombre,
                descripcion: nuevaTarea.descripcion,
              }
            : tarea
        )
      );
      setEditandoDetalles(null);
      setNuevaTarea({ nombre: "", descripcion: "" });
    }
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  const agregarArchivo = (id, archivo) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id
          ? { ...tarea, archivos: [...tarea.archivos, archivo] }
          : tarea
      )
    );
  };

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
    );
  };

  const enviarArchivos = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, estatus: "Hecha" } : tarea
      )
    );
    setEditandoArchivos(null);
  };

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
    );
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
                        ? "#f8d7da" // Color cuando está editando archivos
                        : tarea.estatus === "Hecha"
                        ? "#d4edda" // Color cuando está hecha
                        : "#f8d7da", // Color por defecto (cuando está pendiente)
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
                      ).map(
                        (
                          archivo,
                          index // Comprobamos que sea un arreglo
                        ) => (
                          <li key={index}>
                            {archivo.name}{" "}
                            <button
                              onClick={() => eliminarArchivo(tarea.id, index)}
                            >
                              Eliminar
                            </button>
                          </li>
                        )
                      )}
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
