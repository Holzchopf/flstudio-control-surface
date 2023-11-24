import { ArrayBufferStream } from "@holzchopf/array-buffer-stream"
import { ControlSurfaceEventType } from "./control-surface-event-type"

/**
 * Class for events.
 */
export abstract class ControlSurfaceEvent<T = any> {
  /**
   * Numeric [[ControlSurfaceEventType]].
   */
  type: number
  /**
   * Name of [[ControlSurfaceEventType]]. Readonly.
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

  /**
   * Creates the binary data for this event and returns it.
   */
  abstract getBinary(): ArrayBuffer
  /**
   * Sets this event's values from binary data.
   * @param buffer Binary data.
   */
  abstract setBinary(buffer: ArrayBuffer): void

  /**
   * Factory function to create a new specific ControlSurfaceEvent.
   * @param type ControlSurfaceEventType.
   */
  static create(type: number) {
    switch (type) {
      case 2102:
        return new ControlSurfaceControlEnableEvent(type)
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

/**
 * Event with binary value data.
 */
export class ControlSurfaceBinaryEvent extends ControlSurfaceEvent<ArrayBuffer> {
  getBinary(): ArrayBuffer {
    return this.value ?? new ArrayBuffer(0)
  }
  setBinary(buffer: ArrayBuffer) {
    this.value = buffer
  }
}

/**
 * Event with string value data.
 */
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

/**
 * Enabled controls will have a [[ControlSurfaceControlEnableEvent]] with a value of this type.
 */
export type ControlEnable = {
  /**
   * Current value. Float, 0 ... 1
   */
  current?: number,
  /**
   * Default value. Float, 0 ... 1
   */
  default?: number,
  /**
   * List index. Integer >= 0
   */
  index?: number,
}

/**
 * Enabled controls will have one of these events.
 */
export class ControlSurfaceControlEnableEvent extends ControlSurfaceEvent<ControlEnable> {
  getBinary(): ArrayBuffer {
    const value = this.value ?? {
      current: 0,
      default: 0,
      index: 0,
    }
    const stream = new ArrayBufferStream(new ArrayBuffer(12))
    stream.writeFloat32(value.current ?? 0, true)
    stream.writeFloat32(value.default ?? 0, true)
    stream.writeUint32(value.index ?? 0, true)
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