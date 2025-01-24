import { FLCSSControlDefinitionsEvent, FLCSSControlDimensionsEvent, FLCSSEnableControlEvent, FLCSSEvent, FLCSSStartControlEvent, FLCSSStringEvent, createEvent } from "./flcss-event";
import { FLCSSEventGroup } from "./flcss-event-group";
import { FLCSSEventType } from "./flcss-event-type";

/**
 * Class representing a control on the surface. Extends [[FLCSSEventGroup]].
 */
export class FLCSSControl extends FLCSSEventGroup {
  /**
   * Start event.
   */
  start?: FLCSSStartControlEvent
  /**
   * End event.
   */
  end?: FLCSSEvent
  /**
   * Enable events.
   */
  enable?: FLCSSEnableControlEvent[]
  /**
   * Name event.
   */
  name?: FLCSSStringEvent
  /**
   * Dimension event.
   */
  dimensions?: FLCSSControlDimensionsEvent
  /**
   * ILControl event.
   */
  ILControl?: FLCSSControlDefinitionsEvent
  /**
   * Color event.
   */
  colors?: FLCSSControlDefinitionsEvent
  /**
   * Properties event.
   */
  properties?: FLCSSControlDefinitionsEvent

  getEvents(): FLCSSEvent[] {
    const prototype = [
      this.start ?? createEvent(FLCSSEventType.StartControl),
      this.name,
      this.dimensions,
      ...(this.enable ?? []),
      this.ILControl,
      this.colors,
      this.properties,
      this.end ?? createEvent(FLCSSEventType.EndControl),
    ]
    return prototype.filter((event) => !!event) as FLCSSEvent[]
  }
  setEvents(events: FLCSSEvent[]): void {
    super.setEvents(events)
    this.start = this.getEventOfType(FLCSSEventType.StartControl)
    this.end = this.getEventOfType(FLCSSEventType.EndControl)
    this.enable = this.getEventsOfType(FLCSSEventType.EnableControl)
    this.name = this.getEventOfType(FLCSSEventType.Name)
    this.dimensions = this.getEventOfType(FLCSSEventType.Dimensions)
    this.ILControl = this.getEventOfType(FLCSSEventType.ILControl)
    this.colors = this.getEventOfType(FLCSSEventType.Colors)
    this.properties = this.getEventOfType(FLCSSEventType.Properties)
  }
}