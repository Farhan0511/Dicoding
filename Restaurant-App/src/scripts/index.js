import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import './component/nav';
import './component/footer'

// Toggle 
// Toggle adalah menu yang tidak bisa diadakan dan bisa diadakan 
const navbarNav = document.querySelector('.navbar-nav');

// Ketika Hamburger menu di klik
document.querySelector('#hamburger-menu').
    onclick = () => {
        navbarNav.classList.toggle('active')
    };

// ketika klik selain menu hamburger dan sidebar, maka sidebar akan menghilang
const hamburger = document.querySelector('#hamburger-menu');

document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }

});

document.addEventListener("DOMContentLoaded", async () => {
    const jsonData = await import('../public/data/DATA.json');
    const data = jsonData.default.restaurants;
    let datacard = '';

    data.forEach(function (restaurant) {
        // Menambahkan data JSON ke dalam datacard
        const description = singkatkanDeskripsi(restaurant.description, 150)
        datacard += `
            <div class="card">
                <div class="card-image">
                    <img src="${restaurant.pictureId}" alt="${restaurant.name}">
                    <p class="card-city"><a href="#">${restaurant.city}</a></p>
                    <p class="card-rating">Rating:<a href="#"> ${restaurant.rating}</a></p>
                </div>
            <div class="card-content">
                    <h2><a href="#">${restaurant.name}</a></h2>
                    <div class="card-description">
                        <p>Description: ${description}</p>
                    </div>        
                </div>
            </div>
        `;
    });

    // Menambahkan datacard ke dalam elemen dengan id "restaurant-container"
    document.getElementById("restaurant-list").innerHTML = datacard;
});

function singkatkanDeskripsi(deskripsi, panjangSingkat) {
    if (!deskripsi || panjangSingkat <= 0) {
        return "";
    }
    if (deskripsi.length > panjangSingkat) {
        return deskripsi.substring(0, panjangSingkat) + "...";
    } else {
        return deskripsi;
    }
};

document.querySelectorAll('a').forEach(e => {
    if (e.offsetWidth < 44 || e.offsetHeight < 44) {
        return;
    }
});
