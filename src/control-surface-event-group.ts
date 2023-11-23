import { ControlSurfaceEvent } from "./control-surface-event";
import { ControlSurfaceEventTypeId, ControlSurfaceEventTypeName } from "./control-surface-event-type";

export class ControlSurfaceEventGroup {
  private events: ControlSurfaceEvent[] = []

  getEventOfType(type: ControlSurfaceEventTypeId) {
    return this.events.find((e) => e.type === type)
  }

  getEventOfTypeName(type: ControlSurfaceEventTypeName) {
    return this.events.find((e) => e.typeName === type)
  }

  getEvents(): ControlSurfaceEvent[] {
    return this.events
  }
  setEvents(events: ControlSurfaceEvent[]) {
    this.events = events
  }
}