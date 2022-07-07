export const removeBrackets = (v: string) => v.replace(/[<[].+/, '').trim()

export const findAllBrackets = (v: string) => {
  const ANGLED_BRACKET_RE_GLOBAL = /<([^>]+)>/g
  const SQUARE_BRACKET_RE_GLOBAL = /\[([^\]]+)\]/g

  const res = []

  const parse = (match: string[]) => {
    let variadic = false
    let value = match[1]
    if (value.startsWith('...')) {
      value = value.slice(3)
      variadic = true
    }
    return {
      required: match[0].startsWith('<'),
      value,
      variadic,
    }
  }

  let angledMatch
  while ((angledMatch = ANGLED_BRACKET_RE_GLOBAL.exec(v))) {
    res.push(parse(angledMatch))
  }

  let squareMatch
  while ((squareMatch = SQUARE_BRACKET_RE_GLOBAL.exec(v))) {
    res.push(parse(squareMatch))
  }

  return res
}

export const camelcase = (input: string) => {
  return input.replace(/([a-z])-([a-z])/g, (_, p1, p2) => {
    return p1 + p2.toUpperCase()
  })
}

export const camelcaseOptionName = (name: string) => {
  // Camelcase the option name
  // Don't camelcase anything after the dot `.`
  return name
    .split('.')
    .map((v, i) => {
      return i === 0 ? camelcase(v) : v
    })
    .join('.')
}
