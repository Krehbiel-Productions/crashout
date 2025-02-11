<!-- Countdown Timer Script -->
  <script>
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
  </script>

  <!-- Mobile Image Swap Script -->
  <script>
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
  </script>

<script>
// Initialize Stripe
const stripe = Stripe('pk_live_51Msyx3S4FtzJHEthz61OJE3CYGbHS4CM7oE5Foo3LiPvcaDIJvgTaqDKKzWPNZGIDZvkqLfsBMSWbBTwEFJuyQvb00NRgWCnkc');

// Add this function to handle the checkout
async function handleCheckout() {
    try {
        // Create Checkout Session
        const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                payment_method_types: ['card'],
                line_items: [{
                    price: 'price_1QrBCbS4FtzJHEthm8pTLtdh', // Your price ID from Stripe Dashboard
                    quantity: 1,
                }],
                mode: 'payment',
                success_url: 'https://ericgkrehbiel.github.io/production-co/',
                cancel_url: 'https://ericgkrehbiel.github.io/production-co/',
            }),
        });
        
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
</script>
