import { ControlSurfaceEvent } from "./control-surface-event"

export class ControlSurface {
  version?: number
  events: ControlSurfaceEvent[] = []
}