import { ArrayBufferStream } from "array-buffer-stream"
import { ControlSurfaceEventType } from "./control-surface-event-type"

export abstract class ControlSurfaceEvent {
  /**
   * Numeric ControlSurfaceEventType.
   */
  type: number
  /**
   * Name of ControlSurfaceEventType. Readonly.
   */
  get typeName() {
    return ControlSurfaceEventType.name(this.type)
  }

  /**
   * Event value. Data type varies by event type.
   */
  value: any

  constructor(type: number) {
    this.type = type
  }

  abstract getBinary(): ArrayBuffer
  abstract setBinary(buffer: ArrayBuffer): void

  /**
   * Factory function to create a new specific ControlSurfaceEvent.
   * @param type ControlSurfaceEventType.
   */
  static create(type: number) {
    switch (type) {
      case 2102:
        return new ControlSurfaceEnableControlEvent(type)
      case 2103:
      case 2105:
      case 2106:
      case 2107:
        return new ControlSurfaceStringEvent(type)
      default:
        return new ControlSurfaceBinaryEvent(type)
    }
  }
}

export class ControlSurfaceBinaryEvent extends ControlSurfaceEvent {
  override value: ArrayBuffer = new ArrayBuffer(0)

  getBinary(): ArrayBuffer {
    return this.value
  }
  setBinary(buffer: ArrayBuffer) {
    this.value = buffer
  }
}

export class ControlSurfaceStringEvent extends ControlSurfaceEvent {
  override value: string = ''

  getBinary(): ArrayBuffer {
    const stream = new ArrayBufferStream(new ArrayBuffer(this.value.length * 2))
    stream.writeUtf16String(this.value, true)
    return stream.buffer
  }
  setBinary(buffer: ArrayBuffer) {
    this.value = new TextDecoder('utf-16le').decode(buffer)
  }
}

export class ControlSurfaceEnableControlEvent extends ControlSurfaceEvent {
  override value: undefined = undefined

  current: number = 0
  default: number = 0
  index: number = 0

  getBinary(): ArrayBuffer {
    const stream = new ArrayBufferStream(new ArrayBuffer(12))
    stream.writeFloat32(this.current, true)
    stream.writeFloat32(this.default, true)
    stream.writeUint32(this.index, true)
    return stream.buffer
  }
  setBinary(buffer: ArrayBuffer) {
    const stream = new ArrayBufferStream(buffer)
    this.current = stream.readFloat32(true)
    this.default = stream.readFloat32(true)
    this.index = stream.readUint32(true)
  }
}