README de la Entrega 2 para el frontend.
-
- Para correr el front, dentro de entrega se debe ejecutar yarn dev.
- Se implemento una pagina principal para los usuarios que esten loggeados, para verla correctamente debes cambiar const user = false; 
a const user = true; en el archivo Layout.jsx ("Entrega\src\pages\Layout.jsx"), linea 9. Luego de eso, en la ruta 'http://localhost:5173/main-page' se podra ver la pagina principal para los usuarios loggeados.
- La pagina anterior, MainPage, agrega un boton de PLAY NOW que por ahora redirige a las reglas, ademas de un boton de sign out en la navbar, junto con la imagen
del usuario loggeado y una bienvenida. Como aun no conectamos back con front, los nombres y botones no son funcionales.
- En la pagina de reglas, tanto para edifcios como npc's, se utilizo contenido dinamico que cambia el estado del gif/accion, animandolo cuando el cursor esta sobre
dicha accion, ademas de desplegar su nombre y explicacion.
- Se añadio un logo de la pagina en la navbar, que no es el definitivo sino temporal.
