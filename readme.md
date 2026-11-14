# El escudo LDA 
## Los detectives de mascotas

**Videojuego de plataformas 2D desarrollado con JavaScript vanilla y HTML5 Canvas.**

Elige entre dos mascotas detectives y supera tres escenarios de estética pixel art: una jungla, un desierto y una montaña nevada. Recoge **10 huellas doradas por nivel**, esquiva o derrota enemigos y completa la aventura conservando al menos uno de tus tres corazones.

El proyecto combina desarrollo frontend, programación orientada a objetos (POO), animación mediante spritesheets, escenarios parallax y diseño de interfaces.

## Características principales

- Dos personajes jugables con animaciones propias y las mismas mecánicas.
- Tres niveles con escenarios y enemigos diferentes, y dificultad progresiva.
- Movimiento lateral, salto y disparo de proyectiles en ambas direcciones.
- Tres corazones persistentes entre niveles e invulnerabilidad temporal tras recibir daño.
- HUD con vidas, huellas, nivel, personaje seleccionado y enemigos derrotados.
- Pantalla final con estadísticas de enemigos eliminados y tiempos por nivel y total.
- Música, efectos de sonido y control para silenciarlos.
- Manual ilustrado integrado en un panel lateral HTML, disponible antes de iniciar la partida.

## Demo y capturas

**[Jugar online](URL_DE_GITHUB_PAGES)** *(enlace pendiente de publicar en GitHub Pages)*

| Nivel 1 · Jungla | Nivel 2 · Desierto | Nivel 3 · Montaña nevada |
|---|---|---|
| ![Jungla](./docs/images/level-1.png) | ![Desierto](./docs/images/level-2.png) | ![Montaña nevada](./docs/images/level-3.png) |

## Tecnologías

| Tecnología | Uso |
|---|---|
| **HTML5** | Estructura de la interfaz y manual con `<dialog>`. |
| **CSS3** | Maquetación, panel lateral, animaciones y adaptación responsive. |
| **JavaScript (ES6+)** | Lógica del juego, eventos y programación orientada a objetos. |
| **Canvas API** | Renderizado 2D de escenarios, personajes y animaciones. |
| **HTMLAudioElement** | Música y efectos sonoros. |

Sin frameworks, dependencias externas de JavaScript ni proceso de compilación.

## Diseño visual y experiencia de usuario

El videojuego utiliza una estética *pixel art* retro de 16 bits, con una identidad gráfica propia y tres escenarios diferenciados: jungla tropical, desierto y montaña nevada.

El diseño comprende personajes y animaciones mediante spritesheets, escenarios con efecto parallax, enemigos, coleccionables, HUD y pantallas de interfaz.

La experiencia de usuario se completa con un manual de juego interactivo, controles visuales y una interfaz adaptable, desarrollados con HTML y CSS fuera del Canvas.

## Cómo jugar

En la bienvenida, pulsa **«Empezar»** y selecciona **Player 1** o **Player 2**. Ambos tienen las mismas habilidades. El botón **«Manual del juego»** está disponible tanto en la bienvenida como en la selección de personaje y abre unas instrucciones ilustradas; deja de mostrarse al comenzar la partida.

| Tecla | Acción |
|---|---|
| `←` / `→` | Moverse a izquierda / derecha |
| `↑` | Saltar |
| `Espacio` | Disparar un proyectil |

Recoge **10 huellas** para superar cada nivel. Puedes evitar a los enemigos o derrotarlos saltando sobre ellos o disparándoles. Dispones de **3 corazones para toda la aventura**; tras recibir daño, obtienes unos segundos de invulnerabilidad.

Al superar los tres niveles aparece **THE END**, con el desglose de enemigos derrotados y los tiempos registrados. Si pierdes todos los corazones, puedes volver a intentarlo desde **Game Over**.

## Arquitectura

El código sigue una organización orientada a objetos, con responsabilidades separadas:

| Componente | Responsabilidad principal |
|---|---|
| `Game` | Ciclo de juego, estados, niveles, colisiones y estadísticas. |
| `Player` | Controles, movimiento, animaciones e invulnerabilidad. |
| `Enemy` | Movimiento y estados de los enemigos. |
| `Coin` | Coleccionables y animación. |
| `Projectile` | Desplazamiento y representación de los disparos. |
| `Scenary` | Capas gráficas y desplazamiento parallax. |
| `AudioManager` | Música, efectos y control de sonido. |

La configuración se centraliza en `js/constants.js`; `js/utils/image-loader.js` gestiona la carga de imágenes y `js/index.js` inicializa el juego.

### Estructura del proyecto

```text
lab-game/
├── assets/
│   ├── audio/
│   ├── bgn/
│   ├── enemies/
│   ├── player/
│   └── ui/
│       └── manual/
├── css/
│   ├── reset.css
│   └── style.css
├── js/
│   ├── constants.js
│   ├── index.js
│   ├── models/
│   └── utils/
└── index.html
```

### Aspectos técnicos destacados

- **Spritesheets y parallax:** animaciones de personajes y enemigos y escenarios de varias capas con desplazamientos independientes.
- **Estados y progresión:** gestión de bienvenida, selección, niveles, Game Over y THE END, con corazones persistentes durante la partida.
- **Estadísticas:** registro de enemigos derrotados y tiempos por nivel, mostrados al finalizar la aventura.
- **Interfaz independiente del Canvas:** botones HTML y manual modal nativo con apertura y cierre declarativos, sin añadir JavaScript al motor. Su acceso se controla mediante CSS y los estados existentes de la interfaz.
- **Adaptación de pantalla:** Canvas de resolución interna 1280 × 720 e interfaz con escalado proporcional, orientada principalmente a escritorio y teclado; no incluye controles táctiles.

## Instalación y ejecución

El juego no requiere instalar dependencias ni compilar el proyecto.

```bash
git clone https://github.com/zmencay/lab-game.git
cd lab-game
```

Abre `index.html` en un navegador compatible. Se recomienda jugar desde un ordenador con teclado.

## Autoría y créditos

**Desarrollo y dirección del proyecto:** Zuriñe Menéndez Cayrols.

La identidad visual combina diseño, revisión y adaptación de recursos gráficos y sonoros. Se ha utilizado **inteligencia artificial generativa como herramienta de apoyo** en la creación e iteración de algunos de esos recursos, posteriormente evaluados y ajustados para el videojuego.

**Versión:** `v3.6.0` · **[Historial de cambios](CHANGELOG.md)** · **[GitHub](https://github.com/zmencay)**
