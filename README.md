Guía de Turismo de Tokio
Autor: Fornell Butrón, Diego

Esta guía cuenta con una página principal en la que se muestran varias tarjetas con diferentes sitios de interés de Tokio. Cada tarjeta está creada usando Card, un elemento de Angular Material. Las tarjetas constan de:

Una imagen.
El nombre del lugar.
Una pequeña descripción.
La puntuación media.
Un botón que permite al usuario dirigirse a la página específica del sitio para leer más información.
Además, la página principal incluye un apartado en la parte inferior donde se pueden ver:

Los sitios con mayor puntuación.
Algunos comentarios aleatorios sobre lugares específicos.
Página Específica del Lugar
Se muestra una imagen central rodeada de varias imágenes más pequeñas.
Al hacer clic en cualquiera de las imágenes, esta reemplazará la imagen central y se ampliará para poder verla con más detalle.
Se presenta una descripción más detallada del lugar.
Se muestran las valoraciones y comentarios de los usuarios.
Si el usuario ha iniciado sesión, podrá calificar y comentar sobre el lugar.
Autenticación de Usuarios
Se ha incluido crypto-js para encriptar la contraseña.
Se usa JWT para generar el token que se almacena en las cookies y permite el acceso a rutas protegidas.
Base de Datos Simulada
Se utiliza dbTokio.json, una base de datos ficticia que almacena:
Lugares: incluyen fotos, descripciones, comentarios y valoraciones.
Usuarios: incluyen datos personales y contraseña encriptada.
Generación de PDF
La página principal incluye un generador de PDF que crea un archivo con la información e imágenes de cada lugar.
Instalación del Proyecto
1. Verificar Node.js y npm
Para comprobar si están instalados:

sh
Copiar
Editar
node -v  
npm -v  
Si no están instalados, ejecuta:

sh
Copiar
Editar
sudo apt install nodejs npm -y  
2. Verificar Angular CLI y JSON Server
Para comprobar sus versiones:

sh
Copiar
Editar
ng version  
json-server --version  
Si no están instalados:

sh
Copiar
Editar
npm install -g @angular/cli  
npm install -g json-server  
3. Instalar Dependencias del Proyecto
Desde la terminal, accede al directorio del proyecto y ejecuta:

sh
Copiar
Editar
npm install  
4. Iniciar la Base de Datos JSON
sh
Copiar
Editar
json-server --watch dbTokio.json  
5. Iniciar el Proyecto Angular
En otra terminal dentro de VS Code, ejecuta:

sh
Copiar
Editar
ng serve  
Estructura del Proyecto
Componentes Principales
contentcard y content → Muestran el contenido principal de la aplicación.
random-comments y top-rated-places → Se encargan de mostrar comentarios aleatorios y los sitios con mayor puntuación dentro de contentcard.
Servicios y Modelos
places.service.ts → Incluye la función para obtener los lugares con mayor puntuación.
user.model.ts y login.service.ts → Gestionan la autenticación y creación de tokens.
Sistema de Rutas
Uso de app.routes.ts para la gestión de rutas de la aplicación.
Navbar Dinámico
Permite a los usuarios:
Registrarse e iniciar sesión.
Cerrar sesión.
Acceder a la administración de sitios (solo si son administradores).
Panel de Administración
Los administradores pueden:
Crear, ver, editar y eliminar lugares.
Correcciones y Mejoras en Angular
Se modificó el archivo angular.json para que reconozca la carpeta assets, resolviendo problemas con la carga de imágenes.
Se ajustaron los estilos globales, excepto en admin-places, debido a incompatibilidades con el paginador de Angular Material.
Se importaron todas las dependencias en los archivos .ts correspondientes.
Tecnologías Utilizadas
Framework: Angular
UI: Angular Material
Autenticación: JSON Web Token (JWT), Crypto-js
Base de Datos Simulada: JSON Server
Estilos: Angular Material (No se usó Bootstrap)
