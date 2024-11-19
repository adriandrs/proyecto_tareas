import "./App.css";
import { useState, useEffect } from "react";

const tareasT = [
  {
    nombre: "Tarea 1",
    descripcion: "Descripcion 1",
    estatus: "Hecha",
  },
  {
    nombre: "Tarea 2",
    descripcion: "Descripcion 2",
    estatus: "Pendiente",
  },
  {
    nombre: "Tarea 3",
    descripcion: "Descripcion 3",
    estatus: "Retrasada",
  },
];

function App() {
  const [tareas, setTareas] = useState(
    tareasT || localStorage.getItem("tareas")
  );
  const [tareasFiltradas, setTareasFiltradas] = useState([]);

  useEffect(() => {
    setTareasFiltradas(tareas);
    localStorage.setItem("tareas", tareas);
  }, []);

  const estatusClassNames = (estatus) => {
    return {
      width: "fit-content",
      backgroundColor: estatus === "Hecha" ? "#d4edda" : "#f8d7da",
      color: estatus === "Hecha" ? "#155724" : "#721c24",
      padding: "10px",
      border: "1px solid #ddd",
      marginBottom: "10px",
    };
  };

  const agregarTarea = () => {};
  const modificar = () => {};
  const eliminarTarea = () => {};

  return (
    <main>
      <h1>Projecto Tareas</h1>
      <section className="app">
        <div className="contenedor">
          <ul className="contenedor-tareas">
            {tareasFiltradas.map((tarea) => (
              <li className="tarea" key={tarea.id}>
                <p>{tarea.nombre}</p>
                <p>{tarea.descripcion}</p>
                <button
                  style={estatusClassNames(tarea.estatus)}
                  className="estatus"
                >
                  Estatus: {tarea.estatus}
                </button>

                <input type="file"></input>
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              agregarTarea();
            }}
          >
            Agregar Tarea
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
