# Changelog

Historial de cambios y evolución de **El escudo LDA — Los detectives de mascotas**.

Este documento recoge las principales funcionalidades, mejoras y refactorizaciones incorporadas en las diferentes versiones del videojuego.

## [Unreleased]

## [3.6.2] — Optimización de recursos gráficos y audio

### Changed
- Compresión de imágenes de gran tamaño, manteniendo sus rutas y su integración en el videojuego.
- Optimización del archivo de música de fondo `music.mp3`, reduciendo su peso aproximado de 14 MB a 350 KB.
- Reducción del conjunto de imágenes optimizadas de aproximadamente 12 MB a 2,77 MB.

### Validation
- Comprobación visual de los recursos optimizados y del funcionamiento del juego.
- Medición inicial de la carga en el entorno local tras la optimización.
- Pendiente de comparar los tiempos de carga de GitHub Pages en condiciones equivalentes para cuantificar la mejora en producción.

## [3.6.1] — Ajustes de audio y documentación

### Added
- Incorporación de un efecto de sonido al lanzar el bumerán, integrado en `AudioManager`.

### Changed
- Sustitución de la música de fondo del videojuego, conservando el sistema existente de reproducción y control de sonido.
- Corrección de varios textos del README.

### Fixed
- Eliminación del borde visual no deseado que aparecía al recibir el foco el Canvas, sin alterar el comportamiento del teclado.

### Validation
- Verificación del efecto de sonido del bumerán y del funcionamiento de la nueva música.
- Pruebas de regresión completadas correctamente, sin alteraciones de las mecánicas existentes.

## [3.6.0] — Manual de juego y experiencia de usuario

### Added
- Incorporación del botón «Manual del juego», disponible en la bienvenida y durante la selección de personaje.
- Nuevo panel lateral mediante el elemento HTML nativo `<dialog>`, con secciones de controles, objetivo, vidas, daño, invulnerabilidad y enemigos.
- Integración de recursos gráficos del manual y reutilización de iconos y sprites existentes.

### Changed
- Apertura y cierre declarativos con `commandfor` y `command`, sin incorporar JavaScript al sistema del juego.
- Visibilidad del botón controlada con CSS mediante el combinador de hermanos generales (`~`) y los estados `.hidden` ya existentes; el acceso desaparece al comenzar la partida.
- Ajuste del panel al lateral derecho, con overlay mediante `::backdrop`, animaciones CSS de entrada y salida, y adaptación responsive.
- Reorganización y limpieza de los estilos del manual siguiendo los bloques `layout`, `box-model`, `typo` y `presentation`, con selectores descendientes tabulados.
- Conservación de las mecánicas, el Canvas y las clases JavaScript existentes sin modificaciones.

### Documentation
- Actualización del README con el acceso al manual, su contenido, los recursos visuales y las decisiones técnicas de integración.

### Validation
- Diseño e integración visual del manual aprobados.
- Pruebas de regresión completadas correctamente: apertura, cierre, navegación por teclado, responsive, visibilidad del manual y continuidad de las mecánicas existentes.

## [3.5.1] — Correcciones finales de interfaz y navegación

### Added
- Incorporación del botón «Inicio» en la pantalla THE END, visible únicamente al completar los tres niveles.
- Regreso a la pantalla de bienvenida mediante `window.location.reload()`, reutilizando el mecanismo de reinicio existente.

### Fixed
- Corrección del recurso gráfico del botón «Reintentar» para eliminar los márgenes transparentes no deseados.
- Ajuste de las dimensiones y proporciones del botón «Reintentar» en CSS para adaptarlo al nuevo PNG.

### Changed
- Incorporación de `inicioBtn` en `index.html`, obtención del elemento en `index.js` y conexión con `Game`.
- Gestión del foco del botón «Inicio» al completar la partida, manteniendo la navegación mediante teclado.
- Actualización del idioma principal del documento HTML a `lang="es"`.

### Documentation
- Actualización del README para reflejar la navegación desde THE END y la versión `3.5.1`.
- Actualización del JSDoc de `Game` para documentar la nueva acción de regreso al inicio.

### Validation
- Verificación del botón «Reintentar» tras el ajuste de imagen y CSS.
- Comprobación de la visibilidad del botón «Inicio» únicamente al completar la aventura y de su funcionamiento al activarlo.
- Pruebas de regresión realizadas correctamente, sin alteraciones de las mecánicas del juego.

## [3.5.0] — Sistema de disparos e impactos

### Added
- Incorporación de la mecánica de disparo para ambos personajes mediante la barra espaciadora, con un proyectil por pulsación.
- Creación de la clase `Projectile` para gestionar posición, dimensiones, movimiento horizontal y representación gráfica.
- Integración de un recurso gráfico de proyectil de 100 × 67 px, con orientación visual según el sentido de disparo.
- Detección de colisiones rectangulares entre proyectiles y enemigos activos; cada impacto elimina el proyectil y derrota al enemigo mediante `enemy.die()`.
- Incorporación de una guía gráfica de controles en la zona inferior de la interfaz.

### Changed
- Redistribución de los controles: flechas izquierda/derecha para moverse, flecha arriba para saltar y barra espaciadora para disparar.
- Ajuste de las coordenadas de salida del proyectil según la orientación del personaje.
- Integración de los proyectiles en los métodos `move()`, `draw()` y `checkBounds()` de `Game`; limpieza de la colección al iniciar cada nivel.
- Reutilización del sonido de derrota y de `defeatedEnemies` para contabilizar tanto los enemigos eliminados por salto como los eliminados mediante proyectiles.
- Carga única del recurso gráfico del proyectil mediante `loadImage()` y reutilización entre instancias.
- Prevención del comportamiento predeterminado de la barra espaciadora durante la partida y devolución del foco al Canvas al seleccionar personaje.

### Documentation
- Actualización de comentarios y JSDoc para reflejar el movimiento, el dibujo y las colisiones de proyectiles.
- Actualización del README con la nueva mecánica, el esquema definitivo de teclado, la arquitectura y la guía visual de controles.

### Validation
- Verificación de disparos en ambas direcciones, en reposo, durante el movimiento y durante el salto, con ambos personajes.
- Comprobación de un disparo por pulsación, de proyectiles simultáneos y de su eliminación al impactar o abandonar el Canvas.
- Validación de la animación de muerte, el sonido y las estadísticas tras impactar, sin contabilizar dos veces a un enemigo derrotado.
- Comprobación del reinicio de proyectiles entre niveles y de la continuidad de las mecánicas de salto y colisión existentes.
- Pruebas de regresión funcionales realizadas correctamente.

## [3.4.1] — Corrección de bugs y mejoras de interfaz

### Fixed
- Corrección del foco del botón de sonido: tras activarlo o silenciarlo, el foco vuelve al Canvas para evitar activaciones involuntarias con la barra espaciadora.
- Corrección del retrato del HUD para mostrar el personaje seleccionado, tanto en el nivel inicial como después de las transiciones.
- Asignación automática del foco al botón «Siguiente nivel» al completar un nivel, permitiendo continuar con teclado; devolución del foco al Canvas al reanudar la partida.
- Corrección del spritesheet del Player 2 para representar adecuadamente la animación de salto, sin modificar su lógica de movimiento.

### Changed
- Separación del retrato del jugador del fondo del HUD e incorporación de iconos específicos para ambos personajes, seleccionados mediante `PLAYER_CONFIG`.
- Incorporación de `.game-frame` como referencia de posicionamiento para el Canvas y los botones.
- Posicionamiento y escalado proporcional de los controles respecto al área del juego como adaptación responsive MVP, sin introducir controles táctiles ni adaptación adicional a la altura.
- Conservación de los recursos decorativos de la interfaz, incluidos los pseudoelementos de vegetación.

### Documentation
- Reorganización y documentación de `index.html` y `style.css` siguiendo los bloques y convenciones del proyecto, sin cambios funcionales adicionales.
- Actualización del README para documentar las correcciones y la versión `3.4.1`.

### Validation
- Comprobación del foco del botón de sonido, del botón «Siguiente nivel» y del retorno al Canvas.
- Verificación de los retratos del HUD con ambos personajes y de la animación de salto del Player 2.
- Validación de la disposición y el escalado responsive MVP de los botones, manteniendo los elementos decorativos.
- Pruebas de regresión completadas correctamente.

## [3.4.0] — Tiempos por nivel y tiempo total en THE END

### Added
- Registro del tiempo transcurrido en cada nivel mediante `performance.now()`, almacenado en milisegundos en `levelTimes`.
- Inicio independiente del cronómetro al seleccionar personaje o avanzar al siguiente nivel, sin contabilizar las pantallas de transición.
- Incorporación de `formatTime()` para mostrar los tiempos en formato `MM:SS`.
- Incorporación de `drawFinalTimeStats()` para representar los tiempos de los tres niveles y el tiempo total en THE END.

### Changed
- Cálculo del tiempo total a partir de la suma de los tiempos originales de los niveles, antes de formatearlos.
- Reinicio de todos los tiempos registrados al producirse Game Over.
- Actualización del recurso gráfico de THE END para presentar las estadísticas de tiempo junto a las de enemigos derrotados.
- Actualización del README para documentar el registro de tiempos y la versión `3.4.0`.

### Documentation
- Actualización de comentarios y JSDoc de `Game` para reflejar la gestión de cronómetros, el registro de tiempos y su reinicio en Game Over.
- Ajuste de comentarios sobre los controles de teclado y la configuración de animación del jugador.

### Validation
- Verificación de los tiempos individuales y del cálculo del tiempo total al completar los tres niveles.
- Comprobación de que las pantallas de transición no añaden tiempo y Game Over reinicia los registros.
- Validación del renderizado de tiempos y estadísticas de enemigos en THE END.
- Pruebas de regresión completadas correctamente.

## [3.3.0] — Estadísticas de enemigos en THE END

### Added
- Visualización en THE END del número de enemigos derrotados de cada tipo: arañas, monstruos y pájaros.
- Incorporación del total de enemigos eliminados durante la partida en la pantalla final.
- Implementación de `drawFinalEnemyStats()` para representar los resultados al completar los tres niveles.

### Changed
- Actualización del recurso gráfico de THE END para integrar las estadísticas de enemigos derrotados.
- Reutilización de las miniaturas previamente cargadas en `enemyHudIcons` y de los contadores existentes en `defeatedEnemies`, sin duplicar datos ni modificar las colisiones.
- Actualización del README para documentar las estadísticas finales y la versión `3.3.0`.

### Validation
- Comprobación de la visualización de los tres contadores individuales y del total acumulado al completar la aventura.
- Verificación de la correspondencia entre las derrotas registradas durante la partida y los resultados de THE END.
- Pruebas de regresión completadas correctamente con ambos personajes y los tres niveles.

## [3.2.0] — Contador de enemigos derrotados y nuevo HUD

### Added
- Incorporación del registro de enemigos derrotados, con contador total y desglose por nivel durante la partida.
- Visualización en el HUD de las derrotas correspondientes exclusivamente al enemigo del nivel activo.
- Incorporación de miniaturas específicas de los tres enemigos al HUD mediante la propiedad `hudIcon` de `ENEMY_CONFIG`.
- Carga de miniaturas a través de `loadImage()` y representación condicionada a su disponibilidad.

### Changed
- Rediseño e integración del recurso gráfico del HUD para mostrar vidas, huellas recogidas, nivel y enemigos derrotados.
- Conservación de las estadísticas de derrotas al avanzar entre niveles, sin reiniciarlas en `setupLevel()`.
- Actualización del README para documentar el contador, la integración del HUD y la versión `3.2.0`.

### Validation
- Comprobación del incremento del contador al derrotar enemigos mediante salto, sin contabilizar enemigos esquivados ni golpes recibidos.
- Verificación del cambio de icono y contador al avanzar de nivel, manteniendo los registros de niveles anteriores.
- Pruebas de regresión completadas con ambos personajes y los tres niveles.

## [3.1.0] — Selección de personajes

### Added
- Incorporación de una pantalla de selección de personaje entre la bienvenida y el inicio de la partida.
- Posibilidad de elegir entre dos personajes jugables, cada uno con sus propios sprites de movimiento.
- Incorporación del diseño gráfico definitivo de la pantalla de selección.
- Configuración de los recursos gráficos de ambos personajes mediante `PLAYER_CONFIG` en `constants.js`.

### Changed
- Inicialización de `Player` al seleccionar personaje, evitando crear una instancia provisional al cargar el juego.
- Conservación del personaje seleccionado durante los tres niveles, reutilizando la misma instancia al reiniciar cada nivel.
- Adaptación de los controles de teclado para que solo se procesen durante la partida activa.
- Actualización del README para documentar la selección de personajes y la versión `3.1.0`.

### Documentation
- Incorporación de documentación JSDoc a clases y métodos de JavaScript.
- Mejora de comentarios en el código y estandarización de la documentación técnica en inglés.
- Documentación del ciclo de juego, las colisiones, la generación de entidades, la progresión entre niveles, el audio y el renderizado.

### Validation
- Comprobación de la selección de ambos personajes y sus animaciones de movimiento y salto.
- Verificación de la persistencia del personaje seleccionado al avanzar entre niveles.
- Validación de la pantalla de selección definitiva y de la navegación hasta el inicio de la partida.

## [3.0.0] — Refactorización y organización de recursos

### Changed
- Centralización de la gestión de audio mediante la clase `AudioManager`.
- Incorporación de una instancia compartida de `AudioManager` para gestionar la música y los efectos de sonido.
- Unificación de la carga de imágenes mediante la utilidad `loadImage()`.
- Centralización de las dimensiones de spritesheets y frecuencias de animación en `constants.js`.
- Adaptación de las clases y pantallas del videojuego para utilizar el nuevo sistema de carga de recursos.

### Validation
- Comprobación del funcionamiento de los tres niveles.
- Validación de las mecánicas de movimiento, salto, colisiones, coleccionables y vidas.
- Verificación de las transiciones de nivel y las pantallas de finalización.
- Comprobación de la reproducción y el control de audio.

## [2.0.0] — Mejoras de jugabilidad y finalización de la aventura

### Added
- Incorporación de un sistema de invulnerabilidad temporal tras recibir daño, acompañado de un efecto visual de parpadeo.
- Implementación de una pantalla gráfica para el final de la aventura.
- Incorporación de un efecto de sonido de victoria al completar los tres niveles.

### Changed
- Generación de monedas mediante intervalos de tiempo aleatorios y mayor variación en sus posiciones verticales.
- Ajuste de la velocidad de los enemigos en los niveles 2 y 3 para incrementar progresivamente la dificultad.
- Mejora del control de salto para evitar repeticiones involuntarias al mantener pulsada la tecla.
- Actualización de las clases CSS del canvas durante las transiciones de nivel.

### Fixed
- Ajustes en la gestión de colisiones y daño para respetar los periodos de invulnerabilidad.
- Eliminación de mensajes de depuración innecesarios.

## [1.0.0] — Implementación del sistema de niveles

### Added
- Implementación de la progresión funcional entre tres niveles.
- Incorporación de una configuración específica de enemigos por nivel mediante `ENEMY_CONFIG`.
- Creación del método `setupLevel()` para inicializar los escenarios y reiniciar los elementos de cada nivel.
- Incorporación del método `reset()` en `Player` para restablecer su posición y estado al cambiar de nivel.
- Implementación de una pantalla provisional de finalización de la aventura.

### Changed
- Reorganización de la gestión de niveles y sus transiciones desde la clase `Game`.
- Ajuste de las condiciones de colisión para distinguir entre saltar sobre un enemigo y recibir daño.
- Mejora del control de daño para evitar perder varios corazones en una misma comprobación de colisiones.
- Separación de la inicialización de eventos respecto al inicio del ciclo principal.
- Ajuste de la generación de coleccionables y configuración de enemigos.

### Fixed
- Corrección del avance entre niveles mediante el botón de continuación.
- Limpieza de los temporizadores de generación de enemigos y monedas al detener el juego.
- Restricción de los controles de movimiento a la partida activa.

## [0.0.0] — Desarrollo inicial del videojuego

### Added
- Creación de la estructura inicial del proyecto con HTML5, CSS3 y JavaScript vanilla.
- Implementación del renderizado 2D mediante HTML5 Canvas.
- Organización inicial del código mediante las clases `Game`, `Player`, `Enemy`, `Coin` y `Scenary`.
- Implementación del ciclo principal de juego.
- Incorporación de controles de teclado para el movimiento lateral y el salto.
- Implementación de las primeras mecánicas de colisión entre el protagonista, los enemigos y los coleccionables.
- Incorporación del sistema de recogida de monedas como objetivo de juego.
- Implementación del sistema de vidas mediante corazones.
- Incorporación de animaciones mediante spritesheets.
- Creación de escenarios multicapa con desplazamiento parallax.
- Incorporación de los primeros recursos gráficos para personajes, enemigos, escenarios e interfaz.
- Integración inicial de música y efectos de sonido.
- Incorporación de controles de interfaz para iniciar y reiniciar la partida, así como activar o silenciar el audio.

### Technical
- Separación de responsabilidades mediante programación orientada a objetos.
- Gestión del renderizado y actualización de entidades desde la clase `Game`.
- Implementación del movimiento de personajes y enemigos mediante propiedades de posición y velocidad.
- Organización de parámetros generales del videojuego en `constants.js`.