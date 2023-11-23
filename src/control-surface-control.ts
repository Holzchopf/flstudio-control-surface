import { ControlEnable, ControlSurfaceControlEnableEvent, ControlSurfaceEvent, ControlSurfaceStringEvent } from "./control-surface-event";
import { ControlSurfaceEventGroup } from "./control-surface-event-group";
import { ControlSurfaceEventType } from "./control-surface-event-type";

export class ControlSurfaceControl extends ControlSurfaceEventGroup {
  private evStart?: ControlSurfaceEvent
  private evEnd?: ControlSurfaceEvent
  private evEnable?: ControlSurfaceControlEnableEvent
  private evName?: ControlSurfaceStringEvent
  private evDimensions?: ControlSurfaceEvent
  private evILControl?: ControlSurfaceStringEvent
  private evColors?: ControlSurfaceStringEvent
  private evProperties?: ControlSurfaceStringEvent

  get name(): string | undefined {
    return this.evName?.value
  }
  set name(name: string) {
    this.evName ??= ControlSurfaceEvent.create(ControlSurfaceEventType.Name) as ControlSurfaceStringEvent
    this.evName.value = name
  }

  get enable(): ControlEnable | undefined {
    return this.evEnable?.value
  }
  set enable(enable: ControlEnable | undefined) {
    if (typeof(enable) === 'undefined') {
      this.evEnable = undefined
    } else {
      this.evEnable ??= ControlSurfaceEvent.create(ControlSurfaceEventType.EnableControl) as ControlSurfaceControlEnableEvent
      this.evEnable.value = enable
    }
  }

  getEvents(): ControlSurfaceEvent[] {
    const prototype = [
      this.evStart ?? ControlSurfaceEvent.create(ControlSurfaceEventType.StartControl),
      this.evName,
      this.evDimensions,
      this.evEnable,
      this.evILControl,
      this.evColors,
      this.evProperties,
      this.evEnd ?? ControlSurfaceEvent.create(ControlSurfaceEventType.EndControl),
    ]
    return prototype.filter((event) => !!event) as ControlSurfaceEvent[]
  }
  setEvents(events: ControlSurfaceEvent[]): void {
    super.setEvents(events)
    this.evStart = this.getEventOfType(ControlSurfaceEventType.StartControl)
    this.evEnd = this.getEventOfType(ControlSurfaceEventType.EndControl)
    this.evEnable = this.getEventOfType(ControlSurfaceEventType.EnableControl) as ControlSurfaceControlEnableEvent
    this.evName = this.getEventOfType(ControlSurfaceEventType.Name)
    this.evDimensions = this.getEventOfType(ControlSurfaceEventType.Dimensions)
    this.evILControl = this.getEventOfType(ControlSurfaceEventType.ILControl)
    this.evColors = this.getEventOfType(ControlSurfaceEventType.Colors)
    this.evProperties = this.getEventOfType(ControlSurfaceEventType.Properties)
  }
}