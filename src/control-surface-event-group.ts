import { ControlSurfaceEvent } from "./control-surface-event";
import { ControlSurfaceEventTypeId, ControlSurfaceEventTypeName } from "./control-surface-event-type";

/**
 * Class representing a group of [[ControlSurfaceEvent]]s.
 */
export class ControlSurfaceEventGroup {
  private events: ControlSurfaceEvent[] = []

  /**
   * Returns the first event in this group of given type id.
   * @param type [[ControlSurfaceEventTypeId]]
   */
  getEventOfType<T extends ControlSurfaceEvent>(type: ControlSurfaceEventTypeId): T|undefined {
    return this.events.find((e) => e.type === type) as T
  }

  /**
   * Returns the first event in this group of given type name.
   * @param type [[ControlSurfaceEventTypeName]]
   */
  getEventOfTypeName<T extends ControlSurfaceEvent>(type: ControlSurfaceEventTypeName): T|undefined {
    return this.events.find((e) => e.typeName === type) as T
  }

  /**
   * Returns all events in this group of given type id.
   * @param type [[ControlSurfaceEventTypeId]]
   */
  getEventsOfType<T extends ControlSurfaceEvent>(type: ControlSurfaceEventTypeId): T[]|undefined {
    return this.events.filter((e) => e.type === type) as T[]
  }

  /**
   * Returns all events in this group of given type name.
   * @param type [[ControlSurfaceEventTypeName]]
   */
  getEventsOfTypeName<T extends ControlSurfaceEvent>(type: ControlSurfaceEventTypeName): T[]|undefined {
    return this.events.filter((e) => e.typeName === type) as T[]
  }

  /**
   * Returns the [[ControlSurfaceEvent]]s making up this group.
   */
  getEvents(): ControlSurfaceEvent[] {
    return this.events
  }
  
  /**
   * Sets the [[ControlSurfaceEvent]]s making up this group.
   */
  setEvents(events: ControlSurfaceEvent[]) {
    this.events = events
  }
}