export function toAttributes<T extends object>(obj: T) {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [toAttribute(key), value])) as toAttributes<T>
}

const overrides: Record<string, string> = {
  className: "class"
}

function toAttribute(str: string) {
  if (overrides[str]) {
    return overrides[str]
  }
  return str
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase()
}

type toAttributes<T extends object> = {
  [K in keyof T as K extends string ? toAttribute<K> : K]: T[K]
}

type toAttribute<S extends string> = S extends `${infer T}${infer U}`
  ? U extends Uncapitalize<U>
    ? `${Lowercase<T>}${toAttribute<U>}`
    : `${Lowercase<T>}-${toAttribute<Uncapitalize<U>>}`
  : S
