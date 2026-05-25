# Monitoring Innovation — Prueba Tecnica Full Stack by Laura Reyes Arias

Sistema de gestion de vehiculos para un concesionario hipotetico. 
Permite ver, crear, editar y eliminar vehiculos con control de acceso por roles.

## Demo
[https://monitoring-innovation.netlify.app](https://monitoring-innovation.netlify.app)

## Repositorios
- Frontend: [prueba-frontend](https://github.com/ltlauRarias/prueba-frontend)
- Backend: [prueba-backend2](https://github.com/ltlauRarias/prueba-backend2)

## Tecnologias
- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Axios
- **Backend:** Python, FastAPI, SQLAlchemy, SQLite, JWT

## Usuarios de prueba
> Por defecto yo estaba usando los siguientes usuarios a continuacion, pero el plan gratuito de Render resetea la base de datos al reiniciarse o cada cierto tiempo. Se recomienda crearlos nuevamente a traves de: [https://prueba-backend-3lgp.onrender.com/docs](https://prueba-backend-3lgp.onrender.com/docs) usando el endpoint `/api/auth/register` para poder visualizar la web de manera correcta.

| Usuario | Contraseña | Rol |
|---------|-----------|-----|
| admin | admin123 | Admin - CRUD completo |
| viewer | viewer123 | Viewer - solo lectura |

## Funcionalidades
- Login con autenticacion JWT
- Pantalla de bienvenida con animaciones
- Tabla de vehiculos con CRUD completo
- Animacion al eliminar filas
- Control de roles: admin y viewer
- Redirección automatica si el token expira

## Correr localmente
```bash
npm install
npm run dev
```
Abrir en [http://localhost:3000](http://localhost:3000)