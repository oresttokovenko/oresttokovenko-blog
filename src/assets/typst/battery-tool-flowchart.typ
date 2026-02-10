#import "src/assets/typst/const.typ": accent, body-font

#set page(width: auto, height: auto, margin: 1em)
#set text(size: 10pt, fill: accent, font: body-font)
#show raw: set text()
#import "@preview/fletcher:0.5.8" as fletcher: diagram, edge, node
#import fletcher.shapes: diamond

#diagram(
  node-stroke: 0.8pt + accent,
  node-fill: none,
  spacing: (1.5em, 1.8em),
  edge-stroke: 0.8pt + accent,

  node((0, 0), [Start], corner-radius: 2pt, extrude: (0, 3)),
  edge("-|>"),
  node((0, 1), align(center)[Charger \ connected?], shape: diamond),
  edge((0, 1), (1.8, 1), "-|>", [No]),
  node((1.8, 1), [Exit], corner-radius: 2pt, extrude: (0, 3)),
  edge((0, 1), (0, 2), "-|>", [Yes]),
  node(
    (0, 2),
    align(center)[Check battery \ health & percentage],
    corner-radius: 2pt,
  ),
  edge("-|>"),
  node((0, 3), align(center)[Health \ <= 79%?], shape: diamond),
  edge((0, 3), (1.8, 3), "-|>", [Yes]),
  node(
    (1.8, 3),
    align(center)[Re-enable charging \ & exit],
    corner-radius: 2pt,
    extrude: (0, 3),
  ),
  edge((0, 3), (0, 4), "-|>", [No]),
  node((0, 4), align(center)[Percentage > 95%?], shape: diamond),
  edge((0, 4), (1.8, 4), "-|>", [Yes]),
  node((1.8, 4), align(center)[Disable charging \ via SMC], corner-radius: 2pt),
  edge((0, 4), (0, 5), "-|>", [No]),
  node((0, 5), align(center)[Percentage < 5%?], shape: diamond),
  edge((0, 5), (1.8, 5), "-|>", [Yes]),
  node((1.8, 5), align(center)[Enable charging \ via SMC], corner-radius: 2pt),
  edge((0, 5), (0, 6), "-|>", [No]),
  node((0, 6), align(center)[Sleep 60s], corner-radius: 2pt),
  edge((0, 6), (-1.5, 6), (-1.5, 2), (0, 2), "-|>"),
)
