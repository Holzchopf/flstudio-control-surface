/*

chunk types:
2000 - options
2002 - surface size (uint32le width, uint32le height)
2003 - unknown
2100 - start of control something (prob contains control type)
2103 - name of control (utf16le string)
2104 - position of control (4x float32: x center, y center, width, height)
2102 - controller options (float32 current value, float32 default value, uint32le 0-based index for exposing controller)
2105 - ilcontrol (utf16le string)
2106 - ilcontrol but only colors
2107 - ilcontrol but only properties
2101 - end of control

*/

const FLCSSEventTypeRaw = {
  SurfaceSettings: 2000,
  SurfaceDimensions: 2002,
  
  StartControl: 2100,
  EndControl: 2101,
  EnableControl: 2102,
  Name: 2103,
  Dimensions: 2104,
  ILControl: 2105,
  Colors: 2106,
  Properties: 2107,
} as const

/**
 * Known event names.
 */
export type FLCSSEventTypeName = keyof typeof FLCSSEventTypeRaw
/**
 * Known event IDs.
 */
export type FLCSSEventTypeId = typeof FLCSSEventTypeRaw[FLCSSEventTypeName]

/**
 * Types of the events in an [[FLCSSEventGroup]].
 */
export const FLCSSEventType = {
  ...FLCSSEventTypeRaw,
  /**
   * Returns the name of a given event ID, or `'unknown'`.
   * @param id Event ID.
   */
  name: (id: number): FLCSSEventTypeName | 'unknown' => {
    const names = Object.keys(FLCSSEventTypeRaw) as FLCSSEventTypeName[]
    return names.find((n) => FLCSSEventTypeRaw[n] === id) ?? 'unknown'
  },
  /**
   * Returns the ID for a given event name, or `undefined`
   * @param name Event name.
   */
  byName: (name: string): FLCSSEventTypeId | undefined => {
    return FLCSSEventTypeRaw[name as FLCSSEventTypeName] ?? undefined
  }
}