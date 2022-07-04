interface OptionConfig {
  default?: any
  type?: any[]
}

export class CAC {
  name: string

  constructor(name = '') {
    this.name = name
    this.
  }

  option(rawName: string, description: string, config?: OptionConfig) {
    return this
  }

  parse() {
    return { args: [], options: { '--': [], type: 'node' } }
  }
}
