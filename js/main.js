<!-- Countdown Timer Script -->
  <script>
    function updateCountdown() {
      const endDate = new Date('2024-02-27T23:59:00-05:00'); // ET (UTC-5)
      const now = new Date();
      const timeDifference = endDate - now;

      if (timeDifference <= 0) {
        document.getElementById('countdown').textContent = '00:00:00';
        handleDropEnd();
        return;
      }

      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      document.getElementById('countdown').textContent = formattedTime;
    }

    function handleDropEnd() {
      // Stop the countdown
      clearInterval(countdownInterval);
      
      // Hide products with fade-out animation
      const productsGrid = document.getElementById('products-grid');
      productsGrid.classList.add('hidden');
      
      // Show ended message
      const endedMessage = document.getElementById('ended-message');
      endedMessage.classList.add('visible');
      
      // Update countdown text
      document.getElementById('countdown').textContent = '00:00:00';
    }

    // Check if drop has already ended on page load
    const endDate = new Date('2024-02-27T23:59:00-05:00');
    if (new Date() >= endDate) {
      handleDropEnd();
    } else {
      // Update immediately and then every second
      updateCountdown();
      const countdownInterval = setInterval(updateCountdown, 1000);
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
