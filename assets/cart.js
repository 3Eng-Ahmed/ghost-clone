class CartItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.removeBtn = this.querySelector(".remove-item");
    this.addBtn = this.querySelector(".add-item");
    this.reduceBtn = this.querySelector(".reduce-item");
    this.loadingScreen = this.querySelector(".loading");
    
    this.section = document.querySelector(".cart-content");
    this.sectionID = this.section ? this.section.dataset.id : null;

    if (this.addBtn) {
      this.addBtn.addEventListener("click", (e) => {
        this.updateCart(e.target.dataset.quantity);
      });
    }

    if (this.reduceBtn) {
      this.reduceBtn.addEventListener("click", (e) => {
        this.updateCart(e.target.dataset.quantity);
      });
    }

    if (this.removeBtn) {
      this.removeBtn.addEventListener("click", (e) => {
        this.updateCart(e.target.dataset.quantity);
      });
    }
  }

  updateCart(quantity) {
    const key = this.dataset.key;
    const updates = {
      [key]: quantity,
    };

    if (this.loadingScreen) this.loadingScreen.classList.remove("opacity-0");

    fetch(window.Shopify.routes.root + 'cart/update.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ updates })
    })
    .then(response => response.json())
    .then(() => {
      this.renderCart(); 
    })
    .catch((error) => {
      if (this.loadingScreen) this.loadingScreen.classList.add("opacity-0");
      console.error('Error:', error);
    });  
  }

  renderCart() {
    if (!this.sectionID) return;

    fetch(`${window.location.pathname}?section_id=${this.sectionID}`)
      .then(r => r.text())
      .then(html => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        const newContent = doc.querySelector('.cart-content');
        
        if (newContent && this.section) {
          this.section.innerHTML = newContent.innerHTML;
        }
        
        if (this.loadingScreen) this.loadingScreen.classList.add("opacity-0");
      })
      .catch((error) => {
        console.error('Error:', error);
        if (this.loadingScreen) this.loadingScreen.classList.add("opacity-0");
      });
  }
}

customElements.define("cart-item", CartItem);