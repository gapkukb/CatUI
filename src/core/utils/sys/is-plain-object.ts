const toString = Object.prototype.toString

export default function isPlainObject(x: any): x is { [key: keyof any]: any } {
  return toString.call(x) === '[object Object]'
}
