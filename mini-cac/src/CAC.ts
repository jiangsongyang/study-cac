import mri from 'mri'
interface OptionConfig {
  default?: any
  type?: any[]
}

interface ParsedArgv {
  args: ReadonlyArray<string>
  options: {
    [k: string]: any
  }
}

export class CAC {
  name: string

  args: ParsedArgv['args']

  options: ParsedArgv['options']

  constructor(name = '') {
    this.name = name

    this.args = []
    this.options = {}
  }

  option(rawName: string, description: string, config?: OptionConfig) {
    return this
  }

  parse(argv = process.argv, { run = true } = {}) {
    const parsedArgv = { args: this.args, options: this.options }

    const parsed = this.mri(argv.slice(2))
    this.setParsedInfo(parsed)

    return parsedArgv
  }

  private mri(argv: string[]) {
    let argsAfterDoubleDashes: string[] = []

    let parsed = mri(argv, {
      alias: {},
      boolean: [],
    })

    const args = parsed._

    const options: { [k: string]: any } = {
      '--': argsAfterDoubleDashes,
    }

    return {
      args,
      options,
    }
  }

  private setParsedInfo({ args, options }: ParsedArgv) {
    this.args = args
    this.options = options
    return this
  }
}
