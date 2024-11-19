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
useState
Se utilizan hooks de estado para manejar los siguientes datos:

tareas: Almacena la lista completa de tareas.
tareasFiltradas: Contiene las tareas filtradas según el estatus seleccionado.
filtro: Almacena el filtro actual para el estatus de las tareas (Pendientes, Hechas, Todas).
nuevaTarea: Guarda los datos (nombre y descripción) de la nueva tarea que se va a agregar.
useEffect
Se usan dos efectos principales para gestionar el estado y la persistencia de los datos:

Filtrar tareas: Se filtran las tareas según el estatus seleccionado (Pendiente, Hecha, Todas).
Guardar tareas en localStorage: Cada vez que se actualiza la lista de tareas, se guarda la información en el almacenamiento local del navegador.
Funciones Principales
1. Agregar tarea
Permite agregar nuevas tareas con nombre y descripción.

2. Modificar tarea
Permite editar una tarea existente, cambiando su nombre y descripción.

3. Eliminar tarea
Elimina una tarea de la lista de tareas.

4. Cambiar estatus
Permite alternar el estatus de una tarea entre "Pendiente" y "Hecha".

5. Gestionar archivos
Permite adjuntar archivos a una tarea.
El usuario puede eliminar archivos adjuntos.
Los archivos se envían cuando la tarea es completada.
Componentes Principales
1. App
Es el componente principal que contiene la lógica de la aplicación y la renderización de los elementos.

2. Tareas
La lista de tareas se muestra dinámicamente y se actualiza según las acciones del usuario.

3. Filtros
Los filtros permiten ver las tareas filtradas por estatus (Pendientes, Hechas, Todas).

4. Formulario de Nueva Tarea
Permite a los usuarios ingresar una nueva tarea con nombre y descripción, y agregarla a la lista de tareas.

5. Gestión de Archivos
Cada tarea puede tener archivos adjuntos. El usuario puede subir o eliminar archivos y marcar la tarea como completada cuando los archivos sean enviados.
