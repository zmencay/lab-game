class AudioManager {
  constructor() {
    
    this.sounds = {}
    
    this.isMuted = false
  }

  addSound(name, src, volume = 1, loop = false) {
    const audio = new Audio(src)

    audio.volume = volume
    audio.loop = loop
    audio.muted = this.isMuted

    this.sounds[name] = audio
  }

  play(name, restart = true) {
    const audio = this.sounds[name]

    if (!audio) return

    if (restart) {
      audio.currentTime = 0
    }

    audio.play()
  }

  pause(name) {
    const audio = this.sounds[name]

    if (!audio) return

    audio.pause()
  }

  toggleMute() {
    this.isMuted = !this.isMuted

    Object.values(this.sounds).forEach(audio => {
      audio.muted = this.isMuted
    })
  }
}