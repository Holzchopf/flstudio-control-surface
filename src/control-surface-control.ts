import { ControlSurfaceControlDimensionsEvent, ControlSurfaceEnableControlEvent, ControlSurfaceEvent, ControlSurfaceStringEvent, createEvent } from "./control-surface-event";
import { ControlSurfaceEventGroup } from "./control-surface-event-group";
import { ControlSurfaceEventType } from "./control-surface-event-type";

/**
 * Class representing a control on the surface. Extends [[ControlSurfaceEventGroup]].
 */
export class ControlSurfaceControl extends ControlSurfaceEventGroup {
  /**
   * Start event.
   */
  start?: ControlSurfaceEvent
  /**
   * End event.
   */
  end?: ControlSurfaceEvent
  /**
   * Enable events.
   */
  enable?: ControlSurfaceEnableControlEvent[]
  /**
   * Name event.
   */
  name?: ControlSurfaceStringEvent
  /**
   * Dimension event.
   */
  dimensions?: ControlSurfaceControlDimensionsEvent
  /**
   * ILControl event.
   */
  ILControl?: ControlSurfaceStringEvent
  /**
   * Color event.
   */
  colors?: ControlSurfaceStringEvent
  /**
   * Properties event.
   */
  properties?: ControlSurfaceStringEvent

  getEvents(): ControlSurfaceEvent[] {
    const prototype = [
      this.start ?? createEvent(ControlSurfaceEventType.StartControl),
      this.name,
      this.dimensions,
      ...(this.enable ?? []),
      this.ILControl,
      this.colors,
      this.properties,
      this.end ?? createEvent(ControlSurfaceEventType.EndControl),
    ]
    return prototype.filter((event) => !!event) as ControlSurfaceEvent[]
  }
  setEvents(events: ControlSurfaceEvent[]): void {
    super.setEvents(events)
    this.start = this.getEventOfType(ControlSurfaceEventType.StartControl)
    this.end = this.getEventOfType(ControlSurfaceEventType.EndControl)
    this.enable = this.getEventsOfType(ControlSurfaceEventType.EnableControl)
    this.name = this.getEventOfType(ControlSurfaceEventType.Name)
    this.dimensions = this.getEventOfType(ControlSurfaceEventType.Dimensions)
    this.ILControl = this.getEventOfType(ControlSurfaceEventType.ILControl)
    this.colors = this.getEventOfType(ControlSurfaceEventType.Colors)
    this.properties = this.getEventOfType(ControlSurfaceEventType.Properties)
  }
}