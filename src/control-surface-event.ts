import { ArrayBufferStream } from "array-buffer-stream"
import { ControlSurfaceEventType } from "./control-surface-event-type"

export abstract class ControlSurfaceEvent<T = any> {
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
  value?: T

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

export class ControlSurfaceBinaryEvent extends ControlSurfaceEvent<ArrayBuffer> {
  getBinary(): ArrayBuffer {
    return this.value ?? new ArrayBuffer(0)
  }
  setBinary(buffer: ArrayBuffer) {
    this.value = buffer
  }
}

export class ControlSurfaceStringEvent extends ControlSurfaceEvent<string> {
  getBinary(): ArrayBuffer {
    const value = this.value ?? ''
    const stream = new ArrayBufferStream(new ArrayBuffer(value.length * 2))
    stream.writeUtf16String(value, true)
    return stream.buffer
  }
  setBinary(buffer: ArrayBuffer) {
    this.value = new TextDecoder('utf-16le').decode(buffer)
  }
}

export type ControlSurfaceEnable = {
  current: number,
  default: number,
  index: number,
}

export class ControlSurfaceEnableControlEvent extends ControlSurfaceEvent<ControlSurfaceEnable> {
  getBinary(): ArrayBuffer {
    const value = this.value ?? {
      current: 0,
      default: 0,
      index: 0,
    }
    const stream = new ArrayBufferStream(new ArrayBuffer(12))
    stream.writeFloat32(value.current, true)
    stream.writeFloat32(value.default, true)
    stream.writeUint32(value.index, true)
    return stream.buffer
  }
  setBinary(buffer: ArrayBuffer) {
    const stream = new ArrayBufferStream(buffer)
    this.value = {
      current: stream.readFloat32(true),
      default: stream.readFloat32(true),
      index: stream.readUint32(true),
    }
  }
}