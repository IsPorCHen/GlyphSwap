export class ImageHoverWidget {
    constructor(onTranslateRequested) {
        this.onTranslateRequested = onTranslateRequested;
        this.buttonElement = null;
        this.currentHoveredImage = null;

        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    attachListeners() {
        document.addEventListener('mouseover', this.handleMouseOver);
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('scroll', this.handleScroll, { passive: true });
    }

    handleMouseOver(event) {
        if (event.target.tagName && event.target.tagName.toLowerCase() === 'img') {
            this.currentHoveredImage = event.target;
            this.showButtonForImage(this.currentHoveredImage);
        }
    }

    handleMouseMove(event) {
        if (this.buttonElement && this.currentHoveredImage) {
            const isHoveringImage = this.currentHoveredImage.contains(event.target);
            const isHoveringButton = this.buttonElement.contains(event.target);

            if (!isHoveringImage && !isHoveringButton) {
                this.hideButton();
            }
        }
    }

    handleScroll() {
        this.hideButton();
    }

    showButtonForImage(imgElement) {
        if (!this.buttonElement) {
            this.createButton();
        }

        const rect = imgElement.getBoundingClientRect();

        if (rect.width < 50 || rect.height < 50) return;

        this.buttonElement.style.top = `${window.scrollY + rect.top + 8}px`;
        this.buttonElement.style.left = `${window.scrollX + rect.right - 90}px`;
        this.buttonElement.style.display = 'flex';
    }

    createButton() {
        this.buttonElement = document.createElement('div');
        this.buttonElement.textContent = 'A文 Swap';
        this.buttonElement.style.cssText = `
      position: absolute;
      background: rgba(0, 0, 0, 0.7);
      color: #ffffff;
      padding: 6px 10px;
      border-radius: 6px;
      font-family: system-ui, sans-serif;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      z-index: 999999;
      display: none;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s ease;
      backdrop-filter: blur(4px);
    `;

        this.buttonElement.addEventListener('mouseenter', () => {
            this.buttonElement.style.background = 'rgba(0, 0, 0, 0.9)';
        });
        this.buttonElement.addEventListener('mouseleave', () => {
            this.buttonElement.style.background = 'rgba(0, 0, 0, 0.7)';
        });

        this.buttonElement.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (this.currentHoveredImage && this.onTranslateRequested) {
                this.onTranslateRequested(this.currentHoveredImage);
            }
        });

        document.body.appendChild(this.buttonElement);
    }

    hideButton() {
        if (this.buttonElement) {
            this.buttonElement.style.display = 'none';
        }
        this.currentHoveredImage = null;
    }
}