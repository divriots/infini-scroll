# Infini Scroll

Webcomponent that infinitely scrolls through a list of nodes in horizontal direction.

0 dependencies, 150 lines of JS

## Features

- Scrolls infinitely by moving nodes in DOM when needed
- Horizontal scroll (shift + mousewheel) interrupts the auto scroll and allows user control
- Click drag interrupts the auto scroll and allows user control
- Mobile drag gesture interrupts the auto scroll and allows user control

## Attributes

- `container-height`, 150 by default. Set this to the total height of one or multiple nodes in case you want multiple rows, in pixels.
- `box-width`, 150 by default. Set this to the total width in pixels (including margin, border etc.) of one node.
- `row-amount`, 2 by default, but you may want only 1 row. Make sure to adjust this along with the `--infini-scroll-container-height` css prop so that the amount of rows does fit in the container height.
- `scroll-interval`, 1 by default, interval in milliseconds to scroll
- `scroll-amount`, 1 by default, amount of pixels to scroll per interval, Firefox does not support floating numbers here!
- `resume-time`, 2000 by default time until resuming the auto scroll after user interaction has stopped
- `drag-speed`, default 4, increase to make dragging slide the list faster
- `reverse`, auto scroll goes in reverse direction

## Future

- Allow box width to be dynamic (vary per box, compute automatically), remove box-width attr
- Make click drag play well with velocity and release, similar to native mobile drag gestures