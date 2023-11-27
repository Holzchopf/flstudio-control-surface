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

/**
 * Event with binary value data.
 */
export class ControlSurfaceBinaryEvent extends ControlSurfaceEvent<ArrayBuffer> {
  protected view?: DataView

  getBinary(): ArrayBuffer {
    return this.value ?? new ArrayBuffer(0)
  }
  setBinary(buffer: ArrayBuffer) {
    this.value = buffer
    this.view = new DataView(buffer)
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
 * Describes how a control is exposed. Enabled controls will have at least one of these events.
 */
export class ControlSurfaceEnableControlEvent extends ControlSurfaceBinaryEvent {

  constructor(type: number) {
    super(type)
    this.setBinary(new ArrayBuffer(12))
  }

  /**
   * Returns the control's current value. Float, 0 ... 1
   */
  getCurrent(): number {
    return this.view!.getFloat32(0, true)
  }
  /**
   * Sets the control's current value. Float, 0 ... 1
   */
  setCurrent(value: number) {
    this.view!.setFloat32(0, value, true)
  }

  /**
   * Returns the control's default value. Float, 0 ... 1
   */
  getDefault(): number {
    return this.view!.getFloat32(0, true)
  }
  /**
   * Sets the control's default value. Float, 0 ... 1
   */
  setDefault(value: number) {
    this.view!.setFloat32(0, value, true)
  }

  /**
   * Returns the control's list index.
   */
  getIndex(): number {
    return this.view!.getUint32(0, true)
  }
  /**
   * Sets the control's list index.
   */
  setIndex(value: number) {
    this.view!.setUint32(0, value, true)
  }
}