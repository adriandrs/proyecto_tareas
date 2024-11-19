# Gestor de Tareas  

## Descripción  

El **Gestor de Tareas** es una aplicación web construida con **React** que permite gestionar tareas de forma sencilla. Puedes agregar, editar, eliminar, y marcar tareas como completadas. Además, puedes adjuntar archivos a las tareas y gestionar su estado (Pendiente o Hecha). Los datos se almacenan de manera persistente en el navegador utilizando **localStorage**, lo que permite que las tareas se mantengan guardadas incluso al recargar la página.  

## Características  

- **Gestión de tareas**: Crear tareas con nombre y descripción.  
- **Filtrado de tareas**: Puedes filtrar las tareas por estatus (Pendiente o Hecha).  
- **Subir archivos**: Adjuntar archivos a las tareas.  
- **Almacenamiento persistente**: Las tareas se guardan en el almacenamiento local del navegador.  

## Instrucciones de Instalación y Ejecución  

### Requisitos Previos  

Asegúrate de tener **Node.js** y **npm** instalados en tu máquina. Puedes comprobar esto ejecutando los siguientes comandos en la terminal:  

``` 
node -v  
npm -v  
Si no los tienes instalados, puedes descargarlos desde nodejs.org.

Instalación
Clona el repositorio en tu máquina local:

git clone https://github.com/tu-usuario/gestor-de-tareas.git  
cd gestor-de-tareas  
Instala las dependencias del proyecto:

npm install

Ejecución
Para ejecutar la aplicación en tu entorno local, usa el siguiente comando:

npm start

Esto iniciará la aplicación en modo desarrollo. Puedes acceder a la aplicación en tu navegador en http://localhost:3000.

```
Explicación del Flujo de Trabajo y Componentes Principales
Estado y Manejo de Datos
useState: Se utilizan hooks de estado para manejar las tareas (tareas), las tareas filtradas (tareasFiltradas), el filtro de estatus (filtro), y la nueva tarea a agregar (nuevaTarea).

useEffect: Se usan dos efectos principales:

Filtrar las tareas según el estatus seleccionado.
Guardar las tareas en el localStorage cada vez que se actualicen.
Funciones Principales
Agregar tarea: Permite agregar nuevas tareas con nombre y descripción.
Modificar tarea: Permite editar una tarea existente.
Eliminar tarea: Elimina una tarea de la lista.
Cambiar estatus: Permite alternar el estatus de una tarea entre "Pendiente" y "Hecha".
Gestionar archivos: Permite adjuntar y eliminar archivos de una tarea, y finalmente enviar los archivos si la tarea está completa.
Componentes Principales
App: Es el componente principal que contiene la lógica de la aplicación y la renderización de los elementos.
Tareas: La lista de tareas se muestra dinámicamente y se actualiza según las acciones del usuario.
Filtros: Los filtros permiten ver las tareas filtradas por estatus (Pendientes, Hechas, Todas).
Formulario de Nueva Tarea: Permite a los usuarios ingresar una nueva tarea y agregarla a la lista.
Gestión de Archivos: Cada tarea puede tener archivos adjuntos, y el usuario puede subir o eliminar archivos.
Contribuciones
Si deseas contribuir al proyecto, sigue estos pasos:

Haz un fork de este repositorio.
Crea una nueva rama (git checkout -b mi-nueva-funcionalidad).
Realiza tus cambios y haz commit (git commit -am 'Añadir nueva funcionalidad').
Haz push a tu rama (git push origin mi-nueva-funcionalidad).
Abre un pull request.
Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.
