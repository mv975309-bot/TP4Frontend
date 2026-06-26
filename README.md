# SVM Books — Frontend

Cliente web de la librería virtual SVM Books. Desarrollado con React + Vite y React Bootstrap.

## Integrantes

- Quevedo, Samir
- Vélez, Manuel
- Martino, Valentín

## Tecnologías

- React 19 + Vite
- React Bootstrap (librería UI)
- React Router DOM (navegación)
- Axios (llamadas a la API)
- Context API con useContext (estado global)

## Requisitos previos

Tener el backend corriendo en `http://localhost:3000`. Ver instrucciones en el repositorio del backend.

## Instalación

```
npm install
```

## Levantar la aplicación

```
npm run dev
```

La app queda disponible en `http://localhost:5173`.

## Vistas

| Ruta | Vista | Descripción |
|------|-------|-------------|
| `/` | Inicio | Catálogo de libros con búsqueda y filtro por género |
| `/libros/:id` | Detalle de libro | Información completa, reseñas y agregar al carrito |
| `/generos` | Géneros | Listado de géneros con libros filtrados |
| `/carrito` | Carrito | Items del carrito y confirmación de pedido |
| `/login` | Login / Registro | Inicio de sesión y creación de cuenta |
| `/admin` | Panel de administración | CRUD de libros, autores, géneros, editoriales, usuarios y reseñas |

## Estado global

- **ContextoAuth**: gestiona el usuario autenticado y el token JWT (persiste en localStorage)
- **ContextoCarrito**: gestiona los items del carrito de compras

## Funcionalidades principales

- Búsqueda de libros por título
- Filtrado por género
- Registro e inicio de sesión con JWT
- Carrito de compras que genera pedidos reales en el backend
- Reseñas con puntaje de estrellas (crear, ver, eliminar)
- Panel de administración completo (solo para usuarios con rol admin)
- Gestión de roles de usuario desde el panel admin
