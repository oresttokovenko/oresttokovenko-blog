#import "src/assets/typst/const.typ": accent, body-font

#set page(width: auto, height: auto, margin: 1em)
#set text(size: 14pt, fill: accent, font: body-font)
#show raw: set text()
$ "Battery Health" = frac("MaxCapacity", "DesignCapacity") times 100% $
