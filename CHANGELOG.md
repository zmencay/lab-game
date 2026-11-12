# Changelog

Historial de cambios y evolución de **El escudo LDA — Los detectives de mascotas**.

Este documento recoge las principales funcionalidades, mejoras y refactorizaciones incorporadas en las diferentes versiones del videojuego.

## [Unreleased]

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