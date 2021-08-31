const template = document.createElement("template");
template.innerHTML = /*html*/`
  <style>
    :host {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      height: var(--infini-scroll-container-height, 140px);
      width: 100%;
      overflow-x: scroll;
      scrollbar-width: none;
    }

    :host::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  </style>
  <slot></slot>
`;

export class InfiniScroll extends HTMLElement {
  get scrollGap() {
    return parseFloat(this.getAttribute("scroll-gap")) || 170;
  }

  set scrollGap(v) {
    this.setAttribute("scroll-gap", v);
  }

  get rowAmount() {
    return parseFloat(this.getAttribute("row-amount")) || 2;
  }

  set rowAmount(v) {
    this.setAttribute("row-amount", v);
  }

  get scrollSpeed() {
    return parseFloat(this.getAttribute("scroll-speed")) || 0.5;
  }

  set scrollSpeed(v) {
    this.setAttribute("scroll-speed", v);
  }

  get timeTillResume() {
    return parseFloat(this.getAttribute("time-till-resume")) || 2000;
  }

  set timeTillResume(v) {
    this.setAttribute("time-till-resume", v);
  }

  get dragSpeed() {
    return parseFloat(this.getAttribute("drag-speed")) || 4;
  }

  set dragSpeed(v) {
    this.setAttribute("drag-speed", v);
  }

  get reverse() {
    return this.hasAttribute("reverse");
  }

  set reverse(v) {
    if (v) {
      this.setAttribute("reverse", "");
    } else {
      this.removeAttribute("reverse");
    }
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Defaults, but configurable
    this.initialBoxLength = this.children.length;
    this.oldPos = this.scrollLeft;
    this.scrollByJS = false;
    this.xDiff = 0;
    this.interval;
    this.timeout;
    this.boundWheelHandler = this.wheelHandler.bind(this);
    this.boundScrollHandler = this.scrollHandler.bind(this);
    this.boundMouseUpHandler = this.mouseUpHandler.bind(this);
    this.boundMouseDownHandler = this.mouseDownHandler.bind(this);
    this.boundMouseMoveHandler = this.mouseMoveHandler.bind(this);
  }

  connectedCallback() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.addEventListener("wheel", this.boundWheelHandler);
    this.addEventListener("scroll", this.boundScrollHandler);
    window.addEventListener("mouseup", this.boundMouseUpHandler);
    this.addEventListener("mousedown", this.boundMouseDownHandler);
    window.addEventListener("mousemove", this.boundMouseMoveHandler);
    this.startInterval();

    // Initially reverse direction gets stuck if last elements are not prepended
    // making it impossible to scroll back
    if (this.reverse && this.scrollLeft < this.scrollGap) {
      this.scrollDownHandler();
    }
  }

  disconnectedCallback() {
    this.removeEventListener("wheel", this.boundWheelHandler);
    this.removeEventListener("scroll", this.boundScrollHandler);
    window.removeEventListener("mouseup", this.boundMouseUpHandler);
    this.removeEventListener("mousedown", this.boundMouseDownHandler);
    window.removeEventListener("mousemove", this.boundMouseMoveHandler);
  }

  autoScroll() {
    if (this.reverse) {
      this.scrollLeft -= this.scrollSpeed;
    } else {
      this.scrollLeft += this.scrollSpeed;
    }
  }

  startInterval() {
    this.interval = setInterval(this.autoScroll.bind(this));
  }

  startTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.startInterval();
    }, this.timeTillResume);
  }

  wheelHandler(ev) {
    if (ev.shiftKey) {
      clearInterval(this.interval);
      this.startTimeout();
    }
  }

  scrollUpHandler() {
    const boxes = Array.from(this.children);
    Array(this.rowAmount)
      .fill("")
      .forEach((v, index) => {
        this.appendChild(boxes[index]);
      });
    this.scrollByJS = true;
    this.scrollLeft -= this.scrollGap;
  }

  scrollDownHandler() {
    const boxes = Array.from(this.children);
    Array(this.rowAmount)
      .fill("")
      .forEach((v, index) => {
        this.prepend(boxes[boxes.length - (index + 1)]);
      });
    this.scrollByJS = true;
    this.scrollLeft += this.scrollGap;
  }

  scrollHandler(ev) {
    if (this.scrollByJS) {
      this.scrollByJS = false;
      return;
    }
    const scrollingUp = this.scrollLeft > this.oldPos;
    if (scrollingUp && this.scrollLeft > this.scrollGap * 2) {
      this.scrollUpHandler();
    } else if (this.scrollLeft < this.scrollGap) {
      this.scrollDownHandler();
    }
    this.oldPos = this.scrollLeft;
  }

  dragHandler() {
    if (!this.dragging) {
      return;
    }
    clearInterval(this.interval);
    this.startTimeout();
    this.scrollLeft -= this.xDiff * this.dragSpeed;
    this.xDiff = 0;
    requestAnimationFrame(this.dragHandler.bind(this));
  }

  mouseUpHandler(ev) {
    this.dragging = false;
  }

  mouseDownHandler(ev) {
    ev.preventDefault();
    this.oldMousePosX = ev.clientX;
    this.dragging = true;
    this.dragHandler();
  }

  mouseMoveHandler(ev) {
    if (!this.dragging) {
      return;
    }
    this.xDiff = ev.clientX - this.oldMousePosX;
    this.oldMousePosX = ev.clientX;
  }
}
