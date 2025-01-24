/*

control types:
0 - TVectorWheel
1 - TQuickXYZ
2 - TVectorSlider
3 - TQuickBtn
4 - TVectorCheckBox
5 - TVectorBevel
6 - TQuickLabel
7 - TVectorDigiWheel
8 - TQuickVectorMIDIKbSurface

*/

const FLCSSControlTypeRaw = {
  TVectorWheel: 0,
  TQuickXYZ: 1,
  TVectorSlider: 2,
  TQuickBtn: 3,
  TVectorCheckBox: 4,
  TVectorBevel: 5,
  TQuickLabel: 6,
  TVectorDigiWheel: 7,
  TQuickVectorMIDIKbSurface: 8,
} as const

/**
 * Known control type names.
 */
export type FLCSSControlTypeName = keyof typeof FLCSSControlTypeRaw
/**
 * Known control type IDs.
 */
export type FLCSSControlTypeId = typeof FLCSSControlTypeRaw[FLCSSControlTypeName]

/**
 * Types of controls in a [[FLCSSStartControlEvent]].
 */
export const FLCSSControlType = {
  ...FLCSSControlTypeRaw,
  /**
   * Returns the name of a given control type ID, or `'unknown'`.
   * @param id Control type ID.
   */
  name: (id: number): FLCSSControlTypeName | 'unknown' => {
    const names = Object.keys(FLCSSControlTypeRaw) as FLCSSControlTypeName[]
    return names.find((n) => FLCSSControlTypeRaw[n] === id) ?? 'unknown'
  },
  /**
   * Returns the ID for a given control type name, or `undefined`
   * @param name Control type name.
   */
  byName: (name: string): FLCSSControlTypeId | undefined => {
    return FLCSSControlTypeRaw[name as FLCSSControlTypeName] ?? undefined
  }
}