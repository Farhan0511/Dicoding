class navElement extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
         
            <nav class="navbar">
                <div class="navbar-logo">
                    <h3>Isfa<span>Nusantara</span></h3>
                </div>

                <a href="#" id="hamburger-menu" >☰</a>
                <div class="navbar-nav">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="#">Favotite</a></li>
                        <li><a href="https://www.instagram.com/farhan_ansyah/">About Us</a></li>
                    </ul>
                </div>

             </nav>
        `
    }
}
customElements.define('nav-element', navElement);