export function toAttributes<T extends object>(obj: T) {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [toAttribute(key), value])) as toAttributes<T>
}

function toAttribute(str: string) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
}

type toAttributes<T extends object> = {
  [K in keyof T as K extends string ? toAttribute<K> : K]: T[K]
}

type toAttribute<S extends string> = S extends `${infer T}${infer U}`
  ? U extends Uncapitalize<U>
    ? `${Lowercase<T>}${toAttribute<U>}`
    : `${Lowercase<T>}-${toAttribute<Uncapitalize<U>>}`
  : S
