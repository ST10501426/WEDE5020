// JavaScript code for handling the video playback and fade-out effect of the overlay
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.querySelector('.overlay');
    const video = document.querySelector('.intro-video');

    video.addEventListener('ended', function() {
        overlay.classList.add('fade-out');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 1000); // Match this duration with the CSS transition duration
    });
});

// Price Range Slider
const priceSlider = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const categoryFilters = document.querySelectorAll('.category-filter');
const productCards = document.querySelectorAll('.product-card');
const productGrid = document.getElementById('productGrid');
const noProducts = document.getElementById('noProducts');

// Update price display
if (priceSlider) {
    priceSlider.addEventListener('input', function() {
        priceValue.textContent = 'R' + parseInt(this.value).toLocaleString();
        filterProducts();
    });
}

// Category filter
categoryFilters.forEach(filter => {
    filter.addEventListener('change', filterProducts);
});

// Filter products based on price and category
function filterProducts() {
    const maxPrice = parseInt(priceSlider.value);
    const selectedCategories = Array.from(categoryFilters)
        .filter(filter => filter.checked)
        .map(filter => filter.value);

    let visibleCount = 0;

    productCards.forEach(card => {
        const price = parseFloat(card.dataset.price);
        const category = card.dataset.category;

        // Show product if it matches price range
        // If no categories selected, show all within price range
        // If categories selected, show only matching categories within price range
        const matchesPrice = price <= maxPrice;
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(category);

        if (matchesPrice && matchesCategory) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Show/hide no products message
    if (visibleCount === 0) {
        productGrid.style.display = 'none';
        noProducts.style.display = 'block';
    } else {
        productGrid.style.display = 'grid';
        noProducts.style.display = 'none';
    }
}

// Hero video 
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
    heroVideo.play();
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});