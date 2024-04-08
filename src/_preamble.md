# @holzchopf/flstudio-control-surface

Allows to read and write FL Studio Control Surface states. The main goal of this package is to modify Control Surface states, thus all the raw data loaded from a state is preserved and all property getters/setters access the raw data.

## The state format

The state consists of a header, followed by body consisting of a variable number of events. I chose the name event because the official documentation for the `.flp` file format - which used a similar "event" based approach - called those data packages events.

### State header

The header typically `4 bytes` long. Probably indicating the format version, it is usually the number `1` stored as `uint32le`

| Offset  | Format    | Description | Typical Value
| ---:    | ---       | ---         | ---
| 0       | uint32le  | version     | `0x01 00 00 00`

### State body

The body is of variable length and consists of events. Each event has this structure:

| Offset  | Format    | Description | Typical Value
| ---:    | ---       | ---         | ---
| 0       | uint32le  | type
| 4       | uint64le  | size (byte) of event data
| 12      | -         | event data

### Events

All events can be grouped into Control Surface options (types 20xx) or controls (types 21xx). Listed here are event types typically found:

#### 2000 - Surface Settings

This event is typically `64 bytes` long and contains Control Surface settings:

| Offset  | Format    | Description | Typical Value
| ---:    | ---       | ---         | ---
| 0       | uint32le  | skip (skip # numbers for the next control's name)
| 4       | uint32le  | flags <br>Bit 0: edit<br>Bit 1: hide buttons<br>Bit 2: hide labels
| 8       | uint32le  | grid size

The rest of the data is typically set to `0x00`.

#### 2002 - Surface Dimensions

This event is typically `8 bytes` long.

| Offset  | Format    | Description
| ---:    | ---       | ---
| 0       | uint32le  | width
| 4       | uint32le  | height

#### 2003 - unknown

This event is typically `4 bytes` long.

| Offset  | Format    | Description | Typical Value
| ---:    | ---       | ---         | ---
| 0       | uint32le  | unknown     | `0x02 00 00 00`

#### 2100 - Start Control

This event is typically `32 bytes` long.

| Offset  | Format    | Description | Typical Value
| ---:    | ---       | ---         | ---
| 0       | uint32le  | control type

The rest of the data is typically set to `0x00`.

#### 2101 - End Control

This event is typically `0 bytes` long.

#### 2102 - Enable Control

This event is typically `12 bytes` long and describes how to expose this control. A Control can have multiple of these events (i.e. X/Y Controllers have two).

| Offset  | Format    | Description | Typical Value
| ---:    | ---       | ---         | ---
| 0       | float32le | current value
| 4       | float32le | default value
| 8       | uint32le  | list index

#### 2103 - Control Name

The value of this event is a `utf-16le` string.

#### 2104 - Control Dimensions

This event is typically `16 bytes` long and describes the position and size of the control.

| Offset  | Format    | Description | Typical Value
| ---:    | ---       | ---         | ---
| 0       | float32le | x center coordinate
| 4       | float32le | y center coordinate
| 8       | float32le | width
| 12      | float32le | height

#### 2105 - ILControl

The value of this event is a `utf-16le` string. It typically contains all the definitons a `.ilcontrol` file contains.

#### 2106 - ILControl, Colors

The value of this event is a `utf-16le` string. It typically contains the color definitions from the ILControl event.

#### 2107 - ILControl, Properties

The value of this event is a `utf-16le` string. It typically contains the property definitions from the ILControl event.
