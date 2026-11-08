/**
 * Manages game audio playback and mute state.
 * Stores sound effects and background music by name.
 */
class AudioManager {

  /**
   * Initializes the audio collection and mute state.
   */
  constructor() {

    this.sounds = {}

    this.isMuted = false
  }

  /**
     * Registers an audio resource with its playback settings.
     *
     * @param {string} name - Unique identifier for the audio resource.
     * @param {string} src - Path to the audio file.
     * @param {number} [volume=1] - Playback volume between 0 and 1.
     * @param {boolean} [loop=false] - Whether the audio should repeat.
     */
  addSound(name, src, volume = 1, loop = false) {
    const audio = new Audio(src)

    audio.volume = volume
    audio.loop = loop
    audio.muted = this.isMuted

    this.sounds[name] = audio
  }

  /**
   * Plays a registered audio resource.
   *
   * @param {string} name - Identifier of the audio resource.
   * @param {boolean} [restart=true] - Whether to reset playback to the beginning.
   */
  play(name, restart = true) {
    const audio = this.sounds[name]

    if (!audio) return

    if (restart) {
      audio.currentTime = 0
    }

    audio.play()
  }

  /**
   * Pauses a registered audio resource.
   *
   * @param {string} name - Identifier of the audio resource.
   */
  pause(name) {
    const audio = this.sounds[name]

    if (!audio) return

    audio.pause()
  }

  /**
   * Toggles the global mute state and applies it
   * to all registered audio resources.
   */
  toggleMute() {
    this.isMuted = !this.isMuted

    Object.values(this.sounds).forEach(audio => {
      audio.muted = this.isMuted
    })
  }
}