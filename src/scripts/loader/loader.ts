type Replace<
  T extends string,
  S extends string = '.',
  D extends string = '_',
  A extends string = ''
> = T extends `${infer L}${S}${infer R}` ? Replace<R, S, D, `${A}${L}${D}`> : `${A}${T}`

export default function loader<T extends string[]>(...assets: T): () => Replace<T[number]> {
  return function load(this: Phaser.Scene) {
    return {} as any
  }
}

const a = loader('img.png', 'img.jpg')
