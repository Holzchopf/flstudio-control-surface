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

  // /**
  //  * Event value. Data type varies by event type.
  //  */
  // value?: T

  protected value: T

  getValue(): T {
    return this.value
  }
  setValue(value: T) {
    this.value = value
  }

  constructor(type: number, value: T) {
    this.type = type
    this.value = value
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
  static create(type: number, value?: string | ArrayBuffer) {
    switch (type) {
      case 2102:
        return new ControlSurfaceEnableControlEvent(type, value as ArrayBuffer)
      case 2103:
      case 2105:
      case 2106:
      case 2107:
        return new ControlSurfaceStringEvent(type, value as string)
      default:
        return new ControlSurfaceBinaryEvent(type, value as ArrayBuffer)
    }
  }
}

/**
 * Event with binary value data.
 */
export class ControlSurfaceBinaryEvent extends ControlSurfaceEvent<ArrayBuffer> {
  protected view: DataView

  constructor(type: number, value?: ArrayBuffer) {
    super(type, value ?? new ArrayBuffer(0))
    this.view = new DataView(this.value)
  }

  setValue(value: ArrayBuffer) {
    this.value = value
    this.view = new DataView(this.value)
  }

  getBinary(): ArrayBuffer {
    return this.value ?? new ArrayBuffer(0)
  }
  setBinary(buffer: ArrayBuffer) {
    this.value = buffer
    this.view = new DataView(this.value)
  }
}

/**
 * Event with string value data.
 */
export class ControlSurfaceStringEvent extends ControlSurfaceEvent<string> {

  constructor(type: number, value?: string) {
    super(type, value ?? '')
  }

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

export class ControlSurfaceSettingsEvent extends ControlSurfaceBinaryEvent {
  
  constructor(type: number, value?: ArrayBuffer) {
    super(type, value ?? new ArrayBuffer(64))
  }

  getSkip(): number {
    return this.view.getUint32(0, true)
  }
  setSkip(value: number) {
    this.view.setUint32(0, value, true)
  }

  private getFlag(bit: number): boolean {
    let flags = this.view.getUint32(4, true)
    return !!((flags >> bit) & 0x01)
  }
  private setFlag(bit: number, value: boolean) {
    let flags = this.view.getUint32(4, true)
    flags |= (+value << bit)
    this.view!.setUint32(4, flags, true)
  }

  getEditFlag(): boolean {
    return this.getFlag(0)
  }
  setEditFlag(value: boolean) {
    this.setFlag(0, value)
  }

  getHideButtonsFlag(): boolean {
    return this.getFlag(1)
  }
  setHideButtonsFlag(value: boolean) {
    this.setFlag(1, value)
  }

  getHideLabelsFlag(): boolean {
    return this.getFlag(2)
  }
  setHideLabelsFlag(value: boolean) {
    this.setFlag(2, value)
  }

  getGridSize(): number {
    return this.view.getUint32(8, true)
  }
  setGridSize(value: number) {
    this.view.setUint32(8, value, true)
  }
}

export class ControlSurfaceDimensionsEvent extends ControlSurfaceBinaryEvent {
  
  constructor(type: number, value?: ArrayBuffer) {
    super(type, value ?? new ArrayBuffer(8))
  }

  getWidth(): number {
    return this.view.getUint32(0, true)
  }
  setWidth(value: number) {
    this.view.setUint32(0, value, true)
  }

  getHeight(): number {
    return this.view.getUint32(4, true)
  }
  setHeight(value: number) {
    this.view.setUint32(4, value, true)
  }
}

export class ControlSurfaceStartControlEvent extends ControlSurfaceBinaryEvent {
  
  constructor(type: number, value?: ArrayBuffer) {
    super(type, value ?? new ArrayBuffer(32))
  }

  getType(): number {
    return this.view.getUint32(0, true)
  }
  setType(value: number) {
    this.view.setUint32(0, value, true)
  }
}

/**
 * Describes how a control is exposed. Enabled controls will have at least one of these events.
 */
export class ControlSurfaceEnableControlEvent extends ControlSurfaceBinaryEvent {

  constructor(type: number, value?: ArrayBuffer) {
    super(type, value ?? new ArrayBuffer(12))
  }

  /**
   * Returns the control's current value. Float, 0 ... 1
   */
  getCurrent(): number {
    return this.view.getFloat32(0, true)
  }
  /**
   * Sets the control's current value. Float, 0 ... 1
   */
  setCurrent(value: number) {
    this.view.setFloat32(0, value, true)
  }

  /**
   * Returns the control's default value. Float, 0 ... 1
   */
  getDefault(): number {
    return this.view.getFloat32(0, true)
  }
  /**
   * Sets the control's default value. Float, 0 ... 1
   */
  setDefault(value: number) {
    this.view.setFloat32(0, value, true)
  }

  /**
   * Returns the control's list index.
   */
  getIndex(): number {
    return this.view.getUint32(0, true)
  }
  /**
   * Sets the control's list index.
   */
  setIndex(value: number) {
    this.view.setUint32(0, value, true)
  }
}

export class ControlSurfaceControlDimensionsEvent extends ControlSurfaceBinaryEvent {
  
  constructor(type: number, value?: ArrayBuffer) {
    super(type, value ?? new ArrayBuffer(16))
  }

  getX(): number {
    return this.view.getFloat32(0, true)
  }
  setX(value: number) {
    this.view.setFloat32(0, value, true)
  }

  getY(): number {
    return this.view.getFloat32(4, true)
  }
  setY(value: number) {
    this.view.setFloat32(4, value, true)
  }

  getWidth(): number {
    return this.view.getFloat32(8, true)
  }
  setWidth(value: number) {
    this.view.setFloat32(8, value, true)
  }

  getHeight(): number {
    return this.view.getFloat32(12, true)
  }
  setHeight(value: number) {
    this.view.setFloat32(12, value, true)
  }
}