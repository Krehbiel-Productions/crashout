/* logo carousel */
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('logoCarousel');
    
    // Mobile click handler
    if (window.matchMedia('(max-width: 768px)').matches) {
        carousel.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    }
});

// Countdown Timer Script
// Get DOM elements
const countdownElement = document.getElementById('countdown');
const endedMessageElement = document.getElementById('ended-message');

// Set the end date (February 27, 2024 at 23:59:00 EST)
const endDate = new Date('2024-02-27T23:59:00-05:00');

function updateCountdown() {
    const currentDate = new Date();
    const timeDifference = endDate - currentDate;

    if (timeDifference <= 0) {
        handleDropEnd();
        return;
    }

    // Calculate time components
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Format the countdown string
    countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function handleDropEnd() {
    // Clear the interval if it exists
    if (window.countdownInterval) {
        clearInterval(window.countdownInterval);
    }
    
    // Hide countdown and show ended message
    document.querySelector('.countdown-container').style.display = 'none';
    endedMessageElement.style.display = 'block';
}

// Initial setup
if (new Date() >= endDate) {
    handleDropEnd();
} else {
    // Update immediately and then every second
    updateCountdown();
    window.countdownInterval = setInterval(updateCountdown, 1000);
}

// Mobile Image Swap Script
document.addEventListener('DOMContentLoaded', function() {
    // Handle mobile touch interactions
    const imageContainers = document.querySelectorAll('.image-container');
    
    imageContainers.forEach(container => {
        let isShowingSecondary = false;
        
        container.addEventListener('click', function(e) {
            // Only handle click on touch devices
            if (window.matchMedia('(hover: none)').matches) {
                const primary = container.querySelector('.image-primary');
                const secondary = container.querySelector('.image-secondary');
                
                if (isShowingSecondary) {
                    primary.style.opacity = '1';
                    secondary.style.opacity = '0';
                } else {
                    primary.style.opacity = '0';
                    secondary.style.opacity = '1';
                }
                
                isShowingSecondary = !isShowingSecondary;
            }
        });
    });
});

// Initialize Stripe
const stripe = Stripe('pk_live_51Msyx3S4FtzJHEthz61OJE3CYGbHS4CM7oE5Foo3LiPvcaDIJvgTaqDKKzWPNZGIDZvkqLfsBMSWbBTwEFJuyQvb00NRgWCnkc');

// Product configuration
const products = {
    'prod_RkgXNKtwvSDNOu': {
        name: 'Black Crashout Tee',
        success_url: 'https://ericgkrehbiel.github.io/production-co/',
        cancel_url: 'https://ericgkrehbiel.github.io/production-co/'
    },
    'prod_RkgXOX2gpJ2ENx': {
        name: 'White Crashout Tee',
        success_url: 'https://ericgkrehbiel.github.io/production-co/',
        cancel_url: 'https://ericgkrehbiel.github.io/production-co/'
    },
    'prod_RkgZJe5Gtgp0og': {
        name: 'Black Crashout Champion Hoodie',
        success_url: 'https://ericgkrehbiel.github.io/production-co/',
        cancel_url: 'https://ericgkrehbiel.github.io/production-co/'
    },
    'prod_RkgY5yJ8jziXEK': {
        name: 'White Crashout Champion Hoodie',
        success_url: 'https://ericgkrehbiel.github.io/production-co/',
        cancel_url: 'https://ericgkrehbiel.github.io/production-co/'
    }
};

// Checkout handler
async function handleCheckout(priceId) {
    try {
        const productConfig = products[priceId];
        if (!productConfig) {
            throw new Error('Invalid product configuration');
        }

        // Call your Vercel backend to create the checkout session
        const response = await fetch('https://crashout-payment-server.vercel.app/api/hello', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                priceId: priceId,
                successUrl: productConfig.success_url,
                cancelUrl: productConfig.cancel_url,
                productName: productConfig.name
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Network response was not ok');
        }
        
        const session = await response.json();
        
        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        });

        if (result.error) {
            throw new Error(result.error.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    }
}
