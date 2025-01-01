import { ArrayBufferStream } from "@holzchopf/array-buffer-stream"
import { ControlSurfaceEventType } from "./control-surface-event-type"

/**
 * Base class for events.
 */
export class ControlSurfaceEvent {
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

  protected buffer: ArrayBuffer
  protected view: DataView

  constructor(type: number, buffer?: ArrayBuffer) {
    this.type = type
    this.buffer = buffer ?? new ArrayBuffer(0)
    this.view = new DataView(this.buffer)
  }

  /**
   * Returns this event's binary data.
   */
  getBinary() {
    return this.buffer
  }
  /**
   * Sets this event's binary data.
   * @param buffer Binary data.
   */
  setBinary(buffer: ArrayBuffer) {
    this.buffer = buffer
    this.view = new DataView(this.buffer)
  }

  /**
   * Factory function to create a new specific ControlSurfaceEvent.
   * @param type ControlSurfaceEventType.
   */
  static create(type: number, value?: ArrayBuffer) {
    switch (type) {
      case 2000:
        return new ControlSurfaceSettingsEvent(type, value)
      case 2002:
        return new ControlSurfaceDimensionsEvent(type, value)
      case 2100:
        return new ControlSurfaceStartControlEvent(type, value)
      case 2102:
        return new ControlSurfaceEnableControlEvent(type, value)
      case 2104:
        return new ControlSurfaceControlDimensionsEvent(type, value)
      case 2103:
      case 2105:
      case 2106:
      case 2107:
        return new ControlSurfaceStringEvent(type, value)
      default:
        return new ControlSurfaceEvent(type, value)
    }
  }
}

/**
 * Event with string value data.
 */
export class ControlSurfaceStringEvent extends ControlSurfaceEvent {
  getValue(): string {
    return new TextDecoder('utf-16le').decode(this.buffer)
  }

  setValue(value: string) {
    const stream = new ArrayBufferStream(new ArrayBuffer(value.length * 2))
    stream.writeUtf16String(value, true)
    this.setBinary(stream.buffer)
  }
}

export class ControlSurfaceSettingsEvent extends ControlSurfaceEvent {
  
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

export class ControlSurfaceDimensionsEvent extends ControlSurfaceEvent {
  
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

export class ControlSurfaceStartControlEvent extends ControlSurfaceEvent {
  
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
export class ControlSurfaceEnableControlEvent extends ControlSurfaceEvent {

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

export class ControlSurfaceControlDimensionsEvent extends ControlSurfaceEvent {
  
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