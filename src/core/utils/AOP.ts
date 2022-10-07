export function set(target: Object, propertyKey: string) {
  target[`set${propertyKey}`] = function (value: any) {
    target[propertyKey] = value
  }
}
