class CartDrawer extends HTMLElement {
  constructor() {
    super()

    this.cartIcon = document.querySelector(".cart-icon")
    this.overlay = document.querySelector(".cart-drawer-overlay")
    this.closeIcon = this.querySelector('.icon-close')

    this.handleOpen = () => this.openDrawer()
    this.handleClose = () => this.closeDrawer()
    this.handleKeyDown = (e) => {
      if (e.key === 'Escape') this.closeDrawer()
    }
  }

  connectedCallback() {
    this.cartIcon?.addEventListener("click", this.handleOpen)
    document.addEventListener("openDrawer", ()=>{
      this.handleOpen()
      
    })
    this.overlay?.addEventListener("click", this.handleClose)
    this.closeIcon?.addEventListener("click", this.handleClose)
    document.addEventListener("keydown", this.handleKeyDown)

  }

  disconnectedCallback() {
    this.cartIcon?.removeEventListener("click", this.handleOpen)
    this.overlay?.removeEventListener("click", this.handleClose)
    this.closeIcon?.removeEventListener("click", this.handleClose)
    document.removeEventListener("keydown", this.handleKeyDown)
  }

  openDrawer() {
    this.classList.remove('translate-x-full')
    this.overlay?.classList.remove('opacity-0', 'pointer-events-none')
    this.setAttribute('aria-hidden', 'false')
    document.body.style.overflow = 'hidden';
  }

  closeDrawer() {
    this.classList.add('translate-x-full')
    this.overlay?.classList.add('opacity-0', 'pointer-events-none')
    this.setAttribute('aria-hidden', 'true')
    document.body.style.overflow = '';
  }
}

customElements.define('cart-drawer', CartDrawer)