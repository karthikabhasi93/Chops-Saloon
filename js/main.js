console.log("CHOPS website loaded successfully.");
/* ==================================================
   CHOPS — MAIN JAVASCRIPT
================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* ==================================================
       HERO SLIDER
    ================================================== */

    const slides =
        document.querySelectorAll(".hero-slide");

    const currentSlide =
        document.querySelector(".current-slide");

    const progress =
        document.querySelector(".slider-progress");

    const previousButton =
        document.querySelector(".previous-slide");

    const nextButton =
        document.querySelector(".next-slide");


    let currentIndex = 0;

    let sliderTimer;


    const totalSlides = slides.length;


    function showSlide(index) {

        slides.forEach((slide) => {

            slide.classList.remove("active");

        });


        slides[index].classList.add("active");


        currentSlide.textContent =
            String(index + 1).padStart(2, "0");


        const progressPercentage =
            ((index + 1) / totalSlides) * 100;


        progress.style.width =
            `${progressPercentage}%`;

    }


    function nextSlide() {

        currentIndex++;

        if (currentIndex >= totalSlides) {

            currentIndex = 0;

        }

        showSlide(currentIndex);

    }


    function previousSlide() {

        currentIndex--;

        if (currentIndex < 0) {

            currentIndex =
                totalSlides - 1;

        }

        showSlide(currentIndex);

    }


    function startSlider() {

        clearInterval(sliderTimer);

        sliderTimer =
            setInterval(nextSlide, 6000);

    }


    /* ==================================================
       SLIDER BUTTONS
    ================================================== */

    nextButton.addEventListener(
        "click",
        () => {

            nextSlide();

            startSlider();

        }
    );


    previousButton.addEventListener(
        "click",
        () => {

            previousSlide();

            startSlider();

        }
    );


    /* ==================================================
       START SLIDER
    ================================================== */

    showSlide(currentIndex);

    startSlider();



    /* ==================================================
       MOBILE MENU
    ================================================== */

    const menuButton =
        document.querySelector(".menu-button");

    const mobileMenu =
        document.querySelector(".mobile-menu");

    const mobileLinks =
        document.querySelectorAll(
            ".mobile-menu-links a"
        );


    function toggleMobileMenu() {

        if (!menuButton || !mobileMenu) {
            return;
        }

        menuButton.classList.toggle("active");

        mobileMenu.classList.toggle("open");


        const isOpen =
            mobileMenu.classList.contains("open");


        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );


        menuButton.setAttribute(
            "aria-expanded",
            isOpen
                ? "true"
                : "false"
        );

    }


    function closeMobileMenu() {

        if (!menuButton || !mobileMenu) {
            return;
        }

        menuButton.classList.remove("active");

        mobileMenu.classList.remove("open");


        menuButton.setAttribute(
            "aria-label",
            "Open navigation menu"
        );


        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    /* ==================================================
       HAMBURGER CLICK
    ================================================== */

    if (menuButton && mobileMenu) {

        menuButton.addEventListener(
            "click",
            toggleMobileMenu
        );

    }


    /* ==================================================
       CLOSE AFTER CLICKING MENU ITEM
    ================================================== */

    mobileLinks.forEach((link) => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


    /* ==================================================
       CLOSE WHEN CLICKING OUTSIDE
    ================================================== */

    document.addEventListener(
        "click",
        (event) => {

            const clickedInsideMenu =
                mobileMenu && mobileMenu.contains(event.target);

            const clickedButton =
                menuButton && menuButton.contains(event.target);


            if (
                !clickedInsideMenu &&
                !clickedButton
            ) {

                closeMobileMenu();

            }

        }
    );


    /* ==================================================
       CLOSE MOBILE MENU ON DESKTOP
    ================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 800) {

                closeMobileMenu();

            }

        }
    );


    /* ==========================================
   SERVICES CARD REVEAL ANIMATION
========================================== */

const serviceCards =
    document.querySelectorAll(".service-card");


if (serviceCards.length > 0) {

    const serviceObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.15
            }

        );


    serviceCards.forEach(card => {

        serviceObserver.observe(card);

    });

}


/* ==========================================
   OFFERS BANNER ANIMATION
========================================== */

const offersSection =
    document.querySelector(".offers-section");


if (offersSection) {

    const offersObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "offers-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.15
            }

        );


    offersObserver.observe(offersSection);

}


/* =========================================
   APPOINTMENT SECTION ANIMATION
========================================= */

const appointmentSection =
    document.querySelector(".appointment-section");

if (appointmentSection) {

    const appointmentObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "appointment-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );

    appointmentObserver.observe(
        appointmentSection
    );
}

/* =========================================
   APPOINTMENT - WHATSAPP ENQUIRY
========================================= */

const appointmentForm =
    document.querySelector("#appointment-form");

const phoneInput =
    document.querySelector("#appointment-phone");

if (appointmentForm) {

    appointmentForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Get form values
        const name =
            document.querySelector("#appointment-name").value.trim();

        const phone =
            document.querySelector("#appointment-phone").value.trim();
        // Mobile number validation
            const mobilePattern = /^[6-9][0-9]{9}$/;

            if (!mobilePattern.test(phone)) {

                phoneInput.focus();

                phoneInput.setCustomValidity(
                    "Please enter a valid 10-digit Indian mobile number."
                );

                phoneInput.reportValidity();

                return;
            }

            phoneInput.setCustomValidity("");

        const service =
            document.querySelector("#appointment-service").value;

        const date =
            document.querySelector("#appointment-date").value;

        const time =
            document.querySelector("#appointment-time").value;

        const email =
            document.querySelector("#appointment-email").value.trim();

        const message =
            document.querySelector("#appointment-message").value.trim();


        // Format date
        let formattedDate = date;

        if (date) {

            const dateObject = new Date(date + "T00:00:00");

            formattedDate =
                dateObject.toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                });
        }


        // Create WhatsApp message
        const whatsappMessage = `
Hello CHOPS Salon,

I would like to make an appointment.

Name: ${name}
Mobile: +91 ${phone}
Service: ${service}
Preferred Date: ${formattedDate}
Preferred Time: ${time}
${email ? `Email: ${email}` : ""}

${message ? `Message / Special Request:
${message}` : ""}

Thank you.
        `.trim();


        // CHOPS WhatsApp number
        const chopsWhatsAppNumber =
            "917907991562";


        // Encode message for WhatsApp URL
        const encodedMessage =
            encodeURIComponent(whatsappMessage);


        // WhatsApp URL
        const whatsappURL =
            `https://wa.me/${chopsWhatsAppNumber}?text=${encodedMessage}`;


        // Open WhatsApp
        window.open(
            whatsappURL,
            "_blank"
        );

    });
}



// =========================================================
// TESTIMONIAL SLIDER
// =========================================================

const testimonialSlides =
    document.querySelectorAll(".testimonial-slide");

const testimonialPrevious =
    document.querySelector(".testimonial-prev");

const testimonialNext =
    document.querySelector(".testimonial-next");

const testimonialCurrent =
    document.querySelector(".testimonial-current");

let currentTestimonial = 0;


function showTestimonial(index) {

    if (!testimonialSlides.length) {
        return;
    }

    testimonialSlides.forEach(slide => {
        slide.classList.remove("active");
    });


    if (index < 0) {

        currentTestimonial =
            testimonialSlides.length - 1;

    } else if (index >= testimonialSlides.length) {

        currentTestimonial = 0;

    } else {

        currentTestimonial = index;

    }


    testimonialSlides[
        currentTestimonial
    ].classList.add("active");


    if (testimonialCurrent) {

        testimonialCurrent.textContent =
            String(currentTestimonial + 1)
                .padStart(2, "0");

    }

}


if (testimonialPrevious) {

    testimonialPrevious.addEventListener(
        "click",
        () => {
            showTestimonial(
                currentTestimonial - 1
            );
        }
    );

}


if (testimonialNext) {

    testimonialNext.addEventListener(
        "click",
        () => {
            showTestimonial(
                currentTestimonial + 1
            );
        }
    );

}


showTestimonial(0);






});


