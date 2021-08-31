# Infini Scroll

Webcomponent that infinitely scrolls through a list of nodes in horizontal direction.

0 dependencies, 150 lines of JS

## Features

- Scrolls infinitely by moving nodes in DOM when needed
- Horizontal scroll (shift + mousewheel) interrupts the auto scroll and allows user control
- Click drag interrupts the auto scroll and allows user control (not as nice as mobile drag gestures, PRs welcome)
- Mobile drag gesture interrupts the auto scroll and allows user control

## Attributes

- `scroll-gap`, 170 by default, you should set this to the total width of one node, including its margin/border.
- `row-amount`, 2 by default, but you may want only 1 row. Make sure to adjust this along with the `--infini-scroll-container-height` css prop so that the amount of rows does fit in the container height.
- `scroll-speed`, 0.5 by default, distance per millisecond scroll
- `time-till-resume`, 2000 by default time until resuming the auto scroll after user interaction has stopped
- `drag-speed`, default 4, increase to make dragging slide the list faster
- `reverse`, auto scroll goes in reverse direction

## Style props

- `--infini-scroll-container-height`, CSS Custom Prop, uses 140px by default. Set this to the total height of one or multiple nodes in case you want multiple rows.
