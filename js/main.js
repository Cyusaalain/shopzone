// Manage LocalStorage-based cart
function addToCart(button) {
  const product = {
    name: button.getAttribute('data-name'),
    price: parseFloat(button.getAttribute('data-price')),
    img: button.getAttribute('data-img'),
  };

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
  loadCart();
}
  
  function clearCart() {
    localStorage.removeItem('cart');
    loadCart();
    alert('Cart cleared!');
  }
  function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
  }
  
  function loadCart() {
    const cartList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    if (!cartList || !cartTotal) return;
  
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartList.innerHTML = '';
    let total = 0;
  
    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <img src="${item.img}" alt="${item.name}" style="width:50px;height:50px;margin-right:10px;" />
        ${item.name} - ${item.price.toFixed(0)}rwf
        <button onclick="removeFromCart(${index})" style="margin-left:10px;">Remove</button>
      `;
      cartList.appendChild(li);
      total += item.price;
    });
  
    cartTotal.textContent = total.toFixed(0);
  }
  
  // CONTACT FORM
  function submitContactForm(event) {
    event.preventDefault();
    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const message = document.getElementById('message')?.value;
  
    if (name && email && message) {
      alert(`Thank you, ${name}! We’ll contact you at ${email}.`);
      event.target.reset();
    }
  }
  
  // NAV TOGGLE
  function toggleMenu() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('show');
  }
  
  // INIT
  document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    const searchInput = document.getElementById('product-search');
    if (searchInput) {
      searchInput.addEventListener('input', filterProducts);
    }
  });
  
  function filterProducts(event) {
    const query = event.target.value.toLowerCase();
    const products = document.querySelectorAll('.product-grid article');
  
    products.forEach(product => {
      const title = product.querySelector('h3')?.textContent.toLowerCase();
      if (title.includes(query)) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  }
const carouselProducts = [
  { name: "Product A", price: 6000, img: "assets/images/1.PNG" },
  { name: "Product B", price: 14000, img: "assets/images/2.PNG" },
  { name: "Product C", price: 17000, img: "assets/images/3.PNG" },
  { name: "Product D", price: 20000, img: "assets/images/4.PNG" }
];

let displayQueue = [...carouselProducts];
let autoSlideInterval;
let autoSlidePaused = false;

function renderCarousel3() {
  const container = document.getElementById('carousel3');
  container.innerHTML = '';

  for (let i = 0; i < 3; i++) {
    const product = displayQueue[i % displayQueue.length];

    const div = document.createElement('div');
    div.className = 'carousel-item' + (i === 1 ? ' active' : '');
    div.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <h4>${product.name}</h4>
      <p>${product.price.toFixed(0)}rwf</p>
      <button onclick="addToCartFromObj('${product.name}', ${product.price}, '${product.img}')">Add to Cart</button>
    `;
    container.appendChild(div);
  }
}

function rotateCarouselForward() {
  pauseAutoSlide();
  const first = displayQueue.shift();
  displayQueue.push(first);
  renderCarousel3();
}

function rotateCarouselBackward() {
  pauseAutoSlide();
  const last = displayQueue.pop();
  displayQueue.unshift(last);
  renderCarousel3();
}

function addToCartFromObj(name, price, img) {
  const product = { name, price, img };
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} added to cart!`);
  loadCart();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    rotateCarouselForward(false); // don't re-pause on auto
  }, 2000);
}

function pauseAutoSlide() {
  if (!autoSlidePaused) {
    clearInterval(autoSlideInterval);
    autoSlidePaused = true;
    setTimeout(() => {
      autoSlidePaused = false;
      startAutoSlide();
    }, 6000); // resume after 6s
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  renderCarousel3();
  startAutoSlide();

  const container = document.querySelector('.carousel3-container');
  container.addEventListener('mouseenter', pauseAutoSlide);
  container.addEventListener('mouseleave', () => {
    if (!autoSlideInterval && !autoSlidePaused) startAutoSlide();
  });
});