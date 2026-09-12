document.addEventListener("DOMContentLoaded", () => {

    // Load Navbar
    const navbarContainer = document.getElementById("site-navbar");

    if (navbarContainer) {
        fetch("components/navbar.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to load navbar.");
                }

                return response.text();
            })
            .then(html => {
                navbarContainer.innerHTML = html;

                initializeNavbar();
            })
            .catch(error => {
                console.error("Navbar loading error:", error);
            });
    }


    // Load Footer
    const footerContainer = document.getElementById("site-footer");

    if (footerContainer) {
        fetch("components/footer.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to load footer.");
                }

                return response.text();
            })
            .then(html => {
                footerContainer.innerHTML = html;
            })
            .catch(error => {
                console.error("Footer loading error:", error);
            });
    }

});


/* =========================================================
   NAVBAR FUNCTIONALITY
   ========================================================= */

function initializeNavbar() {

    const menuButton =
        document.querySelector(".menu-button");

    const mobileMenu =
        document.querySelector("#mobile-navigation");


    if (!menuButton || !mobileMenu) {
        return;
    }


    menuButton.addEventListener("click", () => {

        const isOpen =
            menuButton.getAttribute("aria-expanded") === "true";

        menuButton.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

        mobileMenu.classList.toggle(
            "open",
            !isOpen
        );

        document.body.classList.toggle(
            "menu-open",
            !isOpen
        );
    });


    // Close menu when a link is clicked
    const mobileLinks =
        mobileMenu.querySelectorAll("a");

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            mobileMenu.classList.remove(
                "is-open"
            );

            document.body.classList.remove(
                "menu-open"
            );

        });

    });

}