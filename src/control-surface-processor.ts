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
    surface.version = stream.readUint32LE()

    // events
    while (!stream.eof()) {
      const type = stream.readUint32LE()
      const size = stream.readUint32LE()
      const reserved = stream.readUint32LE()
      const bytes = stream.readBytes(size)
      const event = new ControlSurfaceEvent(type, size, bytes)
      surface.events.push(event)
    }

    return surface
  }
}