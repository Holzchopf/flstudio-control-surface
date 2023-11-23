import { ControlSurfaceEventType, ControlSurfaceEventTypeName } from "./control-surface-event-type"

export class ControlSurfaceEvent {
  type: number
  typeName: ControlSurfaceEventTypeName
  size: number
  bytes: ArrayBuffer
  value?: string

  constructor(type: number, size: number, bytes: ArrayBuffer) {
    this.type = type
    this.typeName = ControlSurfaceEventType.byId(type)
    this.size = size
    this.bytes = bytes

    // decode texty properties
    switch (type) {
      case 2103:
      case 2105:
      case 2106:
      case 2107: {
        this.value = new TextDecoder('utf-16le').decode(bytes)
        // remove null termination
        this.value = this.value.slice(0, -1)
        break
      }
    }
  }
}