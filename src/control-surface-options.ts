import { ControlSurfaceDimensionsEvent, ControlSurfaceEvent, ControlSurfaceSettingsEvent } from "./control-surface-event";
import { ControlSurfaceEventGroup } from "./control-surface-event-group";
import { ControlSurfaceEventType, ControlSurfaceEventTypeId } from "./control-surface-event-type";

/**
 * Class representing control surface options. Extends [[ControlSurfaceEventGroup]].
 */
export class ControlSurfaceOptions extends ControlSurfaceEventGroup {
  /**
   * Settings event.
   */
  settings?: ControlSurfaceSettingsEvent

  /**
   * Settings event.
   */
  dimensions?: ControlSurfaceDimensionsEvent

  unknown?: ControlSurfaceEvent

  getEvents(): ControlSurfaceEvent[] {
    const prototype = [
      this.settings,
      this.dimensions,
      this.unknown,
    ]
    return prototype.filter((event) => !!event) as ControlSurfaceEvent[]
  }
  setEvents(events: ControlSurfaceEvent[]): void {
    super.setEvents(events)
    this.settings = this.getEventOfType(ControlSurfaceEventType.SurfaceSettings)
    this.dimensions = this.getEventOfType(ControlSurfaceEventType.SurfaceDimensions)
    this.unknown = this.getEventOfType(2003 as ControlSurfaceEventTypeId)
  }
}
