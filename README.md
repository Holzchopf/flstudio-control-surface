This file was auto-generated with `zdoccer.js` 2.0.3

# Index

  - [@holzchopf/flstudio-control-surface-state](#holzchopf-flstudio-control-surface-state)
    - [The state format](#the-state-format)
      - [State header](#state-header)
      - [State body](#state-body)
      - [Events](#events)
        - [2000 - Surface Settings](#2000-surface-settings)
        - [2002 - Surface Dimensions](#2002-surface-dimensions)
        - [2003 - unknown](#2003-unknown)
        - [2100 - Start Control](#2100-start-control)
        - [2101 - End Control](#2101-end-control)
        - [2102 - Enable Control](#2102-enable-control)
        - [2103 - Control Name](#2103-control-name)
        - [2104 - Control Dimensions](#2104-control-dimensions)
        - [2105 - ILControl](#2105-ilcontrol)
        - [2106 - ILControl, Colors](#2106-ilcontrol-colors)
        - [2107 - ILControl, Properties](#2107-ilcontrol-properties)
    - [`type FLCSSControlTypeName = keyof typeof FLCSSControlTypeRaw`](#type-flcsscontroltypename-keyof-typeof-flcsscontroltyperaw)
    - [`type FLCSSControlTypeId = typeof FLCSSControlTypeRaw[FLCSSControlTypeName]`](#type-flcsscontroltypeid-typeof-flcsscontroltyperaw-flcsscontroltypename)
    - [`const FLCSSControlType =`](#const-flcsscontroltype)
      - [`name: (id: number): FLCSSControlTypeName | 'unknown' =>`](#name-id-number-flcsscontroltypename-unknown)
      - [`byName: (name: string): FLCSSControlTypeId | undefined =>`](#byname-name-string-flcsscontroltypeid-undefined)
    - [`class FLCSSControl extends FLCSSEventGroup`](#class-flcsscontrol-extends-flcsseventgroup)
      - [`start?: FLCSSStartControlEvent`](#start-flcssstartcontrolevent)
      - [`end?: FLCSSEvent`](#end-flcssevent)
      - [`enable?: FLCSSEnableControlEvent[]`](#enable-flcssenablecontrolevent)
      - [`name?: FLCSSStringEvent`](#name-flcssstringevent)
      - [`dimensions?: FLCSSControlDimensionsEvent`](#dimensions-flcsscontroldimensionsevent)
      - [`ILControl?: FLCSSControlDefinitionsEvent`](#ilcontrol-flcsscontroldefinitionsevent)
      - [`colors?: FLCSSControlDefinitionsEvent`](#colors-flcsscontroldefinitionsevent)
      - [`properties?: FLCSSControlDefinitionsEvent`](#properties-flcsscontroldefinitionsevent)
    - [`class FLCSSEventGroup`](#class-flcsseventgroup)
      - [`getEventOfType<T extends FLCSSEvent>(type: FLCSSEventTypeId): T|undefined`](#geteventoftype-t-extends-flcssevent-type-flcsseventtypeid-t-undefined)
      - [`getEventOfTypeName<T extends FLCSSEvent>(type: FLCSSEventTypeName): T|undefined`](#geteventoftypename-t-extends-flcssevent-type-flcsseventtypename-t-undefined)
      - [`getEventsOfType<T extends FLCSSEvent>(type: FLCSSEventTypeId): T[]|undefined`](#geteventsoftype-t-extends-flcssevent-type-flcsseventtypeid-t-undefined)
      - [`getEventsOfTypeName<T extends FLCSSEvent>(type: FLCSSEventTypeName): T[]|undefined`](#geteventsoftypename-t-extends-flcssevent-type-flcsseventtypename-t-undefined)
      - [`getEvents(): FLCSSEvent[]`](#getevents-flcssevent)
      - [`setEvents(events: FLCSSEvent[])`](#setevents-events-flcssevent)
    - [`type FLCSSEventTypeName = keyof typeof FLCSSEventTypeRaw`](#type-flcsseventtypename-keyof-typeof-flcsseventtyperaw)
    - [`type FLCSSEventTypeId = typeof FLCSSEventTypeRaw[FLCSSEventTypeName]`](#type-flcsseventtypeid-typeof-flcsseventtyperaw-flcsseventtypename)
    - [`const FLCSSEventType =`](#const-flcsseventtype)
      - [`name: (id: number): FLCSSEventTypeName | 'unknown' =>`](#name-id-number-flcsseventtypename-unknown)
      - [`byName: (name: string): FLCSSEventTypeId | undefined =>`](#byname-name-string-flcsseventtypeid-undefined)
    - [`abstract class FLCSSEvent`](#abstract-class-flcssevent)
      - [`type: number`](#type-number)
      - [`get typeName()`](#get-typename)
      - [`abstract getBinary(): ArrayBuffer`](#abstract-getbinary-arraybuffer)
      - [`abstract setBinary(buffer: ArrayBuffer): void`](#abstract-setbinary-buffer-arraybuffer-void)
    - [`class FLCSSBinaryEvent extends FLCSSEvent`](#class-flcssbinaryevent-extends-flcssevent)
    - [`class FLCSSStringEvent extends FLCSSEvent`](#class-flcssstringevent-extends-flcssevent)
    - [`class FLCSSStartControlEvent extends FLCSSEvent`](#class-flcssstartcontrolevent-extends-flcssevent)
    - [`class FLCSSEnableControlEvent extends FLCSSEvent`](#class-flcssenablecontrolevent-extends-flcssevent)
    - [`function createEvent(type: number, buffer?: ArrayBuffer)`](#function-createevent-type-number-buffer-arraybuffer)
    - [`class FLCSSOptions extends FLCSSEventGroup`](#class-flcssoptions-extends-flcsseventgroup)
      - [`settings?: FLCSSSettingsEvent`](#settings-flcsssettingsevent)
      - [`dimensions?: FLCSSDimensionsEvent`](#dimensions-flcssdimensionsevent)
    - [`class FLControlSurfaceState`](#class-flcontrolsurfacestate)
      - [`version: number = 1`](#version-number-1)
      - [`options = new FLCSSOptions()`](#options-new-flcssoptions)
      - [`controls: FLCSSControl[] = []`](#controls-flcsscontrol)
      - [`getBinary(): ArrayBuffer`](#getbinary-arraybuffer)
      - [`setBinary(buffer: ArrayBuffer)`](#setbinary-buffer-arraybuffer)


---

*original Markdown from src/_preamble.md*

<div id="holzchopf-flstudio-control-surface-state"></div><!-- alias: holzchopf-flstudio-control-surface-state -->

# @holzchopf/flstudio-control-surface-state

Allows to read and write FL Studio Control Surface states. The main goal of this package is to modify Control Surface states.

<div id="the-state-format"></div><!-- alias: the-state-format -->

## The state format

The state consists of a header, followed by body consisting of a variable number of events. I chose the name event because the official documentation for the `.flp` file format - which used a similar "event" based approach - called those data packages events.

<div id="state-header"></div><!-- alias: state-header -->

### State header

The header typically `4 bytes` long. Probably indicating the format version, it is usually the number `1` stored as `uint32le`

| Offset  | Format    | Description | Typical Value
| ---:    | ---       | ---         | ---
| 0       | uint32le  | version     | `0x01 00 00 00`

<div id="state-body"></div><!-- alias: state-body -->

### State body

The body is of variable length and consists of events. Each event has this structure:

| Offset  | Format    | Description | Typical Value
| ---:    | ---       | ---         | ---
| 0       | uint32le  | type
| 4       | uint64le  | size (byte) of event data
| 12      | -         | event data

<div id="events"></div><!-- alias: events -->

### Events

All events can be grouped into Control Surface options (types 20xx) or controls (types 21xx). Listed here are event types typically found:

<div id="2000-surface-settings"></div><!-- alias: 2000-surface-settings -->

#### 2000 - Surface Settings

This event is typically `64 bytes` long and contains Control Surface settings:

| Offset  | Format    | Description | Typical Value
| ---:    | ---       | ---         | ---
| 0       | uint32le  | skip (skip # numbers for the next control's name)
| 4       | uint32le  | flags <br>Bit 0: edit<br>Bit 1: hide buttons<br>Bit 2: hide labels
| 8       | uint32le  | grid size

The rest of the data is typically set to `0x00`.

<div id="2002-surface-dimensions"></div><!-- alias: 2002-surface-dimensions -->

#### 2002 - Surface Dimensions

This event is typically `8 bytes` long.

| Offset  | Format    | Description
| ---:    | ---       | ---
| 0       | uint32le  | width
| 4       | uint32le  | height

<div id="2003-unknown"></div><!-- alias: 2003-unknown -->

#### 2003 - unknown

This event is typically `4 bytes` long.

| Offset  | Format    | Description | Typical Value
| ---:    | ---       | ---         | ---
| 0       | uint32le  | unknown     | `0x02 00 00 00`

<div id="2100-start-control"></div><!-- alias: 2100-start-control -->

#### 2100 - Start Control

This event is typically `32 bytes` long.

| Offset  | Format    | Description | Typical Value
| ---:    | ---       | ---         | ---
| 0       | uint32le  | control type

The rest of the data is typically set to `0x00`.

<div id="2101-end-control"></div><!-- alias: 2101-end-control -->

#### 2101 - End Control

This event is typically `0 bytes` long.

<div id="2102-enable-control"></div><!-- alias: 2102-enable-control -->

#### 2102 - Enable Control

This event is typically `12 bytes` long and describes how to expose this control. A Control can have multiple of these events (i.e. X/Y Controllers have two).

| Offset  | Format    | Description | Typical Value
| ---:    | ---       | ---         | ---
| 0       | float32le | current value
| 4       | float32le | default value
| 8       | uint32le  | list index

<div id="2103-control-name"></div><!-- alias: 2103-control-name -->

#### 2103 - Control Name

The value of this event is a `utf-16le` string.

<div id="2104-control-dimensions"></div><!-- alias: 2104-control-dimensions -->

#### 2104 - Control Dimensions

This event is typically `16 bytes` long and describes the position and size of the control.

| Offset  | Format    | Description | Typical Value
| ---:    | ---       | ---         | ---
| 0       | float32le | x center coordinate
| 4       | float32le | y center coordinate
| 8       | float32le | width
| 12      | float32le | height

<div id="2105-ilcontrol"></div><!-- alias: 2105-ilcontrol -->

#### 2105 - ILControl

The value of this event is a `utf-16le` string. It typically contains all the definitons a `.ilcontrol` file contains.

<div id="2106-ilcontrol-colors"></div><!-- alias: 2106-ilcontrol-colors -->

#### 2106 - ILControl, Colors

The value of this event is a `utf-16le` string. It typically contains the color definitions from the ILControl event.

<div id="2107-ilcontrol-properties"></div><!-- alias: 2107-ilcontrol-properties -->

#### 2107 - ILControl, Properties

The value of this event is a `utf-16le` string. It typically contains the property definitions from the ILControl event.


---

*transformed Javadoc from src/control-surface-control-type.ts*

<div id="type-flcsscontroltypename-keyof-typeof-flcsscontroltyperaw"></div><!-- alias: flcsscontroltypename -->

## `type FLCSSControlTypeName = keyof typeof FLCSSControlTypeRaw`


Known control type names.


<div id="type-flcsscontroltypeid-typeof-flcsscontroltyperaw-flcsscontroltypename"></div><!-- alias: flcsscontroltypeid -->

## `type FLCSSControlTypeId = typeof FLCSSControlTypeRaw[FLCSSControlTypeName]`


Known control type IDs.


<div id="const-flcsscontroltype"></div><!-- alias: flcsscontroltype -->

## `const FLCSSControlType =`


Types of controls in a [FLCSSStartControlEvent **&#x1f875;**](#class-flcssstartcontrolevent-extends-flcssevent).


<div id="name-id-number-flcsscontroltypename-unknown"></div><!-- alias: name -->

### `name: (id: number): FLCSSControlTypeName | 'unknown' =>`


Returns the name of a given control type ID, or `'unknown'`.
- *param* `id` &mdash; Control type ID.


<div id="byname-name-string-flcsscontroltypeid-undefined"></div><!-- alias: byname -->

### `byName: (name: string): FLCSSControlTypeId | undefined =>`


Returns the ID for a given control type name, or `undefined`
- *param* `name` &mdash; Control type name.




---

*transformed Javadoc from src/control-surface-control.ts*

<div id="class-flcsscontrol-extends-flcsseventgroup"></div><!-- alias: flcsscontrol -->

## `class FLCSSControl extends FLCSSEventGroup`


Class representing a control on the surface. Extends [FLCSSEventGroup **&#x1f875;**](#class-flcsseventgroup).


<div id="start-flcssstartcontrolevent"></div><!-- alias: start -->

### `start?: FLCSSStartControlEvent`


Start event.


<div id="end-flcssevent"></div><!-- alias: end -->

### `end?: FLCSSEvent`


End event.


<div id="enable-flcssenablecontrolevent"></div><!-- alias: enable -->

### `enable?: FLCSSEnableControlEvent[]`


Enable events.


<div id="name-flcssstringevent"></div><!-- alias: name -->

### `name?: FLCSSStringEvent`


Name event.


<div id="dimensions-flcsscontroldimensionsevent"></div><!-- alias: dimensions -->

### `dimensions?: FLCSSControlDimensionsEvent`


Dimension event.


<div id="ilcontrol-flcsscontroldefinitionsevent"></div><!-- alias: ilcontrol -->

### `ILControl?: FLCSSControlDefinitionsEvent`


ILControl event.


<div id="colors-flcsscontroldefinitionsevent"></div><!-- alias: colors -->

### `colors?: FLCSSControlDefinitionsEvent`


Color event.


<div id="properties-flcsscontroldefinitionsevent"></div><!-- alias: properties -->

### `properties?: FLCSSControlDefinitionsEvent`


Properties event.




---

*transformed Javadoc from src/control-surface-event-group.ts*

<div id="class-flcsseventgroup"></div><!-- alias: flcsseventgroup -->

## `class FLCSSEventGroup`


Class representing a group of [FLCSSEvent **&#x1f875;**](#abstract-class-flcssevent)s.


<div id="geteventoftype-t-extends-flcssevent-type-flcsseventtypeid-t-undefined"></div><!-- alias: geteventoftype -->

### `getEventOfType<T extends FLCSSEvent>(type: FLCSSEventTypeId): T|undefined`


Returns the first event in this group of given type id.
- *param* `type` &mdash; [FLCSSEventTypeId **&#x1f875;**](#type-flcsseventtypeid-typeof-flcsseventtyperaw-flcsseventtypename)


<div id="geteventoftypename-t-extends-flcssevent-type-flcsseventtypename-t-undefined"></div><!-- alias: geteventoftypename -->

### `getEventOfTypeName<T extends FLCSSEvent>(type: FLCSSEventTypeName): T|undefined`


Returns the first event in this group of given type name.
- *param* `type` &mdash; [FLCSSEventTypeName **&#x1f875;**](#type-flcsseventtypename-keyof-typeof-flcsseventtyperaw)


<div id="geteventsoftype-t-extends-flcssevent-type-flcsseventtypeid-t-undefined"></div><!-- alias: geteventsoftype -->

### `getEventsOfType<T extends FLCSSEvent>(type: FLCSSEventTypeId): T[]|undefined`


Returns all events in this group of given type id.
- *param* `type` &mdash; [FLCSSEventTypeId **&#x1f875;**](#type-flcsseventtypeid-typeof-flcsseventtyperaw-flcsseventtypename)


<div id="geteventsoftypename-t-extends-flcssevent-type-flcsseventtypename-t-undefined"></div><!-- alias: geteventsoftypename -->

### `getEventsOfTypeName<T extends FLCSSEvent>(type: FLCSSEventTypeName): T[]|undefined`


Returns all events in this group of given type name.
- *param* `type` &mdash; [FLCSSEventTypeName **&#x1f875;**](#type-flcsseventtypename-keyof-typeof-flcsseventtyperaw)


<div id="getevents-flcssevent"></div><!-- alias: getevents -->

### `getEvents(): FLCSSEvent[]`


Returns the [FLCSSEvent **&#x1f875;**](#abstract-class-flcssevent)s making up this group.


<div id="setevents-events-flcssevent"></div><!-- alias: setevents -->

### `setEvents(events: FLCSSEvent[])`


Sets the [FLCSSEvent **&#x1f875;**](#abstract-class-flcssevent)s making up this group.




---

*transformed Javadoc from src/control-surface-event-type.ts*

<div id="type-flcsseventtypename-keyof-typeof-flcsseventtyperaw"></div><!-- alias: flcsseventtypename -->

## `type FLCSSEventTypeName = keyof typeof FLCSSEventTypeRaw`


Known event names.


<div id="type-flcsseventtypeid-typeof-flcsseventtyperaw-flcsseventtypename"></div><!-- alias: flcsseventtypeid -->

## `type FLCSSEventTypeId = typeof FLCSSEventTypeRaw[FLCSSEventTypeName]`


Known event IDs.


<div id="const-flcsseventtype"></div><!-- alias: flcsseventtype -->

## `const FLCSSEventType =`


Types of the events in an [FLCSSEventGroup **&#x1f875;**](#class-flcsseventgroup).


<div id="name-id-number-flcsseventtypename-unknown"></div><!-- alias: name -->

### `name: (id: number): FLCSSEventTypeName | 'unknown' =>`


Returns the name of a given event ID, or `'unknown'`.
- *param* `id` &mdash; Event ID.


<div id="byname-name-string-flcsseventtypeid-undefined"></div><!-- alias: byname -->

### `byName: (name: string): FLCSSEventTypeId | undefined =>`


Returns the ID for a given event name, or `undefined`
- *param* `name` &mdash; Event name.




---

*transformed Javadoc from src/control-surface-event.ts*

<div id="abstract-class-flcssevent"></div><!-- alias: flcssevent -->

## `abstract class FLCSSEvent`


Base class for state events.


<div id="type-number"></div><!-- alias: type -->

### `type: number`


Numeric [FLCSSEventType **&#x1f875;**](#const-flcsseventtype).


<div id="get-typename"></div><!-- alias: get-typename -->

### `get typeName()`


Name of [FLCSSEventType **&#x1f875;**](#const-flcsseventtype). Readonly.


<div id="abstract-getbinary-arraybuffer"></div><!-- alias: getbinary -->

### `abstract getBinary(): ArrayBuffer`


Returns this event's binary data.


<div id="abstract-setbinary-buffer-arraybuffer-void"></div><!-- alias: setbinary -->

### `abstract setBinary(buffer: ArrayBuffer): void`


Sets this event's binary data.
- *param* `buffer` &mdash; Binary data.


<div id="class-flcssbinaryevent-extends-flcssevent"></div><!-- alias: flcssbinaryevent -->

## `class FLCSSBinaryEvent extends FLCSSEvent`


Event with unspecified binary data.


<div id="class-flcssstringevent-extends-flcssevent"></div><!-- alias: flcssstringevent -->

## `class FLCSSStringEvent extends FLCSSEvent`


Event with string value data.


<div id="class-flcssstartcontrolevent-extends-flcssevent"></div><!-- alias: flcssstartcontrolevent -->

## `class FLCSSStartControlEvent extends FLCSSEvent`


Event starting a new [FLCSSControl **&#x1f875;**](#class-flcsscontrol-extends-flcsseventgroup)


<div id="class-flcssenablecontrolevent-extends-flcssevent"></div><!-- alias: flcssenablecontrolevent -->

## `class FLCSSEnableControlEvent extends FLCSSEvent`


Describes how a control is exposed. Enabled controls will have at least one of these events.


<div id="function-createevent-type-number-buffer-arraybuffer"></div><!-- alias: createevent -->

## `function createEvent(type: number, buffer?: ArrayBuffer)`


Factory function to create a new specific FLCSSEvent.
- *param* `type` &mdash; FLCSSEventType.
- *param* `value` &mdash; Binary data for this event.




---

*transformed Javadoc from src/control-surface-options.ts*

<div id="class-flcssoptions-extends-flcsseventgroup"></div><!-- alias: flcssoptions -->

## `class FLCSSOptions extends FLCSSEventGroup`


Class representing control surface options. Extends [FLCSSEventGroup **&#x1f875;**](#class-flcsseventgroup).


<div id="settings-flcsssettingsevent"></div><!-- alias: settings -->

### `settings?: FLCSSSettingsEvent`


Settings event.


<div id="dimensions-flcssdimensionsevent"></div><!-- alias: dimensions -->

### `dimensions?: FLCSSDimensionsEvent`


Settings event.




---

*transformed Javadoc from src/control-surface.ts*

<div id="class-flcontrolsurfacestate"></div><!-- alias: flcontrolsurfacestate -->

## `class FLControlSurfaceState`


Class representing an FL Studio Control Surface plugin state.


<div id="version-number-1"></div><!-- alias: version -->

### `version: number = 1`


State version number.


<div id="options-new-flcssoptions"></div><!-- alias: options -->

### `options = new FLCSSOptions()`


Surface options.


<div id="controls-flcsscontrol"></div><!-- alias: controls -->

### `controls: FLCSSControl[] = []`


Controls on this surface.


<div id="getbinary-arraybuffer"></div><!-- alias: getbinary -->

### `getBinary(): ArrayBuffer`


Creates the binary data for this surface and returns it.


<div id="setbinary-buffer-arraybuffer"></div><!-- alias: setbinary -->

### `setBinary(buffer: ArrayBuffer)`


Sets this surface's values from binary data.
- *param* `buffer` &mdash; Binary data.


