#import "src/assets/typst/const.typ": accent, body-font

#set page(width: auto, height: auto, margin: 1em)
#set text(size: 9pt, fill: accent, font: body-font)

#import "@preview/circuiteria:0.2.0": *

#circuit({
  import element: *
  import wire: *
  import "@preview/cetz:0.3.2": draw
  draw.set-style(stroke: 0.8pt + accent)

  block(
    x: 0,
    y: 0,
    w: 10,
    h: 6,
    id: "smc",
    ports: (
      west: (
        (id: "ch0b", name: text(fill: accent)[`CH0B`]),
        (id: "ch0c", name: text(fill: accent)[`CH0C`]),
        (id: "ch0i", name: text(fill: accent)[`CH0I`]),
        (id: "ch0k", name: text(fill: accent)[`CH0K`]),
        (id: "wdots", name: text(fill: accent)[...]),
      ),
      east: (
        (id: "tb0t", name: text(fill: accent)[`TB0T`]),
        (id: "b0rm", name: text(fill: accent)[`B0RM`]),
        (id: "b0fc", name: text(fill: accent)[`B0FC`]),
        (id: "b0ct", name: text(fill: accent)[`B0CT`]),
        (id: "edots", name: text(fill: accent)[...]),
      ),
      north: (
        (id: "sbav", name: text(fill: accent)[`SBAV`]),
        (id: "sba1", name: text(fill: accent)[`SBA1`]),
        (id: "ndots1", name: text(fill: accent)[...]),
        (id: "id0r", name: text(fill: accent)[`ID0R`]),
        (id: "vd0r", name: text(fill: accent)[`VD0R`]),
      ),
      south: (
        (id: "sbas", name: text(fill: accent)[`SBAS`]),
        (id: "sbar", name: text(fill: accent)[`SBAR`]),
        (id: "sdots1", name: text(fill: accent)[...]),
        (id: "pdtr", name: text(fill: accent)[`PDTR`]),
        (id: "d1in", name: text(fill: accent)[`D1in`]),
      ),
    ),
    stroke: 0.8pt + accent,
    fill: none,
  )

  stub("smc-port-ch0b", "west", name: text(
    size: 7pt,
    fill: accent,
  )[Disable charging])
  stub("smc-port-ch0c", "west", name: text(
    size: 7pt,
    fill: accent,
  )[Inhibit charging])
  stub("smc-port-ch0i", "west", name: text(
    size: 7pt,
    fill: accent,
  )[Force discharge])
  stub("smc-port-ch0k", "west", name: text(
    size: 7pt,
    fill: accent,
  )[Charging control])
  stub("smc-port-tb0t", "east", name: text(
    size: 7pt,
    fill: accent,
  )[Battery temp])
  stub("smc-port-b0rm", "east", name: text(
    size: 7pt,
    fill: accent,
  )[Remaining mAh])
  stub("smc-port-b0fc", "east", name: text(
    size: 7pt,
    fill: accent,
  )[Full charge mAh])
  stub("smc-port-b0ct", "east", name: text(
    size: 7pt,
    fill: accent,
  )[Cycle count])
  stub("smc-port-sbav", "north")
  stub("smc-port-sba1", "north")
  stub("smc-port-id0r", "north")
  stub("smc-port-vd0r", "north")
  stub("smc-port-sbas", "south")
  stub("smc-port-sbar", "south")
  stub("smc-port-pdtr", "south")
  stub("smc-port-d1in", "south")
})
