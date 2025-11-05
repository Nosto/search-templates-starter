export function pipe<T>(...fns: Array<(arg: T) => T>) {
  return (input: T) => fns.reduce((acc, fn) => fn(acc), input)
}
