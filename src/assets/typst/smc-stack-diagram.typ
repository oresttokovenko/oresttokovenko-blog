#import "src/assets/typst/const.typ": accent, body-font

#set page(width: auto, height: auto, margin: 1em)
#set text(size: 9pt, fill: accent, font: body-font)
#show raw: set text()
#import "@preview/fletcher:0.5.8" as fletcher: diagram, edge, node

#diagram(
  node-stroke: 0.8pt + accent,
  node-fill: none,
  spacing: (2em, 1.6em),
  edge-stroke: 0.8pt + accent,

  node(
    (0, 0),
    [*User Space* \ `battery-tool` (Python CLI)],
    corner-radius: 2pt,
    width: 16em,
  ),
  edge("-|>"),
  node(
    (0, 1),
    [*CFFI* \ C Foreign Function Interface],
    corner-radius: 2pt,
    width: 16em,
  ),
  edge("-|>"),
  node(
    (0, 2),
    [*Framework* \ `IOKit` (user-space API)],
    corner-radius: 2pt,
    width: 16em,
  ),
  edge("-|>"),
  node(
    (0, 3),
    [*Kernel* \ `IOKit.framework` / `AppleSMC.kext`],
    corner-radius: 2pt,
    width: 16em,
  ),
  edge("-|>"),
  node(
    (0, 4),
    [*Firmware* \ SMC (Always On Processor)],
    corner-radius: 2pt,
    width: 16em,
  ),
  edge("-|>"),
  node(
    (0, 5),
    [*Hardware* \ Battery / Charging Circuit],
    corner-radius: 2pt,
    width: 16em,
  ),

  node(
    (1.4, 0),
    text(size: 8pt, fill: accent)[calls into C via CFFI bindings],
    stroke: none,
  ),
  node(
    (1.4, 1),
    text(size: 8pt, fill: accent)[declares and calls `IOKit` functions],
    stroke: none,
  ),
  node(
    (1.4, 2),
    text(size: 8pt, fill: accent)[`IOServiceGetMatchingService()`],
    stroke: none,
  ),
  node(
    (1.4, 3),
    text(size: 8pt, fill: accent)[kernel reads/writes SMC keys],
    stroke: none,
  ),
  node(
    (1.4, 4),
    text(size: 8pt, fill: accent)[`CH0B`, `CH0C`, `CH0I` registers],
    stroke: none,
  ),
  node(
    (1.4, 5),
    text(size: 8pt, fill: accent)[enable/disable charge flow],
    stroke: none,
  ),
)
