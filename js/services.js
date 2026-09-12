// ========================================
// SERVICES NAVIGATION ON ClICK
// ========================================

const serviceNavLinks = document.querySelectorAll(".service-nav-link");

serviceNavLinks.forEach(link => {
    link.addEventListener("click", function () {

        // Remove active from all links
        serviceNavLinks.forEach(navLink => {
            navLink.classList.remove("active");
        });

        // Add active to clicked link
        this.classList.add("active");
    });
});


// ========================================
// UPDATE ACTIVE NAVIGATION ON SCROLL
// ========================================

const serviceSections = document.querySelectorAll(".service-detail-section");

const sectionObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const sectionId = entry.target.id;

                serviceNavLinks.forEach(link => {
                    link.classList.remove("active");

                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }

        });
    },
    {
        rootMargin: "-30% 0px -55% 0px",
        threshold: 0
    }
);

serviceSections.forEach(section => {
    sectionObserver.observe(section);
});