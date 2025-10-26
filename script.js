// Fresh Juice Shop - Interactive JavaScript

// Global Variables
let cartCount = 0;
let cartItems = [];
let currentStep = 1;
let orderNumber = 'FJ-2024-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0');

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const cartModal = document.getElementById('cartModal');
const checkoutModal = document.getElementById('checkoutModal');
const cartCountElement = document.querySelector('.cart-count');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    setupAnimations();
});

// Initialize the application
function initializeApp() {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize cart count
    updateCartCount();
    
    // Add loading animation
    addLoadingAnimation();
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Modal event listeners
    setupModalListeners();

    // Form submissions
    setupFormSubmissions();

    // Scroll effects
    setupScrollEffects();

    // Add hover effects to menu items
    setupMenuHoverEffects();
}

// Mobile menu functionality
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
}

// Modal functionality
function setupModalListeners() {
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    });

    // Close modals with escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeAllModals();
        }
    });
}

function openLogin() {
    loginModal.style.display = 'block';
    document.body.classList.add('modal-open');
    animateModalIn(loginModal);
}

function closeLogin() {
    animateModalOut(loginModal, () => {
        loginModal.style.display = 'none';
        document.body.classList.remove('modal-open');
    });
}

function openSignup() {
    closeLogin();
    setTimeout(() => {
        signupModal.style.display = 'block';
        document.body.classList.add('modal-open');
        animateModalIn(signupModal);
    }, 300);
}

function closeSignup() {
    animateModalOut(signupModal, () => {
        signupModal.style.display = 'none';
        document.body.classList.remove('modal-open');
    });
}

function closeAllModals() {
    closeLogin();
    closeSignup();
    closeCart();
    closeCheckout();
}

// Cart Modal Functions
function openCart() {
    cartModal.style.display = 'block';
    document.body.classList.add('modal-open');
    animateModalIn(cartModal);
    renderCartItems();
    updateCartSummary();
}

function closeCart() {
    animateModalOut(cartModal, () => {
        cartModal.style.display = 'none';
        document.body.classList.remove('modal-open');
    });
}

// Checkout Modal Functions
function openCheckout() {
    checkoutModal.style.display = 'block';
    document.body.classList.add('modal-open');
    animateModalIn(checkoutModal);
    currentStep = 1;
    updateCheckoutSteps();
    renderOrderSummary();
}

function closeCheckout() {
    animateModalOut(checkoutModal, () => {
        checkoutModal.style.display = 'none';
        document.body.classList.remove('modal-open');
        currentStep = 1;
        resetCheckoutForm();
    });
}

function proceedToCheckout() {
    if (cartItems.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    closeCart();
    setTimeout(() => {
        openCheckout();
    }, 300);
}

// Modal animations
function animateModalIn(modal) {
    const content = modal.querySelector('.modal-content');
    content.style.transform = 'translateY(-50px)';
    content.style.opacity = '0';
    
    setTimeout(() => {
        content.style.transition = 'all 0.3s ease';
        content.style.transform = 'translateY(0)';
        content.style.opacity = '1';
    }, 10);
}

function animateModalOut(modal, callback) {
    const content = modal.querySelector('.modal-content');
    content.style.transition = 'all 0.3s ease';
    content.style.transform = 'translateY(-50px)';
    content.style.opacity = '0';
    
    setTimeout(callback, 300);
}

// Form submissions
function setupFormSubmissions() {
    // Login form
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Signup form
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletter);
    }
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simulate login process
    showLoadingState(e.target.querySelector('.btn-login-submit'));
    
    setTimeout(() => {
        hideLoadingState(e.target.querySelector('.btn-login-submit'));
        showNotification('Login successful!', 'success');
        closeLogin();
    }, 2000);
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }
    
    // Simulate signup process
    showLoadingState(e.target.querySelector('.btn-signup-submit'));
    
    setTimeout(() => {
        hideLoadingState(e.target.querySelector('.btn-signup-submit'));
        showNotification('Account created successfully!', 'success');
        closeSignup();
    }, 2000);
}

function handleContactForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Simulate form submission
    showLoadingState(e.target.querySelector('.btn-primary'));
    
    setTimeout(() => {
        hideLoadingState(e.target.querySelector('.btn-primary'));
        showNotification('Message sent successfully!', 'success');
        e.target.reset();
    }, 2000);
}

function handleNewsletter(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Simulate newsletter subscription
    showLoadingState(e.target.querySelector('button'));
    
    setTimeout(() => {
        hideLoadingState(e.target.querySelector('button'));
        showNotification('Successfully subscribed to newsletter!', 'success');
        e.target.reset();
    }, 1500);
}

// Loading states
function showLoadingState(button) {
    const originalText = button.textContent;
    button.dataset.originalText = originalText;
    button.textContent = 'Loading...';
    button.disabled = true;
    button.style.opacity = '0.7';
}

function hideLoadingState(button) {
    button.textContent = button.dataset.originalText;
    button.disabled = false;
    button.style.opacity = '1';
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#06d6a0' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Cart functionality
function addToCart(itemName, price) {
    // Check if item already exists in cart
    const existingItem = cartItems.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ 
            name: itemName, 
            price: price, 
            quantity: 1,
            id: Date.now() + Math.random()
        });
    }
    
    cartCount++;
    updateCartCount();
    
    // Add animation to cart button
    animateCartButton();
    
    // Show success notification
    showNotification(`${itemName} added to cart!`, 'success');
    
    // Store in localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartCount', cartCount.toString());
    
    // Update checkout button state
    updateCheckoutButton();
}

function removeFromCart(itemId) {
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        const item = cartItems[itemIndex];
        cartCount -= item.quantity;
        cartItems.splice(itemIndex, 1);
        
        updateCartCount();
        renderCartItems();
        updateCartSummary();
        updateCheckoutButton();
        
        // Store in localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('cartCount', cartCount.toString());
        
        showNotification(`${item.name} removed from cart!`, 'info');
    }
}

function updateQuantity(itemId, change) {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
        const newQuantity = item.quantity + change;
        if (newQuantity <= 0) {
            removeFromCart(itemId);
            return;
        }
        
        item.quantity = newQuantity;
        cartCount += change;
        
        updateCartCount();
        renderCartItems();
        updateCartSummary();
        
        // Store in localStorage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('cartCount', cartCount.toString());
    }
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some fresh juices to get started!</p>
                <button class="btn-primary" onclick="closeCart()">Start Shopping</button>
            </div>
        `;
        return;
    }
    
    cartItemsContainer.innerHTML = cartItems.map(item => `
        <div class="cart-item">
            <div class="cart-item-image" style="background: linear-gradient(180deg, ${getJuiceColor(item.name)}, ${getJuiceColor(item.name, true)});"></div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-control">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Remove item">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function updateCartSummary() {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 2.99;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + deliveryFee + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('deliveryFee').textContent = `$${deliveryFee.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

function updateCheckoutButton() {
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (cartItems.length === 0) {
        checkoutBtn.disabled = true;
        checkoutBtn.textContent = 'Cart is Empty';
    } else {
        checkoutBtn.disabled = false;
        checkoutBtn.textContent = 'Proceed to Checkout';
    }
}

function getJuiceColor(juiceName, darker = false) {
    const colors = {
        'Orange Delight': darker ? '#ff7f00' : '#ff8c00',
        'Lemon Zest': darker ? '#ffd700' : '#ffff00',
        'Mango Paradise': darker ? '#ff8c00' : '#ffa500',
        'Strawberry Bliss': darker ? '#ff1493' : '#ff69b4',
        'Grapefruit Fresh': darker ? '#ff4500' : '#ff6347',
        'Pineapple Punch': darker ? '#ffa500' : '#ffd700'
    };
    return colors[juiceName] || '#ff8c00';
}

// Checkout functionality
function nextStep(step) {
    if (step === 2) {
        if (!validateDeliveryForm()) {
            return;
        }
    } else if (step === 3) {
        if (!validatePaymentForm()) {
            return;
        }
    }
    
    // Hide current step
    document.getElementById(`step${currentStep}`).style.display = 'none';
    
    // Show next step
    currentStep = step;
    document.getElementById(`step${currentStep}`).style.display = 'block';
    
    // Update step indicators
    updateCheckoutSteps();
    
    // Update order summary if moving to payment step
    if (step === 2) {
        renderOrderSummary();
    }
}

function prevStep(step) {
    // Hide current step
    document.getElementById(`step${currentStep}`).style.display = 'none';
    
    // Show previous step
    currentStep = step;
    document.getElementById(`step${currentStep}`).style.display = 'block';
    
    // Update step indicators
    updateCheckoutSteps();
}

function updateCheckoutSteps() {
    document.querySelectorAll('.step').forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 < currentStep) {
            step.classList.add('completed');
        } else if (index + 1 === currentStep) {
            step.classList.add('active');
        }
    });
}

function validateDeliveryForm() {
    const requiredFields = ['firstName', 'lastName', 'checkoutEmail', 'phone', 'address', 'city', 'zipCode', 'deliveryTime'];
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            field.style.borderColor = '#e9ecef';
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields', 'error');
    }
    
    return isValid;
}

function validatePaymentForm() {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    if (paymentMethod === 'card') {
        const cardFields = ['cardNumber', 'expiryDate', 'cvv', 'cardName'];
        let isValid = true;
        
        cardFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                field.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                field.style.borderColor = '#e9ecef';
            }
        });
        
        if (!isValid) {
            showNotification('Please fill in all card details', 'error');
            return false;
        }
    }
    
    return true;
}

function renderOrderSummary() {
    const orderItemsContainer = document.getElementById('orderItems');
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 2.99;
    const tax = subtotal * 0.08;
    const total = subtotal + deliveryFee + tax;
    
    orderItemsContainer.innerHTML = cartItems.map(item => `
        <div class="order-item">
            <span class="order-item-name">${item.name} x${item.quantity}</span>
            <span class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    
    document.getElementById('orderSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('orderDeliveryFee').textContent = `$${deliveryFee.toFixed(2)}`;
    document.getElementById('orderTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('orderTotal').textContent = `$${total.toFixed(2)}`;
}

function processPayment() {
    if (!validatePaymentForm()) {
        return;
    }
    
    // Show loading state
    const paymentBtn = document.querySelector('.checkout-actions .btn-primary');
    const originalText = paymentBtn.textContent;
    paymentBtn.textContent = 'Processing...';
    paymentBtn.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        // Move to confirmation step
        nextStep(3);
        
        // Update confirmation details
        updateConfirmationDetails();
        
        // Clear cart
        clearCart();
        
        // Reset button
        paymentBtn.textContent = originalText;
        paymentBtn.disabled = false;
        
        showNotification('Order placed successfully!', 'success');
    }, 2000);
}

function updateConfirmationDetails() {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 2.99 + (cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.08);
    
    document.getElementById('orderNumber').textContent = orderNumber;
    document.getElementById('estimatedDelivery').textContent = document.getElementById('deliveryTime').value === 'asap' ? '30-45 minutes' : '1-2 hours';
    document.getElementById('finalTotal').textContent = `$${total.toFixed(2)}`;
}

function clearCart() {
    cartItems = [];
    cartCount = 0;
    updateCartCount();
    localStorage.removeItem('cartItems');
    localStorage.removeItem('cartCount');
}

function resetCheckoutForm() {
    document.querySelectorAll('input, textarea, select').forEach(field => {
        field.value = '';
        field.style.borderColor = '#e9ecef';
    });
    
    // Reset payment method to card
    document.getElementById('cardPayment').checked = true;
}

function trackOrder() {
    showNotification('Order tracking feature coming soon!', 'info');
    closeCheckout();
}

// Payment method change handler
document.addEventListener('change', function(e) {
    if (e.target.name === 'paymentMethod') {
        const cardDetails = document.getElementById('cardDetails');
        if (e.target.value === 'card') {
            cardDetails.style.display = 'block';
        } else {
            cardDetails.style.display = 'none';
        }
    }
});

// Card number formatting
document.addEventListener('input', function(e) {
    if (e.target.id === 'cardNumber') {
        let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    }
    
    if (e.target.id === 'expiryDate') {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    }
    
    if (e.target.id === 'cvv') {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
    }
});

function updateCartCount() {
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        
        // Add pulse animation when count changes
        cartCountElement.style.animation = 'none';
        setTimeout(() => {
            cartCountElement.style.animation = 'pulse 0.6s ease';
        }, 10);
    }
}

function animateCartButton() {
    const cartButton = document.querySelector('.btn-cart');
    if (cartButton) {
        cartButton.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartButton.style.transform = 'scale(1)';
        }, 200);
    }
}

// Scroll effects
function setupScrollEffects() {
    // Navbar background change on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.menu-item, .feature, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

// Menu hover effects
function setupMenuHoverEffects() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Smooth scrolling functions
function scrollToMenu() {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToAbout() {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Animations setup
function setupAnimations() {
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.6s ease forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .menu-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.3s ease;
        }
        
        .menu-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature {
            opacity: 0;
            transform: translateX(-30px);
            transition: all 0.3s ease;
        }
        
        .feature.animate-in {
            opacity: 1;
            transform: translateX(0);
        }
        
        .contact-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.3s ease;
        }
        
        .contact-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .btn-cart {
            transition: all 0.3s ease;
        }
        
        .cart-count {
            transition: all 0.3s ease;
        }
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
            }
        }
        
        .modal-open {
            overflow: hidden;
        }
        
        .menu-open {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
}

// Loading animation
function addLoadingAnimation() {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-logo">
                <i class="fas fa-leaf"></i>
                <span>FreshJuice</span>
            </div>
            <div class="loader-spinner"></div>
        </div>
    `;
    
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #fff5f0 0%, #ffe8d6 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    const loaderStyle = document.createElement('style');
    loaderStyle.textContent = `
        .loader-content {
            text-align: center;
        }
        
        .loader-logo {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            font-size: 2rem;
            font-weight: 700;
            color: #ff6b35;
            margin-bottom: 2rem;
        }
        
        .loader-logo i {
            font-size: 2.5rem;
        }
        
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(255, 107, 53, 0.2);
            border-top: 4px solid #ff6b35;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(loaderStyle);
    document.body.appendChild(loader);
    
    // Remove loader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(loader);
            }, 500);
        }, 1000);
    });
}

// Parallax effect for hero section
function setupParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Parallax for floating fruits
        const fruits = document.querySelectorAll('.fruit');
        fruits.forEach((fruit, index) => {
            const speed = 0.3 + (index * 0.1);
            fruit.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Initialize parallax
setupParallaxEffect();

// Add click effects to buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-primary, .btn-secondary, .btn-add-cart, .btn-login, .btn-cart')) {
        createRippleEffect(e);
    }
});

function createRippleEffect(e) {
    const button = e.target;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Load cart from localStorage
function loadCartFromStorage() {
    const storedCartItems = localStorage.getItem('cartItems');
    const storedCartCount = localStorage.getItem('cartCount');
    
    if (storedCartItems) {
        cartItems = JSON.parse(storedCartItems);
    }
    
    if (storedCartCount) {
        cartCount = parseInt(storedCartCount);
        updateCartCount();
    }
}

// Initialize cart from storage
loadCartFromStorage();

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Tab navigation for modals
    if (document.body.classList.contains('modal-open')) {
        const modal = document.querySelector('.modal[style*="block"]');
        if (modal) {
            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        }
    }
});

// Add form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#e9ecef';
        }
    });
    
    return isValid;
}

// Add input focus effects
document.addEventListener('focusin', function(e) {
    if (e.target.matches('input, textarea')) {
        e.target.parentElement.classList.add('focused');
    }
});

document.addEventListener('focusout', function(e) {
    if (e.target.matches('input, textarea')) {
        e.target.parentElement.classList.remove('focused');
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll handling code here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

console.log('Fresh Juice Shop - JavaScript loaded successfully! 🍊🥤');
