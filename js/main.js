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

  <!-- Shopify Buy Button Script -->
  <script>
    /*
    Your Shopify Buy Button integration code will go here.
    The buttons above will need to be replaced with Shopify's 
    buy button components once you have your Shopify setup ready.
    */
  </script>
