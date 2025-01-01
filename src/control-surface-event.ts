import { ArrayBufferStream } from "@holzchopf/array-buffer-stream"
import { ControlSurfaceEventType } from "./control-surface-event-type"
import { ControlSurfaceControlType, ControlSurfaceControlTypeId } from "./control-surface-control-type"

/**
 * Base class for events.
 */
export abstract class ControlSurfaceEvent {
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

  // protected buffer: ArrayBuffer
  // protected view: DataView

  constructor(type: number) {
    this.type = type
    // this.buffer = buffer ?? new ArrayBuffer(0)
    // this.view = new DataView(this.buffer)
  }

  /**
   * Returns this event's binary data.
   */
  abstract getBinary(): ArrayBuffer
  /**
   * Sets this event's binary data.
   * @param buffer Binary data.
   */
  abstract setBinary(buffer: ArrayBuffer): void
}

/**
 * Event with unspecified binary data.
 */
export class ControlSurfaceBinaryEvent extends ControlSurfaceEvent {
  buffer = new ArrayBuffer(0)

  getBinary(): ArrayBuffer {
    return this.buffer
  }
  setBinary(buffer: ArrayBuffer): void {
    this.buffer = buffer
  }
}

/**
 * Event with string value data.
 */
export class ControlSurfaceStringEvent extends ControlSurfaceEvent {
  value = ''

  getBinary(): ArrayBuffer {
    const stream = new ArrayBufferStream(new ArrayBuffer(this.value.length * 2))
    stream.writeUtf16String(this.value, true)
    return stream.buffer
  }
  setBinary(buffer: ArrayBuffer): void {
    this.value = new TextDecoder('utf-16le').decode(buffer)
  }
}

export class ControlSurfaceSettingsEvent extends ControlSurfaceEvent {
  skip = 0
  edit = false
  hideButtons = false
  hideLabels = false
  gridSize = 10

  getBinary(): ArrayBuffer {
    const buffer = new ArrayBuffer(64)
    const view = new DataView(buffer)
    view.setUint32(0, this.skip, true)
    let flags = 0
    flags |= (+this.edit << 0)
    flags |= (+this.hideButtons << 1)
    flags |= (+this.hideLabels << 2)
    view.setUint32(4, flags, true)
    view.setUint32(8, this.gridSize, true)
    return buffer
  }
  setBinary(buffer: ArrayBuffer): void {
    const view = new DataView(buffer)
    this.skip = view.getUint32(0, true)
    const flags = view.getUint32(4, true)
    this.edit = !!((flags >> 0) & 0x01)
    this.hideButtons = !!((flags >> 1) & 0x01)
    this.hideLabels = !!((flags >> 2) & 0x01)
    this.gridSize = view.getUint32(8, true)
  }
}

export class ControlSurfaceDimensionsEvent extends ControlSurfaceEvent {
  width = 540
  height = 454

  getBinary(): ArrayBuffer {
    const buffer = new ArrayBuffer(8)
    const view = new DataView(buffer)
    view.setUint32(0, this.width, true)
    view.setUint32(4, this.height, true)
    return buffer
  }
  setBinary(buffer: ArrayBuffer): void {
    const view = new DataView(buffer)
    this.width = view.getUint32(0, true)
    this.height = view.getUint32(4, true)
  }
}

export class ControlSurfaceStartControlEvent extends ControlSurfaceEvent {
  controlType = 0

  get controlTypeName() {
    return ControlSurfaceControlType.name(this.controlType)
  }
  
  getBinary(): ArrayBuffer {
    const buffer = new ArrayBuffer(32)
    const view = new DataView(buffer)
    view.setUint32(0, this.controlType, true)
    return buffer
  }
  setBinary(buffer: ArrayBuffer): void {
    const view = new DataView(buffer)
    this.controlType = view.getUint32(0, true)
  }
}

/**
 * Describes how a control is exposed. Enabled controls will have at least one of these events.
 */
export class ControlSurfaceEnableControlEvent extends ControlSurfaceEvent {
  currentValue = 0
  defaultValue = 0
  index = 0
  
  getBinary(): ArrayBuffer {
    const buffer = new ArrayBuffer(12)
    const view = new DataView(buffer)
    view.setFloat32(0, this.currentValue, true)
    view.setFloat32(4, this.defaultValue, true)
    view.setUint32(8, this.index, true)
    return buffer
  }
  setBinary(buffer: ArrayBuffer): void {
    const view = new DataView(buffer)
    this.currentValue = view.getFloat32(0, true)
    this.defaultValue = view.getFloat32(4, true)
    this.index = view.getUint32(8, true)
  }
}

export class ControlSurfaceControlDimensionsEvent extends ControlSurfaceEvent {
  x = 0
  y = 0
  width = 32
  height = 32

  getBinary(): ArrayBuffer {
    const buffer = new ArrayBuffer(16)
    const view = new DataView(buffer)
    view.setFloat32(0, this.x + this.width / 2, true)
    view.setFloat32(4, this.y + this.height / 2, true)
    view.setFloat32(8, this.width, true)
    view.setFloat32(12, this.height, true)
    return buffer
  }
  setBinary(buffer: ArrayBuffer): void {
    const view = new DataView(buffer)
    this.width = view.getFloat32(8, true)
    this.height = view.getFloat32(12, true)
    this.x = view.getFloat32(0, true) - this.width / 2
    this.y = view.getFloat32(4, true) - this.height / 2
  }
}

export class ControlSurfaceControlDefinitionsEvent extends ControlSurfaceStringEvent {
  properties: Record<string, string> = {}
  header = 'control'
  footer = 'end'

  getBinary(): ArrayBuffer {
    this.value = [
      ...this.header,
      ...Object.entries(this.properties).map(([key, value]) => {
        return `  ${key} = ${value}`
      }),
      ...this.footer,
    ].join('\r\n')
    return super.getBinary()
  }
  setBinary(buffer: ArrayBuffer): void {
    super.setBinary(buffer)
    let defs = this.value.split('\r\n')
    this.header = defs.splice(0, 1)[0]
    this.footer = defs.splice(-2, 2)[0]
    defs.forEach((def) => {
      const [key, value] = def.trim().split(' = ')
      this.properties[key] = value
    })
  }
}

/**
 * Factory function to create a new specific ControlSurfaceEvent.
 * @param type ControlSurfaceEventType.
 * @param value Binary data for this event.
 */
export function createEvent(type: number, buffer?: ArrayBuffer) {
  switch (type) {
    case 2000: {
      const event = new ControlSurfaceSettingsEvent(type)
      if (buffer) event.setBinary(buffer)
      return event
    }
    case 2002: {
      const event = new ControlSurfaceDimensionsEvent(type)
      if (buffer) event.setBinary(buffer)
      return event
    }
    case 2100: {
      const event = new ControlSurfaceStartControlEvent(type)
      if (buffer) event.setBinary(buffer)
      return event
    }
    case 2102: {
      const event = new ControlSurfaceEnableControlEvent(type)
      if (buffer) event.setBinary(buffer)
      return event
    }
    case 2104: {
      const event = new ControlSurfaceControlDimensionsEvent(type)
      if (buffer) event.setBinary(buffer)
      return event
    }
    case 2103: {
      const event = new ControlSurfaceStringEvent(type)
      if (buffer) event.setBinary(buffer)
      return event
    }
    case 2105:
    case 2106:
    case 2107: {
      const event = new ControlSurfaceControlDefinitionsEvent(type)
      if (buffer) event.setBinary(buffer)
      return event
    }
    default: {
      const event = new ControlSurfaceBinaryEvent(type)
      if (buffer) event.setBinary(buffer)
      return event
    }
  }
}