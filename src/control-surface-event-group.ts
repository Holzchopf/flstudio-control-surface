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
  getEventOfType(type: ControlSurfaceEventTypeId) {
    return this.events.find((e) => e.type === type)
  }

  /**
   * Returns the first event in this group of given type name.
   * @param type [[ControlSurfaceEventTypeName]]
   */
  getEventOfTypeName(type: ControlSurfaceEventTypeName) {
    return this.events.find((e) => e.typeName === type)
  }

  /**
   * Returns all events in this group of given type id.
   * @param type [[ControlSurfaceEventTypeId]]
   */
  getEventsOfType(type: ControlSurfaceEventTypeId) {
    return this.events.filter((e) => e.type === type)
  }

  /**
   * Returns all events in this group of given type name.
   * @param type [[ControlSurfaceEventTypeName]]
   */
  getEventsOfTypeName(type: ControlSurfaceEventTypeName) {
    return this.events.filter((e) => e.typeName === type)
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