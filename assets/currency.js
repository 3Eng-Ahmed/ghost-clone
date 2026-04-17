class FakeSelect extends HTMLElement {
  constructor() {
    super();
    
    // Select the necessary elements inside our custom tag
    this.toggleBtn = this.querySelector('[data-dropdown-action="toggle-dropdown"]');
    this.dropdown = this.querySelector('[data-dropdown]');
    this.rotateIcon = this.querySelector('[data-rotate]');
    this.options = this.querySelectorAll('[data-dropdown-action="url"]');
    
    // Bind the functions so 'this' refers to the custom element
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
  }

  // This runs automatically when the element is loaded on the page
  connectedCallback() {
    // 1. Listen for clicks on the main button
    this.toggleBtn.addEventListener('click', this.toggleDropdown);

    // 2. Listen for clicks on the country options (Redirection)
    this.options.forEach(option => {
      option.addEventListener('click', (e) => {
        e.preventDefault();
        const url = option.getAttribute('data-value');
        if (url) window.location.href = url; // Redirect to the selected store
      });
    });

    // 3. Close the dropdown if the user clicks anywhere else on the page
    document.addEventListener('click', (e) => {
      if (!this.contains(e.target)) {
        this.closeDropdown();
      }
    });
    
    // Make sure dropdown is hidden initially
    this.closeDropdown();
  }

  toggleDropdown(e) {
    if (e) e.preventDefault();
    
    const isExpanded = this.toggleBtn.getAttribute('aria-expanded') === 'true';
    
    if (isExpanded) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  openDropdown() {
    this.toggleBtn.setAttribute('aria-expanded', 'true');
    this.toggleBtn.classList.add('open');
    
    // Show dropdown and animate arrow up
    this.dropdown.style.height = '185px'; // Matches your inline style
    this.dropdown.style.opacity = '1';
    this.dropdown.style.pointerEvents = 'auto';
    this.rotateIcon.style.transform = 'rotate(0deg)';
  }

  closeDropdown() {
    this.toggleBtn.setAttribute('aria-expanded', 'false');
    this.toggleBtn.classList.remove('open');
    
    // Hide dropdown and animate arrow down
    this.dropdown.style.height = '0px'; 
    this.dropdown.style.opacity = '0';
    this.dropdown.style.pointerEvents = 'none';
    this.rotateIcon.style.transform = 'rotate(-180deg)';
  }
}

// Tell the browser that <fake-select> is a real element
customElements.define('fake-select', FakeSelect);