import { ArrayBufferStream, joinArrayBuffers } from "array-buffer-stream"
import { ControlSurfaceEvent } from "./control-surface-event"

/*

control surface state:

uint32le: version

then events:
uint32le: type
uint32le: size
uint32le: 0
size byte: event data

*/

export class ControlSurface {
  /**
   * State version number.
   */
  version: number = 1

  /**
   * ControlSurfaceEvents in this surface.
   */
  events: ControlSurfaceEvent[] = []

  /**
   * Creates the binary data for this surface and returns it.
   */
  getBinary(): ArrayBuffer {
    const buffers: ArrayBuffer[] = []

    let stream: ArrayBufferStream

    // header
    stream = new ArrayBufferStream(new ArrayBuffer(4))
    stream.writeUint32(this.version, true)
    buffers.push(stream.buffer)

    // events
    this.events.forEach((event) => {
      const bytes = event.getBinary()
      const size = bytes.byteLength
      stream = new ArrayBufferStream(new ArrayBuffer(4 + 4 + 4 + size))
      stream.writeUint32(event.type, true)
      stream.writeUint32(size, true)
      stream.writeUint32(0, true)
      stream.writeBytes(bytes)
      buffers.push(stream.buffer)
    })

    return joinArrayBuffers(buffers)
  }
  /**
   * Sets this surface's values from binary data.
   * @param buffer Binary data.
   */
  setBinary(buffer: ArrayBuffer) {
    const stream = new ArrayBufferStream(buffer)

    // header
    this.version = stream.readUint32(true)

    // read events until end of data
    while (!stream.eof()) {
      const type = stream.readUint32(true)
      const size = stream.readUint32(true)
      const reserved = stream.readUint32(true)
      const bytes = stream.readBytes(size)
      const event = ControlSurfaceEvent.create(type)
      event.setBinary(bytes)
      this.events.push(event)
    }
  }
}