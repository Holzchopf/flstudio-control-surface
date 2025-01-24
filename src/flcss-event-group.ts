import { FLCSSEvent } from "./flcss-event";
import { FLCSSEventTypeId, FLCSSEventTypeName } from "./flcss-event-type";

/**
 * Class representing a group of [[FLCSSEvent]]s.
 */
export class FLCSSEventGroup {
  private events: FLCSSEvent[] = []

  /**
   * Returns the first event in this group of given type id.
   * @param type [[FLCSSEventTypeId]]
   */
  getEventOfType<T extends FLCSSEvent>(type: FLCSSEventTypeId): T|undefined {
    return this.events.find((e) => e.type === type) as T
  }

  /**
   * Returns the first event in this group of given type name.
   * @param type [[FLCSSEventTypeName]]
   */
  getEventOfTypeName<T extends FLCSSEvent>(type: FLCSSEventTypeName): T|undefined {
    return this.events.find((e) => e.typeName === type) as T
  }

  /**
   * Returns all events in this group of given type id.
   * @param type [[FLCSSEventTypeId]]
   */
  getEventsOfType<T extends FLCSSEvent>(type: FLCSSEventTypeId): T[]|undefined {
    return this.events.filter((e) => e.type === type) as T[]
  }

  /**
   * Returns all events in this group of given type name.
   * @param type [[FLCSSEventTypeName]]
   */
  getEventsOfTypeName<T extends FLCSSEvent>(type: FLCSSEventTypeName): T[]|undefined {
    return this.events.filter((e) => e.typeName === type) as T[]
  }

  /**
   * Returns the [[FLCSSEvent]]s making up this group.
   */
  getEvents(): FLCSSEvent[] {
    return this.events
  }
  
  /**
   * Sets the [[FLCSSEvent]]s making up this group.
   */
  setEvents(events: FLCSSEvent[]) {
    this.events = events
  }
}