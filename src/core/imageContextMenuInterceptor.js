export class ImageContextMenuInterceptor {
    constructor(onTranslateRequested) {
        this.onTranslateRequested = onTranslateRequested;
        this.menuContainer = null;
        this.currentTargetImage = null;

        // Binding context to preserve 'this' when used as DOM event listeners
        this.handleContextMenu = this.handleContextMenu.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
        this.handleTranslateClick = this.handleTranslateClick.bind(this);
    }

    attachListeners() {
        document.addEventListener('contextmenu', this.handleContextMenu);
        document.addEventListener('click', this.handleDocumentClick);
    }

    handleContextMenu(event) {
        if (event.target.tagName.toLowerCase() !== 'img') {
            return;
        }

        event.preventDefault();
        this.currentTargetImage = event.target;
        this.renderMenu(event.pageX, event.pageY);
    }

    handleDocumentClick(event) {
        if (this.menuContainer && !this.menuContainer.contains(event.target)) {
            this.destroyMenu();
        }
    }

    handleTranslateClick() {
        if (this.currentTargetImage && this.onTranslateRequested) {
            this.onTranslateRequested(this.currentTargetImage);
        }
        this.destroyMenu();
    }

    renderMenu(x, y) {
        this.destroyMenu();

        this.menuContainer = document.createElement('div');
        this.menuContainer.style.cssText = `
      position: absolute;
      top: ${y}px;
      left: ${x}px;
      background: #282c34;
      color: #ffffff;
      padding: 8px 12px;
      border-radius: 4px;
      font-family: sans-serif;
      font-size: 14px;
      cursor: pointer;
      z-index: 999999;
      box-shadow: 0 4px 6px rgba(0,0,0,0.3);
    `;
        this.menuContainer.textContent = 'Перевести фото (GlyphSwap)';
        this.menuContainer.addEventListener('click', this.handleTranslateClick);

        document.body.appendChild(this.menuContainer);
    }

    destroyMenu() {
        if (this.menuContainer) {
            this.menuContainer.remove();
            this.menuContainer = null;
        }
        this.currentTargetImage = null;
    }
}