# todo-list – Prueba técnica frontend . Accenture Colombia

Aplicación híbrida desarrollada con Ionic + Angular + Cordova como parte del proceso de selección para el rol de Desarrollador frontend.

## 📦 Tecnologías utilizadas

- Ionic Framework v8 (Angular 19)
- Cordova (build Android)
- Firebase (Remote Config)
- Ionic Storage (almacenamiento local)
- Arquitectura modular y limpia (servicios, modelos, vistas separadas)

## 🚀 ¿Cómo ejecutar el proyecto?

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/nombre-repo.git
   cd nombre-repo
   ```
2. Instala dependencias:
   npm install
3. Ejecuta en navegador:
   ionic serve
4. Genera build para Cordova:
   ionic build
   cp -r ./www/\* ./cordova-app/www/
   cd cordova-app
   cordova platform add android
   cordova run android

## ✅ Funcionalidades implementadas

- Crear, eliminar, completar tareas.
- Filtrado por categoría.
- Persistencia local con Ionic Storage.
- Integración con Firebase Remote Config.
- Feature flag: enable_task_deletion.
- Arquitectura limpia y modular.
- Preparado para Android con Cordova.

## 🧪 Feature Flag con Firebase

- Se utiliza Remote Config para permitir o desactivar ciertas funcionalidades.
- Flag activa o desactiva botón de eliminación de tareas (enable_task_deletion).
- En producción, se cachea por 1h. En desarrollo, se forza fetch cada vez.

## 🧠 Decisiones técnicas

- Se evitó el uso de Capacitor por requisitos de la prueba (Cordova requerido).
- Remote Config permite modificar la UI sin necesidad de recompilar.
- Se aplicaron principios de arquitectura limpia: separación de servicios, modelos y vistas.

## 🖼️ Capturas

(Agrega aquí capturas con rutas relativas o enlaces directos)

## 📹 Video de demo

(Agrega enlace a Google Drive, Loom, o GitHub Video)

## 👨‍💻 Autor

Carlos Fonseca – cmariofonseca@gmail.com
