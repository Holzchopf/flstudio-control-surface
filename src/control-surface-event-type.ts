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


export const ControlSurfaceEventType: Record<number, string> = {
  2000: 'Options',
  2002: 'SurfaceSize',
  
  2100: 'StartControl',
  2101: 'EndControl',
  2102: 'EnableControl',
  2103: 'Name',
  2104: 'Dimensions',
  2105: 'ILControl',
  2106: 'Colors',
  2107: 'Properties',
}
