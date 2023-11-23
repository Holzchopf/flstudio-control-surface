import { ControlSurfaceEventType } from "./control-surface-event-type"

export class ControlSurfaceEvent {
  type: number
  typeText: string
  size: number
  bytes: ArrayBuffer
  value?: string

  constructor(type: number, size: number, bytes: ArrayBuffer) {
    this.type = type
    this.typeText = ControlSurfaceEventType[type] ?? 'unknown'
    this.size = size
    this.bytes = bytes

    // decode texty properties
    switch (type) {
      case 2103:
      case 2105:
      case 2106:
      case 2107: {
        this.value = new TextDecoder('utf-16le').decode(bytes)
        break
      }
    }
  }
}