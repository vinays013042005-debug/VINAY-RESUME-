// Ensure the document is fully loaded before running scripts
$(document).ready(function() {

    /* --- 1. Smooth Scrolling for Anchor Links (jQuery) --- */
    $('a[href*="#"]:not([href="#"])').on('click', function(e) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            let target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 800); // 800ms duration for smooth scroll
                return false;
            }
        }
    });

    /* --- 2. Simple Dynamic Greeting (JavaScript) --- */
    // Note: This is an example of simple dynamic update on the Home page
    const homeContent = document.getElementById('home-content');
    if (homeContent) {
        const timeOfDay = new Date().getHours();
        let greeting;
        if (timeOfDay < 12) {
            greeting = 'Good Morning! Welcome to my digital space.';
        } else if (timeOfDay < 18) {
            greeting = 'Good Afternoon! Take a look around.';
        } else {
            greeting = 'Good Evening! Thanks for visiting.';
        }
        
        // Find the main heading or create a new element
        const introHeading = homeContent.querySelector('h2');
        if (introHeading) {
            const dynamicUpdate = document.createElement('p');
            dynamicUpdate.id = 'dynamic-greeting';
            dynamicUpdate.textContent = greeting;
            dynamicUpdate.style.fontWeight = 'bold';
            dynamicUpdate.style.marginTop = '10px';
            dynamicUpdate.style.color = '#dc3545'; // Highlight in red
            introHeading.after(dynamicUpdate);
        }
    }


    /* --- 3. Contact Form Validation (jQuery) --- */
    const $contactForm = $('#contactForm');
    const $formStatus = $('#formStatus');

    $contactForm.on('submit', function(e) {
        e.preventDefault(); // Stop the default form submission
        
        // Clear previous errors
        $('.error-message').text('');
        $formStatus.hide().removeClass('success-message error-message').text('');

        let isValid = true;
        
        // Basic Name Validation (check if empty)
        const name = $('#name').val().trim();
        if (name === "") {
            $('#nameError').text('Name is required.');
            isValid = false;
        }

        // Basic Email Validation (check if empty and basic pattern)
        const email = $('#email').val().trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === "") {
            $('#emailError').text('Email is required.');
            isValid = false;
        } else if (!emailPattern.test(email)) {
             $('#emailError').text('Please enter a valid email address.');
            isValid = false;
        }

        // Basic Subject Validation
        const subject = $('#subject').val().trim();
        if (subject === "") {
            $('#subjectError').text('Subject is required.');
            isValid = false;
        }

        // Basic Message Validation
        const message = $('#message').val().trim();
        if (message === "") {
            $('#messageError').text('Message is required.');
            isValid = false;
        } else if (message.length < 10) {
             $('#messageError').text('Message must be at least 10 characters long.');
            isValid = false;
        }

        if (isValid) {
            // Simulate form submission success
            // In a real application, you would use AJAX here to send data to a server
            
            // Clear form fields
            $contactForm[0].reset();
            
            // Display success message
            $formStatus.text('Thank you for your message! I will get back to you shortly.').addClass('success-message').show();

            // Simple button animation on success
            const $submitBtn = $('#submitBtn');
            $submitBtn.text('Sent!');
            setTimeout(function() {
                $submitBtn.text('Send Message');
            }, 3000);

        } else {
            $formStatus.text('Please correct the errors above.').addClass('error-message').show();
        }
    });
});
