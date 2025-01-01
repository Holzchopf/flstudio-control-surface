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

const ControlSurfaceControlTypeRaw = {
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
export type ControlSurfaceControlTypeName = keyof typeof ControlSurfaceControlTypeRaw
/**
 * Known control type IDs.
 */
export type ControlSurfaceControlTypeId = typeof ControlSurfaceControlTypeRaw[ControlSurfaceControlTypeName]

/**
 * Types of controls in a [[ControlSurfaceStartControlEvent]].
 */
export const ControlSurfaceControlType = {
  ...ControlSurfaceControlTypeRaw,
  /**
   * Returns the name of a given control type ID, or `'unknown'`.
   * @param id Control type ID.
   */
  name: (id: number): ControlSurfaceControlTypeName | 'unknown' => {
    const names = Object.keys(ControlSurfaceControlTypeRaw) as ControlSurfaceControlTypeName[]
    return names.find((n) => ControlSurfaceControlTypeRaw[n] === id) ?? 'unknown'
  },
  /**
   * Returns the ID for a given control type name, or `undefined`
   * @param name Control type name.
   */
  byName: (name: string): ControlSurfaceControlTypeId | undefined => {
    return ControlSurfaceControlTypeRaw[name as ControlSurfaceControlTypeName] ?? undefined
  }
}