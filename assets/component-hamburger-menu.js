class HamburgerMenu extends HTMLElement {
  constructor() {
    super()

    this.hamIcon = document.querySelector(".ham-icon")
    this.overlay = document.querySelector(".hamburger-overlay")
    this.closeIcon = this.querySelector('.icon-close')

    this.handleOpen = () => this.openDrawer()
    this.handleClose = () => this.closeDrawer()
    this.handleKeyDown = (e) => {
      if (e.key === 'Escape') this.closeDrawer()
    }
  }

  connectedCallback() {
    this.hamIcon?.addEventListener("click", this.handleOpen)
    this.overlay?.addEventListener("click", this.handleClose)
    this.closeIcon?.addEventListener("click", this.handleClose)
    document.addEventListener("keydown", this.handleKeyDown)

this.btn = this.querySelector(".open-cart");

// 1. Create the 'envelope' (the Event object)
this.openCartEvent = new Event("openDrawer");

this.btn.addEventListener("click", () => {
  // 2. Dispatch the OBJECT (this.openCartEvent), NOT the string "openDrawer"
  this.closeDrawer()
  document.dispatchEvent(this.openCartEvent);
});

    
  }

  disconnectedCallback() {
    this.hamIcon?.removeEventListener("click", this.handleOpen)
    this.overlay?.removeEventListener("click", this.handleClose)
    this.closeIcon?.removeEventListener("click", this.handleClose)
    document.removeEventListener("keydown", this.handleKeyDown)
  }

  openDrawer() {
    this.classList.remove('-translate-x-full')
    this.overlay?.classList.remove('opacity-0', 'pointer-events-none')
    this.setAttribute('aria-hidden', 'false')
    document.body.style.overflow = 'hidden';
  }

  closeDrawer() {
    this.classList.add('-translate-x-full')
    this.overlay?.classList.add('opacity-0', 'pointer-events-none')
    this.setAttribute('aria-hidden', 'true')
    document.body.style.overflow = '';
  }
}

customElements.define('hamburger-menu', HamburgerMenu)