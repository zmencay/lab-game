# Changelog

Historial de cambios y evolución de **El escudo LDA — Los detectives de mascotas**.

Este documento recoge las principales funcionalidades, mejoras y refactorizaciones incorporadas en las diferentes versiones del videojuego.

## [Unreleased]

### Documentation
- Added JSDoc documentation to JavaScript classes and methods.
- Improved inline comments across the game codebase.
- Documented game lifecycle, collision detection, entity generation,
  level progression, audio management, and rendering.
- Standardized technical documentation in English.
- No functional changes introduced.

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