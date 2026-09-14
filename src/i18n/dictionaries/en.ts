const en = {} as const

export type DictionaryKey = keyof typeof en
export type Dictionary = Record<DictionaryKey, string>

export default en
