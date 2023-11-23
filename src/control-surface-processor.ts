import { ArrayBufferStream } from "array-buffer-stream"
import { ControlSurface } from "./control-surface"
import { ControlSurfaceEvent } from "./control-surface-event"

/*

in control surface

4 byte, probably version (always 1 uint32le)

then

chunks
starting with
uint32le - type
uint32le - size
4 byte - 0x00
(or the two above: uint64le - size)
size byte - data

*/

export class ControlSurfaceProcessor {

  /**
   * Reads a Control Surface state from ArrayBuffer
   */
  readFile(buffer: ArrayBuffer) {
    const stream = new ArrayBufferStream(buffer)
    const surface = new ControlSurface()

    // header
    surface.version = stream.readUint32(true)

    // events
    while (!stream.eof()) {
      const type = stream.readUint32(true)
      const size = stream.readUint32(true)
      const reserved = stream.readUint32(true)
      const bytes = stream.readBytes(size)
      const event = new ControlSurfaceEvent(type, size, bytes)
      surface.events.push(event)
    }

    return surface
  }

  /**
   * Writes a Control Surface state to an ArrayBuffer
   * @param surface The Control Surface to write.
   */
  writeFile(surface: ControlSurface): ArrayBuffer {
    const buffers: ArrayBuffer[] = []

    let stream: ArrayBufferStream

    // header
    stream = new ArrayBufferStream(new ArrayBuffer(4))
    stream.writeUint32(surface.version ?? 1, true)
    buffers.push(stream.buffer)

    // events
    surface.events.forEach((e) => {
      const byteLength = 4 + 4 + 4 + e.bytes.byteLength
      stream = new ArrayBufferStream(new ArrayBuffer(byteLength))
      stream.writeUint32(e.type, true)
      stream.writeUint32(e.bytes.byteLength, true)
      stream.writeUint32(0, true)
      stream.writeBytes(e.bytes)
      buffers.push(stream.buffer)
    })

    // concatenate all those ArrayBuffers
    const byteLength = buffers.reduce((acc, buffer) => {
      acc += buffer.byteLength
      return acc
    }, 0)
    const out = new Uint8Array(byteLength)
    let offset = 0
    buffers.forEach((buffer) => {
      out.set(new Uint8Array(buffer), offset)
      offset += buffer.byteLength
    })
    return out.buffer
  }
}