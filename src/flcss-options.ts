import { FLCSSDimensionsEvent, FLCSSEvent, FLCSSSettingsEvent } from "./flcss-event";
import { FLCSSEventGroup } from "./flcss-event-group";
import { FLCSSEventType, FLCSSEventTypeId } from "./flcss-event-type";

/**
 * Class representing control surface options. Extends [[FLCSSEventGroup]].
 */
export class FLCSSOptions extends FLCSSEventGroup {
  /**
   * Settings event.
   */
  settings?: FLCSSSettingsEvent

  /**
   * Settings event.
   */
  dimensions?: FLCSSDimensionsEvent

  unknown?: FLCSSEvent

  getEvents(): FLCSSEvent[] {
    const prototype = [
      this.settings,
      this.dimensions,
      this.unknown,
    ]
    return prototype.filter((event) => !!event) as FLCSSEvent[]
  }
  setEvents(events: FLCSSEvent[]): void {
    super.setEvents(events)
    this.settings = this.getEventOfType(FLCSSEventType.SurfaceSettings)
    this.dimensions = this.getEventOfType(FLCSSEventType.SurfaceDimensions)
    this.unknown = this.getEventOfType(2003 as FLCSSEventTypeId)
  }
}
