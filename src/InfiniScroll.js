const template = document.createElement("template");
template.innerHTML = /*html*/`
  <style>
    :host {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      height: 150px;
      width: 100%;
      overflow-x: scroll;
      scrollbar-width: none;
    }

    :host::-webkit-scrollbar {
      display: none;
    }
  </style>
  <slot></slot>
`;

export class InfiniScroll extends HTMLElement {
  static get observedAttributes() {
    return ['container-height'];
  }

  get _scrollLeft() {
    return this.scrollLeft;
  }

  set _scrollLeft(v) {
    this.scrollByJS = true;
    this.scrollLeft = v;
  }

  get boxWidth() {
    return parseFloat(this.getAttribute("box-width")) || 150;
  }

  set boxWidth(v) {
    this.setAttribute("box-width", v);
  }

  get containerHeight() {
    return parseFloat(this.getAttribute("container-height")) || 150;
  }

  set containerHeight(v) {
    this.setAttribute("container-height", v);
  }

  get rowAmount() {
    return parseFloat(this.getAttribute("row-amount")) || 1;
  }

  set rowAmount(v) {
    this.setAttribute("row-amount", v);
  }

  get scrollInterval() {
    return parseFloat(this.getAttribute("scroll-interval")) || 1;
  }

  set scrollInterval(v) {
    this.setAttribute("scroll-interval", v);
  }

  get scrollAmount() {
    return parseFloat(this.getAttribute("scroll-amount")) || 1;
  }

  set scrollAmount(v) {
    this.setAttribute("scroll-amount", v);
  }

  get resumeTime() {
    return parseFloat(this.getAttribute("resume-time")) || 2000;
  }

  set resumeTime(v) {
    this.setAttribute("resume-time", v);
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

  get followUserDirection() {
    return this.hasAttribute("follow-user-direction");
  }

  set followUserDirection(v) {
    if (v) {
      this.setAttribute("follow-user-direction", "");
    } else {
      this.removeAttribute("follow-user-direction");
    }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'container-height' && oldVal !== newVal) {
      this.style.setProperty('height', `${newVal}px`);
    }

    if (name === 'reverse' && oldVal !== newVal) {
      this.__direction = this.reverse ? 'right' : 'left';
    }
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.initialBoxLength = this.children.length;
    this.oldPos = this.scrollLeft;
    this.scrollByBoxMove = false;
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
    this.addEventListener("wheel", this.boundWheelHandler, { passive: true });
    this.addEventListener("scroll", this.boundScrollHandler);
    window.addEventListener("mouseup", this.boundMouseUpHandler);
    this.addEventListener("mousedown", this.boundMouseDownHandler);
    window.addEventListener("mousemove", this.boundMouseMoveHandler);
    this.__direction = this.reverse ? 'right' : 'left';
    this.startInterval();

    // Initially reverse direction gets stuck if last elements are not prepended
    // making it impossible to scroll back
    if (this.__direction === 'right' && this.scrollLeft < this.boxWidth) {
      this.boxPrependHandler();
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
    if (this.__direction === 'right') {
      this._scrollLeft -= this.scrollAmount;
    } else {
      this._scrollLeft += this.scrollAmount;
    }
  }

  startInterval() {
    this.interval = setInterval(this.autoScroll.bind(this), this.scrollInterval);
  }

  startTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.startInterval();
    }, this.resumeTime);
  }

  wheelHandler(ev) {
    if (ev.shiftKey) {
      clearInterval(this.interval);
      this.startTimeout();
    }
  }

  boxAppendHandler() {
    const boxes = Array.from(this.children);
    Array(this.rowAmount)
      .fill("")
      .forEach((v, index) => {
        this.appendChild(boxes[index]);
      });
    this.scrollByBoxMove = true;
    this._scrollLeft -= this.boxWidth;
  }

  boxPrependHandler() {
    const boxes = Array.from(this.children);
    Array(this.rowAmount)
      .fill("")
      .forEach((v, index) => {
        this.prepend(boxes[boxes.length - (index + 1)]);
      });
    this.scrollByBoxMove = true;
    this._scrollLeft += this.boxWidth;
  }

  scrollHandler(ev) {
    if (this.scrollByBoxMove) {
      this.scrollByBoxMove = false;
      return;
    }
    const scrollingUp = this._scrollLeft > this.oldPos;
    if (!this.scrollByJS && this.followUserDirection) {
      this.__direction = scrollingUp ? 'left' : 'right';
    }
    if (scrollingUp && this._scrollLeft > this.boxWidth * 2) {
      this.boxAppendHandler();
    } else if (this._scrollLeft < this.boxWidth) {
      this.boxPrependHandler();
    }
    this.oldPos = this._scrollLeft;
    this.scrollByJS = false;
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
