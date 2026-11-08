/**
 * Creates an image and loads it from the specified source.
 * Marks the image as ready once loaded and optionally
 * executes a callback for additional setup.
 *
 * @param {string} src - Path to the image asset.
 * @param {function(HTMLImageElement): void} [onLoad] - Optional callback executed after loading.
 * @returns {HTMLImageElement} The image element.
 */
function loadImage(src, onLoad) {
  const image = new Image()
  
  image.onload = () => {
    image.isReady = true

    if (onLoad) {
      onLoad(image)
    }
  }

  image.src = src

  return image
}