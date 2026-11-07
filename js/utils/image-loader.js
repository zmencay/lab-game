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