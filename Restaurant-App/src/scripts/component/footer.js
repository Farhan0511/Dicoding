class footerElement extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="footer">
                <h2 style="color: #fff;">  © Farhan_Ansyah </h2>
            </div>
        `
    }
}
customElements.define('footer-element', footerElement);
