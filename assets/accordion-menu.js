class Accordion extends HTMLElement {
  constructor() {
    super();
    this.toggleAcc = this.toggleAcc.bind(this);
  }

  connectedCallback() {
    this.accHead = this.querySelector(".acc-header");
    this.accButton = this.querySelector(".chev-icon");
    this.accBody = this.querySelector(".acc-body");

    this.accHead?.addEventListener("click", this.toggleAcc);
  }

  disconnectedCallback() {
    this.accHead?.removeEventListener("click", this.toggleAcc);
  }

  toggleAcc() {
    const isExpanded = this.accHead.getAttribute("aria-expanded") === "true";
    isExpanded ? this.close() : this.open();
  }

  open() {
    this.accBody?.classList.replace("h-0", "h-50");
    this.accBody?.classList.replace("opacity-0", "opacity-100");
    this.accButton?.classList.add("rotate-180");
    
    this.accHead.setAttribute("aria-expanded", "true");
    this.accBody.setAttribute("aria-hidden", "false");
  }

  close() {
    this.accBody?.classList.replace("h-50", "h-0");
    this.accBody?.classList.replace("opacity-100", "opacity-0");
    this.accButton?.classList.remove("rotate-180");

    this.accHead.setAttribute("aria-expanded", "false");
    this.accBody.setAttribute("aria-hidden", "true");
  }
}

customElements.define("accordion-menu", Accordion);