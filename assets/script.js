
    // Get elements
    const toggleBtn = document.getElementById('toggleBtn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    // const overlay = document.getElementById('overlay');
    const navItems = document.querySelectorAll('.nav-item');
    const socialIcons = document.querySelectorAll('.social-icon');

    let isOpen = true;

    // Toggle function
    function toggleNavbar() {
      isOpen = !isOpen;

      const icon = toggleBtn.querySelector('i');

      if (isOpen) {
        sidebar.classList.remove('hidden');
        mainContent.classList.remove('expanded');
        // overlay.classList.remove('active');
        icon.className = 'fas fa-times';
      } else {
        sidebar.classList.add('hidden');
        mainContent.classList.add('expanded');
        // overlay.classList.add('active');
        icon.className = 'fas fa-bars';
        console.log('Navbar closed');
      }
    }

    // Event listeners
    toggleBtn.addEventListener('click', toggleNavbar);
    // overlay.addEventListener('click', toggleNavbar);

    // Navigation items
navItems.forEach(item => {
  item.addEventListener('click', function () {
    navItems.forEach(nav => nav.classList.remove('active'));
    this.classList.add('active');

    // Scroll to the section manually
    const targetId = this.getAttribute('href').substring(1); // remove "#"
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Close on mobile
    if (window.innerWidth <= 768 && isOpen) {
      toggleNavbar();
    }
  });
});


    // Social icons hover
    socialIcons.forEach(icon => {
      icon.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-3px) rotate(5deg)';
      });

      icon.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) rotate(0deg)';
      });
    });

    // Responsive behavior
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        if (!isOpen) {
          toggleNavbar();
        }
      }
    });

    // Initialize for mobile
    if (window.innerWidth <= 768) {
      toggleNavbar();
    }
    const form = document.querySelector("form");

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Collect form data
      const data = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        subject: document.getElementById("subject").value.trim(),
        message: document.getElementById("message").value.trim()
      };

      // Simple validation (optional)
      if (!data.name || !data.email || !data.subject || !data.message) {
        alert("Please fill out all fields.");
        return;
      }

      // Send data to SheetDB
      try {
        const response = await fetch("https://sheetdb.io/api/v1/blhw7z95ef4l6", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ data })
        });

        if (response.ok) {
          alert("✅ Message sent successfully!");
          form.reset();
        } else {
          alert("❌ Failed to send. Please try again later.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("❌ An error occurred. Check the console for details.");
      }
    });
