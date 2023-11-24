This file was auto-generated with `zdoccer.js` 2.0.3

# Index

  - [@holzchopf/control-surface](#holzchopf-control-surface)
    - [`class ControlSurfaceControl extends ControlSurfaceEventGroup`](#class-controlsurfacecontrol-extends-controlsurfaceeventgroup)
      - [`get name(): string | undefined`](#get-name-string-undefined)
      - [`get enable(): ControlEnable | undefined`](#get-enable-controlenable-undefined)
    - [`class ControlSurfaceEventGroup`](#class-controlsurfaceeventgroup)
      - [`getEventOfType(type: ControlSurfaceEventTypeId)`](#geteventoftype-type-controlsurfaceeventtypeid)
      - [`getEventOfTypeName(type: ControlSurfaceEventTypeName)`](#geteventoftypename-type-controlsurfaceeventtypename)
      - [`getEvents(): ControlSurfaceEvent[]`](#getevents-controlsurfaceevent)
      - [`setEvents(events: ControlSurfaceEvent[])`](#setevents-events-controlsurfaceevent)
    - [`type ControlSurfaceEventTypeName = keyof typeof ControlSurfaceEventTypeRaw`](#type-controlsurfaceeventtypename-keyof-typeof-controlsurfaceeventtyperaw)
    - [`type ControlSurfaceEventTypeId = typeof ControlSurfaceEventTypeRaw[ControlSurfaceEventTypeName]`](#type-controlsurfaceeventtypeid-typeof-controlsurfaceeventtyperaw-controlsurfaceeventtypename)
    - [`const ControlSurfaceEventType =`](#const-controlsurfaceeventtype)
      - [`name: (id: number): ControlSurfaceEventTypeName | 'unknown' =>`](#name-id-number-controlsurfaceeventtypename-unknown)
      - [`byName: (name: string): ControlSurfaceEventTypeId | undefined =>`](#byname-name-string-controlsurfaceeventtypeid-undefined)
    - [`abstract class ControlSurfaceEvent<T = any>`](#abstract-class-controlsurfaceevent-t-any)
      - [`type: number`](#type-number)
      - [`get typeName()`](#get-typename)
      - [`value?: T`](#value-t)
      - [`abstract getBinary(): ArrayBuffer`](#abstract-getbinary-arraybuffer)
      - [`abstract setBinary(buffer: ArrayBuffer): void`](#abstract-setbinary-buffer-arraybuffer-void)
      - [`static create(type: number)`](#static-create-type-number)
    - [`class ControlSurfaceBinaryEvent extends ControlSurfaceEvent<ArrayBuffer>`](#class-controlsurfacebinaryevent-extends-controlsurfaceevent-arraybuffer)
    - [`class ControlSurfaceStringEvent extends ControlSurfaceEvent<string>`](#class-controlsurfacestringevent-extends-controlsurfaceevent-string)
    - [`type ControlEnable =`](#type-controlenable)
      - [`current?: number,`](#current-number)
      - [`default?: number,`](#default-number)
      - [`index?: number,`](#index-number)
    - [`class ControlSurfaceControlEnableEvent extends ControlSurfaceEvent<ControlEnable>`](#class-controlsurfacecontrolenableevent-extends-controlsurfaceevent-controlenable)
    - [`class ControlSurface`](#class-controlsurface)
      - [`version: number = 1`](#version-number-1)
      - [`options = new ControlSurfaceOptions()`](#options-new-controlsurfaceoptions)
      - [`controls: ControlSurfaceControl[] = []`](#controls-controlsurfacecontrol)
      - [`getBinary(): ArrayBuffer`](#getbinary-arraybuffer)
      - [`setBinary(buffer: ArrayBuffer)`](#setbinary-buffer-arraybuffer)


---

*original Markdown from src/_preamble.md*

<div id="holzchopf-control-surface"></div><!-- alias: holzchopf-control-surface -->

# @holzchopf/control-surface

Allows to read and write FL Studio Control Surface states.

---

*transformed Javadoc from src/control-surface-control.ts*

<div id="class-controlsurfacecontrol-extends-controlsurfaceeventgroup"></div><!-- alias: controlsurfacecontrol -->

## `class ControlSurfaceControl extends ControlSurfaceEventGroup`


Class representing a control on the surface. Extends [ControlSurfaceEventGroup **&#x1f875;**](#class-controlsurfaceeventgroup).


<div id="get-name-string-undefined"></div><!-- alias: get-name -->

### `get name(): string | undefined`


Name of this control.


<div id="get-enable-controlenable-undefined"></div><!-- alias: get-enable -->

### `get enable(): ControlEnable | undefined`


[ControlEnable **&#x1f875;**](#type-controlenable) of this control.




---

*transformed Javadoc from src/control-surface-event-group.ts*

<div id="class-controlsurfaceeventgroup"></div><!-- alias: controlsurfaceeventgroup -->

## `class ControlSurfaceEventGroup`


Class representing a group of [ControlSurfaceEvent **&#x1f875;**](#abstract-class-controlsurfaceevent-t-any)s.


<div id="geteventoftype-type-controlsurfaceeventtypeid"></div><!-- alias: geteventoftype -->

### `getEventOfType(type: ControlSurfaceEventTypeId)`


Returns the first event in this group of given type id.
- *param* `type` &mdash; [ControlSurfaceEventTypeId **&#x1f875;**](#type-controlsurfaceeventtypeid-typeof-controlsurfaceeventtyperaw-controlsurfaceeventtypename)


<div id="geteventoftypename-type-controlsurfaceeventtypename"></div><!-- alias: geteventoftypename -->

### `getEventOfTypeName(type: ControlSurfaceEventTypeName)`


Returns the first event in this group of given type name.
- *param* `type` &mdash; [ControlSurfaceEventTypeName **&#x1f875;**](#type-controlsurfaceeventtypename-keyof-typeof-controlsurfaceeventtyperaw)


<div id="getevents-controlsurfaceevent"></div><!-- alias: getevents -->

### `getEvents(): ControlSurfaceEvent[]`


Returns the [ControlSurfaceEvent **&#x1f875;**](#abstract-class-controlsurfaceevent-t-any)s making up this group.


<div id="setevents-events-controlsurfaceevent"></div><!-- alias: setevents -->

### `setEvents(events: ControlSurfaceEvent[])`


Sets the [ControlSurfaceEvent **&#x1f875;**](#abstract-class-controlsurfaceevent-t-any)s making up this group.




---

*transformed Javadoc from src/control-surface-event-type.ts*

<div id="type-controlsurfaceeventtypename-keyof-typeof-controlsurfaceeventtyperaw"></div><!-- alias: controlsurfaceeventtypename -->

## `type ControlSurfaceEventTypeName = keyof typeof ControlSurfaceEventTypeRaw`


Known event names.


<div id="type-controlsurfaceeventtypeid-typeof-controlsurfaceeventtyperaw-controlsurfaceeventtypename"></div><!-- alias: controlsurfaceeventtypeid -->

## `type ControlSurfaceEventTypeId = typeof ControlSurfaceEventTypeRaw[ControlSurfaceEventTypeName]`


Known event IDs.


<div id="const-controlsurfaceeventtype"></div><!-- alias: controlsurfaceeventtype -->

## `const ControlSurfaceEventType =`


Types of the events in an [ControlSurfaceEventGroup **&#x1f875;**](#class-controlsurfaceeventgroup).


<div id="name-id-number-controlsurfaceeventtypename-unknown"></div><!-- alias: name -->

### `name: (id: number): ControlSurfaceEventTypeName | 'unknown' =>`


Returns the name of a given event ID, or `'unknown'`.
- *param* `id` &mdash; Event ID.


<div id="byname-name-string-controlsurfaceeventtypeid-undefined"></div><!-- alias: byname -->

### `byName: (name: string): ControlSurfaceEventTypeId | undefined =>`


Returns the ID for a given event name, or `undefined`
- *param* `name` &mdash; Event name.




---

*transformed Javadoc from src/control-surface-event.ts*

<div id="abstract-class-controlsurfaceevent-t-any"></div><!-- alias: controlsurfaceevent -->

## `abstract class ControlSurfaceEvent<T = any>`


Class for events.


<div id="type-number"></div><!-- alias: type -->

### `type: number`


Numeric [ControlSurfaceEventType **&#x1f875;**](#const-controlsurfaceeventtype).


<div id="get-typename"></div><!-- alias: get-typename -->

### `get typeName()`


Name of [ControlSurfaceEventType **&#x1f875;**](#const-controlsurfaceeventtype). Readonly.


<div id="value-t"></div><!-- alias: value -->

### `value?: T`


Event value. Data type varies by event type.


<div id="abstract-getbinary-arraybuffer"></div><!-- alias: getbinary -->

### `abstract getBinary(): ArrayBuffer`


Creates the binary data for this event and returns it.


<div id="abstract-setbinary-buffer-arraybuffer-void"></div><!-- alias: setbinary -->

### `abstract setBinary(buffer: ArrayBuffer): void`


Sets this event's values from binary data.
- *param* `buffer` &mdash; Binary data.


<div id="static-create-type-number"></div><!-- alias: create -->

### `static create(type: number)`


Factory function to create a new specific ControlSurfaceEvent.
- *param* `type` &mdash; ControlSurfaceEventType.


<div id="class-controlsurfacebinaryevent-extends-controlsurfaceevent-arraybuffer"></div><!-- alias: controlsurfacebinaryevent -->

## `class ControlSurfaceBinaryEvent extends ControlSurfaceEvent<ArrayBuffer>`


Event with binary value data.


<div id="class-controlsurfacestringevent-extends-controlsurfaceevent-string"></div><!-- alias: controlsurfacestringevent -->

## `class ControlSurfaceStringEvent extends ControlSurfaceEvent<string>`


Event with string value data.


<div id="type-controlenable"></div><!-- alias: controlenable -->

## `type ControlEnable =`


Enabled controls will have a [ControlSurfaceControlEnableEvent **&#x1f875;**](#class-controlsurfacecontrolenableevent-extends-controlsurfaceevent-controlenable) with a value of this type.


<div id="current-number"></div><!-- alias: current -->

### `current?: number,`


Current value. Float, 0 ... 1


<div id="default-number"></div><!-- alias: default -->

### `default?: number,`


Default value. Float, 0 ... 1


<div id="index-number"></div><!-- alias: index -->

### `index?: number,`


List index. Integer >= 0


<div id="class-controlsurfacecontrolenableevent-extends-controlsurfaceevent-controlenable"></div><!-- alias: controlsurfacecontrolenableevent -->

## `class ControlSurfaceControlEnableEvent extends ControlSurfaceEvent<ControlEnable>`


Enabled controls will have one of these events.




---

*transformed Javadoc from src/control-surface.ts*

<div id="class-controlsurface"></div><!-- alias: controlsurface -->

## `class ControlSurface`


Class representing an FL Studio Control Surface plugin state.


<div id="version-number-1"></div><!-- alias: version -->

### `version: number = 1`


State version number.


<div id="options-new-controlsurfaceoptions"></div><!-- alias: options -->

### `options = new ControlSurfaceOptions()`


Surface options.


<div id="controls-controlsurfacecontrol"></div><!-- alias: controls -->

### `controls: ControlSurfaceControl[] = []`


Controls on this surface.


<div id="getbinary-arraybuffer"></div><!-- alias: getbinary -->

### `getBinary(): ArrayBuffer`


Creates the binary data for this surface and returns it.


<div id="setbinary-buffer-arraybuffer"></div><!-- alias: setbinary -->

### `setBinary(buffer: ArrayBuffer)`


Sets this surface's values from binary data.
- *param* `buffer` &mdash; Binary data.


