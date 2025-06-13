# todo-list – Prueba técnica frontend . Accenture Colombia

Esta es una aplicación híbrida desarrollada con **Ionic + Angular + Cordova**, como parte de una prueba técnica para el rol de Desarrollador Frontend. La aplicación permite gestionar tareas pendientes con funcionalidades de **agregar, completar, eliminar y categorizar tareas**, usando almacenamiento local e integración con **Firebase Remote Config** para feature flags.

## ✅ Requisitos técnicos cumplidos

- [x] Aplicación híbrida con Ionic y Angular
- [x] CRUD básico de tareas (Crear, Leer, Actualizar, Eliminar)
- [x] Almacenamiento local persistente con `@ionic/storage-angular`
- [x] Filtro por categoría (trabajo, personal, estudio)
- [x] Feature flag con Firebase Remote Config
- [x] Optimización de rendimiento: Lazy loading, trackBy, manejo eficiente de memoria
- [x] Compilable en Android (APK) e iOS (IPA) usando Cordova
- [x] Uso de Git y repositorio público
- [x] Interfaz compatible con dispositivos móviles
- [x] Capturas y demo funcional incluidas
- [x] Respuestas a preguntas técnicas sobre arquitectura y optimización

## 📦 Tecnologías usada

- **Ionic Framework**: v8.0.0
- **Angular**: v19.0.0
- **Firebase**: Remote Config
- **@ionic/storage-angular**: Para almacenamiento local v4.0.0
- **Cordova**: Para compilación móvil v12.0.0

## 🌳 Estructura del proyecto

src
┣ app
┃ ┣ components
┃ ┃ ┣ task-item
┃ ┃ ┃ ┣ task-item.component.html
┃ ┃ ┃ ┣ task-item.component.scss
┃ ┃ ┃ ┣ task-item.component.spec.ts
┃ ┃ ┃ ┗ task-item.component.ts
┃ ┃ ┗ components.module.ts
┃ ┣ layout
┃ ┃ ┣ layout-routing.module.ts
┃ ┃ ┣ layout.html
┃ ┃ ┣ layout.module.ts
┃ ┃ ┣ layout.scss
┃ ┃ ┣ layout.spec.ts
┃ ┃ ┗ layout.ts
┃ ┣ models
┃ ┃ ┣ constants
┃ ┃ ┃ ┣ feature-flags.ts
┃ ┃ ┃ ┗ storage-keys.ts
┃ ┃ ┗ interfaces
┃ ┃ ┃ ┗ task.ts
┃ ┣ pages
┃ ┃ ┣ add-task
┃ ┃ ┃ ┣ add-task-routing.module.ts
┃ ┃ ┃ ┣ add-task.module.ts
┃ ┃ ┃ ┣ add-task.page.html
┃ ┃ ┃ ┣ add-task.page.scss
┃ ┃ ┃ ┣ add-task.page.spec.ts
┃ ┃ ┃ ┗ add-task.page.ts
┃ ┃ ┗ home
┃ ┃ ┃ ┣ home-routing.module.ts
┃ ┃ ┃ ┣ home.module.ts
┃ ┃ ┃ ┣ home.page.html
┃ ┃ ┃ ┣ home.page.scss
┃ ┃ ┃ ┣ home.page.spec.ts
┃ ┃ ┃ ┗ home.page.ts
┃ ┣ services
┃ ┃ ┣ feature-flag.service.spec.ts
┃ ┃ ┣ feature-flag.service.ts
┃ ┃ ┣ firebase-config.service.spec.ts
┃ ┃ ┣ firebase-config.service.ts
┃ ┃ ┣ storage.service.spec.ts
┃ ┃ ┣ storage.service.ts
┃ ┃ ┣ task.service.spec.ts
┃ ┃ ┗ task.service.ts
┃ ┣ app-routing.module.ts
┃ ┣ app.component.html
┃ ┣ app.component.scss
┃ ┣ app.component.spec.ts
┃ ┣ app.component.ts
┃ ┗ app.module.ts
┣ assets
┃ ┣ icon
┃ ┃ ┗ favicon.png
┃ ┗ shapes.svg
┣ environments
┃ ┣ environment.prod.ts
┃ ┣ environment.ts
┃ ┗ firebase-config.ts
┣ theme
┃ ┗ variables.scss
┣ global.scss
┣ index.html
┣ main.ts
┣ polyfills.ts
┣ test.ts
┗ zone-flags.ts

## 🚀 ¿Cómo ejecutar el proyecto?

1. Clona este repositorio:
   ```bash
   HTTPS: git clone https://github.com/cmariofonseca/todo-list.git
   SSH: git clone git@github.com:cmariofonseca/todo-list.git
   cd todo-list
   ```
2. Instala dependencias:
   npm install
3. Ejecuta en navegador:
   ionic serve
4. Genera build:
   ionic build
5. Para Android:
   ionic cordova build android --prod --release
   \*\*\* El APK se generará en:
   platforms/android/app-release.apk
6. Para IOS (em macOs):
   ionic cordova build ios --prod --release
   _\*\* El IPA se generará en:
   platforms/ios/build/device/_.ipa

## ✅ Funcionalidades implementadas

- Agregar tarea | Desde la página "Agregar Tarea"
- Marcar como completada | Checkbox en cada ítem de la lista
- Eliminar tarea | Botón "Eliminar" con confirmación
- Filtrado por categoría | Selector en HomePage para filtrar entre trabajo, personal y estudio
- Feature flag | El botón de eliminar se muestra u oculta según valor remoto (
  enable_task_deletion
  )
- Menú lateral funcional | Navegación rápida y cerrado automático al seleccionar opción

## 🧪 Feature Flag con Firebase Remote Config

- Se usa un flag remoto llamado enable_task_deletion para mostrar u ocultar el botón de eliminar tareas.

- Cómo actualizar el flag:
  1. Ingresa a Firebase Console
  2. Ve a Remote Config
  3. Asegúrate de tener definido el parámetro enable_task_deletion como booleano
  4. Cambia su valor y recarga la app
- En producción, se cachea por 1h. En desarrollo, se forza fetch cada vez.

## 📦 Servicios utilizados

- TaskService
  - Maneja todas las operaciones CRUD de tareas:
  - getAll()
  - getByCategory(category)
  - add(task)
  - update(task)
  - delete(id)
- StorageService
  - Wrapper sobre @ionic/storage-angular, facilita el acceso a datos locales.
- FirebaseConfigService
  - Servicio para cargar configuraciones remotas desde Firebase:
  - loadFeatureFlags()
  - isFeatureEnabled(key)

## 🧠 Decisiones técnicas importantes

- Se usó una arquitectura modular limpia, siguiendo principios de responsabilidad única
- Se encapsuló el acceso a Firebase Remote Config para evitar acoplamiento directo
- Se mejoró el comportamiento del menú lateral: ahora aparece como overlay y se cierra automáticamente
- Se centralizaron constantes de feature flags para evitar duplicados
- Se usó MenuController para mejorar la experiencia de usuario

## 🖼️ Capturas de pantalla

(Agrega aquí capturas con rutas relativas o enlaces directos)

## 📹 Video de demo

(Agrega enlace a Google Drive, Loom, o GitHub Video)

## 🧪 Respuestas a preguntas técnicas

1. ¿Cómo gestionaste el almacenamiento local?
   Usé @ionic/storage-angular, un wrapper basado en IndexedDB y WebSQL. Los datos se guardan bajo la clave tasks_list.
2. ¿Qué estrategias usaste para optimizar el rendimiento?
   Lazy loading de páginas
   Uso de trackBy en listas largas
   Uso de EventEmitter para comunicación padre-hijo
   Centralización de lógica en servicios reutilizables
   Uso de \*ngIf en lugar de aria-hidden para evitar errores de renderizado
3. ¿Cómo implementaste el Feature Flag con Firebase?
   Con Firebase Modular SDK, sin depender de @angular/fire/remote-config. Se descargan y activan los flags al inicio de la aplicación.
4. ¿Cuál fue el mayor desafío durante el desarrollo?
   Resolver problemas de componentes no reconocidos al usar módulos dinámicos y asegurar que el menú lateral funcione correctamente en web y móvil.
5. ¿Cómo estructuraste el código siguiendo buenas prácticas?
   Arquitectura modular clara
   Separación de capas (servicios, componentes, modelos, constantes)
   Uso de interfaces y tipado fuerte
   Uso de eventos para comunicación entre componentes
   Commit frecuentes y mensajes claros

## 📌 Entregables incluidos

- Archivo APK e IPA exportados y funcionales
- Repositorio público con control de versiones
- Documentación completa en este README
- Capturas o video demostrativo (ver carpeta /docs)
- Respuestas a preguntas técnicas

## 👨‍💻 Autor

Carlos Fonseca
https://carlosfonseca.dev
https://github.com/cmariofonseca
cmariofonseca@gmail.com
